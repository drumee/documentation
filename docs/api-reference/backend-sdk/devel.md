---
id: devel
title: devel API
sidebar_label: devel
---

# DEVEL API Reference

## Module Information

**Service Files:**
- Private: `service/private/devel.js`
- Public: `service/private/devel.js`

**Available Services:** 3
**Documented Services:** 0

---

## devel.verbosity

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | plateform |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/devel.verbosity
```

---

## devel.instances

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Domain (requires authentication) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/devel.instances
```

---

## devel.log_over_socket

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | plateform |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/devel.log_over_socket
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
