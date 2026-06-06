LifetrekAIUnstuckGeneratorMVP
# Lifetrek AI
### AI Coaching Platform for Turning Personal and Professional Roadblocks into Structured Momentum

**Lifetrek AI is a full-stack coaching platform that combines conversational AI, subscription lifecycle management, and persistent user context to help users move from uncertainty to concrete action plans.**

![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript%20%7C%20Vite-0B7285)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%20%7C%20Async%20IO-1D4ED8)
![Database](https://img.shields.io/badge/Database-MongoDB%20%7C%20Motor-15803D)
![Payments](https://img.shields.io/badge/Payments-Stripe-1F2937)
![License](https://img.shields.io/badge/License-MIT-4B5563)
![Build](https://img.shields.io/badge/Build-Portfolio%20Demo%20Ready-065F46)

## Live Demo & Credentials

- **Live Application:** [Add Live URL]
- **Repository:** [Add Repository URL]
- **Demo Account (Optional):** [Add test credentials if enabled]

## Key Features & Capabilities

- **Conversation-centered coaching workflow:** The platform is designed around persistent conversation objects so coaching interactions remain contextual rather than stateless one-off prompts.
- **Dual response modes (standard and streaming):** Supports both synchronous completions and streaming generation to optimize for either simplicity or perceived responsiveness.
- **Role-aware authentication and authorization:** JWT-backed authentication is paired with permission-gated user management to separate customer, moderator, admin, and super-admin capabilities.
- **Subscription-aware usage control:** Message quotas and entitlement checks are integrated into user and subscription state, enabling monetization and graceful free-tier constraints.
- **Stripe-driven billing orchestration:** Checkout session creation, subscription status retrieval, cancellation flow, and webhook-driven state reconciliation provide production-grade payment lifecycle handling.
- **Internationalized user experience:** Language-aware AI prompting and frontend i18n support deliver multilingual interactions without cloning business logic per locale.
- **Resilient client session management:** Axios interceptors, refresh-token flows, and queued request replay reduce auth-related friction during token expiry events.
- **Demo-safe product funnel:** Persisted demo limits and session gating in client state provide controlled trialability without exposing unrestricted model usage.

## Architecture & Technical Deep Dive

### System Design and Data Flow

- **Frontend application layer:** A React + TypeScript SPA manages UX state, authentication state, and conversation state through custom hooks and service abstractions.
- **API orchestration layer:** FastAPI exposes versioned REST endpoints by domain (auth, users, chat, conversations, plans, subscription), enabling modular growth and clearer ownership boundaries.
- **AI integration layer:** Chat routes compose system instructions, user prompts, and option controls, then delegate inference to OpenAI via async HTTP clients.
- **Persistence layer:** MongoDB stores user identity, subscription metadata, conversations, and message history, enabling retrieval-heavy chat experiences and flexible schema evolution.
- **Billing event layer:** Stripe webhooks update subscription state asynchronously, allowing eventual consistency between external billing truth and internal entitlement state.

### Data Modeling Choices

- **Document model for conversational workloads:** Conversations and messages are modeled for append/read patterns and low-friction iteration as product requirements evolve.
- **Embedded subscription attributes on user records:** Entitlement-critical flags (plan, status, message limits, Stripe identifiers) are colocated with user identity for fast authorization and gating checks.
- **Operational collections for idempotency and lifecycle handling:** Webhook event tracking and subscription records support safe replay protection and predictable billing state transitions.

### Design Patterns and State Strategy

- **Domain-driven route segmentation:** API modules are grouped by business capability, reducing coupling and making versioned API maintenance practical.
- **Service-layer client architecture:** Frontend service classes centralize API access, while hooks own UI-focused orchestration, producing cleaner component boundaries.
- **Cross-cutting auth middleware/interceptors:** Token attachment and refresh handling are implemented once and reused, preventing duplicated auth logic throughout the client.
- **Hybrid state model:** React state handles local UI concerns, while persisted global state (Zustand) manages cross-session demo controls and theme preferences.

## Tech Stack & Justification

| Layer | Technology | Engineering Justification |
|---|---|---|
| Frontend | React 18 + TypeScript + Vite | Delivers fast iteration, strong type safety for API contracts, and efficient bundling for a responsive SPA experience. |
| UI System | Tailwind CSS + componentized React architecture | Speeds up consistent UI delivery while keeping presentation concerns decoupled from service and domain logic. |
| State Management | React hooks + Context + Zustand (persist middleware) | Balances localized component state with persistent global concerns such as demo constraints and theme behavior. |
| Internationalization | i18next + react-i18next | Enables scalable multilingual UX through centralized translation resources and runtime locale switching. |
| Backend API | FastAPI + Pydantic + async Python | Provides strongly validated contracts, asynchronous I/O performance, and clear route composition for domain modules. |
| Data Access | MongoDB + Motor + PyMongo | Fits semi-structured conversational and subscription data while supporting asynchronous read/write operations. |
| Authentication | JWT access tokens + refresh-token flow | Supports stateless API security with practical session continuity for modern SPAs. |
| AI Integration | OpenAI Chat Completions via httpx | Keeps model orchestration explicit and controllable while supporting both standard and streaming response paths. |
| Payments | Stripe Checkout + Webhooks | Reduces PCI surface area and provides reliable subscription lifecycle events for entitlement synchronization. |
| Deployment/Runtime | Uvicorn-based ASGI service + environment-driven config | Aligns with cloud-native deployment patterns and environment-specific behavior without code branching. |

## Key Engineering Challenges & Learnings

### 1. Maintaining Real-Time UX While Preserving Conversation Integrity

The system must support streaming AI responses without sacrificing conversation consistency. This is addressed by separating conversation lifecycle endpoints from generation endpoints and updating message history through explicit conversation-scoped operations, which improves traceability and replayability.

### 2. Keeping Auth, Entitlements, and Billing State Coherent Across Async Boundaries

Token expiry, webhook timing, and frontend retries can easily introduce state drift. The architecture mitigates this through centralized token refresh interception on the client, explicit subscription status synchronization on the server, and idempotent webhook processing patterns.

## High-Level API Architecture

- **Authentication Domain**
- Core responsibilities: account creation, login/logout, token refresh, and identity retrieval.
- Representative routes: `/api/v1/auth/signup`, `/api/v1/auth/login`, `/api/v1/auth/refresh`, `/api/v1/auth/me`.

- **User & Access Control Domain**
- Core responsibilities: profile management, role/permission administration, account status control, and message eligibility checks.
- Representative routes: `/api/v1/users/me`, `/api/v1/users/permissions`, `/api/v1/users/admin/*`, `/api/v1/users/can-send-message`.

- **AI Generation Domain**
- Core responsibilities: single-response generation, streaming generation, model availability checks, demo generation path, and conversation-bound generation.
- Representative routes: `/api/v1/chat/generate`, `/api/v1/chat/generate-stream`, `/api/v1/chat/models`, `/api/v1/chat/conversations/{conversation_id}/generate`.

- **Conversation Management Domain**
- Core responsibilities: create/list/update/delete conversations, store and retrieve message history, and auto-generate conversation titles.
- Representative routes: `/api/v1/conversations/`, `/api/v1/conversations/{conversation_id}`, `/api/v1/conversations/{conversation_id}/messages`, `/api/v1/conversations/generate-title`.

- **Subscription & Billing Domain**
- Core responsibilities: expose plan catalog, create Stripe checkout sessions, handle billing webhooks, return current subscription state, and process cancellation/message usage.
- Representative routes: `/api/v1/plans/plans`, `/api/v1/subscription/create-checkout-session`, `/api/v1/subscription/webhook`, `/api/v1/subscription/current`, `/api/v1/subscription/cancel-subscription`.
