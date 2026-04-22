# Create Service

A Drumee **service** is a backend module that handles API requests, interacts with the filesystem and database, and implements business logic — all within Drumee's ACL and microservice architecture.

This guide covers building a complete service from scratch.

## What Is a Service?

Services are the backend equivalent of widgets. Where widgets define what the user sees, services define what the system does:

- Process file uploads

- Generate reports from workspace data

- Enforce custom business rules on data operations

- Integrate with external systems (email, CRM, APIs)

- Automate workflows triggered by file events

Each service registers named **handlers**. Handlers are called by frontend widgets via Api.call(), by other services, or by the Drumee event system.

## What We're Building

A **File Review Service** — a workflow service that:

1\. 	Marks a file as "under review"

2\. 	Notifies team members in the workspace chat

3\. 	Records the review request in the audit trail

4\. 	Returns the updated file status

## Step 1: Create the Service File

```bash
mkdir -p drumee-review-service/backend touch drumee-review-service/backend/review-service.js
```

## Step 2: Basic Service Structure

```bash
// backend/review-service.js const { Service } = require('@drumee/sdk');
module.exports = Service.create({
name: 'review-service',
// Optional: runs once when the service starts
async initialize() { 	console.log('[review-service] initialized');
},
handlers: {
'request-review': async function(request) {
// Handler implementation here 	},
'get-review-status': async function(request) {
// Handler implementation here 	},
'complete-review': async function(request) {
// Handler implementation here 	}
} });
```


Every handler receives a request object and has access to this — the service context containing SDK APIs.

## Step 3: The Request Object

```bash
handlers: {
'request-review': async function(request) {
// request.params — caller-supplied parameters 	const { file_id, reviewers, note } = request.params;
// request.user — the authenticated calling user (from ACL layer) 	const requester_id = request.user.id; 	const requester_name = request.user.name;
// request.meta — request metadata 	const { timestamp, ip, workspace_id } = request.meta;
} }
```


You never set request.user yourself. It is injected by the ACL layer before your handler executes. If the user is not authenticated, the request never reaches your handler.

## Step 4: Implement the Handlers

