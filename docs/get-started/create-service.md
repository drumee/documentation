# **Create Service**

A Drumee **service** is a backend module that handles API requests, interacts with the filesystem and database, and implements business logic — all within Drumee's ACL and microservice architecture.

This guide covers building a complete service from scratch.

## **What Is a Service?**

Services are the backend equivalent of widgets. Where widgets define what the user sees, services define what the system does:

•   	Process file uploads

•   	Generate reports from workspace data

•   	Enforce custom business rules on data operations

•   	Integrate with external systems (email, CRM, APIs)

•   	Automate workflows triggered by file events

Each service registers named **handlers**. Handlers are called by frontend widgets via Api.call(), by other services, or by the Drumee event system.

## **What We're Building**

A **File Review Service** — a workflow service that:

1\. 	Marks a file as "under review"

2\. 	Notifies team members in the workspace chat

3\. 	Records the review request in the audit trail

4\. 	Returns the updated file status

## **Step 1: Create the Service File**

| mkdir \-p drumee-review-service/backend touch drumee-review-service/backend/review-service.js |
| :---- |

## **Step 2: Basic Service Structure**

| // backend/review-service.js const { Service } \= require('@drumee/sdk');   module.exports \= Service.create({   name: 'review-service',     // Optional: runs once when the service starts   async initialize() { 	console.log('\[review-service\] initialized');   },     handlers: {   	'request-review': async function(request) {   	// Handler implementation here 	},   	'get-review-status': async function(request) {   	// Handler implementation here 	},   	'complete-review': async function(request) {   	// Handler implementation here 	}     } }); |
| :---- |

 

Every handler receives a request object and has access to this — the service context containing SDK APIs.

## **Step 3: The Request Object**

