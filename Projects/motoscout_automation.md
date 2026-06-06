# MotoScout Automation Platform
### AI-Assisted Dealer Operations for AutoScout24: a production-grade control plane for synchronizing inventory, accelerating lead handling, and orchestrating marketplace actions across multiple seller accounts.

![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite-1f6feb)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.12-0e8a16)
![Database](https://img.shields.io/badge/Database-MongoDB-2ea44f)
![AI](https://img.shields.io/badge/AI-LangGraph%20%7C%20OpenAI-ff6b35)
![Build](https://img.shields.io/badge/Build-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Live Demo & Credentials
- **Live Application:** [Add Live URL]
- **Repository:** [Add Repository URL]
- **Demo Account (Optional):** [Add Demo Email]
- **Demo Password (Optional):** [Add Demo Password]
- **Notes:** Supports role-aware access, 2FA-capable login flows, and cookie-based session continuity.

## Key Features & Capabilities
- **Multi-account credential vault for dealer operations:** Dealer API credentials are encrypted at rest and scoped by user, enabling secure delegation across multiple seller identities without exposing integration secrets to the client.
- **Mirrored inventory architecture for operational speed:** Marketplace listings are persisted locally as a query-optimized mirror, which enables fast dashboard analytics, AI-assisted workflows, and resilient read paths even when upstream APIs are slow.
- **Bi-directional inventory lifecycle management:** The platform supports create, update, activate, deactivate, remove, republish, and bulk workflows with local state reconciliation to preserve source-of-truth consistency between marketplace and internal models.
- **Per-seller status orchestration:** Listings maintain status maps per seller plus a rolled-up top-level state, allowing precise control in multi-seller scenarios instead of forcing one global status for all syndication targets.
- **Lead inbox with workflow metadata:** Inbound marketplace leads are normalized into local domain models with status and priority semantics, enabling triage, follow-up, and automation-friendly lifecycle tracking.
- **Human-in-the-loop AI agent execution:** The LangGraph-powered assistant can propose operational actions and request explicit user confirmation before mutating critical data, reducing accidental destructive actions.
- **Streaming UX for long-running operations:** SSE-backed workflows support real-time import/sync progress and agent streaming, improving perceived responsiveness during heavyweight marketplace interactions.
- **Defense-in-depth authentication posture:** JWT + refresh token flows, HTTP-only cookie transport, optional OAuth, and 2FA support are combined with route-level dependencies and role-aware authorization boundaries.
- **Operational automation via scheduled jobs:** APScheduler cron tasks enforce daily status consistency and time-based republish automation with misfire handling and singleton execution controls.

## Architecture & Technical Deep Dive
### System Design Overview
The platform follows a modular, service-oriented architecture:
- **Frontend control surface (React):** Route-guarded SPA with clear separation between views, API services, and auth/session stores.
- **Backend API core (FastAPI):** Domain routers map to bounded contexts such as auth, accounts, listings, sync, leads, tags, dashboard, subscription, assets, and agent orchestration.
- **Integration layer (AutoScout API services):** Dedicated service modules handle token refresh, request retries, endpoint adaptation, and marketplace-specific edge cases.
- **Persistence layer (MongoDB):** Multi-tenant, user-scoped collections represent operational entities (accounts, listings, leads, sessions, notifications, subscriptions).
- **Automation layer (APScheduler):** Persistent job storage in MongoDB enables resilient recurring jobs across restarts.

### High-Level Data Flow
- User actions from the SPA call domain-specific backend routes.
- Backend route handlers delegate business logic to services (accounts, sync, listings, leads, agent, billing).
- Service layer synchronizes external marketplace state and updates local mirror collections.
- Aggregated dashboard endpoints read indexed local data for low-latency insights.
- AI agent workflows consume local context, invoke tools, and optionally gate writes through confirmation interrupts.
- Scheduled tasks continuously reconcile listing states and trigger due republishing behavior.

### Database Modeling Decisions
- **User-scoped tenancy model:** Core documents are keyed by user ownership boundaries, simplifying authorization checks and reducing cross-tenant leakage risk.
- **Mirror-first listing schema:** Local listing documents retain both normalized business fields and selective raw external payload references to balance query performance and forensic traceability.
- **Per-seller status mapping:** `status_by_seller` and `auto_republish_by_seller` fields support fine-grained syndication control and avoid lossy global-state assumptions.
- **Lifecycle metadata capture:** Sync timestamps, republish timestamps, and sync error fields provide auditable operational history.
- **Performance indexing strategy:** Startup index provisioning targets high-traffic dashboard predicates (user, seller, account, status) to keep analytical queries stable as data volume grows.

### Patterns and State Management Strategy
- **Service-layer orchestration pattern:** API routers stay focused on transport concerns while services handle transformation, retries, and integration semantics.
- **Facade over agent graph:** Agent service centralizes chat, streaming, confirmations, and session management over a persisted LangGraph runtime.
- **Client state split by concern:** React Query owns server-state caching/invalidation, while Zustand handles authentication/session state transitions.
- **Centralized HTTP resilience:** Axios interceptors plus refresh-queue coordination prevent token-refresh stampedes and recover protected requests transparently.

## Tech Stack & Justification
| Layer | Technology | Why It Was Chosen |
|---|---|---|
| Frontend | React 19 + Vite + React Router | Delivers a responsive SPA with modern build performance and clear route-level access control for authenticated operations. |
| Client Data Layer | TanStack React Query + Axios + Zustand | Separates remote server-state concerns from local auth/session state while enabling robust retry/refresh behaviors. |
| Styling/UI | Tailwind CSS + componentized UI structure | Speeds implementation of consistent, maintainable UI surfaces across dashboard-heavy workflows. |
| Backend API | FastAPI + Pydantic | Provides strong typing, validation, and modular router composition suitable for domain-rich API surfaces. |
| Data Store | MongoDB + Motor + PyMongo | Fits document-centric marketplace payloads and supports async workloads with flexible schema evolution. |
| AI Orchestration | LangGraph + LangChain + OpenAI | Enables tool-using conversational workflows with checkpointing and human-confirmation interrupts for safer automation. |
| Scheduling/Automation | APScheduler + MongoDB job store | Supports persistent, restart-safe cron execution for status reconciliation and republish automation. |
| Auth/Security | JWT, refresh tokens, HTTP-only cookies, OAuth, 2FA | Balances UX and security with layered session management and optional stronger identity assurance. |
| Billing & Notifications | Stripe + transactional email services | Supports production monetization and event-driven user communication patterns. |
| Deployment | Docker + Railway-oriented configuration | Ensures reproducible builds and straightforward cloud deployment with health-check aligned runtime behavior. |

## Key Engineering Challenges & Learnings
### 1) Keeping External Marketplace State and Local State Consistent
Marketplace APIs can return partial responses, asynchronous status transitions, and transient authorization failures. This architecture addresses that by combining local mirror persistence, token auto-refresh + retry, scheduled consistency checks, and explicit sync status/error fields so operators can detect and correct drift rather than silently trusting upstream immediacy.

### 2) Combining Conversational Automation With Safe Operational Mutations
Allowing an AI assistant to operate on live inventory introduces safety and trust constraints. The platform solves this with a human-in-the-loop execution model that pauses on sensitive tool calls, surfaces action summaries, and only resumes upon confirmation, preserving automation speed while maintaining operator control and auditability.

## High-Level API Architecture
- **Auth & Identity (`/api/v1/auth`, `/api/v1/users`, `/api/v1/users/2fa`, `/api/v1/admin`):** Registration, login/session continuity, profile lifecycle, role-aware administration, and second-factor workflows.
- **Dealer Account Vault (`/api/v1/accounts`):** Secure credential onboarding, seller binding, account health, and default account/seller resolution.
- **Inventory Core (`/api/v1/autoscout/listings`):** Listing lifecycle operations, publication-state transitions, media operations, tag binding, and bulk actions.
- **Sync Engine (`/api/v1/autoscout/sync`):** Pull/push synchronization paths for account-level and listing-level reconciliation between local mirror and AutoScout24.
- **Lead Inbox (`/api/v1/autoscout/leads`):** Lead ingestion, filtering, status progression, and priority management.
- **Reference Data (`/api/v1/autoscout/reference`):** Make/model/location enrichment endpoints used by listing and search workflows.
- **AI Agent (`/api/v1/agent`):** Conversational command interface, streaming responses, session history management, and confirmation-based action execution.
- **Analytics (`/api/v1/dashboard`):** Aggregated account/listing/lead metrics optimized for operational decision-making.
- **Tags & Organization (`/api/v1/tags`):** Taxonomy management for portfolio and workflow segmentation.
- **Billing & Subscription (`/api/v1/plans`, `/api/v1/subscribe`):** Plan catalog, checkout orchestration, usage visibility, and subscription lifecycle hooks.
- **Asset Access (`/api/v1/assets`):** Controlled asset retrieval and signed-access mediation patterns.
- **Automation Control (`/api/v1/autoscout/cron`):** Manually triggerable operational job endpoints protected by cron-secret verification.