```bash
handlers: {
'request-review': async function(request) { 	const { file_id, reviewer_ids, note } = request.params;
// Validate input 	if (!file_id) throw { code: 'INVALID_PARAMS', message: 'file_id is required' }; 	if (!reviewer_ids?.length) throw { code: 'INVALID_PARAMS', message: 'At least one reviewer required' };
// Get file metadata (ACL-enforced — user must have at least Editor access) 	const file = await this.fs.get(file_id);
// Store review request in the database 	const review_id = await this.db.insert('file_reviews', {
file_id,
requested_by: request.user.id,
reviewer_ids: JSON.stringify(reviewer_ids),
note: note || null,
status: 'pending',
created_at: new Date().toISOString() 	});
// Tag the file with review status in metadata 	await this.fs.setMeta(file_id, { review_status: 'pending', review_id });
// Post a message to the workspace chat 	await this.chat.post(file.workspace_id, {
type: 'system',
text: \`${request.user.name} requested review for **${file.name}**\`,
attachments: [{ type: 'file_ref', file_id }],
note: note || null 	});
// Notify each reviewer 	for (const reviewer_id of reviewer_ids) {
await this.notify.send(reviewer_id, {
type: 'review_requested',
title: \`Review requested: ${file.name}\`,
body: note || \`${request.user.name} needs you to review a file\`,
link: \`/workspace/${file.workspace_id}?file=${file_id}\`
}); 	}
return {
review_id,
file_id,
status: 'pending',
requested_at: new Date().toISOString() 	};
},
'get-review-status': async function(request) { 	const { file_id } = request.params;
// ACL check — user must be able to read the file 	await this.fs.get(file_id); // Throws PERMISSION_DENIED if not accessible
const review = await this.db.query(
'SELECT * FROM file_reviews WHERE file_id = ? ORDER BY created_at DESC LIMIT 1',
[file_id] 	);
if (!review.length) return { status: 'none' };
return {
review_id: review[0].id,
status: review[0].status,
requested_by: review[0].requested_by,
reviewer_ids: JSON.parse(review[0].reviewer_ids),
note: review[0].note,
created_at: review[0].created_at 	};
},
'complete-review': async function(request) { 	const { review_id, outcome, comment } = request.params;
// Get the review record 	const [review] = await this.db.query(
'SELECT * FROM file_reviews WHERE id = ?',
[review_id] 	); 	if (!review) throw { code: 'NOT_FOUND', message: 'Review not found' };
const reviewer_ids = JSON.parse(review.reviewer_ids);
// Verify the calling user is an assigned reviewer 	if (!reviewer_ids.includes(request.user.id)) {
throw { code: 'PERMISSION_DENIED', message: 'You are not an assigned reviewer' }; 	}
// Update review status 	await this.db.query(
'UPDATE file_reviews SET status = ?, completed_by = ?, comment = ?, completed_at = ? WHERE id = ?',
[outcome, request.user.id, comment || null, new Date().toISOString(), review_id] 	);
// Update file metadata 	await this.fs.setMeta(review.file_id, {
review_status: outcome,
review_completed_by: request.user.id 	});
// Notify the requester 	const file = await this.fs.get(review.file_id); 	await this.notify.send(review.requested_by, {
type: 'review_completed',
title: \`Review ${outcome}: ${file.name}\`,
body: comment || \`${request.user.name} completed the review\`,
link: \`/workspace/${file.workspace_id}?file=${review.file_id}\` 	});
// Post to chat 	await this.chat.post(file.workspace_id, {
type: 'system',
text: \`${request.user.name} marked **${file.name}** as: ${outcome}\`,
attachments: comment ? [{ type: 'text', content: comment }] : [] 	});
return { review_id, status: outcome, completed_at: new Date().toISOString() };
}
}
```

## Step 5: Available Service APIs

| API | Access via | Description |
| :---- | :---- | :---- |
| Filesystem | this.fs | Read, write, move, delete files |
| Database | this.db | Query and insert data |
| ACL | this.acl | Read and manage permissions |
| Chat | this.chat | Post messages to workspace chat |
| Notifications | this.notify | Send notifications to users |
| Events | this.events | Emit and subscribe to system events |


→ [Backend SDK Reference](../api-reference/backend-sdk/index.md)

## Step 6: Error Handling

Throw structured errors — Drumee serializes them to the caller automatically:

> // Throw with code and message throw { code: 'NOT_FOUND', message: 'File does not exist' }; throw { code: 'INVALID_PARAMS', message: 'reviewer_ids must be a non-empty array' }; throw { code: 'PERMISSION_DENIED', message: 'You are not an assigned reviewer' }; // Re-throw SDK errors (they are already structured) try { await this.fs.read(file_id); } catch (err) { if (err.code === 'NOT_FOUND') { 	throw { code: 'NOT_FOUND', message: \`File ${file_id} does not exist\` }; } throw err; // Re-throw unexpected errors }

## Step 7: Register and Deploy

Add to plugin.json:

> { "name": "review-service", "version": "1.0.0", "permissions": ["fs.read", "fs.write", "db.read", "db.write", "chat.write", "notify.write"], "services": ["review-service"] }


Deploy:

```bash
cp -r drumee-review-service/ /opt/drumee/plugins/
cd /opt/drumee
npm run plugin.add review-service
npm run server.restart
```

## Step 8: Call the Service from a Widget

```bash
// In a frontend widget const result = await Api.call('review-service', 'request-review', {
file_id: props.file_id,
reviewer_ids: ['user-002', 'user-003'],
note: 'Please check the pricing section' });
if (result.status === 'pending') {
// Show confirmation }
```


→ [Create Widget](create-widget.md) — for building the UI that calls this service