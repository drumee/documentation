---
id: transfer
title: transfer API
sidebar_label: transfer
---

# TRANSFER API Reference

## Module Information

**Service Files:**
- Private: `service/transfer.js`
- Public: `service/transfer.js`

**Available Services:** 9
**Documented Services:** 0

---

## transfer.create

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |
| **Logging** | Enabled |

**Endpoint:**
```
https://hostname/-/svc/transfer.create
```

---

## transfer.send_link

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |
| **Logging** | Enabled |

**Endpoint:**
```
https://hostname/-/svc/transfer.send_link
```

---

## transfer.create_link

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |
| **Logging** | Enabled |

**Endpoint:**
```
https://hostname/-/svc/transfer.create_link
```

---

## transfer.download

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |
| **Logging** | Enabled |

**Endpoint:**
```
https://hostname/-/svc/transfer.download
```

---

## transfer.remove

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/transfer.remove
```

---

## transfer.link_info

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/transfer.link_info
```

---

## transfer.chk_password

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/transfer.chk_password
```

---

## transfer.send_otp

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/transfer.send_otp
```

---

## transfer.delete

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/transfer.delete
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
