# Create Widget

This guide walks through building a complete custom widget from scratch — from a blank file to a fully integrated, permission-aware UI component running inside Drumee.

## Before You Start

Make sure you have:

- A running Drumee instance (Starter Kit is fine for development)

- Node.js v22+ installed locally

- Basic JavaScript familiarity

- → [Starter Kit Setup](../getting-started/starter-kit.md)

## What We're Building

A **Workspace Stats Widget** — a panel that shows:

- Number of files in a workspace

- Total storage used

- Most recent file activity

- A "Last updated" timestamp

It will be usable like this in any LETC JSON response:

> { "kind": "workspace-stats", "workspace_id": "ws-123" }

## Step 1: Set Up Your Plugin Directory

```bash
mkdir drumee-stats-widget
cd drumee-stats-widget
npm init -y
npm install @drumee/sdk @drumee/sdk-ui
```


Create the structure:

```text
drumee-stats-widget/ ├── plugin.json ├── backend/ │
└── stats-service.js └── frontend/ 	└── stats-widget.js
```

## Step 2: Write the Backend Service

The backend fetches workspace data and returns it in a structured format the widget can render.

```bash
// backend/stats-service.js const { Service } = require('@drumee/sdk');
module.exports = Service.create({
name: 'stats-service',
handlers: {
'get-workspace-stats': async function(request) {
const { workspace_id } = request.params;
// this.fs is ACL-aware — will throw PERMISSION_DENIED if user lacks access
const files = await this.fs.list(workspace_id);
const total_size = files.reduce((sum, f) => sum + f.size, 0);
const latest = files.sort((a, b) =>
new Date(b.modified) - new Date(a.modified)
)[0];
return {
file_count: files.length,
total_size_bytes: total_size,
total_size_display: formatBytes(total_size),
last_modified: latest ? latest.modified : null,
last_modified_file: latest ? latest.name : null
}; 	}
} });
function formatBytes(bytes) {
if (bytes < 1024) return \`${bytes} B\`;
if (bytes < 1048576) return \`${(bytes / 1024).toFixed(1)} KB\`;
return \`${(bytes / 1048576).toFixed(1)} MB\`; }
```


**What's happening here:**

- Service.create() registers named handlers with the Drumee microservice router

- this.fs.list() automatically enforces the calling user's ACL — no manual permission check needed

- The returned object is serialized to JSON and delivered to the frontend

## Step 3: Write the Frontend Widget

The widget receives the data from the backend and renders it using Drumee's base components.

```bash
// frontend/stats-widget.js const { Widget, Api } = require('@drumee/sdk-ui');
Widget.register('workspace-stats', function(props) {
const { workspace_id } = props;
// State management
let stats = null;
let loading = true;
let error = null;
function render() {
// Loading state 	if (loading) {
return Widget.render('panel', {
class: 'drumee-stats__panel',
children: [
Widget.render('text', { content: 'Loading...', variant: 'muted' })
]
}); 	}
// Error state 	if (error) {
return Widget.render('panel', {
class: 'drumee-stats__panel drumee-stats__panel--error',
children: [
Widget.render('text', { content: \`Error: ${error}\`, variant: 'error' })
]
}); 	}
// Data state 	return Widget.render('panel', {
class: 'drumee-stats__panel',
children: [
Widget.render('stat', {
label: 'Files',
value: stats.file_count
}),
Widget.render('stat', {
label: 'Storage Used',
value: stats.total_size_display
}),
stats.last_modified_file
? Widget.render('text', {
content: \`Last updated: ${stats.last_modified_file}\`,
variant: 'muted'
})
: null
].filter(Boolean) 	});
}
async function mount() { 	try {
stats = await Api.call('stats-service', 'get-workspace-stats', { workspace_id });
loading = false; 	} catch (err) {
error = err.message;
loading = false; 	} 	this.update(); // Triggers re-render
}
return { render, mount }; });
```


**What's happening here:**

- Widget.register() maps the kind string to this component function

- Api.call() sends an authenticated request to the backend service

- this.update() tells the LETC engine to re-render this widget with the new state

- The widget handles loading, error, and data states explicitly

## Step 4: Add the Plugin Manifest

```bash
// plugin.json {
"name": "stats-widget",
"version": "1.0.0",
"description": "Workspace statistics widget",
"author": "Your Name",
"drumee_min_version": "2.0.0",
"permissions": ["fs.read"],
"widgets": ["workspace-stats"],
"services": ["stats-service"] }
```

## Step 5: Add CSS (Optional)

> /* frontend/stats-widget.css */ .drumee-stats__panel { background: var(--drumee-surface); border: 1px solid var(--drumee-border); border-radius: var(--drumee-radius-md); padding: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; } .drumee-stats__panel--error { border-color: #e53e3e; background: #fff5f5; }

## Step 6: Test in the Playground

Before installing the plugin, test the widget in the Playground:

1\. 	Open http://localhost:8080/playground

2\. 	Paste the widget code into the **Custom Widget Code** panel

3\. 	Run this JSON in the **Widget Preview** panel:

> { "kind": "workspace-stats", "workspace_id": "demo" }


The widget renders immediately. Test the loading state, error handling, and data display.

## Step 7: Install the Plugin

```bash
# Copy to your Drumee plugins directory cp -r drumee-stats-widget/ /opt/drumee/plugins/
# Install and restart cd /opt/drumee npm run plugin.add stats-widget npm run server.restart
```


The widget is now available system-wide. Any LETC JSON response can include "kind": "workspace-stats".


## Step 8: Use the Widget in a Page

A server-side service can now compose this widget into any page layout:

> // In any backend handler: return { kind: 'page', children: [ 	{ kind: 'workspace-stats', workspace_id: request.params.workspace_id 	}, 	{ kind: 'file-list', source: \`/api/files?workspace=${request.params.workspace_id}\` 	} ] };

## Common Mistakes

**Widget renders once and never updates:**

You forgot to call this.update() after changing state. The LETC engine only re-renders when explicitly told to.

**API call returns PERMISSION_DENIED:**

You are testing as a Viewer trying to call a handler that uses fs.write. Check your user context in the Playground's User Simulation panel.

**Widget doesn't appear after plugin install:**

Check npm run plugin.list — if the plugin shows as inactive, check npm run server.logs for initialization errors.

- → [Frontend SDK Reference](../api-reference/frontend-sdk/index.md)

- → [Backend SDK Reference](../api-reference/backend-sdk/index.md)

