# Pocket Shrink
**AI-Powered Mental Wellness Platform with Age-Aware Access Control and Subscription-Driven Experience**

Pocket Shrink delivers an always-available therapeutic chat experience that balances empathetic AI interaction, strict user-state governance, and monetization-ready subscription architecture.

![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![Stripe](https://img.shields.io/badge/Billing-Stripe-635BFF)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## Live Demo & Credentials
- **Live Demo:** _[Add Production URL]_
- **Repository:** _[Add Repository URL]_
- **Demo Credentials:** _[Add Demo User]_ / _[Add Demo Password]_
- **Admin Preview Credentials (Optional):** _[Add Admin Email]_ / _[Add Admin Password]_

## Key Features & Capabilities
- **Age-aware entitlement model:** User lifecycle logic automatically differentiates teen and adult access paths, enforcing distinct messaging privileges and subscription expectations.
- **Resilient authentication flow:** JWT access plus refresh token strategy is combined with proactive client-side token renewal and interceptor-based replay to reduce session friction.
- **Policy-driven RBAC:** Moderator, Admin, and Super Admin capabilities are formalized through centralized permission checks rather than endpoint-level ad hoc conditionals.
- **Subscription lifecycle orchestration:** Stripe checkout, trial initiation, cancellation-at-period-end, and webhook synchronization keep billing state aligned with application access controls.
- **Adaptive privacy mode:** Anonymous mode is treated as a product capability tied to plan-level rules, not a cosmetic UI toggle.
- **Conversation continuity at scale:** Session-centric chat state is persisted client-side, enabling multi-session continuity, exportability, and responsive restoration.
- **Multimodal interaction pipeline:** Voice input transcription and TTS output are integrated into the chat loop for lower-friction user engagement.
- **Operational readiness baselines:** Health endpoint, centralized configuration, and environment-specific CORS strategy support deployment across local and hosted environments.

## Architecture & Technical Deep Dive
Pocket Shrink uses a full-stack split where the browser handles rich conversational UX while FastAPI governs identity, permissions, usage controls, and paid feature access.

### System Design & Data Flow
- **Presentation Layer (Next.js App Router):** Route-level UI boundaries separate authentication, chat, profile, crisis, and subscription experiences.
- **Client Domain Layer:** Auth and subscription hooks encapsulate session state, entitlement checks, and billing actions, reducing direct component coupling to transport concerns.
- **Transport Layer (Axios):** A shared API client injects bearer tokens and coordinates queued request retries during refresh-token rotation, preventing token-expiry race conditions.
- **Application Layer (FastAPI):** Versioned route groups organize core domains: authentication, user management, plans, and subscription lifecycle.
- **Persistence Layer (MongoDB via Motor):** Asynchronous document operations support user profile, role, subscription, trial, and usage-counter state with low ceremony for iterative schema evolution.

### Data Model & Subscription Strategy
- **User as the aggregate root:** Authentication identity, age classification, role, subscription status, and message quotas are co-located to simplify entitlement decisions per request.
- **Entitlement by status, not role alone:** Messaging limits, trial flags, and anonymous access combine subscription state with demographic state for fine-grained policy outcomes.
- **Billing-source reconciliation:** Stripe subscription objects are used as truth inputs during lifecycle checks, with webhook events and fallback sync behavior protecting against drift.

### Patterns & State Management
- **Context for identity-critical state:** Authentication context centralizes login, refresh, logout, and user hydration responsibilities.
- **Zustand for conversational state:** Chat sessions and message timelines are persisted independently from auth, improving maintainability and replay behavior.
- **Guardrails through dependency injection:** FastAPI dependencies enforce active-user checks and role thresholds before business handlers execute.
- **Graceful degradation paths:** Failure handlers return safe conversational fallbacks and preserve user flow when upstream AI or network operations are degraded.

## Tech Stack & Justification
| Layer | Technology | Engineering Justification |
|---|---|---|
| Frontend | Next.js 14 + React 18 + TypeScript | App Router and typed client logic provide scalable UI composition and safer refactoring across auth, chat, and subscription surfaces. |
| UI System | Tailwind CSS + Radix UI primitives | Utility styling plus accessible primitives enable rapid iteration without sacrificing interaction consistency. |
| Client State | React Context + Zustand Persist | Separating identity state from chat-session state avoids over-centralized stores and improves lifecycle clarity. |
| API Client | Axios with interceptors | Centralized token injection and coordinated refresh retries reduce duplicated error handling across services. |
| Backend | FastAPI (Python, async) | Async-first request handling and dependency-injection patterns align well with auth, RBAC, and external billing integrations. |
| Database | MongoDB + Motor | Document modeling supports evolving user/subscription attributes while Motor preserves async throughput semantics. |
| Payments | Stripe | Hosted checkout and webhook eventing provide robust subscription lifecycle management with minimal PCI exposure. |
| AI Services | OpenAI APIs (chat, transcription, speech) | A unified provider powers multimodal conversation capabilities and keeps the therapeutic interaction loop cohesive. |
| Deployment | Railway-hosted services (backend/frontend targets) | Cloud deployment URLs and CORS strategy indicate environment-based delivery suitable for iterative production hardening. |

## Key Engineering Challenges & Learnings
- **Challenge: Maintaining coherent access policy across age transitions, trials, and paid tiers.**
	**Resolution:** The architecture encodes entitlement as a combination of age group, subscription status, and usage counters, then enforces it through both backend checks and frontend gating to reduce mismatch risk.
- **Challenge: Preserving session continuity under token expiry and concurrent API calls.**
	**Resolution:** Interceptor-managed refresh queuing prevents request storms and stale-token retries, while proactive refresh windows reduce user-visible authentication interruptions.

## High-Level API Architecture
- **Auth Domain**
	- `POST /api/v1/auth/signup`: Registers users and initializes age-aware default entitlement state.
	- `POST /api/v1/auth/login`: Authenticates users, issues tokens, and applies lifecycle transitions when eligibility changes.
	- `POST /api/v1/auth/refresh`: Rotates access credentials for active sessions.
	- `POST /api/v1/auth/logout`: Invalidates active session context.
	- `GET /api/v1/auth/me`: Returns current authenticated identity snapshot.

- **User & Access Domain**
	- `GET /api/v1/users/me`: Retrieves profile, subscription, and message-usage indicators.
	- `PUT /api/v1/users/me`: Updates user profile attributes.
	- `GET /api/v1/users/permissions`: Returns effective capabilities by role.
	- `POST /api/v1/users/toggle-anonymous`: Enables or disables privacy mode based on policy eligibility.
	- `GET /api/v1/users/can-send-message`: Resolves entitlement to continue conversation.
	- `POST /api/v1/users/increment-message-count`: Advances usage counters for quota governance.

- **Administration Domain**
	- `GET /api/v1/users/users`: Lists users for moderation and operations workflows.
	- `POST /api/v1/users/admin/create-user`: Creates role-scoped users under admin control.
	- `PUT /api/v1/users/admin/users/{user_id}/role`: Updates user role under hierarchy constraints.
	- `PUT /api/v1/users/admin/users/{user_id}/status`: Activates/deactivates accounts with privilege safeguards.
	- `GET /api/v1/users/admin/users/{user_id}`: Fetches user detail for operational review.

- **Subscription & Billing Domain**
	- `GET /api/v1/plans/plans`: Returns catalog-level plan metadata for product surfaces.
	- `GET /api/v1/subscription/current`: Resolves effective billing state and messaging limits.
	- `POST /api/v1/subscription/create-checkout-session`: Initiates Stripe-hosted purchase flow.
	- `POST /api/v1/subscription/start-trial`: Activates trial pathway for eligible users.
	- `POST /api/v1/subscription/cancel-subscription`: Schedules or executes subscription cancellation lifecycle.
	- `POST /api/v1/subscription/webhook`: Processes Stripe event stream for authoritative state synchronization.
