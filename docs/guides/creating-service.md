---
sidebar_position: 2
title: Creating a Service
description: How to create services in Drumee — covers both the backend REST endpoint pattern and the frontend UI skeleton pattern
---

# Creating a Service in Drumee

Drumee has two complementary service layers that work together:

- **Backend service** — a REST endpoint callable at `/-/svc/module.method`, defined by an ACL file and a Node.js class
- **Frontend UI service** — a named UI action attached to a Skeleton node, handled by the LETC widget router

Both concepts use the word "service" and are closely related: the backend exposes the API, the frontend calls it. This guide covers both.

---

# Part 1 — Backend Service (REST Endpoint)

This section explains how to add a new service endpoint to the Drumee server. By the end you will have a working endpoint callable at `/-/svc/mymodule.my_action`.

## Overview

Adding a service in Drumee requires exactly two files:

1. **ACL configuration** — `acl/mymodule.json` declares the endpoint, its permission level, and the module that implements it
2. **Service implementation** — `service/private/mymodule.js` contains the JavaScript class with the method

No route registration, no middleware wiring, no framework config changes.

---

## Step 1 — Create the ACL File

Create `acl/mymodule.json`:

```json
{
  "services": {
    "my_action": {
      "scope": "hub",
      "permission": {
        "src": "write"
      }
    }
  },
  "modules": {
    "private": "service/private/mymodule"
  }
}
```

### Choosing the Right Permission Level

| You want... | Use |
|-------------|-----|
| Any authenticated user to call it | `read` |
| Only users who can edit content | `write` |
| Only hub administrators | `admin` |
| Only the resource owner | `owner` |
| No authentication at all | `anonymous` (and `scope: "public"`) |

### Choosing the Right Scope

| You want... | Use |
|-------------|-----|
| Operate within a Hub (most services) | `hub` |
| Domain-wide operation | `domain` |
| No Hub context needed | `public` (with `modules.public` path) |

---

## Step 2 — Create the Service Implementation

Create `service/private/mymodule.js`:

```js
const { Attr } = require('@drumee/server-essentials');
const { Entity } = require('@drumee/server-core');

class MyModule extends Entity {

  async my_action() {
    // 1. Read inputs
    const id   = this.input.need(Attr.id);     // required — throws if missing
    const name = this.input.use(Attr.name, ''); // optional — default ''

    // 2. Call a stored procedure
    const result = await this.db.await_proc('my_proc', id, name);

    // 3. Return the result
    this.output.data(result);
  }

}

module.exports = MyModule;
```

---

## Step 3 — Understanding Input Handling

Drumee provides two methods for reading request parameters:

| Method | Behaviour |
|--------|-----------|
| `this.input.need(Attr.x)` | Required. Throws an exception if the parameter is absent. |
| `this.input.use(Attr.x, default)` | Optional. Returns the default value if absent. |
| `this.input.get(Attr.x)` | Reads without requiring or defaulting. Returns `undefined` if absent. |

The `Attr` constants map to standard parameter names used across the codebase (e.g. `Attr.id`, `Attr.name`, `Attr.email`). For custom parameter names not in `Attr`, pass the string directly:

```js
const days = this.input.use('days', 7);
```

---

## Step 4 — Calling Stored Procedures

All database operations use stored procedures — never raw SQL in service files.

```js
// Operations on the current hub's database
const rows = await this.db.await_proc('my_hub_proc', arg1, arg2);

// Operations on the platform-wide Yellow Pages database
const user = await this.yp.await_proc('drumate_exists', email);

// Resolve a hub's database name explicitly (required when targeting another hub)
const dbName = await this.yp.await_func('get_db_name', hub_id);
const result = await this.yp.await_proc(`${dbName}.my_proc`, arg1);
```

Pass objects and arrays directly — do not call `JSON.stringify` manually:

```js
// Incorrect — causes double-serialisation
await this.db.await_proc('contact_update', id, JSON.stringify({ email, mobile }));

// Correct
await this.db.await_proc('contact_update', id, { email, mobile });
```

---

## Step 5 — Returning a Response

```js
// Return data to the caller
this.output.data(result);

// Return a list
this.output.list(rows);

// Return nothing (fire-and-forget operations)
this.output.data({});
```

---

## Step 6 — Error Handling

```js
// User error — sent to the client with an error status
if (!result) {
  this.exception.user('RESOURCE_NOT_FOUND');
  return;
}

// Server error — logged internally, generic message to client
this.exception.server('INTERNAL_PROCESSING_FAILED');
```

Error codes are plain strings. By convention they are `UPPER_SNAKE_CASE`.

---

## Step 7 — Test the Endpoint

Restart the server after adding new files:

```bash
pm2 restart drumee
```

Call the endpoint:

```bash
curl -X POST https://hostname/-/svc/mymodule.my_action \
  -H "Content-Type: application/json" \
  -H "Cookie: session_id=YOUR_SESSION" \
  -d '{"hub_id": "HUB_ID", "id": "some-id", "name": "test"}'
```

---

## Complete Example — Read and Write a Hub Setting

**ACL — `acl/settings.json`:**

```json
{
  "services": {
    "get": {
      "scope": "hub",
      "permission": { "src": "read" }
    },
    "update": {
      "scope": "hub",
      "permission": { "src": "admin" },
      "log": true
    }
  },
  "modules": {
    "private": "service/private/settings"
  }
}
```

**Implementation — `service/private/settings.js`:**

```js
const { Attr } = require('@drumee/server-essentials');
const { Entity } = require('@drumee/server-core');

class Settings extends Entity {

  async get() {
    const result = await this.db.await_proc('hub_settings_get');
    this.output.data(result);
  }

  async update() {
    const key   = this.input.need(Attr.key);
    const value = this.input.need(Attr.value);

    const result = await this.db.await_proc('hub_settings_update', key, value);

    if (!result) {
      this.exception.user('SETTINGS_UPDATE_FAILED');
      return;
    }

    this.output.data(result);
  }

}

module.exports = Settings;
```

---

## Adding Documentation to the ACL

Once your service is working, document it by adding `doc`, `params`, `returns`, and `errors` fields to the ACL entry. These fields are **never read by the server** and have zero runtime effect — they power the auto-generated API reference only.

See [ACL Specification](../api-reference/acl-spec.md) for the full field reference.

---

# Part 2 — General Guide: Service Pattern in Drumee UI (Skeleton → Router)

This document explains **how “services” work** in the Drumee Skeleton system, and how to implement them clearly across different use cases

---

# 0) Core Concept — What is a Service?

A **service** is a named UI action attached to a Skeleton node.

When a user clicks a UI element:

1. Skeleton sends `service: "service-name"`
2. Framework calls `ui.onUiEvent(cmd, args)`
3. Router reads `service`
4. Router handles logic in `switch(service)`
5. Router may:
   - Call an API
   - Update internal state
   - `feed()` a new skeleton
   - Patch a specific UI part using `sys_pn`

---

# 1) Core Building Blocks

## 1.1 `service`

String identifier

## 1.2 `uiHandler: [ui]`

Required to send events back to router.

If parent container already has `uiHandler`, child nodes may inherit it.

## 1.3 `sys_pn` (System Part Name)

Used to patch a specific UI fragment instead of re-rendering everything.

## 1.4 `cmd` vs `args`

Router extracts service like this:

```js
const service = args.service || cmd.get(_a.service);
```
