Milestonely
# Milestonely
### Visual Roadmap Intelligence for Goal-Driven Teams and Individuals

Milestonely is an AI-augmented roadmap orchestration platform that turns goals, meetings, and collaborative planning into actionable milestone graphs with measurable execution progress.

![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-blue)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Async%20Python-009688)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248)
![Build Status](https://img.shields.io/badge/Build-Portfolio%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

## Live Demo & Credentials

- **Live Application:** [Add Live URL]
- **Repository:** [Add Repository URL]
- **Demo Account (Optional):** [Add Test Email]
- **Demo Password (Optional):** [Add Test Password]
- **Public API Key (Optional):** [Add Demo API Key for public roadmap endpoints]

## Key Features & Capabilities

- **Graph-based roadmap editor built on React Flow:** Milestones, swimlanes, text, and image nodes are treated as first-class graph elements, enabling both structured planning and freeform visual storytelling in the same workspace.
- **AI-powered roadmap generation from meeting media:** Audio/video uploads are converted, transcribed, analyzed, and transformed into milestone/task structures to reduce planning latency from conversation to execution artifact.
- **Resilient media processing pipeline for large files:** The backend supports large uploads, applies conversion and chunked transcription flows, and avoids memory spikes through streaming and bounded chunking.
- **Collaborative roadmap operations with presence awareness:** Multi-user ownership/collaborator flows, invite lifecycle handling, and real-time presence channels support active teamwork on shared roadmaps.
- **Public and embedded roadmap consumption model:** Dedicated public APIs enable roadmap viewing and selective task/reward operations for external integrations while preserving API-key-gated control paths.
- **Usage-aware product gating and monetization:** Plan features, quotas, and seat economics are enforced through paywall-aware frontend logic and Stripe-backed backend subscription orchestration.
- **Business team management with role governance:** Organization owners/admins can invite members, manage roles, and scale seats while billing state remains synchronized to seat quantity.
- **File and asset lifecycle management via S3-compatible storage:** Attachments and cover images are stored externally with presigned URL access patterns, separating binary storage concerns from core application records.
- **Operational readiness through startup validation and lifecycle hooks:** Configuration checks, logging setup, and DB connection lifecycle management reduce runtime misconfiguration risk in production deployments.

## Architecture & Technical Deep Dive

### System Design and Data Flow

- **Client Layer (Vite + React + TypeScript):** Route-segmented UX (public + protected) with context-driven state (`AuthProvider`, `RoadmapProvider`) and service wrappers for API boundaries.
- **API Layer (FastAPI):** Versioned modular routers grouped by domain (auth, roadmaps, milestones, tasks, rewards, teams, subscriptions, notifications, assets, AI, calendar, support).
- **Domain Services Layer:** Encapsulates payment, AI processing, storage, notifications, and team management logic to keep route handlers thin and business behavior centralized.
- **Persistence Layer (MongoDB via Motor):** Async document model optimized for rapid product iteration, hierarchical roadmap documents, and collaborator/team metadata.
- **External Integrations:** OpenAI (transcription + generation), Stripe (subscriptions + seat billing), Google Calendar (OAuth + event workflows), Resend (email), S3-compatible object storage (assets).

### High-Level Runtime Flow

1. **User interaction** originates from a protected React route (editor, dashboard, team, billing, AI flow).
2. **Auth-aware API client** injects access tokens and coordinates queued token refresh to prevent request storms on session expiry.
3. **FastAPI routers** enforce auth/role boundaries and dispatch to domain services.
4. **Service layer** performs core operations (graph updates, AI pipeline, billing sync, presigned URL generation, notifications).
5. **MongoDB** persists roadmap state, milestones/tasks, collaborators, subscriptions, organizations, and activity trails.
6. **WebSocket channels** broadcast presence/notification events for near real-time collaboration feedback.

### Data Modeling Choices

- **Document-oriented roadmap model:** A roadmap stores graph primitives (`nodes`, `edges`) with milestone/task detail references, matching frontend rendering needs and minimizing expensive joins.
- **Dedicated collections for orthogonal concerns:** Users, roadmaps, milestones, tasks, rewards, activities, subscriptions, organizations, memberships, invites, and notifications are separated to keep write paths focused and evolvable.
- **Collaborator and role metadata coexists with ownership:** Supports mixed visibility (owner, collaborator, public-view paths) and makes permission checks practical at route/service boundaries.
- **Asset indirection via file keys + presigned URLs:** Binary payloads are externalized to object storage while database records keep lightweight references and metadata.

### Notable Design Patterns

- **Context + service abstraction on frontend:** Global state provides UI coherence, while service modules isolate HTTP contract changes.
- **Interceptor-based auth resilience:** Token refresh queuing avoids duplicate refresh races and request failures under concurrent expiry.
- **Router-per-domain backend modularity:** Keeps endpoint growth manageable and enables clearer ownership boundaries.
- **Async-first backend I/O model:** Motor, async FastAPI handlers, and non-blocking external API coordination improve throughput under mixed workloads.
- **Lifecycle-managed app startup:** Structured startup checks and lifecycle hooks guard critical configuration before serving traffic.

## Tech Stack & Justification

| Layer | Technology | Why It Was Chosen (Engineering Rationale) |
| --- | --- | --- |
| Frontend App | React 18 + TypeScript + Vite | Enables highly interactive roadmap editing with strong type safety and a fast developer feedback loop. |
| Graph Editing | React Flow | Provides mature graph primitives and interaction ergonomics required for custom milestone/swimlane/text/image canvas editing. |
| UI Foundation | Tailwind CSS + component-level styling | Supports rapid iteration and consistent UI composition across dashboard, editor, and landing surfaces. |
| Routing | React Router | Cleanly separates public and authenticated app surfaces while supporting invite/share URL flows. |
| API Client | Axios with interceptors | Centralizes auth header injection and queued token refresh for resilient session behavior. |
| Backend Framework | FastAPI | Delivers high-performance async APIs with strong modular router composition and schema-driven contracts. |
| Runtime Language | Python 3.x | Accelerates integration-heavy development across AI, payments, email, and storage ecosystems. |
| Database | MongoDB + Motor | Fits flexible roadmap graph and milestone/task documents while retaining async I/O performance. |
| AI Pipeline | OpenAI (Whisper + GPT models) | Converts unstructured meeting media into structured roadmap artifacts with minimal manual planning overhead. |
| Payments | Stripe | Provides production-grade subscription lifecycle, webhook events, seat quantity updates, and proration handling. |
| Object Storage | S3-compatible storage via boto3 | Decouples media/attachments from transactional data and enables secure time-bound asset delivery. |
| Email | Resend | Simplifies transactional messaging for invites, alerts, and team workflows with operational reliability. |
| Auth & Security | JWT + role/permission dependencies + OAuth flows | Balances stateless API auth, role-based controls, and third-party calendar authorization requirements. |
| Real-time Collaboration | FastAPI WebSocket endpoints | Enables online presence and push-style collaboration signals without introducing separate realtime infrastructure. |
| Serialization/Performance | ORJSON response class | Reduces serialization overhead for frequently accessed API responses. |

## Key Engineering Challenges & Learnings

### 1) Concurrency-safe session recovery across distributed API calls

- **Challenge:** In roadmap-centric UIs, many concurrent requests can fail simultaneously when tokens expire.
- **Solution approach:** A centralized Axios response interceptor queues pending requests while a single refresh flow executes, then replays subscribers with the new token.
- **Impact:** Prevents refresh storms, reduces auth race conditions, and improves perceived reliability under high UI activity.

### 2) Large meeting media ingestion without exhausting backend resources

- **Challenge:** Long meeting recordings exceed single-pass transcription limits and can create memory pressure if loaded monolithically.
- **Solution approach:** Stream uploads to disk, convert video to audio when needed, segment audio into bounded chunks, transcribe sequentially, and merge output with timeline alignment.
- **Impact:** Expands practical ingestion capacity while preserving predictable memory usage and production stability.

## High-Level API Architecture

### Platform Core

- **Authentication & Identity (`/api/v1/auth`, `/api/v1/users`, `/api/v1/users/2fa`, `/api/v1/admin`):** Account lifecycle, JWT session flows, 2FA, and administrative user controls.
- **Roadmap Domain (`/api/v1/roadmaps`):** Roadmap CRUD, archival/duplication/share operations, roadmap feature endpoints, and collaboration entry points.
- **Milestones & Tasks (`/api/v1/milestones`, `/api/v1/tasks`, roadmap-scoped task paths):** Milestone detail lifecycle, task tracking, completion logic, and associated workflow data.
- **Rewards & Progression (`/api/v1/roadmaps/.../rewards`):** Incentive and achievement flows connected to roadmap progress behaviors.
- **Dashboard & Analytics (`/api/v1/dashboard`):** Aggregated execution metrics and user/team progress visibility.

### Collaboration, Sharing, and Real-Time

- **Collaborators (`/api/v1/roadmaps` collaborator paths):** Invite/accept/reject and collaborator management around shared roadmap ownership.
- **Presence WebSocket (`/ws/roadmaps/{roadmap_id}/presence`):** Real-time online-user broadcasting for collaborative awareness.
- **Public API (`/api/v1/roadmaps/public`):** Public/integration-oriented roadmap retrieval and controlled external task/reward actions.

### Business, Billing, and Integrations

- **Plans & Subscription (`/api/v1/plans`, `/api/v1/subscribe`):** Plan discovery, checkout initiation, subscription lifecycle, and billing coordination.
- **Team Management (`/api/v1/team/organization`, `/api/v1/team/members`, `/api/v1/team/invites`):** Organization ownership, role governance, invite orchestration, and seat-based scaling.
- **Assets (`/api/v1/assets`):** File lifecycle orchestration backed by object storage.
- **AI Features (`/api/v1/roadmaps/ai`):** Meeting media ingestion, transcription, and AI-generated roadmap creation flows.
- **Calendar (`/api/v1/calendar`):** OAuth-based calendar authorization and event-level scheduling interactions.
- **Notifications & Support (`/api/v1/...notifications`, `/api/v1/support`):** User-facing event signaling and support-related operational endpoints.

## Portfolio Positioning Summary

Milestonely demonstrates full-stack product engineering across interactive graph UX, async API architecture, AI/media pipelines, subscription economics, team collaboration, and integration-heavy backend services, with design decisions that prioritize modularity, operational resilience, and extensibility for production growth.
