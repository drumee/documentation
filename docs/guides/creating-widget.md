---
sidebar_position: 1
---

# Creating Widget — Skeleton Structure & Data Flow

This guide shows how to create a widget/module following the pattern, based on the folder structure.

It focuses on:

- **Folder layout**
- **How skeletons are composed**
- **Where data lives**
- **How services/events flow**
- **How to patch UI using `sys_pn`**

---

### Structure Explanation

- `widget/index.js`  
  → Contains state management, API calls, service handling, and UI patch logic.

- `widget/skeleton/*`  
  → Contains UI rendering logic only (stateless whenever possible).

- `widget/skin/*`  
  → Styling and theme configuration.

---

## General Widget Architecture

This diagram represents a **general widget architecture**

```mermaid
graph TD

  A[Widget Initialized] --> B[Widget Setup State]
  B --> C[Feed Root Skeleton]

  C --> D[Render Layout Components]
  D --> E[Header / Hero / Navbar]
  D --> F[Content Area]
  D --> G[Global Wrappers (Toast / Overlay) (Optional)]
```
