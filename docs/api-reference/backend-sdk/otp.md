---
id: otp
title: otp API
sidebar_label: otp
---

# OTP API Reference

## Module Information

**Service Files:**
- Private: `service/otp.js`
- Public: `service/private/otp.js`

**Available Services:** 3
**Documented Services:** 0

---

## otp.set_password

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/otp.set_password
```

---

## otp.verify

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/otp.verify
```

---

## otp.send

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/otp.send
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
