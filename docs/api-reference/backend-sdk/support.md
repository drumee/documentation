---
id: support
title: support API
sidebar_label: support
---

# SUPPORT API Reference

## Module Information

**Service Files:**
- Private: `service/private/support.js`
- Public: `service/support.js`

**Available Services:** 3
**Documented Services:** 0

---

## support.bug_report

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/support.bug_report
```

---

## support.leave_comment

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/support.leave_comment
```

---

## support.list_feedback

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | delete |
| **Pre-check** | `special_access` (validation before execution) |

**Endpoint:**
```
https://hostname/-/svc/support.list_feedback
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
