# Heal Your Human

**Transform raw DNA data into actionable health insights with AI-driven analysis and professional PDF reports.**

---

## Badges

![Python](https://img.shields.io/badge/Python-3.10%2B-3776ab?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104%2B-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18.3%2B-61dafb?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5%2B-3178c6?style=flat-square&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Async-47a248?style=flat-square&logo=mongodb&logoColor=white)
![Status](https://img.shields.io/badge/Status-MVP%20Production-brightgreen?style=flat-square)

---

## Live Demo & Repository

| Link | Details |
|------|---------|
| **Live Application** | Deployed at `https://app.healyourhuman.com` |
| **API Documentation** | Auto-generated Swagger UI at `/docs` (FastAPI) |
| **Repository** | CodeXcape — Software Solutions (Internal) |
| **Test Credentials** | Available in project documentation |

---

## Key Features & Capabilities

**Genetic Data Ingestion & Normalization**
- Multi-source DNA file parsing: 23andMe, Ancestry, and generic formats
- Intelligent biomarker alias resolution (handles 40+ naming variations)
- Canonical SNP JSON normalization enabling downstream analysis
- Secure file handling with cryptographic deletion protocols

**AI-Driven Health Analysis**
- GPT-5 integration for narrative report generation in Gary Brecka optimization style
- Real-time analysis streaming for responsive user experience
- Structured output parsing: gene status, biochemical optimization paths, supplement recommendations
- Context-aware personalization based on normalized genetic markers

**Dual-Mode Reporting**
- **Free Snapshot Preview**: Color-coded summary table with actionable insights (gated but visible)
- **Full PDF Report**: Professional, downloadable document with visual hierarchy, biochemical deep-dives, and integrated lab correlations

**Subscription & Monetization Pipeline**
- Stripe Checkout integration with coupon/promo code support
- Webhook-driven subscription state management (active, trial, expired, canceled)
- Automatic PDF generation and email delivery post-purchase via SendGrid
- Trial period tracking with grace periods and auto-renewal logic

**Multi-Factor Security & Compliance**
- JWT-based authentication with automatic refresh rotation
- Time-based One-Time Password (TOTP) 2FA with backup codes
- Rate limiting and login attempt lockout mechanisms
- HIPAA-aligned audit logging for all user actions and data access

**Blood Lab Integration**
- Biomarker extraction from Quest, LabCorp, and manual lab entry
- Genetic-biomarker correlation engine (e.g., MTHFR ↔ B12/folate status)
- Lab-DNA unified health interpretation

**Admin & Observability**
- Lightweight admin dashboard: user management, report review, subscription tracking
- System audit logs with timestamp, user ID, action type, and IP tracking
- Real-time health check endpoints for operational monitoring

---

## Architecture & Technical Deep Dive

### System Design Overview

**Heal Your Human** employs a **microservices-inspired monolithic architecture** with clear separation of concerns between the data ingestion layer, AI orchestration layer, and presentation layer.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                               │
│  React 18 + TypeScript + Vite (Async, Module-Federated Components) │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼────────┐      ┌────────▼──────────┐
        │  REST API      │      │  WebSocket Layer  │
        │  (Axios)       │      │  (Real-time sync) │
        └───────┬────────┘      └────────┬──────────┘
                │                        │
┌───────────────▼────────────────────────▼───────────────────────────┐
│                       BACKEND API LAYER                            │
│              FastAPI (Async-First, ASGI + Uvicorn)                │
│                                                                    │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ Auth Router │ │ Analysis     │ │ Blood    │ │ Subscription │ │
│  │             │ │ Router       │ │ Router   │ │ Router       │ │
│  └─────────────┘ └──────────────┘ └──────────┘ └──────────────┘ │
│                                                                    │
│  Middleware Stack:                                                 │
│  - CORS (multi-origin support)  - Session Management              │
│  - Rate Limiting & Auth         - Error Handling & Logging        │
└───────────────┬───────────────────────────────────────────────────┘
                │
        ┌───────▼──────────────┐
        │  SERVICE LAYER       │
        │ (Business Logic)     │
        │                      │
        │ ┌────────────────┐   │
        │ │ DNA Parsing    │   │  Genomic Data Processing
        │ │ AI Service     │   │  LLM Orchestration
        │ │ PDF Report Gen │   │  Document Rendering
        │ │ Email Delivery │   │  Notification Engine
        │ │ Crypto Service │   │  Encryption/Decryption
        │ └────────────────┘   │
        └───────┬──────────────┘
                │
    ┌───────────┼───────────────┐
    │           │               │
┌───▼────┐  ┌──▼────────┐  ┌───▼─────────┐
│ MongoDB │  │  SendGrid │  │ Stripe API  │
│ (Motor) │  │  (Email)  │  │ (Payments)  │
└────────┘  └───────────┘  └─────────────┘
    │
    └─▶ Async I/O with Motor Driver
        Collections: users, subscriptions, uploads, 
                    analysis_results, reports, audit_logs
```

### Data Flow Architecture

**Genetic Analysis Pipeline:**
1. **Ingestion**: Raw DNA file uploaded → validated for format and size
2. **Parsing**: File-type detection → source-specific parser (23andMe/Ancestry handlers)
3. **Normalization**: Raw SNP strings → canonical JSON with allele calls and zygosity
4. **Enrichment**: SNP metadata lookup → biochemical pathway association
5. **AI Analysis**: Normalized SNPs + user labs → OpenAI GPT-5 prompt → structured response
6. **Report Generation**: AI output → HTML template → ReportLab PDF rendering
7. **Delivery**: PDF + HTML → SendGrid email → user dashboard archive

**Subscription State Machine:**
```
User Creation
    ↓
  Trial/Free (7-day trial if eligible)
    ↓
Checkout (Stripe Checkout)
    ↓
Payment Success (Webhook triggered)
    ↓
Active Subscription (can download reports)
    ↓
Expiration/Cancellation (access revoked, data archived)
```

### Database Schema Architecture

**Core Collections:**

**users**
- Primary identifier: `_id` (MongoDB ObjectId)
- Auth: email, hashed_password, Google OAuth credentials
- Subscription: stripe_customer_id, subscription_status, expiry date
- Security: 2FA secrets, token blacklist references, failed login tracking
- Profile: avatar, display name, preferences (notifications, data sharing)

**subscriptions**
- Stripe integration: customer_id, subscription_id, price_id
- State: active/trial/expired/canceled/canceling
- Billing: current_period_end, cancel_at_period_end, coupon applied
- Audit: created_at, updated_at, webhook_event_id

**uploads**
- File metadata: filename, source (23andMe/Ancestry), upload_timestamp
- Processing: parse_status, normalization_status, error_logs
- Normalized data: SNP array (rsID, alleles, zygosity, phase)
- User reference: user_id, file_path (secure location)

**analysis_results**
- Genetic analysis: snapshot_markers, full_analysis_text, gene_status_map
- AI metadata: model_used (GPT-5), temperature, token_count
- Timestamps: created_at, analysis_completed_at
- User: user_id, upload_id reference

**reports**
- Report state: status (pending, generated, emailed, archived)
- Content: html_snapshot, pdf_blob, email_html
- Delivery: email_sent_at, download_count
- Metadata: created_at, purchase_timestamp, expiration_policy

**audit_logs**
- Event tracking: action (login, download, delete), user_id, IP address
- Timestamps: event_timestamp, processed_at
- HIPAA compliance: sensitive_data_accessed (yes/no), retention_policy

### Key Architectural Decisions

**Async-First Backend (FastAPI + Motor)**
- All database I/O is non-blocking via Motor (async MongoDB driver)
- Concurrent request handling without thread pools; enables horizontal scaling
- Streaming API responses for long-running analyses reduce perceived latency

**MongoDB Over Relational SQL**
- Document flexibility: SNP data is hierarchical JSON; schema evolution without migrations
- Motor async driver enables high concurrency without connection pooling overhead
- GridFS for file storage (PDFs, uploads) within single database system

**Frontend State Management (Zustand + React Context)**
- Zustand for lightweight global state (auth, user data, UI state) — no Redux boilerplate
- SessionStorage persistence for temporary data; survives refresh but clears on browser close
- Context API for nested component communication (modals, notifications, theme)

**JWT + Refresh Token Rotation**
- Short-lived access tokens (30 mins) reduce compromise window
- Refresh tokens (7-day expiry) issued server-side with unique JTI (JWT ID) for revocation
- Token blacklist collection enables explicit logout without waiting for expiration

**Stripe Webhook Event Sourcing**
- All subscription state changes driven by Stripe webhook events, not client-side calls
- Idempotent webhook handlers (idempotency key matching) prevent duplicate processing
- Eventual consistency: subscription data cached client-side, synced via webhooks

**Multi-Pass File Deletion**
- Uploaded DNA files overwritten with zeros, random data, and 0xFF before deletion
- Mitigates forensic recovery of sensitive genetic data
- Audit log entry created for every deletion (HIPAA compliance)

---

## Tech Stack & Justification

| Category | Technology | Version | Justification |
|----------|-----------|---------|---|
| **Runtime** | Python | 3.10+ | Type-safe async framework (FastAPI); rich bioinformatics libraries (Pandas, NumPy, BioPython) |
| **API Framework** | FastAPI | 0.104+ | Native async/await; automatic OpenAPI docs; built-in dependency injection for clean service layer |
| **Async DB Driver** | Motor | Latest | Non-blocking MongoDB access; enables high concurrency without connection pooling limits |
| **Database** | MongoDB | Latest | Flexible schema for hierarchical genetic data; GridFS for binary file storage |
| **Task Queue** | AsyncIO | Built-in | Event-driven architecture with async tasks; avoids Celery/RabbitMQ complexity at MVP stage |
| **Payment** | Stripe | API v2024+ | Webhook-driven subscription state; coupon/promo codes; customer portal for self-service |
| **Email** | SendGrid | v3 API | Transactional email reliability; template support; deliverability tracking |
| **AI/LLM** | OpenAI GPT-5 | API | State-of-the-art text generation; structured JSON output for report parsing; cost-effective for MVP |
| **PDF Rendering** | ReportLab | Latest | Pure Python; no external dependencies; deterministic output for reproducibility |
| **Frontend** | React | 18.3+ | Efficient Virtual DOM; Hooks-based composition; rich ecosystem for health/dashboard UIs |
| **Build Tool** | Vite | 5.4+ | ES module native; <100ms HMR; smaller bundle than Webpack |
| **CSS** | Tailwind | 3.4+ | Utility-first; rapid prototyping; built-in responsive breakpoints; small production bundle |
| **State** | Zustand | 5.0+ | Minimal boilerplate vs Redux; supports middleware; excellent TypeScript support |
| **HTTP Client** | Axios | 1.13+ | Promise-based; interceptors for auth token injection; automatic serialization |
| **Type Safety** | TypeScript | 5.5+ | Compile-time error detection; better IDE autocomplete; self-documenting code |
| **Auth** | JWT + TOTP | Custom | Stateless authentication; 2FA for account security; refresh token rotation for token lifecycle |
| **Encryption** | AES-256 | Custom | Application-level encryption for sensitive fields (SSN, medical notes) before database storage |

---

## Key Engineering Challenges & Learnings

### Challenge 1: Normalizing Inconsistent Genetic Data Across Multiple Sources

**The Problem:** DNA files from 23andMe, Ancestry, and third-party sequencing labs use different SNP nomenclature, allele representations, and data formats. A single biomarker might be labeled as "rs4680", "COMT Val158Met", or "COMT V158M" across providers, making downstream analysis fragile and error-prone.

**The Solution Implemented:**
- **Biomarker Alias Mapping**: Curated dictionary of 40+ alternate names per SNP (e.g., COMT aliases include "Val158Met", "rs4680", "COMT_V158M")
- **Regex-Based Pattern Matching**: Compiled patterns for case-insensitive, boundary-aware matching across raw file text
- **Validation Pipeline**: Each normalized SNP validated against reference allele calls; mismatches logged with user warning
- **Extensible Parser Architecture**: Source-specific parsers (23andMe handler, Ancestry handler, generic handler) inherit from base class, enabling future provider support without refactoring

**Why It Matters:** This is the critical first mile of accuracy. A misparsed SNP leads to incorrect phenotype predictions downstream, undermining user trust in the AI analysis.

---

### Challenge 2: Handling Large Asynchronous File Processing Without Blocking User Sessions

**The Problem:** DNA files can exceed 10MB; naive synchronous parsing locks the API request thread, causing timeout errors and poor UX. Traditional solutions (Celery/Redis) add operational complexity.

**The Solution Implemented:**
- **FastAPI Async-First Design**: All routes declared as `async def`, enabling concurrent request handling
- **Non-Blocking MongoDB**: Motor driver ensures database I/O never blocks the event loop
- **File Processing State Machine**: Parse status transitions (pending → parsing → complete → error) stored in MongoDB; client polls status endpoint
- **Streaming Responses**: Long-running analyses return early with job ID; frontend polls `/status/{job_id}` endpoint for progress
- **Resource Isolation**: Large file parsing occurs in background tasks; doesn't consume request thread

**Why It Matters:** Enables the platform to handle 100+ concurrent users without horizontal scaling complexity. Async nature allows single server to manage throughput of traditional multi-threaded solution.

---

### Challenge 3: Monetization via Subscription Paywall While Maintaining Free Preview Access

**The Problem:** Users must see enough free analysis to decide purchase value, but not so much that they skip payment. Balance between accessibility and revenue creates feature-gating complexity.

**The Solution Implemented:**
- **Dual-Report Architecture**: Single AI analysis generates both snapshot (free, limited) and full report (paid) from same data
- **Stripe Webhook Event Sourcing**: Subscription state immutable and authoritative; all permission checks query Stripe webhook events in MongoDB
- **Grace Period Logic**: Trial extends 3 days past purchase date; allows users to experience full value before trial ends
- **Idempotent Webhook Handlers**: Stripe can retry webhook 5 times; handler checks `idempotency_key` to prevent duplicate processing and double-counting charges

**Why It Matters:** Creates seamless funnel from free trial → paid conversion. Webhook sourcing ensures subscription truth lives in Stripe (single source of truth), not duplicated in local state.

---

### Challenge 4: Secure Handling & Deletion of Sensitive Genetic Data

**The Problem:** DNA data is highly sensitive PII. On user request (or data retention policies), files must be deleted securely—simple `rm` or database `DELETE` operations leave forensic traces that could be recovered.

**The Solution Implemented:**
- **Multi-Pass Overwriting**: File overwritten with 0x00, random bytes, 0xFF before deletion (mimics NIST SP 800-88 secure deletion)
- **Audit Log Entry**: Every deletion creates immutable audit log entry (timestamp, user ID, file name hash—not plaintext)
- **Database Cascades**: Deletion of user triggers cascading delete of all uploads, analysis results, reports (with audit trail)
- **Encryption At Rest**: Sensitive fields (genetic data strings) encrypted with AES-256 before MongoDB storage

**Why It Matters:** HIPAA and GDPR compliance mandate secure deletion. Audit trail enables regulatory audit and forensic investigation if breach discovered.

---

## High-Level API Architecture

The backend exposes a RESTful API organized into logical resource domains. All endpoints return JSON and require JWT authentication (except login/signup).

### Authentication & Authorization

**Core Concepts:**
- **Access Token**: JWT with 30-minute expiry; contains user ID, permissions, token type
- **Refresh Token**: Opaque 32-byte token with 7-day expiry; used to issue new access tokens without re-login
- **Two-Factor Authentication**: Optional TOTP (Time-based One-Time Password) for sensitive operations

**Key Endpoints (Summary)**
- `POST /auth/signup` — Register new user with email/password
- `POST /auth/login` — Authenticate user, return access + refresh tokens
- `POST /auth/refresh` — Exchange refresh token for new access token
- `POST /auth/google/callback` — OAuth 2.0 Google login
- `POST /auth/logout` — Revoke tokens (blacklist them)

---

### User Management & Profile

**Responsibilities:**
- Profile CRUD (name, email, avatar, preferences)
- Subscription status queries (plan type, expiry date, billing next date)
- Preference management (email notifications, data sharing consent)
- Avatar upload with secure storage

**Key Endpoints (Summary)**
- `GET /users/me` — Current user profile
- `PUT /users/me` — Update profile (name, email, preferences)
- `POST /users/avatar` — Upload avatar image
- `GET /users/subscription-status` — Subscription plan, trial status, expiry

---

### DNA Analysis & Reporting

**Responsibilities:**
- File upload ingestion and validation
- SNP parsing and normalization
- AI analysis orchestration (hand off to GPT-5)
- Snapshot and full report generation
- Report download and archive management

**Key Endpoints (Summary)**
- `POST /analyze/upload` — Submit raw DNA file
- `GET /analyze/status/{upload_id}` — Check parse/analysis progress
- `GET /analyze/snapshot/{upload_id}` — Retrieve free snapshot preview
- `GET /analyze/report/{upload_id}` — Retrieve full report (requires active subscription)
- `POST /analyze/request-full-report` — Trigger PDF generation post-purchase
- `GET /analyze/reports/list` — List all user reports with metadata

---

### Blood Lab Integration

**Responsibilities:**
- Lab report file parsing (PDF, CSV, manual entry)
- Biomarker extraction and validation
- Genetic-biomarker correlation analysis
- Lab result trending (historical comparisons)

**Key Endpoints (Summary)**
- `POST /blood/upload` — Submit blood lab report
- `GET /blood/biomarkers/{upload_id}` — Extracted biomarker data
- `GET /blood/analysis` — Genetic-biomarker correlation insights
- `GET /blood/trends` — Historical lab result trends

---

### Subscription & Stripe Integration

**Responsibilities:**
- Subscription plan listing and pricing
- Stripe Checkout session creation
- Webhook event handling for payment success/failure/renewal
- Coupon/promo code validation
- Customer portal access (manage billing, cancel subscription)

**Key Endpoints (Summary)**
- `GET /subscription/plans` — List available subscription tiers
- `POST /subscription/checkout-session` — Create Stripe Checkout session
- `POST /subscription/webhook` — Inbound Stripe webhook (signature verified)
- `GET /subscription/customer-portal` — Link to Stripe Customer Portal
- `POST /subscription/cancel` — Request subscription cancellation (not immediate; respects billing period)

---

### Chatbot & Health Q&A

**Responsibilities:**
- AI-powered conversational health assistant
- Query validation and safety screening (no medical diagnosis)
- Context-aware responses leveraging user's genetic/lab data
- Conversation history storage

**Key Endpoints (Summary)**
- `POST /chatbot/query` — Submit health question
- `GET /chatbot/history` — Conversation history
- `DELETE /chatbot/history/{conversation_id}` — Clear conversation

---

### Admin & System Monitoring

**Responsibilities:**
- User management (view, disable, reset password)
- Report review and quality control
- Audit log querying (user actions, data access events)
- System health monitoring (API uptime, error rates)
- Analytics dashboards (active users, conversion funnel, churn rate)

**Key Endpoints (Summary)**
- `GET /admin/users` — List all users with filters (status, subscription, created_date)
- `GET /admin/reports/{report_id}` — View report quality, user feedback
- `GET /admin/audit-logs` — Query audit logs by user, action, timestamp range
- `GET /admin/analytics` — System metrics (API latency, error rate, active subscriptions)
- `GET /admin/health` — Service health check (DB connectivity, API latency, external service status)

---

### Two-Factor Authentication

**Responsibilities:**
- TOTP secret generation and validation
- Backup code generation and consumption
- 2FA enforcement for sensitive operations (payment, data deletion)

**Key Endpoints (Summary)**
- `POST /2fa/setup` — Initialize 2FA; return secret and QR code
- `POST /2fa/verify` — Verify TOTP code to enable 2FA
- `GET /2fa/backup-codes` — Generate backup codes for account recovery
- `POST /2fa/disable` — Disable 2FA (requires current password + TOTP)

---

### Blog & Educational Content

**Responsibilities:**
- Blog post CRUD (admin-only for creation)
- Content categorization and full-text search
- Member-only content gating
- Related articles recommendations

**Key Endpoints (Summary)**
- `GET /blog/posts` — List published blog posts
- `GET /blog/posts/{post_id}` — Retrieve single post with comments
- `POST /blog/posts` — Create new blog post (admin-only)
- `GET /blog/categories` — List content categories
- `GET /blog/related/{post_id}` — Get related articles

---

## Security Architecture

**Authentication & Access Control:**
- JWT with short expiry + refresh token rotation prevents token compromise
- TOTP 2FA protects against credential stuffing
- Rate limiting (5 failed attempts → 15-min lockout) prevents brute force attacks
- Google OAuth for frictionless secure signup

**Data Protection:**
- Application-level AES-256 encryption for sensitive fields at rest
- TLS 1.2+ for all API transport (enforced via HTTPS)
- CORS policy restricts browser requests to known origins
- CSRF protection via session middleware

**Audit & Compliance:**
- Immutable audit log for all user actions (login, download, delete, payment)
- Data retention policy: analytics purged after 90 days; user data retained per subscription
- Secure file deletion: multi-pass overwriting before removal
- HIPAA-aligned access controls and logging practices

---

## Performance Optimizations

**Backend:**
- Async I/O throughout (FastAPI + Motor) for high concurrency
- MongoDB aggregation pipeline for complex queries (no client-side filtering)
- JWT claims cached in memory to avoid database lookup on every request
- Response streaming for large file downloads

**Frontend:**
- Code splitting at route level; lazy loading of dashboard components
- Zustand for minimal re-render overhead vs Redux
- Tailwind CSS (production build ~35KB gzipped)
- Vite build produces modern ES modules; no transpilation for 90% of browsers

---

## Deployment Architecture

**Frontend:** Vercel or similar static host (auto-deploy from Git)
**Backend:** Railway, Render, or AWS ECS (containerized FastAPI app)
**Database:** MongoDB Atlas (managed; TLS enabled, daily backups)
**File Storage:** AWS S3 or MongoDB GridFS for PDFs and uploads
**Email:** SendGrid (SMTP fallback available)
**Payments:** Stripe (webhook IP whitelist configured)

---

**Built by CodeXcape — Software Solutions**
