# **Plugins**

Drumee is designed to be extended through plugins. A plugin is an independent Node.js package that adds new backend services and/or new UI components to a Drumee instance **without modifying the core \`server-team\` codebase (\`server-team\` or \`ui-team\`)**.

| "Add tailored plugins to meet your own requirements. No need to develop boilerplates like identity management — extend while reusing the same infrastructure." |
| :---- |

 

Plugins follow the same ACL \+ service architecture as built-in modules. Once registered on an endpoint, a plugin's services are callable through the standard service routing convention, scoped to that endpoint.

## **Plugin vs Core Service**

|   | Core service | Plugin |
| :---- | :---- | :---- |
| **Location** | server-team/service/ | /srv/drumee/runtime/plugins/server/\<user\>/\<plugin\>/ |
| **Service URL** | /-/svc/module.method | /-/\<endpoint\>/svc/module.method |
| **Deployment** | Part of the main server | Registered independently per endpoint |
| **Hot-reload** | Server restart required | Acl.loadPlugins(true) on signal |

## **Plugin Structure**

A plugin is a Node.js package with the same structure as any Drumee service module:

| my-plugin/   acl/ 	mymodule.json   	← ACL configuration for the plugin's services   service/ 	private/   	mymodule.js   	← Service implementation   index.js          	← Plugin entry point   package.json |
| :---- |

 

The package.json must include these scripts:

| {   "scripts": { 	"register-plugin": "drumee-server-plugin add", 	"remove-plugin":   "drumee-server-plugin remove", 	"dev":         	"drumee-server-devel", 	"deploy":      	"drumee-server-deploy"   } } |
| :---- |

 

## **Development Workflow**

### **1\. Configure the Sync Target**

Create .dev-tools.rc/devel.sh in your plugin directory. **Do not commit this file** — add .dev-tools.rc/ to your .gitignore.

| user=\<your-username\> export DEST\_HOST=drumee.in export DEST\_USER=$user export DEST\_DIR=/srv/drumee/runtime/plugins/server/$user/\<plugin-name\> export ENDPOINT=$user |
| :---- |

 

### **2\. Sync to the Server**

| npm run dev |
| :---- |

 

This syncs local files to DEST\_DIR on the target server.

### **3\. Register the Plugin**

SSH into the server and register:

| ssh drumee.in cd /srv/drumee/runtime/plugins/server/\<user\>/\<plugin-name\> sudo npm run register-plugin \-- \--endpoint=\<user\> |
| :---- |

 

### **4\. Start the Endpoint Services**

| sudo drumee start \<user\> sudo drumee start \<user\>/service |
| :---- |

 

### **5\. Verify in the Frontend**

Reload the browser, open the developer console, and check:

| SERVICE.\<module-name\> // Should display the registered service methods as functions |
| :---- |

 

If the module appears, the plugin is correctly registered and running.

 

## **Plugin Service URL**

Plugin services are scoped to their endpoint:

| \# Core service https://hostname/-/svc/module.method   \# Plugin service https://hostname/-/\<endpoint\>/svc/module.method |
| :---- |

## **Writing a Plugin Service**

A plugin service follows exactly the same pattern as a core service — Entity class, this.input, this.db.await\_proc, this.output.data:

| // service/private/mymodule.js const { Attr } \= require("@drumee/server-essentials"); const { Entity } \= require("@drumee/server-core");   class MyModule extends Entity {   async my\_action() { 	const id \= this.input.need(Attr.id); 	const result \= await this.db.await\_proc("my\_proc", id); 	this.output.data(result);   } }   module.exports \= MyModule; |
| :---- |

 

And a plugin ACL file follows the same schema as any core module:

| {   "services": { 	"my\_action": {   	"scope": "hub",   	"permission": { "src": "write" } 	}   },   "modules": { 	"private": "service/private/mymodule"   } } |
| :---- |

## **Managing Plugins**

### **Remove a plugin**

| cd /srv/drumee/runtime/plugins/server/\<user\>/\<plugin-name\> sudo npm run remove-plugin \-- \--endpoint=\<user\> |
| :---- |

 

### **View logs**

| sudo drumee log \<user\>/service |
| :---- |

 

### **Restart a plugin service**

| sudo drumee restart \<user\>/service |
| :---- |

## **How the Server Loads Plugins**

The service runner (service.js) calls Acl.loadPlugins() at startup to discover and register all installed plugins. On receiving a reload signal, it calls Acl.loadPlugins(true) to **hot-reload plugins without restarting the full server process**.

| // From service.js await Acl.loadPlugins();   configs.handleSignals(async () \=\> {   await Acl.loadPlugins(true); }); |
| :---- |

 

Plugin updates can be applied without a full service restart by sending the appropriate signal to the process. This means zero-downtime plugin deployment on a live instance.  
