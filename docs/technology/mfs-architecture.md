# **Meta File System (MFS)**

MFS — Meta File System — is Drumee's internal file management layer. Unlike standard web applications that expose the host file system directly to application logic, MFS adds a full abstraction layer that makes file handling safer, more flexible, and permission-aware at every level.

## **Why MFS Exists**

Standard applications that work directly with the host file system face structural problems:

•   	The entire host file system is potentially reachable if the application has a vulnerability

•   	There is no built-in concept of ownership or per-user isolation

•   	Moving, copying, or trashing files requires writing custom logic in every service

•   	No unified way to attach metadata (MIME type, category, visibility) to files

MFS solves all of these by storing the **logical representation** of files and folders in a database and keeping physical files in an isolated, content-addressed storage directory. The application never constructs raw filesystem paths from user input. 

## **Core Concept: Everything Is a Node**

Everything in MFS is a **node**. A node can be:

| Category | Description |
| :---- | :---- |
| folder | A directory that contains other nodes |
| file | An uploaded file (document, image, video, etc.) |
| hub | A special root folder that belongs to a Workspace (private, restricted, shared workspace) |

 

Each node has a unique id (UUID), an owner\_id, a parent\_id pointing to its container, and metadata fields including filename, mimetype, category, filesize, and extension.

## **Physical Storage**

Physical files live under a content-addressed path:

| {mfs\_dir}/{VFS\_ROOT\_NODE}/{node\_id}/ |
| :---- |

 

The application never exposes this path to the client. Downloads and uploads go through MFS service endpoints that perform permission checks before any I/O. The path cannot be guessed or traversed — it is derived from a UUID, not from a user-supplied filename.

 

## **The \`media\` Table**

The central database table is media. Every node — in every Hub (Workspace) and every personal drive — is a row in a media table. Each Hub and each user has its own database, so the media table is scoped per owner.

Key columns:

| Column | Description |
| :---- | :---- |
| id | UUID — primary key and physical storage address |
| parent\_id | UUID of the parent folder node |
| owner\_id | UUID of the owning user |
| filename | Internal filename |
| user\_filename | Display name shown to users |
| mimetype | MIME type of the file |
| category | Logical type: folder, file, hub, etc. |
| filesize | Size in bytes |
| extension | File extension without the dot |
| metadata | JSON blob for arbitrary additional data |
| show | Visibility flag |
| ctime | Creation Unix timestamp |
| mtime | Last modification Unix timestamp |

## **Permission Model**

Every MFS node carries a permission level using Drumee's numeric bitwise system:

| Level | Value | Who |
| :---- | :---- | :---- |
| anonymous | 1 | Public, no authentication |
| read | 2 | Any authenticated user with read access |
| write | 4 | Users with write access |
| admin | 8 | Hub administrators |
| owner | 16 | The node owner |

 

The permission\_grant stored procedure assigns a privilege level to a specific entity (user, group, or wildcard \*) on a node for a defined duration. The permission\_revoke procedure removes it.

## **Key Stored Procedures**

MFS operations are performed **exclusively through stored procedures**. Services never run raw SQL against the media table directly. This approach eliminates risk of SQL injection and keeps application code lean, clear and easy to maintain

| Procedure | Purpose |
| :---- | :---- |
| mfs\_create\_node | Create a new file or folder node |
| mfs\_move | Move a node to a different parent |
| mfs\_copy | Copy a node and its children |
| mfs\_trash\_media | Soft-delete: move node to trash |
| mfs\_restore | Restore a node from trash |
| mfs\_purge | Hard-delete a node record |
| mfs\_empty\_trash | Permanently delete all expired trash nodes |
| mfs\_manifest | Get the full recursive file list under a node |
| mfs\_access\_node | Check whether a user can access a given node |
| mfs\_get\_by | Fetch a node record by various criteria |

## **Trash System**

Deleted nodes are not immediately removed. They are moved to a trash\_media table with a trashed\_time timestamp. This allows users to restore files within a configurable expiry window. Once the expiry period passes, the expiry worker permanently deletes the physical files and purges the database record.

## **Service Layer Integration**

MFS services receive a resolved node via this.granted\_node() or this.source\_granted(). These methods perform the ACL check and return the node object only if the current user has sufficient privilege. A service never needs to check permissions manually.

| async move() {   const node \= this.granted\_node();  	// permission already checked   const pid  \= this.input.need('pid');   // required: destination folder id   await this.db.await\_proc('mfs\_move', node.id, pid);   this.output.data({ nid: node.id }); } |
| :---- |

## **Security Properties**

**No path exposure.** The physical path {mfs\_dir}/{VFS\_ROOT\_NODE}/{node\_id}/ is UUID-based. It is never returned to the client and cannot be guessed.

**Directory traversal prevention.** User input never enters a filesystem path construction. All access goes through mfs\_access\_node before any I/O.

**Permission leaks prevented.** A user cannot access a node outside their permission scope — granted\_node() rejects the request before any data operation.

**Stored procedure boundary.** All SQL is inside stored procedures. Service files contain no raw queries against MFS tables, which eliminates SQL injection paths targeting file metadata.

## **SEO Integration**

When a file is created or modified, Drumee can register it in the seo\_index and seo\_register tables. This enables the platform's internal search engine to index documents without exposing file paths. The SEO indexing pipeline runs asynchronously and does not block file operations.

 

