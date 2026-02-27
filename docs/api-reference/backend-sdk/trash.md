---
id: trash
title: trash API
sidebar_label: trash
---

# TRASH API Reference

## Module Information

**Service Files:**
- Private: `service/private/trash.js`

**Available Services:** 4
**Documented Services:** 0

---

## trash.get_config

Get current trash expiry configuration

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/trash.get_config
```

---

## trash.update_config

Update trash expiry configuration (admin only)

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Admin (6) |

**Endpoint:**
```
https://hostname/-/svc/trash.update_config
```

---

## trash.get_stats

Get trash statistics for current user

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/trash.get_stats
```

---

## trash.trigger_expiry

Manually trigger expiry run (admin only, for testing)

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Admin (6) |

**Endpoint:**
```
https://hostname/-/svc/trash.trigger_expiry
```

---

## Related Documentation

- [ACL System](docs/concepts/acl-system.md) - Permission model
- [Service Routing](docs/concepts/service-routing.md) - URL patterns
- [Error Handling](docs/guides/error-handling.md) - Error codes
