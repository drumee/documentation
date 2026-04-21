# **Own Cloud**

Drumee is designed as a fully standalone, sovereign infrastructure. You own the entire stack — no third-party services are required for the core platform to function.

Two deployment options are supported:

* **Docker** — recommended for development and most self-hosted setups  
* **Bare metal** — for Linux/Debian environments where containers are not available or prefered

## **Architecture Overview**

Drumee is packaged as **four Debian packages**, all built from the drumee/debian repository:

| Package | Repository | Contents |
| :---- | :---- | :---- |
| static | drumee/static | Fonts, icons, locale files, stylesheets |
| schemas | drumee/schemas | MariaDB stored procedures and table definitions |
| server-team | drumee/server-team | Backend Node.js services and ACL configuration |
| ui-team | drumee/ui-team | Frontend LETC rendering engine and Drumee-OS User Interface  |

 

Both Docker and bare metal installations use the same four packages. Docker wraps them in a container with all system dependencies pre-installed and auto setup using parameters provided by the the users

## **Dependencies**

The following system packages are required by Drumee:

* nginx — reverse proxy and files serving  
* mariadb-server — primary database  
* nodejs (v22) — backend runtime  
* redis-server — Bull Queue and caching  
* graphicsmagick — image processing  
* libreoffice — document-to-PDF conversion for indexing  
* ffmpeg — video processing  
* postfix \+ opendkim — outbound mail delivery  
* bind9 — local DNS (used in Docker deployment)  
* Jitis \- video conferencing system  
* Euro-Office (Collaborative Editor)

 

## **Hardware Requirements**

| Resource | Minimum |
| :---- | :---- |
| RAM | 8 GB |
| CPU | 2 GHz |
| Disk | Enough to host your data (dedicated disk or partition recommended) |

 

**Recommendations:**

•   	Drumee should be installed on a dedicated disk or partition

•   	MFS data (/data) should not be on the same partition as the server (/srv)

•   	For high read/write workloads, install the database partition (/srv/db) on a fast disk

## **Option A — Docker (Recommended)**

### **Step 1 — Install Docker**

| curl \-fsSL https://get.docker.com \-o get-docker.sh sudo sh get-docker.sh sudo usermod \-aG docker $USER newgrp docker docker run hello-world |
| :---- |

 

### **Step 2 — Clone the Docker Build Repository**

This repository is private — SSH access to the Drumee GitHub organisation is required.

| git clone git@github.com:drumee/docker-file.git cd docker-file |
| :---- |

 

### **Step 3 — Edit the Dockerfile**

Two changes are required before building:

**a) Comment out the Jitsi section:**

| nano Dockerfile |
| :---- |

 

If you don’t want to embed the conferencing system, find the \# Jitsi block and comment out all five lines:

| \# Jitsi \# RUN curl \-sS https://download.jitsi.org/jitsi-key.gpg.key | gpg \--dearmor | tee /etc/apt/trusted.gpg.d/jitsi-key.gpg \# RUN echo "deb https://download.jitsi.org stable/" | tee /etc/apt/sources.list.d/jitsi-stable.list \# RUN apt-get update \# RUN debconf-set-selections /var/lib/drumee/init.d/preset-jitsi \# RUN DEBIAN\_FRONTEND="noninteractive" apt-get install \-y jitsi-meet |
| :---- |

 

