---
id: dropbox
title: dropbox API
sidebar_label: dropbox
---

# DROPBOX API Reference

## Module Information

**Service Files:**
- Private: `service/private/dropbox.js`

**Available Services:** 3
**Documented Services:** 0

---

## dropbox.list_files

List files/folders from Dropbox

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/dropbox.list_files
```

---

## dropbox.import_file

Import a single file from Dropbox

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/dropbox.import_file
```

---

## dropbox.import_directory

Import entire directory recursively from Dropbox

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/dropbox.import_directory
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
