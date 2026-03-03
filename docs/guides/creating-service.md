---
sidebar_position: 1
---

# General Guide: Service Pattern in Drumee UI (Skeleton → Router)

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