| handlers: {   'request-review': async function(request) {   	// request.params — caller-supplied parameters 	const { file\_id, reviewers, note } \= request.params;   	// request.user — the authenticated calling user (from ACL layer) 	const requester\_id \= request.user.id; 	const requester\_name \= request.user.name;   	// request.meta — request metadata 	const { timestamp, ip, workspace\_id } \= request.meta;     } } |
| :---- |

 

You never set request.user yourself. It is injected by the ACL layer before your handler executes. If the user is not authenticated, the request never reaches your handler.

## **Step 4: Implement the Handlers**

| handlers: {     'request-review': async function(request) { 	const { file\_id, reviewer\_ids, note } \= request.params;   	// Validate input 	if (\!file\_id) throw { code: 'INVALID\_PARAMS', message: 'file\_id is required' }; 	if (\!reviewer\_ids?.length) throw { code: 'INVALID\_PARAMS', message: 'At least one reviewer required' };   	// Get file metadata (ACL-enforced — user must have at least Editor access) 	const file \= await this.fs.get(file\_id);   	// Store review request in the database 	const review\_id \= await this.db.insert('file\_reviews', {   	file\_id,   	requested\_by: request.user.id,   	reviewer\_ids: JSON.stringify(reviewer\_ids),   	note: note || null,   	status: 'pending',   	created\_at: new Date().toISOString() 	});   	// Tag the file with review status in metadata 	await this.fs.setMeta(file\_id, { review\_status: 'pending', review\_id });   	// Post a message to the workspace chat 	await this.chat.post(file.workspace\_id, {   	type: 'system',   	text: \`${request.user.name} requested review for \*\*${file.name}\*\*\`,   	attachments: \[{ type: 'file\_ref', file\_id }\],   	note: note || null 	});   	// Notify each reviewer 	for (const reviewer\_id of reviewer\_ids) {   	await this.notify.send(reviewer\_id, {     	type: 'review\_requested',     	title: \`Review requested: ${file.name}\`,     	body: note || \`${request.user.name} needs you to review a file\`,     	link: \`/workspace/${file.workspace\_id}?file=${file\_id}\`   	}); 	}   	return {   	review\_id,   	file\_id,   	status: 'pending',   	requested\_at: new Date().toISOString() 	};   },     'get-review-status': async function(request) { 	const { file\_id } \= request.params;   	// ACL check — user must be able to read the file 	await this.fs.get(file\_id); // Throws PERMISSION\_DENIED if not accessible   	const review \= await this.db.query(   	'SELECT \* FROM file\_reviews WHERE file\_id \= ? ORDER BY created\_at DESC LIMIT 1',   	\[file\_id\] 	);   	if (\!review.length) return { status: 'none' };   	return {   	review\_id: review\[0\].id,   	status: review\[0\].status,   	requested\_by: review\[0\].requested\_by,   	reviewer\_ids: JSON.parse(review\[0\].reviewer\_ids),   	note: review\[0\].note,   	created\_at: review\[0\].created\_at 	};   },     'complete-review': async function(request) { 	const { review\_id, outcome, comment } \= request.params;   	// Get the review record 	const \[review\] \= await this.db.query(   	'SELECT \* FROM file\_reviews WHERE id \= ?',   	\[review\_id\] 	); 	if (\!review) throw { code: 'NOT\_FOUND', message: 'Review not found' };   	const reviewer\_ids \= JSON.parse(review.reviewer\_ids);   	// Verify the calling user is an assigned reviewer 	if (\!reviewer\_ids.includes(request.user.id)) {   	throw { code: 'PERMISSION\_DENIED', message: 'You are not an assigned reviewer' }; 	}   	// Update review status 	await this.db.query(   	'UPDATE file\_reviews SET status \= ?, completed\_by \= ?, comment \= ?, completed\_at \= ? WHERE id \= ?',   	\[outcome, request.user.id, comment || null, new Date().toISOString(), review\_id\] 	);   	// Update file metadata 	await this.fs.setMeta(review.file\_id, {   	review\_status: outcome,   	review\_completed\_by: request.user.id 	});   	// Notify the requester 	const file \= await this.fs.get(review.file\_id); 	await this.notify.send(review.requested\_by, {   	type: 'review\_completed',   	title: \`Review ${outcome}: ${file.name}\`,   	body: comment || \`${request.user.name} completed the review\`,   	link: \`/workspace/${file.workspace\_id}?file=${review.file\_id}\` 	});   	// Post to chat 	await this.chat.post(file.workspace\_id, {   	type: 'system',   	text: \`${request.user.name} marked \*\*${file.name}\*\* as: ${outcome}\`,   	attachments: comment ? \[{ type: 'text', content: comment }\] : \[\] 	});   	return { review\_id, status: outcome, completed\_at: new Date().toISOString() };   }   } |
| :---- |

## **Step 5: Available Service APIs**

| API | Access via | Description |
| :---- | :---- | :---- |
| Filesystem | this.fs | Read, write, move, delete files |
| Database | this.db | Query and insert data |
| ACL | this.acl | Read and manage permissions |
| Chat | this.chat | Post messages to workspace chat |
| Notifications | this.notify | Send notifications to users |
| Events | this.events | Emit and subscribe to system events |

 

→ \[Backend SDK Reference\](../technology/sdk-reference/backend-sdk.md)

## **Step 6: Error Handling**

Throw structured errors — Drumee serializes them to the caller automatically:

| // Throw with code and message throw { code: 'NOT\_FOUND', message: 'File does not exist' }; throw { code: 'INVALID\_PARAMS', message: 'reviewer\_ids must be a non-empty array' }; throw { code: 'PERMISSION\_DENIED', message: 'You are not an assigned reviewer' };   // Re-throw SDK errors (they are already structured) try {   await this.fs.read(file\_id); } catch (err) {   if (err.code \=== 'NOT\_FOUND') { 	throw { code: 'NOT\_FOUND', message: \`File ${file\_id} does not exist\` };   }   throw err; // Re-throw unexpected errors } |
| :---- |

## **Step 7: Register and Deploy**

Add to plugin.json:

| {   "name": "review-service",   "version": "1.0.0",   "permissions": \["fs.read", "fs.write", "db.read", "db.write", "chat.write", "notify.write"\],   "services": \["review-service"\] } |
| :---- |

 

Deploy:

| cp \-r drumee-review-service/ /opt/drumee/plugins/ cd /opt/drumee npm run plugin.add review-service npm run server.restart |
| :---- |

## **Step 8: Call the Service from a Widget**

| // In a frontend widget const result \= await Api.call('review-service', 'request-review', {   file\_id: props.file\_id,   reviewer\_ids: \['user-002', 'user-003'\],   note: 'Please check the pricing section' });   if (result.status \=== 'pending') {   // Show confirmation } |
| :---- |

 

→ \[Create Widget\](create-widget.md) — for building the UI that calls this service