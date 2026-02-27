---
id: mfs_import
title: mfs_import API
sidebar_label: mfs_import
---

# MFS_IMPORT API Reference

## Module Information

**Service Files:**
- Private: `service/private/mfs_import.js`

**Available Services:** 2
**Documented Services:** 0

---

## mfs_import.import_folder

Import entire folder recursively from another Drumee instance

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/mfs_import.import_folder
```

---

## mfs_import.import_file

Import single file from another Drumee instance

| Property | Value |
|----------|-------|
| **Scope** | Hub (requires hub context) |
| **Permission** | Write (4) |

**Endpoint:**
```
https://hostname/-/svc/mfs_import.import_file
```

---

## Related Documentation

- [ACL System](docs/concepts/acl-system.md) - Permission model
- [Service Routing](docs/concepts/service-routing.md) - URL patterns
- [Error Handling](docs/guides/error-handling.md) - Error codes
