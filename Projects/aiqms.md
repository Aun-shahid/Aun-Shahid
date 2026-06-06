# GrazieMille AI-QMS Platform

**AI-powered quality infrastructure for SMEs, certification teams, and oversight bodies.** GrazieMille turns fragmented quality documentation, risk registers, training records, and compliance workflows into a governed, multi-tenant QMS workspace with AI-assisted decision support.

![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-lightgrey?style=for-the-badge)

## Live Demo & Credentials

| Resource | Link |
| :--- | :--- |
| **Live Demo** | _Add deployed application URL_ |
| **Repository** | _Add repository URL_ |
| **Demo Tenant User** | _Add test email / password if public demo credentials are enabled_ |
| **Demo Admin User** | _Add test email / password if public demo credentials are enabled_ |

## Key Features & Capabilities

- **Multi-tenant QMS workspaces**: Organisations are modeled as isolated tenants with their own profile, onboarding state, users, roles, documents, processes, RACI records, risks, training modules, and competence matrices. This gives the platform a SaaS-ready boundary for SME, association, and oversight use cases.
- **Permission-first access control**: The backend resolves effective user permissions from organisation-scoped roles, while the frontend mirrors those permissions to filter navigation and guard workflows. This avoids hard-coding business authority into route names and keeps tenant administrators in control of operational roles.
- **Controlled document lifecycle**: Documents move through draft, review, approval, controlled, rejected, and obsolete states with version history, default-version selection, reviewer assignment, comments, effective dates, and document audit logging. The design supports regulated document governance rather than simple file storage.
- **AI-assisted documentation workflows**: Gemini and OpenAI-backed services support document generation, documentation insights, compliance checks, process extraction, process compliance review, and risk intelligence. AI output is treated as an enrichment layer around governed records instead of replacing workflow approvals.
- **Document ingestion and object storage pipeline**: Uploaded files are stored in S3-compatible object storage while MongoDB tracks ingestion jobs, document stubs, version metadata, extraction status, and linked process re-checks. This separates binary storage from operational metadata and keeps document workflows queryable.
- **Embedding-based redundancy detection**: Document content is split into sentence-level chunks, embedded with Gemini embeddings, stored once per document, and reused for cosine-similarity analysis across an organisation's document corpus. This avoids repeated embedding calls during every redundancy check.
- **Risk register with explainable intelligence**: Risks use a 5x5 likelihood-impact model, denormalized score fields, mitigation actions, ownership, source links, change logs, heatmap aggregation, and AI-generated drivers or recommendations for risk review sessions.
- **Training and competence governance**: Training modules, role requirements, user training records, skills, competency assessments, and role skill requirements are modeled separately so the platform can map QMS readiness to people, roles, and evidence.
- **Operational, executive, oversight, and platform-admin views**: The Next.js app includes route groups for tenant dashboards, organisation administration, documents, processes, RACI, audits, risks, reports, training, oversight dashboards, and super-admin panels.
- **Billing, notification, and identity integrations**: Stripe subscription endpoints, Resend email flows, Google OAuth, two-factor authentication, WebSocket notification hooks, and JWT refresh handling provide production-oriented platform plumbing around the QMS domain.

## Architecture & Technical Deep Dive

### System Design

GrazieMille is split into a **Next.js 14 frontend** and a **FastAPI backend**. The frontend owns the product experience, route-level workflow composition, typed service clients, and role-aware navigation. The backend owns identity, tenant isolation, permissions, document lifecycle rules, AI orchestration, persistence, file storage, billing integration, and notification delivery.

The request flow is intentionally layered:

1. **Client routes and components** collect user intent through tenant, admin, oversight, and QMS module screens.
2. **Typed frontend service wrappers** send requests through a shared Axios instance that attaches bearer tokens and coordinates refresh-token retries.
3. **FastAPI routers** group the API by business capability: authentication, users, organisations, roles, documents, ingestion, processes, RACI, risk, training, competence, assets, subscriptions, and notifications.
4. **Service modules** hold domain behavior such as ingestion, AI document generation, process compliance checks, embedding generation, risk analytics, object storage, notifications, Stripe integration, and email flows.
5. **MongoDB collections** persist tenant-scoped operational records, while S3-compatible storage holds uploaded document binaries and generated file assets.

