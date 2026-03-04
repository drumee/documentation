---
sidebar_position: 1
---

# Creating a Service

This guide explains how **services** work in Drumee on the frontend — how to define them, call them, and handle them inside a widget.

> **Who is this for?** Anyone new to Drumee who wants to add new interactions or data-fetching to a widget.

---

## What is a Service?

In Drumee, a **service** is a named action — it can mean two things depending on context:

| Type | What it does |
|---|---|
| **UI service** | Describes a user interaction (button click, page switch, form submit) |
| **API service** | Calls the backend to fetch or write data |

Both types are handled in the same place: `onUiEvent`.

---

## How a Service Flows

```
User clicks a button in a skeleton
  └── skeleton element has: service: "do-something", uiHandler: [ui]
        └── onUiEvent(cmd, args) is called on the widget
              └── switch (service) { case "do-something": ... }
                    └── optionally calls fetchService / postService
                          └── data comes back → update state → re-render
```

Everything starts from the skeleton, flows into `onUiEvent`, and ends with a UI update.

---

## Part 1 — Triggering a Service from a Skeleton

To make any element trigger a service when clicked, add two props:

```js
Skeletons.Button.Svg({
  className: `${fig}__my-button`,
  service: "do-something",   // ← the service name
  uiHandler: [ui],           // ← tells Drumee which widget handles it
})
```

> **Convention:** Service names use `kebab-case` (e.g. `"load-page"`).

---

## Part 2 — Handling Services in `onUiEvent`

All services arrive at `onUiEvent`. Read the service name from `args` or `cmd`, then use a `switch` to handle each case:

```js
async onUiEvent(cmd, args = {}) {
  const service = args.service || cmd.get(_a.service);

  switch (service) {

    case "do-something":
      // handle it here
      break;

    case "close-overlay":
      this.goodbye();
      break;

  }
}
```

---

## Part 4 — Calling the API

### fetchService — read data (GET)

```js
async getMyData() {
  const hub_id = this.getHubId(); // always get required IDs first
  const uid = Visitor.id;
  if (!hub_id) return;            // guard: don't call if not ready

  try {
    const data = await this.fetchService({
      service: SERVICE.my_module.get_data,  // ← registered service key
      hub_id,
      uid,
    });
    return data;
  } catch (e) {
    this.warn("[my-widget] getMyData failed", e);
    throw e;
  }
}
```

### postService — write data (POST)

```js
async saveMyData(payload) {
  const hub_id = this.getHubId();
  const uid = Visitor.id;
  if (!hub_id) return;

  try {
    const data = await this.postService(SERVICE.my_module.save_data, {
      hub_id,
      uid,
      ...payload,
    });
    return data;
  } catch (e) {
    this.warn("[my-widget] saveMyData failed", e);
    throw e;
  }
}
```

> **Rule:** Use `fetchService` for reads, `postService` for writes/mutations. Always guard with required IDs before calling.

---

## Part 5 — Registering Service Constants

Service keys live in a shared constants file. Add your module's keys before using them:

```js
SERVICE.my_module = {
  get_data:    "my_module.get_data",
  save_data:   "my_module.save_data",
  delete_item: "my_module.delete_item",
};
```

> **Convention:** Module and action names use `snake_case`. The string value mirrors the key path: `"module.action"`.

---

## Service Decision Map

```
User action needed?
  ├── Just UI change (no API)   → handle directly in switch case
  │
  ├── Read from server           → fetchService → cache → re-render
  │
  └── Write to server            → postService → optimistic UI → refresh
```

---

## Quick Reference

| Task | How |
|---|---|
| Trigger a service from skeleton | `service: "name"` + `uiHandler: [ui]` |
| Read service name in handler | `args.service \|\| cmd.get(_a.service)` |
| Read a param from skeleton | `args.my_param \|\| cmd.mget("my_param")` |
| Fetch data (read) | `this.fetchService({ service: SERVICE.x.y, ...params })` |
| Post data (write) | `this.postService(SERVICE.x.y, { ...params })` |
| Broadcast data loaded | `this.triggerHandlers({ service: "data-loaded", data })` |
| Show a toast message | `this.ensurePart("ack-clipboard").then(...)` |
| Patch one UI part | `this.ensurePart("pn").then(p => p.feed(...))` |
| Switch full skeleton | `this.feed(require("./skeleton/other").default(this))` |
| Close widget | `this.goodbye()` |

---

## Checklist

- [ ] Skeleton element has `service: "name"` and `uiHandler: [ui]`
- [ ] `onUiEvent` reads service via `args.service || cmd.get(_a.service)`
- [ ] Each case in the switch handles exactly one action
- [ ] API methods guard with required IDs before calling (`if (!hub_id) return`)
- [ ] All API calls are wrapped in `try/catch`
- [ ] Loaded data is cached in `this._*` to avoid re-fetching
- [ ] Optimistic UI (loading state) is set before the API call completes
- [ ] UI is patched with `ensurePart` for small updates, `this.feed` for full re-renders
- [ ] Service constants are registered in `SERVICE.my_module = { ... }`
