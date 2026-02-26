---
id: google_drive
title: google_drive API
sidebar_label: google_drive
---

# GOOGLE_DRIVE API Reference

## Module Information

**Service Files:**
- Private: `service/private/google_drive.js`

**Available Services:** 3
**Documented Services:** 0

---

## google_drive.list_files

List files/folders from Google Drive

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Read (2) |

**Endpoint:**
```
https://hostname/-/svc/google_drive.list_files
```

---

## google_drive.import_file

Import a single file from Google Drive

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/google_drive.import_file
```

---

## google_drive.import_directory

Import entire directory recursively from Google Drive

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/google_drive.import_directory
```

---

## Related Documentation

- [ACL System](../../concepts/acl-system.md) - Permission model
- [Service Routing](../../concepts/service-routing.md) - URL patterns
- [Error Handling](../../guides/error-handling.md) - Error codes
