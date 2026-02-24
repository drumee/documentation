---
sidebar_position: 2
title: ACL System
description: Complete guide to Drumee's bitwise permission system
---

# Access Control List (ACL) System

Drumee's ACL system is a **bitwise, Linux-inspired permission model** that controls access to resources in the Meta File System (MFS). Each permission is represented as a bitmask, and access checks are performed using bitwise operations.

```mermaid
graph TD
    A[Frontend Request] --> B[Parse module.method]
    B --> C[Session Authentication]
    C --> D[Load ACL JSON]
    D --> E[Get Required Permission]
    E --> F[Check User Privilege]
    F --> G{Bitwise AND > 0?}
    G -->|Yes| H[Execute Service]
    G -->|No| I[403 Forbidden]
    H --> J[Return Result]