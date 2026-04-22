---
id: overview
title: Technology Overview
slug: /technology/overview
---

# Technology Overview

Drumee is built as an **OS-like full-stack framework** — not a web app that happens to run on a server, but a unified system that provides every layer of a web application in a single, coherent architecture.

This page explains how the system is structured and how the components relate to each other.

## The Core Problem Drumee's Architecture Solves

Modern web application teams repeatedly rebuild the same foundation:

* Authentication and user identity  
* File storage and access control  
* Backend API framework  
* Frontend rendering layer  
* Database and permission system  
* Deployment and infrastructure configuration

Every project starts from zero. Every rebuild introduces inconsistency and new attack surfaces.

**Drumee is the unified system that replaces that fragmentation.**

## System Architecture at a Glance

```text
REQUEST
│
▼ ┌──────────────────────────────────────────┐ │
ACL SYSTEM
│ │  User identity tagged · Role validated
│ │  Permission checked before data touched  │ └──────────────────┬───────────────────────┘
│ Authorized
▼ ┌──────────────────────────────────────────┐ │
MFS (META  FILE SYSTEM)
│ │  Isolated volumes · Atomic operations	│ │  POSIX-style · Full audit logging
│ └──────────────────┬───────────────────────┘
│ Data returned
▼ ┌──────────────────────────────────────────┐ │
LETC ENGINE
│ │  Data → JSON UI tree → Widget render 	│ │  No HTML on server · No CSS conflicts	│ └──────────────────┬───────────────────────┘
│ JSON response
▼
CLIENT (Browser)
Renders widget tree
```


Every request passes through all three layers in sequence. There is no shortcut that bypasses the ACL system.

## The Four Core Components

### 1\. ACL System

The identity and access control layer. Every request is tagged with a user identity. Permissions are enforced at the microservice level — before any data operation occurs.

→ [ACL System](02-acl-system.md)

### 2\. MFS — Media File System

The storage layer. A Linux-inspired filesystem with isolated volumes, POSIX-style permission scoping, and atomic file operations. The security properties of the system are architectural, not configurational.

→ [MFS Architecture](03-mfs-architecture.md)

### 3\. LETC Engine

The rendering layer. UI is defined as JSON trees, not server-generated HTML. This decouples interface definition from data delivery and enables a clean, conflict-free widget system.

→ [LETC Engine](04-letc-engine.md)

### 4\. Unified SDK

The developer layer. A single SDK that covers frontend widget development, backend service creation, filesystem API access, and database integration. One language, one paradigm, full system access.

→ [SDK Reference](../api-reference/backend-sdk/index.md)

## Key Architectural Properties

### Permissions Are Structural, Not Configurational

In most systems, permissions are checked in application code — and can be bypassed by application-level bugs. In Drumee, permissions are enforced at the microservice level. The application layer never receives unauthorized data to accidentally expose.

### Everything Is a Plugin

The core system is minimal and stable. All capabilities beyond the base filesystem (document editing, chat, workflow tools) are plugins that inherit the core's security model automatically. A new plugin cannot introduce a permission vulnerability.

### Unified Data Model

Every object in Drumee — file, folder, workspace, user, role — is part of the same data model. There is no separate "files database" and "users database" with custom sync logic. The system is coherent by design.

### Open Source

Drumee's core is open-source (AGPL). You can inspect every security decision, every permission check, and every data flow. Sovereignty requires auditability.

## Technology Stack

| Layer | Technology |
| :---- | :---- |
| Runtime | Node.js (v22+) |
| Containerization | Docker (v28+) |
| Filesystem | Linux, POSIX-style MFS |
| UI Rendering | LETC Engine (JSON-based) |
| SDK Language | Pure JavaScript (no transpilation) |
| License | AGPL (open source) |
| Deployment | Self-hosted (Debian), Docker or SaaS |