**b) Remove \`software-properties-common\`** from the main package list (line 5). This package is Ubuntu-only and does not exist on Debian — the build will fail if left in.

Verify both changes:

| grep \-n "jitsi\\|Jitsi\\|software-properties-common" Dockerfile \# Expected: only commented lines for Jitsi, nothing for software-properties-common |
| :---- |

 

### **Step 4 — Build the Docker Image**

| docker build \-t drumee/dist:local . |
| :---- |

 

This takes approximately 10–20 minutes. All 14 build steps must complete with FINISHED status.

### **Step 5 — Prepare the Compose File**

| cd \~ git clone git@github.com:drumee/docker-hosted.git cd docker-hosted cp local-domain.yaml drumee.yaml |
| :---- |

 

Create the volume directories:

| mkdir \-p \~/.config/local.drumee/storage/db mkdir \-p \~/.config/local.drumee/storage/data mkdir \-p \~/.config/local.drumee/storage/exchange mkdir \-p \~/build/local.drumee |
| :---- |

 

### **Step 6 — Configure the Compose File**

| nano drumee.yaml |
| :---- |

 

**a) Set the correct image tag:**

| image: drumee/dist:local |
| :---- |

 

**b) Replace \`BASE\` with your actual username in the volumes section:**

| volumes:   \- /home/YOUR\_USERNAME/.config/local.drumee/storage/db:/srv/db   \- /home/YOUR\_USERNAME/.config/local.drumee/storage/data:/data   \- /home/YOUR\_USERNAME/.config/local.drumee/storage/exchange:/exchangearea   \- /home/YOUR\_USERNAME/build/local.drumee:/mnt/devel   \- /home/YOUR\_USERNAME:/home/YOUR\_USERNAME:ro |
| :---- |

 

**c) Review environment variables** — defaults work for local development:

| environment:   \- PRIVATE\_DOMAIN=local.drumee   \- DRUMEE\_REPO=app.drumee.com   	\# DO NOT CHANGE   \- INFRA\_COMPONENTS=all         	\# DO NOT CHANGE   \- DRUMEE\_DESCRIPTION=My Drumee Dev Server   \- ADMIN\_EMAIL=admin@local.drumee   \- ACME\_EMAIL\_ACCOUNT=admin@local.drumee   \- INSTANCE\_TYPE=devel |
| :---- |

 

Verify no BASE or latest remain:

| grep \-n "BASE\\|dist:latest" drumee.yaml \# Expected: no output |
| :---- |

 

### **Step 7 — Add Local DNS Entry**

| echo "127.0.0.1 local.drumee" | sudo tee \-a /etc/hosts |
| :---- |

 

### **Step 8 — Start the Container**

| docker compose \-f drumee.yaml up |
| :---- |

 

The first boot installs all four Drumee packages and initialises the database. This takes approximately 5–15 minutes. When complete, the container prints:

| Installation completed\! open /data/tmp/welcome.html to get reset link |
| :---- |

 

Along with an HTML block containing the admin password reset URL.

To run in the background after first boot:

| \# Stop foreground process Ctrl+C   \# Restart in detached mode docker compose \-f drumee.yaml up \-d |
| :---- |

 

### **Step 9 — Set the Admin Password**

Open the reset URL printed by the container:

| https://local.drumee/-/\#/welcome/reset/\<token\> |
| :---- |

 

The browser will show an SSL certificate warning for the local domain — click **Advanced → Accept** to proceed. Set your admin password and log in.

## **Option B — Bare Metal**

Drumee supports installation directly on a Linux/debian server. The build scripts are in the drumee/debian repository. Each package subdirectory (schemas/, server/, ui/, static/) contains a build.sh script that compiles and packages the corresponding component.

Detailed bare metal installation depends on your specific environment. Contact your infrastructure administrator for a site-specific runbook.

## **Runtime Architecture**

Once installed, a Drumee instance runs **two Node.js processes per endpoint**:

| Process | Loaded at | Handles |
| :---- | :---- | :---- |
| index.js — Page and WebSocket server | / | HTTP page serving, real-time WebSocket connections, user sessions, push events via the LETC Router |
| service.js — Micro service server | /-/svc/ | All REST service calls (/-/svc/module.method), ACL configuration, service modules, plugin hot-reload |

 

Both processes are managed by PM2 through a Drumee-specific wrapper.

## **Operational Commands**

| \# SSH into the host and enter the container or service environment ssh user@your-host sudo \-i drumee   \# List all running endpoints sudo drumee list   \# Stream logs for an endpoint sudo drumee log \<id|name\>   \# Restart a service sudo drumee restart \<service-name\> |
| :---- |

## **File Structure**

| /srv/drumee/   server-team/ 	acl/    	← ACL JSON files (one per module) 	service/	← Service implementation files   /etc/drumee/   credentials/ ← Long-lived credentials (API keys, secrets) — never committed   drumee.sh	← Environment configuration (non-sensitive)   /data/      	← MFS file storage /srv/db/    	← MariaDB data directory |
| :---- |

## **Configuration and Credentials**

Sensitive credentials (API keys, bot tokens, service secrets) are stored in /etc/drumee/credentials/ as JSON files. This directory is never committed to version control.

Non-sensitive configuration is accessed at runtime via:

| const { Cache } \= require('@drumee/server-core'); const conf \= Cache.getSysConf(); |
| :---- |

 

Do not store credentials in .env files — they risk accidental git commits