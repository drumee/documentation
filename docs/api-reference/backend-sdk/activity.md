---
id: activity
title: activity API
sidebar_label: activity
---

# ACTIVITY API Reference

## Module Information

**Service Files:**
- Private: `service/private/activity.js`

**Available Services:** 7
**Documented Services:** 0

---

## activity.get_unread_count

Get count of unread MFS notifications for current user

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/activity.get_unread_count
```

---

## activity.mark_all_read

Mark all MFS notifications as read for current user

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/activity.mark_all_read
```

---

## activity.get_feed

Get paginated activity feed with read/unread status

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/activity.get_feed
```

---

## activity.get_last_read

Get last read changelog ID for current user

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/activity.get_last_read
```

---

## activity.acknowledge_file

Mark a specific file/folder as seen

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/activity.acknowledge_file
```

---

## activity.log

Get unified activity log (contacts + MFS) with priority sorting

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/activity.log
```

---

## activity.folder_log

Get activity log for a specific folder

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/activity.folder_log
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
