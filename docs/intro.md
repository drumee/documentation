---
sidebar_position: 1
---
# What is Drumee

Drumee is a Meta Operating System designed to support big web application project. It has been purposely built to solve soverenity and privacy cconcerns 

## Why chose Drumee

  - Fully standalone, sovereign and scalable infrastructure
  - Ready to deploy thanks to a containerized bundle, deployable in minutes
  - Collaborative and user-friendly UI/UX, extensible thanks to frontend SDK to support tailored plugins 
  - Granular ACL-enabled API, extensible thanks to backend SDK to support tailored plugins that can fit any specific requirements

## Main features

### Identity & Access Control (Built-In)
  - Automatic user-ID tagging for all requests
  - Role-based permissions enforced at micro service level
  - Etensible and flexibe rules
  
### Secure Filesystem (Linux-Inspired)
  - Isolated volumes with POSIX-style permissions
  - Atomic API for uploads/downloads/move/delete/copy/update (no more multer hacks)
  - Prevents: Directory traversal, permission leaks
  
### LETC Engine (JSON-based UI)
  - Zero HTML processing on the server-side
  - Define UIs as JSON trees (no HTML/CSS fragmentation)
  - Extend with custom widgets (e.g., "kind": "data-grid")
  - Full client-server architecture with permission-based, extensible RPC

## Drumee Meta OS vs Standard Operating System

  |                               | Drumee | Operating System |
  |-------------------------------|--------|------------------|
  | Full control over hardware    | no     | yes              |
  | Identity management (ACL)     | yes    | yes              |
  | File system management (MFS)  | yes    | yes              |
  | Input/output system           | yes    | yes              |
  | Rendering engine              | yes    | optional         |


### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 20.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
