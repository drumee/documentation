---
id: form
title: form API
sidebar_label: form
---

# FORM API Reference

## Module Information

**Service Files:**
- Private: `service/private/form.js`
- Public: `service/form.js`

**Available Services:** 4
**Documented Services:** 0

---

## form.submit

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |
| **Logging** | Enabled |

**Endpoint:**
```
https://hostname/-/svc/form.submit
```

---

## form.browse

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/form.browse
```

---

## form.update

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/form.update
```

---

## form.info

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Admin (6) |

**Endpoint:**
```
https://hostname/-/svc/form.info
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
