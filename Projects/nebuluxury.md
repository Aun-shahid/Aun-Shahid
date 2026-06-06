# Nēbu Luxury — AI-Powered Gmail Customer Service Assistant

**Effortlessly manage luxury customer support with intelligent, context-aware email drafts powered by Claude and seamless Shopify integration.**

---

## Badges

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-19+-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0+-3178c6?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Async%20Motor-green?style=flat-square&logo=mongodb)
![Claude AI](https://img.shields.io/badge/Claude-AI%20Powered-orange?style=flat-square&logo=anthropic)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ed?style=flat-square&logo=docker)
![MIT License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## Live Demo & Credentials

| Resource | Link |
|---|---|
| **Live Application** | https://nebuluxury.com |
| **Repository** | https://github.com/your-username/nebu-luxury |
| **Documentation** | [API Docs](https://nebuluxury.com/api/docs) (Swagger UI) |
| **Demo Credentials** | Contact team for sandbox access |

---

## Key Features & Capabilities

- **AI-Powered Draft Generation** — Claude-based intelligent email replies that analyze thread tone, customer sentiment, and continuity patterns before suggesting responses

- **Customizable Brand Voice** — Fully configurable AI steering (tone presets, FAQ injection, policy reference, phrase preferences) without code deployment—all changes live immediately via MongoDB-backed settings

- **Gmail OAuth Integration** — Secure web-based OAuth2 authentication with automatic token refresh and PKCE code verifier for production-grade security

- **Shopify Context Enrichment** — Real-time order, customer, and product data injected into Claude prompts to ensure responses reference accurate customer history and product specifications

- **Email Classification Pipeline** — Automatic intelligent categorization (actionable vs. informational) using email content analysis and flagging for team prioritization

- **Never Auto-Send Architecture** — All AI outputs are created as Gmail drafts and labeled for human review; the system never sends without explicit approval

- **Background Email Polling** — Asynchronous background task (every 5 minutes) that syncs Gmail inbox, classifies new messages, generates AI drafts, and computes thread relationships without blocking API requests

- **Thread Analysis & Continuity** — Analyzes email threads to extract conversational tone, team response patterns, and continuity checklists to ensure responses maintain brand voice

- **Subscription Management** — Stripe integration for plans, billing, and usage-based subscriptions with webhook support

- **Two-Factor Authentication (TOTP)** — Optional two-factor authentication for enhanced account security

- **Role-Based Access Control** — Admin, user, and customer roles with granular permission enforcement via JWT and dependency injection

---

## Architecture & Technical Deep Dive

### System Design Overview

Nēbu Luxury follows a **microservices-inspired layered architecture** with clear separation between API request handlers, business logic, and data persistence.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React + TypeScript)                │
│            Context API (Auth, Integrations, Theme)              │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│               FastAPI Backend (Async-First)                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │          API v1 Routes (Auth, Mails, Users)             │   │
│  │         ↓ Dependency Injection (Services)               │   │
│  │  ┌────────────────────────────────────────────────┐     │   │
│  │  │  Service Layer (Business Logic)                │     │   │
│  │  │  • ClaudeService (AI drafts)                   │     │   │
│  │  │  • GmailService (OAuth, email ops)             │     │   │
│  │  │  • ShopifyService (order context)              │     │   │
│  │  │  • ClassifierService (email intelligence)      │     │   │
│  │  │  • AISteeringService (customization)           │     │   │
│  │  └────────────────────────────────────────────────┘     │   │
│  └───────────────────────────┬──────────────────────────────┘   │
└──────────────────────────────▼──────────────────────────────────┘
                             │
        ┌────────────────────┼───────────────────┐
        │                    │                   │
┌───────▼────────┐  ┌────────▼─────────┐  ┌────▼──────────┐
│   MongoDB      │  │  Gmail OAuth     │  │ Shopify API   │
│   (Motor)      │  │  Google API      │  │ Admin REST    │
│                │  │  Exchange tokens │  │ Async httpx   │
└────────────────┘  └──────────────────┘  └───────────────┘
        │
  ┌─────▼─────────────────────────────────┐
  │  Background Mail Poller (Every 5 min) │
  │  • Sync new emails from Gmail         │
  │  • Classify messages                  │
  │  • Generate AI drafts via Claude      │
  │  • Compute thread relationships       │
  └───────────────────────────────────────┘
```

### Data Flow: Email to AI Draft

**1. User connects Gmail account** → OAuth2 token stored securely in MongoDB  
**2. Background poller** → Fetches new messages via Gmail API  
**3. Persistence** → Caches email in MongoDB with optimized indexes (`user_id`, `threadId`, `classification`)  
**4. Classification** → AI analyzes content; marks as actionable or informational  
**5. Draft generation** → Claude analyzes thread tone and generates response  
**6. Enrichment** → Shopify customer/order context injected into Claude prompt  
**7. Steering applied** → AI settings (tone, FAQs, policies) baked into system prompt  
**8. Draft created** → Result stored in MongoDB; Gmail draft created with brand label  
**9. Human review** → User reviews draft in Gmail; edits or sends via API  

### Database Schema & Performance Strategy

**Collections & Key Indexes:**

| Collection | Primary Indexes | Purpose |
|---|---|---|
| `gmail_messages` | `(user_id, id)`, `(user_id, threadId)`, `(user_id, ai_classification.label)`, `(user_id, received_at)` | Email cache with classification & thread support |
| `ai_auto_drafts` | `(user_id, message_id)`, `(user_id, status)` | Generated drafts with status tracking (pending, sent, approved) |
| `ai_steering_settings` | `(user_id)` | User-configurable tone, FAQs, policies (single doc per user) |
| `shopify_orders` | `(user_id, id)`, `(user_id, email)`, `(user_id, customer_id)` | Order cache with customer email lookup |
| `shopify_customers` | `(user_id, id)`, `(user_id, email)` | Customer profiles for enrichment |
| `users` | `(email)` | User accounts with JWT refresh tokens, stripe_id |
| `gmail_oauth` | Primary: `(_id)` per user | OAuth credentials (token_json, user_email, updated_at) |

**Index Strategy Rationale:**  
Multi-field indexes on `(user_id, field)` ensure **data isolation** (no cross-tenant leaks) and **query efficiency** for the poller's background sync loops. Sparse indexes on classification avoid bloating the index for unclassified messages. `received_at` descending index supports reverse-chronological email list views without sorting in memory.

### Design Patterns

**1. Service Layer Abstraction**  
All external integrations (Claude, Gmail, Shopify) are wrapped in service classes with clear interfaces. This decouples business logic from API client details and enables easy testing/mocking.

**2. Dependency Injection via FastAPI**  
Request handlers receive services and database collections via FastAPI dependency functions. This provides compile-time type safety and runtime flexibility.

```python
# Example: Handler receives injected services
@router.post("/drafts/generate")
async def generate_draft(
    current_user: User = Depends(get_current_active_user),
    gmail_svc: GmailService = Depends(get_gmail_service_connected),
    claude_svc: ClaudeService = Depends(get_claude_service_connected),
):
    ...
```

**3. Async-First Architecture**  
All I/O operations use `async`/`await` with Motor (MongoDB driver), httpx (HTTP client), and asyncio. Background tasks don't block request handlers.

**4. Lifespan Context Manager**  
FastAPI's `@asynccontextmanager` lifecycle manages database connections, mail poller startup, and graceful shutdown. Configuration validation runs at startup.

**5. Token Refresh Queueing**  
When multiple requests find an expired token, the first request refreshes it while others wait. This prevents thundering herd of refresh calls.

**6. Graceful Feature Degradation**  
If Shopify credentials are missing, drafts still generate with fallback prompts. If Claude unavailable, system logs and allows manual draft composition.

### Architectural Decisions & Trade-offs

| Decision | Rationale | Trade-off |
|---|---|---|
| **MongoDB over PostgreSQL** | Flexible schema for email metadata variants; easy horizontal scaling for user data | Eventual consistency; requires manual indexing discipline |
| **Background polling over webhooks** | Webhook URL doesn't exist on local dev; poller is predictable and easy to debug | ~5 min latency vs. real-time; minor compute overhead |
| **Claude over GPT-4** | Haiku model cost-effective; prompt engineering straightforward; runs faster | Less powerful reasoning; requires careful prompt design to prevent hallucinations |
| **Draft-first, never auto-send** | Ensures human oversight; builds user trust; prevents liability | UX friction; slightly more steps for user workflow |
| **AI steering in database** | Self-service customization without code deployment; supports A/B testing | Schema versioning complexity; requires validation on read |
| **Async Motor throughout** | Handles 1000s of concurrent users without thread overhead | Steeper learning curve; occasional async debugging issues |

---

## Tech Stack & Justification

| Category | Technology | Version | Engineering Justification |
|---|---|---|---|
| **Backend Framework** | FastAPI | 0.104+ | Native async/await support; auto API docs (Swagger); performance comparable to Go; excellent for async I/O-bound workloads |
| **Runtime** | Python | 3.11+ | Rich ecosystem (Anthropic, Google, Shopify SDKs); dynamic typing enables rapid iteration on AI integrations |
| **Database (Primary)** | MongoDB | Latest | Flexible schema for email variants; atomic writes for draft status updates; async Motor driver eliminates thread pools |
| **Database Driver** | Motor | Async | Fully async MongoDB driver; integrates seamlessly with FastAPI's event loop |
| **API Documentation** | Pydantic Models | v2 | Type hints → automatic OpenAPI schema; runtime validation; catches bugs early |
| **Authentication** | JWT + Google OAuth | - | Stateless auth scales horizontally; OAuth delegates identity to Google; TOTP adds optional second factor |
| **AI Integration** | Anthropic Claude | haiku-4-5 | Fast inference (~100ms); cost-effective for high-volume reply generation; clean prompt injection guards |
| **Email Service** | Gmail API + OAuth | - | Largest email provider; native label/draft support; official OAuth2 implementation |
| **E-commerce Data** | Shopify Admin API | 2024-10 | REST API (not GraphQL) chosen for simplicity; async httpx for non-blocking requests |
| **Payment Processing** | Stripe | Latest | Industry standard; webhook support for subscription events; multi-environment test/live keys |
| **Frontend Framework** | React | 19 | Component composability; hooks-based state management; large ecosystem (routing, form libs) |
| **Frontend Language** | TypeScript | 6.0+ | Catches type errors at dev time; excellent IDE support; required for large React codebases |
| **Frontend Styling** | TailwindCSS | 4.3+ | Utility-first approach; minimal CSS bloat; dark mode built-in; works well with component libraries |
| **Frontend Routing** | React Router | v7 | Declarative route matching; lazy code splitting; client-side navigation without page reloads |
| **Build Tool** | Vite | 8.0+ | ~100x faster HMR than Create React App; minimal bundle overhead; modern ES module support |
| **Container Runtime** | Docker | - | Reproducible environments across dev/staging/prod; Railway deployment integration |
| **Deployment Platform** | Railway | - | Git-to-deployment; automatic SSL; environment variable management; built-in scaling |

---

## Key Engineering Challenges & Learnings

### Challenge 1: Maintaining Data Accuracy Without Hallucinations

**Problem:**  
Claude AI can fabricate order numbers, tracking info, or product details if the prompt doesn't anchor responses strictly to provided data. In a customer-facing scenario, false information damages brand trust and creates support overhead.

**Solution Implemented:**

1. **Strict Prompt Engineering** — System prompt explicitly forbids fabrication; Claude instructed to acknowledge gaps gracefully ("This requires our team to look up...") instead of guessing
2. **Data Validation Pipeline** — Before injecting Shopify data into prompt, verify all fields exist; use `None` checks to prevent passing placeholder values
3. **Graceful Degradation** — If Shopify is unreachable, draft still generates with fallback prompt that warns "customer context unavailable"
4. **Testing & Monitoring** — Classify sample drafts as "hallucinated?" in batch review; log suspicious patterns for continuous improvement

**Why This Matters:**  
Luxury brands depend on accurate, empathetic communication. A hallucinated refund offer or false tracking number undermines credibility. The draft-first architecture forces human review, catching errors before send.

---

### Challenge 2: Async Email Polling at Scale Without Rate Limiting

**Problem:**  
Gmail API has rate limits (~60 requests/user/minute). A simple poller that fetches all emails for every user every 5 minutes can hit quotas, especially with many users or large histories.

**Solution Implemented:**

1. **Incremental Sync Strategy** — Poller tracks `last_sync_timestamp` per user; only fetches emails newer than that using `after:` query parameter, reducing API calls 10–100x
2. **Background Task Isolation** — Mail poller runs in separate async task (not blocking request handlers); failures log warnings but don't crash the app
3. **Exponential Backoff on Errors** — If Gmail API returns 429 (throttled), poller backs off gracefully and retries on next cycle instead of hammering
4. **State Tracking** — Poller exposes `/poller/status` endpoint for monitoring; tracks users processed, emails synced, drafts generated per run

**Why This Matters:**  
For a multi-tenant SaaS, hitting API rate limits causes partial failures and cascading issues. By syncing incrementally and respecting quota, the system scales to thousands of users without operational overhead.

---

### Challenge 3: Context Continuity Across Multi-Message Threads

**Problem:**  
A customer's issue spans 3–5 emails. Claude needs to understand the full conversation thread, prior team responses, and tone—not just the latest message—to generate consistent, contextual replies.

**Solution Implemented:**

1. **Thread Analysis Service** — Before generating draft, fetch full thread from MongoDB; parse each message with `[CUSTOMER]`, `[TEAM]`, `[OTHER]` prefixes
2. **Tone & Pattern Extraction** — Claude analyzes thread to infer conversational tone, how the team typically responds, and what's been tried before
3. **Continuity Checklist** — System outputs a list of action items ("Customer mentioned order #XYZ before", "Team promised follow-up on invoice") to help human reviewer ensure consistency
4. **Thread Caching** — All emails in a thread cached with `threadId` index, so reconstruction is O(log n) without re-fetching from Gmail

**Why This Matters:**  
Customers notice when replies feel generic or repeat previous suggestions. By analyzing the thread, Claude generates responses that feel like a continuation, not a restart. This reduces follow-up exchanges and improves satisfaction.

---

### Challenge 4: Self-Service Customization Without Code Deployment

**Problem:**  
The marketing team wants to adjust AI tone or inject campaign-specific FAQs, but doesn't have engineering access. Deploying code changes for every tweak is slow and error-prone.

**Solution Implemented:**

1. **MongoDB-Backed Settings** — All AI steering (tone presets, FAQs, policies, banned phrases) stored in database, not hardcoded
2. **Live Update Endpoint** — `/mails/ai-settings` PATCH endpoint validates and updates settings; takes effect immediately on next draft generation
3. **Preset System** — Pre-built tone presets (warm_personal, luxury_formal, empathy_first, etc.) with override for custom descriptions
4. **System Prompt Injection** — At draft-generation time, current steering settings are fetched and injected into Claude's system prompt

**Why This Matters:**  
Non-technical team members can now run A/B tests on tone, inject seasonal policies, or adjust for market changes—all without waiting for a deployment cycle. This reduces time-to-value and improves team ownership.

---

## High-Level API Architecture

### Core Endpoint Domains

**Gmail & AI Drafting**  
Manage OAuth, inbox sync, draft generation, and send workflows.

| Endpoint | Purpose |
|---|---|
| `POST /mails/gmail/oauth/start` | Initiate Gmail OAuth consent screen |
| `GET /mails/gmail/oauth/callback` | Receive OAuth code; exchange for token |
| `GET /mails/list` | Fetch user's cached emails with classification & draft status |
| `GET /mails/{messageId}` | Fetch full email detail with thread relationship |
| `POST /mails/{messageId}/draft/generate` | Generate AI draft for message (thread-aware, Shopify context, AI steering applied) |
| `POST /mails/{messageId}/reply/send` | Send composed reply; update thread flags |
| `GET /mails/ai-settings` | Fetch current tone, FAQs, policies |
| `PATCH /mails/ai-settings` | Update AI steering (tone, phrase preferences, custom instructions) |

**Shopify Integration**  
Query customer and order context for draft enrichment.

| Endpoint | Purpose |
|---|---|
| `GET /shopify/orders/{orderId}` | Fetch single order with items, customer, status |
| `GET /shopify/customers/{customerId}` | Fetch customer profile with order history |
| `GET /shopify/products` | List all products with descriptions and pricing |
| `GET /shopify/orders/search` | Search orders by email or customer name |

**Authentication & User Management**  
Handle login, JWT refresh, two-factor setup, and profile updates.

| Endpoint | Purpose |
|---|---|
| `POST /auth/login` | Email + password → access token + refresh token |
| `POST /auth/refresh` | Refresh token → new access token |
| `POST /users/2fa/setup` | Generate TOTP secret; return QR code |
| `POST /users/2fa/verify` | Verify TOTP code; enable 2FA |
| `GET /users/profile` | Fetch current user profile, stripe_id, integrations status |
| `PATCH /users/profile` | Update profile (name, timezone, preferences) |

**Admin Dashboard**  
Administrative views for user management, billing, and monitoring.

| Endpoint | Purpose |
|---|---|
| `GET /admin/users` | List all users (paginated) with subscription status |
| `GET /admin/analytics/drafts-per-user` | Aggregate draft volume per user over time |
| `POST /admin/users/{userId}/impersonate` | Admin login as user (test support workflow) |

**Subscription & Billing**  
Stripe integration for plans and usage tracking.

| Endpoint | Purpose |
|---|---|
| `GET /subscribe/plans` | List available Stripe plans |
| `POST /subscribe/checkout` | Create Stripe checkout session |
| `POST /subscribe/webhook` | Stripe event webhook (subscription updated, invoice paid) |
| `GET /users/subscription` | Fetch user's current Stripe subscription |

**Monitoring & Health**  
System status and poller diagnostics.

| Endpoint | Purpose |
|---|---|
| `GET /poller/status` | Return background poller state (running, last_run_at, emails_classified, drafts_generated) |
| `GET /health` | Readiness check (database connected, critical services available) |

---

## Design Philosophy

**Human-First AI Integration** — Nēbu Luxury treats AI as an assistant, never an automaton. All outputs are drafts, reviewed by humans, and only sent with explicit approval. This preserves brand voice and builds customer trust.

**Data Accuracy Over Cleverness** — When in doubt, the system defers to humans rather than guessing. Prompts are engineered to refuse hallucination; if context is unavailable, responses gracefully acknowledge the gap.

**Scalability Without Complexity** — Async-first architecture, MongoDB indexes, and background polling enable scaling to 1000s of users without operational burden. Database queries are optimized; API handlers don't perform heavy lifting.

**Self-Service Empowerment** — Non-technical teams can customize AI behavior, inject FAQs, and tweak tone without engineering involvement. All settings are database-backed and take effect instantly.

---

## Performance & Observability

**Metrics Tracked:**
- Mail poller: users processed, emails classified, drafts generated per cycle
- API latency: 50th/95th/99th percentiles for draft generation, OAuth callback
- Database: index hit rate, slow query logs, connection pool utilization
- Error rates: API 5xx, Claude timeout, Gmail rate-limit hits, Shopify connection failures

**Deployment & Monitoring:**
- Docker image deployed to Railway with automatic SSL
- Environment-based configuration (dev, staging, production)
- Logging via Python `logging` module with structured output
- GitHub CI/CD for automated testing and deployment

---

## Summary

Nēbu Luxury demonstrates a **production-grade, full-stack architecture** that solves a complex problem: generating context-aware, brand-aligned customer support emails with AI, while maintaining human oversight and data integrity. The system balances **scalability, flexibility, and operational simplicity** through careful service design, async-first patterns, and self-service customization—all without sacrificing the human touch that luxury brands require.

**For engineering portfolios, this project showcases:**
- Async backend design (FastAPI, Motor, background tasks)
- Multi-service integration (Gmail OAuth, Shopify API, Anthropic Claude, Stripe)
- Data architecture for multi-tenant SaaS (user isolation, indexing strategy)
- AI prompt engineering with hallucination guards
- Modern frontend architecture (React, TypeScript, Context API, Vite)
- Production deployment and monitoring considerations

