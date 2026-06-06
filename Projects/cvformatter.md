# CV-Formatter

**AI-Powered CV Extraction & Formatting Platform** — Intelligent structured data extraction from unstructured CV documents using multi-provider LLM orchestration.

---

## Badges

![FastAPI](https://img.shields.io/badge/FastAPI->=0.100.0-009485?logo=fastapi&style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&style=flat-square)
![Python](https://img.shields.io/badge/Python-3.11%2B-3776ab?logo=python&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Async-13aa52?logo=mongodb&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Key Features & Capabilities

- **Multi-Format Document Support**: Seamlessly process PDF and DOCX files with format-aware extraction strategies
- **Intelligent Structure Extraction**: Decompose unstructured CVs into 30+ structured fields (education, languages, professional experience, certifications, etc.) using LLM-powered extraction
- **Multi-Provider LLM Orchestration**: Pluggable backends (OpenAI, Google Gemini, DeepSeek) with provider-specific optimization and fallback strategies
- **Async-First Pipeline**: Non-blocking document processing with real-time progress tracking and error resilience
- **Comprehensive Authentication**: JWT-based stateless auth with OAuth2 (Google), email verification, two-factor authentication (TOTP), and secure refresh tokens
- **Subscription Management**: Stripe integration for subscription plans, checkout flows, and usage-based paywalling
- **User Profiles & Session Management**: Persistent user state with avatar uploads (GridFS), preferences, and multi-device session handling
- **Data Integrity Tracking**: Character/word count preservation, transfer percent calculation, and content integrity validation
- **Format Conversion**: On-demand cross-format conversion (PDF ↔ DOCX) with data fidelity preservation

---

## Architecture & Technical Deep Dive

### System Design Overview

The platform operates as a **full-stack async pipeline** optimized for handling variable document formats and LLM latency:

```
User Upload (Frontend)
    ↓
REST API Gateway (FastAPI)
    ↓
Authentication Layer (JWT/OAuth2/2FA)
    ↓
Document Validation & Storage
    ↓
Text Extraction (Format-Specific)
    ↓
LLM-Based Structured Extraction
    ↓
Data Enrichment & Validation
    ↓
Persistence (MongoDB)
    ↓
Real-Time Progress & Download (Frontend)
```

### Document Processing Pipeline

**Stage 1: Format Detection & Text Extraction**
- **DOCX Path**: Uses `python-docx` for structure-aware extraction, preserving paragraph hierarchy and table layouts as Markdown for LLM consumption. Captures text-box content as supplementary blocks.
- **PDF Path**: Employs `PyMuPDF` (fitz) for text extraction and optionally renders pages as high-resolution images (configurable DPI) for vision-capable LLM providers.
- **Unified Interface**: Both paths converge to plain-text or multi-modal input normalized for downstream LLM processing.

**Stage 2: LLM-Based Structured Extraction**
The backend implements a **provider-agnostic extraction strategy** with model-specific optimizations:

- **OpenAI (gpt-5.4-nano)**: Primary provider with vision capabilities for complex layouts. Configurable page limits (default 20) to control token usage. Includes retry logic for JSON parsing failures (default 2 retries).
- **Google Gemini (gemini-3-flash-preview)**: Cost-optimized alternative supporting identical CV schema with configurable retry delay (350ms default). Exceeds output token budget for complex CVs.
- **DeepSeek (deepseek-v4-flash)**: API-backed model (no local GPU inference) with 65K token output budget and 2-retry JSON recovery.

Each provider receives a **unified system prompt** (`CV_EXTRACTION_SYSTEM_PROMPT`) that defines the 30-field structured output schema and extraction semantics, ensuring consistency across providers.

**Stage 3: Optional Data Sanitization**
When `CV_EXPERIENCE_LLM_SANITIZE=true`, a second LLM pass clears mojibake and garbled text in the `professional_experience` field, improving downstream reliability at the cost of additional API calls.

**Stage 4: Data Enrichment & Validation**
- **Text Coverage Metrics**: Calculates assigned vs. unassigned character/word counts and transfer percentage for UI-driven quality feedback.
- **Language Normalization**: Maps user-provided language names (e.g., "Deutsch", "de") to canonical ISO 639 codes using language alias tables.
- **Integrity Flags**: Sets `transfer_needs_review` when unassigned content exceeds thresholds, signaling to the frontend that manual review is recommended.

### Database Schema & State Management

**Core Collections**:
- **`users`**: Account data, email verification status, password hashes (bcrypt), avatar metadata (GridFS file_id), subscription tier.
- **`subscriptions`**: Stripe subscription lifecycle (active/cancelled), plan mappings, renewal dates, usage credits.
- **`cv_jobs`**: Job tracking with transient state (pending → processing → done/failed), base64-encoded original file, extracted CVData, pipeline timing metrics.
- **`notifications`**: User-specific events (job completion, payment confirmations) for eventual UI notifications.
- **`user_settings`**: User preferences (cv_extraction_language, theme, email_digest_frequency).

**Design Rationale**:
- **NoSQL Flexibility**: MongoDB's schema-less design accommodates variability in CV structures without rigid migrations.
- **Async Motor Driver**: Ensures non-blocking database I/O critical for handling concurrent uploads and API latency.
- **GridFS for Avatars**: Isolates large binary data from document storage, enabling efficient chunk-based retrieval and garbage collection.

### Authentication & Authorization

**Multi-Layer Security Architecture**:
1. **JWT Access Tokens** (30-min default): Stateless, cryptographically signed, embedded in every request header.
2. **Refresh Tokens** (7-day default): Rotation-based with secure token storage in httpOnly cookies.
3. **OAuth2 Flow (Google)**: Session-based callback handling, automatic account creation on first login, email auto-population.
4. **Two-Factor Authentication (TOTP)**: Time-based one-time passwords using industry-standard algorithms, backing codes for account recovery.
5. **Role-Based Access Control (RBAC)**: Hierarchical permissions (user, admin, super_admin) enforced at the endpoint level.

**Design Decisions**:
- **Stateless JWT**: Eliminates session storage overhead, enabling horizontal scaling across multiple backend instances.
- **TOTP over SMS**: Reduces infrastructure costs and avoids third-party dependencies; TOTP codes are user-managed via authenticator apps.

### Subscription & Paywall System

**Stripe Integration**:
- **Webhook Handlers**: Consume `customer.subscription.created`, `invoice.paid`, `customer.subscription.deleted` events for real-time plan updates.
- **Usage Tracking**: Credits-based system where each CV extraction consumes configurable credits; threshold-based limits prevent over-usage.
- **Checkout Session Management**: Frontend redirects to Stripe-hosted checkout; backend validates session state and applies discounts.

**Pricing Models Supported**:
- Flat-rate subscriptions ($/month)
- Metered billing (cost per extraction)
- Freemium tiers (limited credits, upgrade-to-unlock flows)

---

## Tech Stack & Justification

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Backend Framework** | FastAPI 0.100+ | Async-first ASGI framework with automatic OpenAPI docs, type validation (Pydantic), and sub-millisecond overhead. Essential for concurrent file processing. |
| **Async ORM** | Motor (AsyncIO MongoDB) | Non-blocking MongoDB driver enabling true async I/O; avoids thread-pool bottlenecks during LLM API calls and file uploads. |
| **Database** | MongoDB 5+ | Flexible document schema accommodating variable CV structures; horizontal scaling via sharding; GridFS for binary storage. |
| **Auth Library** | python-jose + passlib | Industry-standard JWT implementation; passlib provides bcrypt hashing with configurable cost factors. |
| **LLM Integration** | OpenAI SDK + Google SDK + DeepSeek SDK | Multi-provider support decouples from single vendor; SDK abstraction enables provider-agnostic retry logic and fallback chains. |
| **Document Processing** | python-docx + PyMuPDF (fitz) | Lightweight, pure-Python libraries with no C dependencies; avoid LibreOffice/soffice complexity. python-docx preserves table structure; PyMuPDF handles PDF rasterization. |
| **Frontend Framework** | Next.js 16 (App Router) | File-system based routing, server/client component colocation, optimized bundling, and built-in API routes enable rapid iteration. |
| **Frontend State** | React Context + LocalStorage | Lightweight alternative to Redux; localStorage persists upload history across sessions without backend coupling. |
| **UI Styling** | Tailwind CSS v4 | Utility-first design system with dynamic theming support; zero runtime overhead via static analysis. |
| **PDF Rendering** | react-pdf + PDF.js | Browser-native rendering; client-side processing reduces server bandwidth. |
| **DOCX Preview** | mammoth.js | Pure JavaScript DOCX-to-HTML converter; no server-side rendering required. |
| **Payments** | Stripe SDK | PCI compliance outsourcing, webhook reliability, and extensive documentation. |
| **Email** | SendGrid (via SMTP) | Transactional email with deliverability guarantees and bounce handling. |
| **Deployment** | Railway (Docker) | Container-native platform with built-in PostgreSQL/MongoDB integrations and streamlined environment management. |

---

## Key Engineering Challenges & Learnings

### Challenge 1: Extracting Structured Data from Unstructured Documents

**The Problem**: CVs exhibit extreme structural variability—fonts, layouts, and formatting differ wildly across regions, industries, and tools. Traditional regex-based parsing fails on edge cases (e.g., dates in "01/2020" vs. "Jan 2020" formats, multi-line job descriptions).

**The Solution**: 
- **LLM-Centric Extraction**: Outsource semantic understanding to LLMs with explicit JSON schema contracts (`pydantic` models enforce validation). The LLM prompt teaches the model to handle ambiguous formats and infer missing data (e.g., "present" for current role when end date is omitted).
- **Multi-Modal Fallback**: PDF documents with complex layouts (custom fonts, sidebars, infographics) are optionally rasterized and sent to vision-capable models (OpenAI Vision, Gemini multimodal), trading compute cost for extraction accuracy.
- **Coverage Metrics**: Quantify extraction quality via transfer percentage—unassigned text signals incomplete extraction, triggering frontend review flags.

**Trade-offs Accepted**: LLM costs scale with document complexity; structured extraction latency (2–5s per document) requires frontend progress polling rather than instant feedback.

---

### Challenge 2: Managing Multi-Provider LLM Orchestration & Cost Optimization

**The Problem**: Single-vendor dependency creates lock-in risk; API pricing varies dramatically (OpenAI $0.15/1M input tokens vs. Gemini $0.075/1M). Provider outages or rate-limits can halt the entire pipeline.

**The Solution**:
- **Provider Abstraction Layer**: Three parallel implementations (`openai_cv.py`, `gemini_cv.py`, `deepseek_cv.py`) expose a unified interface, enabling provider swapping via a single `CV_PIPELINE_PROVIDER` environment variable.
- **Model Configuration**: Each provider has configurable model names, max output tokens, and retry behavior, allowing cost-benefit tuning without code changes.
- **Fallback Chains**: Future enhancement to support primary → secondary → tertiary provider fallback if primary rate-limits or errors.
- **Cost-Per-Feature Flags**: `OPENAI_CV_ALWAYS_VISION=false` disables vision by default (cheaper); `GEMINI_PDF_MAX_PAGES=0` removes page limits to fit complex PDFs in a single call.

**Trade-offs Accepted**: Maintaining multiple SDKs increases maintenance surface; unified error handling requires careful abstraction to avoid provider-specific semantics leaking into business logic.

---

### Challenge 3: Handling Async I/O Latency & Real-Time Progress

**The Problem**: CV extraction is I/O-bound (LLM API calls take 2–5 seconds); naive synchronous processing blocks the upload endpoint and times out browser requests. Progressive feedback (processing → done) improves perceived responsiveness.

**The Solution**:
- **Synchronous-on-Upload Pipeline**: The `/api/v1/cv/upload` endpoint awaits the full pipeline (`_run_pipeline`) before returning the job ID. This ensures data consistency—if extraction fails, the job is deleted and an error is returned immediately.
- **Real-Time Metrics**: Pipeline stages record elapsed milliseconds (extraction, LLM call, formatting), enabling frontend performance insights and backend bottleneck identification.
- **Graceful Error Recovery**: If LLM JSON parsing fails, automatic retries (configurable count) attempt recovery before falling back to human review queue.

**Trade-offs Accepted**: Blocking upload response to completion increases client-perceived latency; HTTP 30-second timeouts require frontend reconnection logic for very slow networks. Async job processing (enqueue + poll) was rejected to maintain data transactionality.

---

## High-Level API Architecture

### Authentication & User Management

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/auth/signup` | POST | Create account with email verification |
| `/api/v1/auth/login` | POST | JWT access token + refresh token exchange |
| `/api/v1/auth/verify-email` | POST | Confirm email ownership via token link |
| `/api/v1/auth/refresh` | POST | Rotate access token using refresh token |
| `/api/v1/auth/logout` | POST | Revoke refresh token session |
| `/api/v1/auth/google/login` | GET | OAuth2 Google login initiator |
| `/api/v1/auth/google/callback` | GET | OAuth2 provider callback handler |
| `/api/v1/auth/forgot-password` | POST | Initiate password reset flow |
| `/api/v1/auth/reset-password` | POST | Complete password reset with token |
| `/api/v1/users/me` | GET | Retrieve current user profile |
| `/api/v1/users/me` | PUT | Update profile (name, timezone, preferences) |
| `/api/v1/users/me/avatar` | POST | Upload avatar image (multipart) |
| `/api/v1/users/me/avatar` | DELETE | Remove avatar |
| `/api/v1/users/update-password` | PUT | Change password (requires current password verification) |
| `/api/v1/users/two-fa/enable` | POST | Generate TOTP secret and backup codes |
| `/api/v1/users/two-fa/verify` | POST | Confirm TOTP setup with code |

### CV Processing Pipeline

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/cv/upload` | POST | Submit CV file (PDF/DOCX); triggers extraction & returns job ID |
| `/api/v1/cv/status` | GET | Retrieve job progress, extracted data, error details |
| `/api/v1/cv/download` | GET | Stream formatted output (PDF/DOCX) based on request format |
| `/api/v1/cv/preview` | GET | Fetch original or formatted HTML preview |
| `/api/v1/cv/{job_id}` | GET | Retrieve full job metadata (timing, extraction stats) |
| `/api/v1/cv/{job_id}` | DELETE | Purge job and associated artifacts |

### Subscription & Billing

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/subscribe/plans` | GET | List available subscription tiers |
| `/api/v1/subscribe/checkout` | POST | Create Stripe checkout session |
| `/api/v1/subscribe/portal` | POST | Generate Stripe customer portal URL (manage, cancel) |
| `/api/v1/subscribe/status` | GET | Retrieve current subscription status & usage credits |
| `/api/v1/subscribe/webhooks` | POST | Consume Stripe events (subscription created/cancelled, invoice paid) |

### Notifications & Assets

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/notification/list` | GET | Fetch user notifications (job completion, payment confirmations) |
| `/api/v1/notification/{id}` | DELETE | Mark notification as read/dismiss |
| `/api/v1/assets/upload` | POST | Upload file to S3/R2-compatible storage (configurable) |
| `/api/v1/assets/{file_id}` | GET | Retrieve asset with signed URL or direct stream |

### Admin Operations

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/admin/users` | GET | Paginated user list with filters (email, status, plan) |
| `/api/v1/admin/users/{user_id}` | PATCH | Modify user (reset password, override plan, disable account) |
| `/api/v1/admin/analytics` | GET | Aggregate metrics (DAU, extractions/day, API costs) |

---

## Design Patterns & State Management

### Service Layer Pattern
Business logic is isolated in dedicated service classes (`cv_extractor`, `cv_formatter`, `openai_cv`, `stripe_service`, `email_service`), enabling unit testing and provider swaps without touching endpoints.

### Dependency Injection
FastAPI's `Depends()` mechanism injects authenticated user context, database connections, and configuration—reducing boilerplate and enabling test fixtures to override dependencies.

### Async Context Managers
Database connections and file handles use `@asynccontextmanager` for guaranteed cleanup, even on exceptions—critical for resource-constrained serverless deployments.

### Middleware Chain
CORS, session, and logging middleware are stacked in `main.py`'s lifespan manager, ensuring consistent ordering and graceful lifecycle management across hot reloads.

---

## Directory Structure

```
CV-Formatter/
├── Backend/                          # FastAPI server
│   ├── src/
│   │   ├── api/v1/                  # REST endpoints
│   │   │   ├── auth/                # Auth, login, signup, OAuth2
│   │   │   ├── cv/                  # CV upload, status, download
│   │   │   ├── users/               # Profile, 2FA, admin
│   │   │   ├── subscribe/           # Stripe integration
│   │   │   ├── notification/        # Event notifications
│   │   │   └── assets/              # File uploads
│   │   ├── auth/                    # JWT, permissions, dependencies
│   │   ├── services/                # Business logic
│   │   │   ├── cv_extractor.py      # Text extraction
│   │   │   ├── cv_formatter.py      # DOCX templating
│   │   │   ├── openai_cv.py         # OpenAI extraction
│   │   │   ├── gemini_cv.py         # Gemini extraction
│   │   │   ├── deepseek_cv.py       # DeepSeek extraction
│   │   │   ├── stripe_service.py    # Payment processing
│   │   │   ├── email_service.py     # Transactional email
│   │   │   └── totp_service.py      # 2FA logic
│   │   ├── models/                  # Pydantic schemas
│   │   ├── config.py                # Environment variables
│   │   ├── database.py              # MongoDB connection
│   │   ├── main.py                  # FastAPI app
│   │   └── startup_validator.py     # Pre-flight checks
│   ├── requirements.txt
│   ├── Dockerfile
│   └── railway.toml                 # Railway deployment config
│
├── Frontend/                         # Next.js client
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Root layout
│   │   ├── app/                     # Protected routes
│   │   │   ├── page.tsx             # Dashboard
│   │   │   ├── cv/[jobId]/edit/     # CV editor
│   │   │   ├── preview/             # Preview page
│   │   │   ├── download/            # Download handler
│   │   │   ├── processing/          # Job status
│   │   │   └── profile/             # User profile
│   │   ├── login/                   # Auth pages
│   │   ├── signup/
│   │   └── api/                     # API routes (server)
│   ├── components/                  # Reusable React components
│   ├── context/                     # React Context (auth, flow)
│   ├── lib/                         # Utilities & API clients
│   ├── public/                      # Static assets
│   └── package.json
│
└── Docs/                            # Documentation & test artifacts
    ├── Test CVs/                    # Sample CV files
    └── output/                      # Extraction samples
```

---

## Deployment & Configuration

The application is containerized via Docker and deployed on **Railway** with environment-based configuration:

**Critical Variables**:
- `SECRET_KEY`: HS256 signing key for JWT tokens (minimum 32 characters).
- `DATABASE_URL`: MongoDB connection string (Atlas or self-hosted).
- `OPENAI_API_KEY`, `GEMINI_API_KEY`, `DEEPSEEK_API_KEY`: LLM provider credentials (at least one required).
- `CV_PIPELINE_PROVIDER`: Active extraction backend (openai, gemini, deepseek).
- `STRIPE_SECRET_KEY`: Stripe API key for payment processing.
- `FRONTEND_URL`: CORS-allowed origin for Next.js client.

**Optional Tuning**:
- `ACCESS_TOKEN_EXPIRE_MINUTES`: JWT lifetime (default 30).
- `OPENAI_CV_MAX_VISION_PAGES`: Limit vision requests to reduce cost (default 20).
- `CV_EXPERIENCE_LLM_SANITIZE`: Enable second-pass data cleaning (default false).

---

## Monitoring & Observability

Pipeline execution captures:
- **Extraction Time**: Duration of text extraction phase (format-specific).
- **LLM API Time**: End-to-end LLM call latency including retries.
- **Formatting Time**: DOCX templating duration.
- **Total Time**: Wall-clock job completion.

These metrics are stored in the `cv_jobs` collection and exposed via `/api/v1/cv/{job_id}`, enabling frontend performance graphs and backend capacity planning.

**Logging**:
- Structured logging via Python's `logging` module with configurable levels.
- Error traces are captured and available for debugging via job records.
- Failed extractions are preserved in `debug/` folder for root-cause analysis (production should use S3 logging).

---

## Future Enhancements

- **Batch Processing**: Enqueue jobs via Celery/RabbitMQ instead of synchronous pipelines for massive uploads.
- **Vector Search**: Embed CV data into vector database (Qdrant, Pinecone) for semantic job matching.
- **Template Variants**: Support multiple output templates (ATS-optimized, creative, etc.) instead of single format.
- **Internationalization**: Multilingual extraction prompts and locale-aware formatting rules.
- **ML-Based Confidence Scoring**: Attach confidence scores to extracted fields, surfacing low-confidence entries for review.

