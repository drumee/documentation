---
id: callback
title: callback API
sidebar_label: callback
---

# CALLBACK API Reference

## Module Information

**Service Files:**
- Private: `service/callback.js`
- Public: `service/callback.js`

**Available Services:** 3
**Documented Services:** 0

---

## callback.stripe

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/callback.stripe
```

---

## callback.check_out_success

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/callback.check_out_success
```

---

## callback.check_out_cancel

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/callback.check_out_cancel
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
