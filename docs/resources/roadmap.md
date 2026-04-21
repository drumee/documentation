---
sidebar_position: 4
---

# Roadmap
Drumee's roadmap is driven by one principle: **sovereignty first, usability second, extensibility third.** We ship when it works, not when it looks good on a slide.

### Current State (April 2026)

**Capability**

**Status**

**Notes**

Self-hosted deployment

✅ Production ready

Deploys in < 10 minutes

SaaS deployment

✅ Live

app.drumee.org

File storage + collaboration suite

✅ Production ready

Both SaaS and self-hosted

Euro Office integration

✅ Ready

Ships with self-hosted via plugin

Plugin system (architecture)

✅ Production ready

New plugins take days to add

SaaS data portability (→ self-hosted)

🔄 Final development

Days away

Database layer (Notion-like, SaaS)

🔄 In development

Weeks

SaaS app marketplace

📋 Planned

Months

Diagram editor plugin

📋 In development

Weeks

Planner plugin

📋 Planned

Months

|  |  |  |
| --- | --- | --- |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

### Near-Term (Next 30 Days)

#### Data Portability: SaaS → Self-Hosted

The migration path from Drumee SaaS to your own self-hosted instance. This is the key to the two-stage GTM strategy: teams start on SaaS, evaluate, then move to full sovereignty without starting over.

**What it enables:**

- Export all workspace data from SaaS

- Import directly into a self-hosted Drumee deployment

- Permissions, chat history, and file structure preserved

#### Onboarding Wizard

A guided 3-step flow after first login:

1. Create your first workspace

2. Upload a file

3. Invite a teammate

This resolves the current activation gap: new users landing on an empty interface with no guidance.

#### Chat-in-Folder UX

The core product insight — *folder = chatroom* — is technically real but not visually obvious in the current UI. The roadmap item: integrate the chat panel directly into the folder view, visible immediately on opening a workspace.

### Medium-Term (Next 90 Days)

#### Homepage & Marketing Site Overhaul

Current state: category unclear within 15 seconds. Target: category clear within 5 seconds.

Key changes:

- Interactive 30-second demo video as hero
- ROI calculator ("You pay $X for 3 tools. Drumee costs $Y. Save $Z.")
- 3 concrete ICP use cases with aha moments shown
- Social proof section (customer logos, testimonials)
#### Sidebar Navigation & UX Foundations

Current state: no sidebar, no breadcrumbs, unlabeled toolbar icons.

Target: persistent left sidebar, breadcrumb navigation, all icons labeled.

#### Viral Loop Fix

External sharing currently shows a generic file-download page. Target: recipient sees files + chat capability + a clear CTA to create their own workspace.

### Long-Term (3–6 Months)

#### SaaS App Marketplace

An app store for the SaaS version — allowing teams to add plugins (diagram editors, planners, custom workflow agents) without managing their own server. Requires significant UX and security architecture work.

#### Enterprise Deployment Tier

- SSO integration (SAML, OAuth)

- Multi-node deployment

- Custom SLA and compliance documentation

- Dedicated support

#### "Sovereign Builders" Community

A community for teams and developers building on Drumee's infrastructure. Purpose: create philosophical and practical lock-in that survives any competitor price war.

### What We Will Not Build

Drumee will not build features that require compromising the sovereignty principle:

❌ AI training on user data

❌ Third-party analytics embedded in the core product

❌ Advertising or data monetization of any kind

❌ Features that only work when connected to Drumee's cloud

The product moat is the conviction, not the feature list.