### Data Model & Persistence Choices

MongoDB is a strong fit for this codebase because most QMS records are document-shaped, tenant-scoped, and workflow-heavy. The models capture rich nested structures such as organisation onboarding profiles, document audit actors, version snapshots, risk mitigation lists, risk change histories, training records, and role permission arrays without forcing premature relational joins.

The backend still applies relational discipline where it matters. Documents, document versions, comments, audit logs, embeddings, processes, risks, roles, training modules, and competence records are separated into focused collections. Startup index creation targets high-traffic query paths such as organisation documents, document audit logs, document embeddings, risk status/score views, user training assignments, and user competency matrices.

### AI, Vector Search, and RAG-Oriented Pipelines

The AI layer follows a pragmatic enrichment architecture:

- **Document ingestion** stores the original file, creates or updates document/version records, and triggers downstream checks when linked processes are affected.
- **Embedding generation** turns document text into sentence-level vectors and upserts one embedding record per organisation/document pair.
- **Redundancy analysis** compares candidate chunks against stored organisation-level embeddings using cosine similarity, enabling reuse of vector data across repeated checks.
- **Compliance analysis** uses Gemini-backed services to compare document or process content against selected standards and linked controlled documents.
- **Risk intelligence** analyzes individual risks and full risk registers to surface drivers, recommendations, patterns, predictive signals, and root causes.

This architecture keeps AI services behind domain-specific interfaces, which makes provider fallback, prompt changes, and future model swaps less disruptive to the API surface.

### Frontend State & API Strategy

The frontend uses the Next.js App Router for product areas and React context for authentication lifecycle state. A shared Axios client centralizes API configuration, bearer-token injection, and a subscriber queue that prevents multiple simultaneous refresh requests when several API calls encounter an expired token.

Most domain state is fetched through focused service and hook modules, while the documentation insights workflow uses a small persisted Zustand store to preserve analysis results across navigation. Route filtering is driven by organisation role and granular permission helpers, keeping UX authorization aligned with backend permission checks.

## Tech Stack & Justification

| Layer | Technology | Engineering Justification |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14, React 18, TypeScript | App Router gives the project clean workflow segmentation across tenant, admin, auth, and oversight surfaces, while TypeScript keeps the large service/type layer maintainable. |
| **UI & Visualization** | Tailwind CSS, Lucide React, Recharts, React Flow | Tailwind supports rapid, consistent product UI composition; Recharts and React Flow match the dashboard, process, and relationship-visualization needs of a QMS platform. |
| **Frontend State** | React Context, custom hooks, Zustand | Authentication benefits from context-wide lifecycle management, while focused hooks and a small persisted Zustand store avoid unnecessary global state complexity. |
| **Backend** | FastAPI, Pydantic, Uvicorn | FastAPI fits the async, typed API design and pairs naturally with Pydantic models for validation-heavy business workflows. |
| **Database** | MongoDB with Motor | MongoDB supports tenant-scoped, document-rich QMS records and Motor keeps database access aligned with the backend's async execution model. |
| **AI & Embeddings** | Google Gemini, OpenAI, sentence-level vector embeddings | The codebase uses AI as a bounded service layer for generation, extraction, compliance review, redundancy detection, and risk analysis without coupling business workflows directly to a provider. |
| **File Storage** | S3-compatible object storage via boto3 | Binary documents are separated from MongoDB metadata, allowing governed file access through keys and presigned URLs while keeping operational queries fast. |
| **Auth & Security** | JWT, refresh tokens, Google OAuth, TOTP 2FA, role permissions | The platform combines modern identity flows with tenant-specific permission resolution, supporting both SaaS administration and regulated QMS access patterns. |
| **Payments & Messaging** | Stripe, Resend, WebSocket notifications | Stripe handles subscription lifecycle concerns, Resend supports account and invite flows, and WebSocket hooks enable real-time notification delivery. |
| **Deployment** | Docker, Railway configuration | The backend is containerized with a health-check-aware Railway deployment profile, making runtime behavior explicit and portable. |

