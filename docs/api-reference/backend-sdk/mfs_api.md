---
id: mfs_api
title: mfs_api API
sidebar_label: mfs_api
---

# MFS_API API Reference

## Module Information

**Service Files:**
- Private: `service/private/mfs_api.js`

**Available Services:** 3
**Documented Services:** 0

---

## mfs_api.create_token

Create a new MFS export token for sharing data across Drumee instances

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Admin (6) |

**Endpoint:**
```
https://hostname/-/svc/mfs_api.create_token
```

---

## mfs_api.revoke

Revoke an existing MFS export token

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/mfs_api.revoke
```

---

## mfs_api.list

List all MFS export tokens created by current user

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/mfs_api.list
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
