---
id: conference
title: conference API
sidebar_label: conference
---

# CONFERENCE API Reference

## Module Information

**Service Files:**
- Private: `service/conference.js`
- Public: `service/conference.js`

**Available Services:** 12
**Documented Services:** 0

---

## conference.accept

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/conference.accept
```

---

## conference.attendee

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/conference.attendee
```

---

## conference.broadcast

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/conference.broadcast
```

---

## conference.cancel

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/conference.cancel
```

---

## conference.decline

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/conference.decline
```

---

## conference.get_caller

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/conference.get_caller
```

---

## conference.invite

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |
| **Logging** | Enabled |

**Endpoint:**
```
https://hostname/-/svc/conference.invite
```

---

## conference.join

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |
| **Logging** | Enabled |

**Endpoint:**
```
https://hostname/-/svc/conference.join
```

---

## conference.leave

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/conference.leave
```

---

## conference.logCall

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/conference.logCall
```

---

## conference.revoke

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/conference.revoke
```

---

## conference.update

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/conference.update
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