## Key Engineering Challenges & Learnings

### 1. Coordinating Regulated Document Control with AI Automation

The platform has to support AI-assisted generation and analysis without undermining document governance. The architecture solves this by keeping documents, versions, reviewers, approvals, comments, effective dates, and audit logs as first-class records. AI services enrich those records through generation, compliance, extraction, and redundancy checks, but the controlled-document workflow remains deterministic and auditable.

**Why it matters:** In QMS software, an impressive AI feature is not enough. The harder engineering problem is making AI output useful inside approval workflows, version history, role-based access, and evidence trails.

### 2. Maintaining Tenant Isolation Across a Broad Domain Surface

The codebase spans organisations, users, roles, documents, processes, RACI, risks, training, competence, subscriptions, notifications, and admin views. The backend consistently carries `organisation_id` through collections and permission checks, while the frontend filters routes and navigation based on organisation roles and permissions.

**Why it matters:** Multi-tenancy is not a single middleware concern here; it is a cross-cutting design rule that influences schema design, query indexes, authorization, navigation, dashboards, and service boundaries.

## High-Level API Architecture

The API is versioned under **`/api/v1`** and organized around business capabilities rather than transport mechanics.

- **Authentication (`/auth`)**: Signup, login, refresh, logout, identity lookup, email verification, invites, password reset, Google OAuth, and account deletion.
- **Two-Factor Authentication (`/users/2fa`)**: TOTP setup, verification, enablement, disablement, status, and login challenge verification.
- **Users (`/users`)**: Current-user profile operations, password updates, permission lookup, avatar upload/removal, and avatar serving.
- **Admin (`/admin`)**: Platform-level user administration, role assignment, status management, and user lifecycle operations.
- **Organisations (`/organisations`)**: Tenant profile creation, onboarding progress, organisation profile updates, tenant user management, logo upload/removal, and blueprint aggregation.
- **Roles (`/organisations/{org_id}/roles`)**: Organisation-scoped role creation, permission assignment, role updates, archival, deletion, and permission catalog access.
- **Documents (`/documents`)**: Document library operations, template access, document creation, controlled workflow transitions, versioning, downloads, comments, audit logs, AI generation, redundancy analysis, and compliance analysis.
- **Ingestion (`/ingestion`)**: File upload, ingestion job creation, job listing, and job status retrieval.
- **Documentation Insights (`/documents/insights`)**: AI-assisted analysis of uploaded documentation against selected quality standards.
- **Assets (`/assets`)**: Secure file download, metadata lookup, and presigned URL generation for S3-backed assets.
- **Processes (`/organisations/{org_id}/processes`)**: Process library CRUD, AI process generation/parsing, document linking, compliance checks, and process approval/review workflows.
- **RACI (`/organisations/{org_id}/raci`)**: RACI matrix retrieval and updates for process-role accountability mapping.
- **Risk Management (`/organisations/{org_id}/risks`)**: Risk register CRUD, risk statistics, heatmap aggregation, mitigation updates, individual AI analysis, and register-level AI insights.
- **Training (`/organisations/{org_id}/training`)**: Training module management, role training requirements, training record assignment, matrix views, and training statistics.
- **Competence (`/organisations/{org_id}/competence`)**: Skill catalog management, role skill requirements, user competency assessments, competence matrix views, and competence statistics.
- **Subscriptions (`/plans`, `/subscribe`)**: Plan discovery, current subscription state, usage visibility, Stripe checkout, customer portal access, cancellation, and webhook processing.
- **Notifications (`/notifications`)**: Notification status updates with service-level support for real-time WebSocket delivery.

## Portfolio Notes

GrazieMille is best read as a full-stack product architecture for regulated operational workflows: typed frontend boundaries, async backend services, tenant-aware authorization, controlled document management, AI enrichment, vector-backed document analysis, and SaaS platform integrations all working around a coherent QMS domain model.