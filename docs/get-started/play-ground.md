# **Playground**

The Drumee Playground is a **live service endpoint tester**. It lets you call real Drumee service endpoints, fill in parameters, and inspect the full JSON response — against the live Drumee platform.

**Sandbox URL:** https://drumee.in/-/\#/sandbox

## **What the Playground Is For**

The Playground is the fastest way to understand how Drumee's request-response model works before writing your first integration. Use it to:

•   	Explore available modules and methods

•   	Test what a service returns for a given set of parameters

•   	Understand the ACL system by seeing which endpoints require authentication

•   	Inspect response shapes before building frontend widgets or backend integrations

## **How Drumee Services Work**

Every Drumee service is reachable through a single endpoint pattern:

| protocol://hostname/-/svc/module.method |
| :---- |

 

There are no hard-coded routes. Each service is identified only by its module.method name. The server reads the ACL configuration for that service, checks the caller's session privilege, and dispatches to the implementation.

## **Making GET Requests**

Use GET for read-only queries. Arguments are passed as URL-encoded key-value pairs.

**Using curl:**

| curl \-X GET "https://drumee.in/-/svc/mymodule.mymethod?myfield=myvalue" |
| :---- |

 

**Using the Drumee SDK:**

| this.fetchService("mymodule.mymethod", { myfield: myvalue })   .then((response\_data) \=\> { ... })   .catch(() \=\> {}); |
| :---- |

 

 

## **Making POST Requests**

Use POST for operations with side effects. Arguments are sent as a JSON body.

**Using curl:**

| curl \-X POST https://drumee.in/-/svc/mymodule.mymethod \\   \-H "Content-Type: application/json" \\   \-H "Authorization: Bearer YOUR\_ACCESS\_TOKEN" \\   \-d '{ "myfield": "myvalue" }' |
| :---- |

 

**Using the Drumee SDK:**

| this.postService("mymodule.mymethod", { myfield: myvalue })   .then((response\_data) \=\> { ... })   .catch(() \=\> {}); |
| :---- |

## **Request Context**

Each service call is evaluated within a session context. The server attaches the following to every request:

| Component | Role |
| :---- | :---- |
| session | Determines the privilege level granted to the incoming request |
| acl | Enforces fine-grained security checks per service |
| input | Parses and validates data sent by the caller |
| output | Formats and sends the response back as JSON |
| exception | Sends error details when the service fails or is denied |

 

A request is only dispatched to the service method if the caller's session privilege satisfies the permission.src requirement declared in the ACL file.

## **Using the Sandbox**

1\. 	Open **https://drumee.in/-/\#/sandbox**

2\. 	Select a module and method from the list

3\. 	Fill in any required parameters

4\. 	Submit the request and inspect the JSON response

The sandbox runs against the live Drumee platform. Responses reflect real system state.

•   	**Read-only services** (permission.src: "read") can be called freely

•   	**Write services** require an authenticated session with sufficient privilege

## **Understanding a Response**

A successful service response returns a JSON object with a data field:

| {   "data": { 	"filename": "My Folder", 	"category": "folder", 	"file\_count": 12, 	"total\_size": 5242880   } } |
| :---- |

 

A permission error returns a 403 before any service code executes. An input error returns a structured error object with an error code string.

## **Calling Services from Code**

Once you've explored an endpoint in the sandbox, integrate it into your widget or service using the same pattern:

| // From a widget controller async loadFolderData() {   const hub\_id \= this.getHubId();   if (\!hub\_id) return;     try { 	const data \= await this.fetchService({   	service: "mfs.node\_summary",   	hub\_id,   	nid: this.\_nodeId, 	}); 	this.\_folderData \= data; 	this.update();   } catch (e) { 	this.warn("\[my-widget\] loadFolderData failed", e);   } } |
| :---- |

 

•   	→ \[Create Service\](../product-guide/create-service.md) for building your own endpoints

•   	→ \[ACL System\](../technology/acl-system.md) for understanding permission levels

