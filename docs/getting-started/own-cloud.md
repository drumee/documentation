---
sidebar_position: 1
title: Own Cloud
description: Deploy and manage your own Drumee instance on Docker or bare metal Debian
---

# Own Cloud

Drumee is designed as a **fully standalone, sovereign infrastructure**. You own the entire stack — there are no third-party services required for the core platform to function.

> Note:
The installation guides below apply to the `main` branch. Migration to the `revamp` branch is in progress and will require updated instructions once complete.

Two deployment targets are supported:

- **Docker** — recommended for most setups. Uses Docker Compose to run Drumee in a container.
- **Bare metal / Virtual Machine** — for Debian-based servers where containers are not available or not desired.

---

## Dependencies

Both deployment targets require the following services to be available:

nginx, mariadb, nodejs, bind9, graphicsmagick, ffmpeg, redis, libreoffice, postfix, opendkim

The bare metal setup additionally requires: prosody, jitsi-meet

---

## Hardware Requirements

- RAM at least 8 Gb
- CPU at least 2 GHz
- Enough space to host what you need

---

## Recommendations

- Drumee should be installed on a dedicated disk or partition
- MFS (`/data`) should not be installed on the same partition as the server (`/srv`)
- If you expect a high rate of read/write operations, the database partition (`/srv/db`) should be installed on a high-speed disk or partition (SSD or NVMe)

## Caution

- The provided domain name cannot be shared with an existing or future application
- It is recommended not to share the DB server with any other application

---

## Option A - Docker

**Prerequisite:** Debian family platform, Docker Engine version 20 or higher.

### Install Docker

Follow the [official documentation](https://docs.docker.com/engine/install/debian/) or run:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

---

### Public Domain Setup

This setup is required only if you need to make your server available from the public Internet. For a local installation, skip to [Local Domain Setup](#local-domain-setup).

#### Prerequisites

- A maiden Internet domain name
- Control access to your DNS zone
- Control access to your GLUE DNS
- At least one public IP address, IPV4 and/or IPV6

#### Prepare your IP addresses

In your DNS zone, remove all existing DNS records. Then create the following records at your Domain Name Provider (replace `example.org` with your own domain name; if you do not have an IPV6 address, fill IPV4 fields only):

| Domain Name | Type | Target |
|---|---|---|
| example.org | A | your.ip.4.address |
| example.org | AAAA | your.ip.6.address |
| ns1.example.org | A | your.ip.4.address |
| ns1.example.org | AAAA | your.ip.6.address |
| ns2.example.org | A | your.ip.4.address |
| ns2.example.org | AAAA | your.ip.6.address |

#### Change your default Domain Name Server

Open your ISP interface and change current Name Servers to `ns1.example.org` and `ns2.example.org`.

#### Change your GLUE DNS

Open your ISP interface and add the following entries:

- ns1.example.org
- ns2.example.org

Wait for the changes to take effect.

#### Check your DNS records

```bash
nslookup example.org
```

If everything is OK, you should see a response like:

```
Server:     192.168.5.1
Address:    192.168.5.1#53

Non-authoritative answer:
Name:   example.org
Address: your.ip.4.address
```

#### Prepare Drumee Container

```bash
git clone https://github.com/drumee/docker-hosted
cd docker-hosted
cp template.yml drumee.yml
```

Use your favourite editor to change values in `drumee.yml` according to your setup. Save the changes, then:

```bash
sudo docker compose -f drumee.yml up -d
```

You may need to stop some existing services on your server if their ports conflict with the ones required by Docker.

#### Monitor Installation Progress

```bash
sudo docker logs --follow drumee
```

Once installation is complete, you will receive a link sent to the `ADMIN_EMAIL` address. Click the link and set the admin password. That's it!

---

### Local Domain Setup

For a local installation (not public Internet):

```bash
git clone https://github.com/drumee/docker-hosted
cd docker-hosted
./install.local.sh
```

---

## Option B - Bare Metal / Virtual Machine

**Prerequisite:** Debian 11 or higher.

### Prepare your IP addresses

Follow the same DNS setup steps as described in the [Public Domain Setup](#prepare-your-ip-addresses) section above.

### Prepare your settings

```bash
git clone https://github.com/drumee/debian-hosted.git
cd debian-hosted
cp env.sh drumee.sh
```

Use your favourite editor to change values in `drumee.sh` according to your setup. Save the changes and check that GLUE records have been updated.

Ensure changes on your Internet Access Provider have been applied.

Ensure directories (`DRUMEE_DB_DIR`, `DRUMEE_DATA_DIR`) exist and have enough space.

The following command must be executed as root user (`su`, not `sudo`):

```bash
./install
```

---

## Installation Packages

The following repositories are used to bundle the installation packages:

| Repository | Purpose |
|---|---|
| [setup-infra](https://github.com/drumee/setup-infra) | Configure SSL certificates and files in `/etc/drumee/` and `/etc/nginx/` |
| [setup-schemas](https://github.com/drumee/setup-schemas) | Populate database schemas |

---

## Runtime Architecture

A running Drumee instance consists of two server processes per endpoint:

- **`index.js`** — page and WebSocket server, loaded at `/`. Handles HTTP page serving and real-time push events.
- **`service.js`** — micro service server, loaded at `/-/svc/`. Handles all REST service calls following the `/-/svc/module.method` convention. Loads ACL configuration and service modules at startup; supports hot-reload of plugins.

Both processes are managed by **PM2** through a Drumee-specific wrapper.

---

## Accessing the Running Instance

Once deployed, Drumee runs inside a Docker container. To access the server environment:

```bash
# 1. SSH into the host
ssh debian@your-host

# 2. Switch to root
sudo -i

# 3. Enter the container
drumee
```

Once inside the container, the working directory is `/srv/drumee/`.

---

## Operational Commands

```bash
# List all running endpoints
sudo drumee list

# View logs for an endpoint
sudo drumee log <id|name>

# Restart a service
sudo drumee restart <service-name>
```

---

## File Structure

```
/srv/drumee/
  server-team/          # Core backend services
    acl/                # ACL JSON configuration files
    service/            # Service implementations

/etc/drumee/
  credentials/          # Long-lived credentials (never committed to git)
```

Long-lived credentials (API keys, service secrets) are stored in `/etc/drumee/credentials/`, not in environment files. Non-sensitive configuration is stored in `yp.sys_conf` and accessed at runtime via `Cache.getSysConf()`.

---

## See Also

- [Playground](./playground.md) — try the API without installing anything
- [Plugins](./plugins.md) — extend Drumee with your own backend services
- [ACL System](../concepts/acl-system.md) — how service permissions are configured