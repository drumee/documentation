---
id: sharebox
title: sharebox API
sidebar_label: sharebox
---

# SHAREBOX API Reference

## Module Information

**Service Files:**
- Private: `service/private/sharebox.js`
- Public: `service/sharebox.js`

**Available Services:** 20
**Documented Services:** 0

---

## sharebox.accept_notification

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.accept_notification
```

---

## sharebox.assign_permission

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |
| **Pre-check** | `pre_assign` (validation before execution) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.assign_permission
```

---

## sharebox.copy_link

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |
| **Pre-check** | `pre_link` (validation before execution) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.copy_link
```

---

## sharebox.copy_to_sb

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |
| **Pre-check** | `pre_transact` (validation before execution) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.copy_to_sb
```

---

## sharebox.create_inbound_link

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |
| **Pre-check** | `pre_share_in` (validation before execution) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.create_inbound_link
```

---

## sharebox.create_link

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |
| **Pre-check** | `pre_link` (validation before execution) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.create_link
```

---

## sharebox.create_private_box

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.create_private_box
```

---

## sharebox.create_public_box

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.create_public_box
```

---

## sharebox.get_box_attr

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.get_box_attr
```

---

## sharebox.get_inbound_node_attr

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.get_inbound_node_attr
```

---

## sharebox.get_node_share_attr

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.get_node_share_attr
```

---

## sharebox.get_outbound_node_attr

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.get_outbound_node_attr
```

---

## sharebox.notification_count

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.notification_count
```

---

## sharebox.notification_list

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.notification_list
```

---

## sharebox.refuse_notification

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Anonymous (0) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.refuse_notification
```

---

## sharebox.remove_link

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.remove_link
```

---

## sharebox.remove_open_link

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.remove_open_link
```

---

## sharebox.revoke_permission

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |
| **Pre-check** | `pre_revoke` (validation before execution) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.revoke_permission
```

---

## sharebox.update_box

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.update_box
```

---

## sharebox.update_link

*No description provided*

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Owner (7) |

**Endpoint:**
```
https://hostname/-/svc/sharebox.update_link
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
