---
id: reminder
title: reminder API
sidebar_label: reminder
---

# REMINDER API Reference

## Module Information

**Service Files:**
- Private: `service/private/reminder.js`

**Available Services:** 5
**Documented Services:** 0

---

## reminder.create

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/reminder.create
```

---

## reminder.get

*Alias for [`read`](#reminderread)*

---

## reminder.list

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/reminder.list
```

---

## reminder.remove

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/reminder.remove
```

---

## reminder.update

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/reminder.update
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
