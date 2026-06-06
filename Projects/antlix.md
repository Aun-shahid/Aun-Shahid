ANTLIX
# ANTLIX

**AI-Powered Image Generation and Editing Platform with Intelligent Credit-Based Economics**

![Python](https://img.shields.io/badge/Python-3.9+-3776ab?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178c6?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-13aa52?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)

---

## 📌 Overview

**ANTLIX** is a full-stack, production-ready platform that democratizes AI-powered creative tools. It enables users to generate photorealistic, artistic, and stylized images from text prompts, then enhance them using advanced AI-driven editing capabilities. The platform implements a sophisticated credit-based subscription ecosystem with Stripe integration, role-based access control, and enterprise-grade authentication.

---

## 🎯 Key Features & Capabilities

### **Image Generation Engine**
- **Multi-Model Support**: Ultra (high-quality, $0.08), Core (standard, $0.04), and specialized models (Realistic, Anime, Artistic, Portrait)
- **Flexible Input Modes**: Text-to-image and image-to-image generation with customizable parameters (resolution, aspect ratio, CFG scale, inference steps)
- **Dynamic Credit Costing**: Model-aware pricing tied to actual API costs, enabling sustainable economics
- **Background Task Processing**: Asynchronous generation pipeline with automatic gallery auto-save and system logging

### **Intelligent Image Editing Toolkit**
- **Seven Specialized Tools**: Background removal, face swapping, inpainting, AI-powered filters, upscaling, advanced image editing, and object erasure
- **Service-Oriented Architecture**: Modular tool implementations leveraging Stability AI and Gemini APIs
- **Cost-Optimized Operations**: Per-operation credit deduction with real-time balance validation

### **Subscription & Credit Management**
- **Four-Tier Model**: Free (10 credits), Basic (100), Intermediate (500), and Unlimited plans
- **Flexible Billing**: Monthly and yearly subscription options with Stripe Webhooks for lifecycle events
- **Trial System**: Automatic trial credential provisioning with expiration tracking
- **Credit Audit Trail**: Comprehensive logging of all credit transactions for transparency and billing accuracy

### **User Authentication & Authorization**
- **JWT-Based Architecture**: Access and refresh tokens with automatic token refresh interceptors (frontend)
- **OAuth Integration**: Google OAuth flow with seamless account linking
- **Role-Based Access Control**: Three-tier hierarchy (User, Admin, Super Admin) with permission-scoped endpoints
- **Session Management**: Persistent refresh tokens with expiration tracking and cleanup

### **Gallery & Content Management**
- **Persistent Storage**: Generation and editing history with rich metadata (timestamps, parameters, edit chains)
- **Visibility Control**: Public, private, and shared content visibility levels
- **Engagement Metrics**: Like/unlike functionality with real-time counter updates

### **Admin & System Operations**
- **Comprehensive Logging**: System-wide event logging with filtering, pagination, and search capabilities
- **User Administration**: Subscription lifecycle management, role assignment, and account status control
- **Analytics Dashboard**: Aggregate statistics for generation counts, credit usage, and subscription trends

---

## 🏗️ Architecture & Technical Deep Dive

### **System Design Overview**

ANTLIX follows a **service-oriented, async-first architecture** designed for high-concurrency image processing workloads:

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer (React)                    │
│  - Context-based state management (Auth, Toast, Theme)      │
│  - Axios interceptors for JWT auto-refresh                  │
│  - i18n multi-language support                              │
└─────────────────────────────────────────────────────────────┘
                            ↓ (REST API)
┌─────────────────────────────────────────────────────────────┐
│              FastAPI Application Server                      │
│  - Async request handlers with dependency injection         │
│  - CORS & Session middleware for OAuth flows                │
│  - Lifespan events for DB connection management             │
├─────────────────────────────────────────────────────────────┤
│  Route Layers:                                              │
│  ├─ Authentication (JWT, OAuth, Refresh)                   │
│  ├─ User Management (Profiles, Settings)                    │
│  ├─ Image Generation (Text-to-Image, Image-to-Image)       │
│  ├─ Image Editing (7 editing tools)                        │
│  ├─ Gallery (CRUD operations, search)                      │
│  ├─ Subscriptions (Stripe webhooks, plans)                 │
│  └─ System Operations (Admin, logging)                      │
└─────────────────────────────────────────────────────────────┘
                            ↓ (Async Driver)
┌─────────────────────────────────────────────────────────────┐
│          MongoDB Database with GridFS Buckets               │
│  - users (profiles, subscriptions, settings)                │
│  - images (generation/editing results in GridFS)            │
│  - galleries (metadata for grouped images)                  │
│  - subscriptions (Stripe customer records)                  │
│  - system_logs (audit trail)                                │
└─────────────────────────────────────────────────────────────┘
                            ↓ (SDK/HTTP)
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Stability AI    │  │  Stripe           │  │  Google OAuth    │
│  (Gen/Editing)   │  │  (Subscriptions)  │  │  (Auth)          │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### **Database Schema & Data Flow**

**User Document Structure**:
- Core identity (email, UUID, OAuth provider)
- Subscription state (plan type, Stripe customer ID, expiry dates)
- Credit economy (current balance, max credits, monthly reset tracking)
- Profile enrichment (username, bio, location, website, avatar GridFS reference)
- Role-based access (user type: user/admin/super_admin)

**Image Storage Strategy**:
- **GridFS Buckets**: Binary image data stored directly in MongoDB, avoiding external file service dependencies
- **Metadata Layer**: Separate documents track generation/editing parameters, timestamps, and user ownership
- **Efficient Retrieval**: MongoDB indexes on user_id and creation_date enable fast query performance

**Credit Transaction Flow**:
```
User Requests Generation → Check Credit Balance → Call External API 
  → Success: Save to Gallery + Deduct Credits + Log Event 
  → Failure: Revert Transaction + Return Error
```

### **Key Design Patterns**

**1. Service Layer Pattern**
- `generation_service.py`: Orchestrates model selection, API calls, and GridFS uploads
- `editing_service.py`: Manages tool routing and asynchronous batch processing
- `gallery_service.py`: Handles CRUD and auto-save operations
- Decouples business logic from HTTP handlers, enabling testability and reusability

**2. Async-First Architecture**
- All database operations use `Motor` (async MongoDB driver), eliminating blocking I/O
- External API calls use `httpx.AsyncClient` with 120-second timeouts for reliability
- Background task processing prevents request handler blocking for long-running operations

**3. JWT Token Refresh Mechanism**
- Frontend maintains two tokens: short-lived access (30 min) and long-lived refresh (7 days)
- Axios interceptors automatically refresh expired tokens without user interaction
- Backend validates token type to prevent token confusion attacks

**4. Lazy Resource Initialization**
- Database connections and GridFS buckets initialized only on first service access
- Prevents circular dependency issues during application startup
- Enables graceful degradation if database is temporarily unavailable

**5. Role-Based Access Control (RBAC)**
- Dependency injectors enforce role checks at endpoint level
- Supports granular permission scoping (e.g., only admins can view system logs)
- Integrates with JWT claims for stateless authorization

---

## 💻 Tech Stack & Engineering Justification

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Backend Runtime** | FastAPI (Python) | Async/await native support enables high-concurrency image processing without thread overhead; automatic OpenAPI documentation reduces API documentation burden. |
| **Database** | MongoDB + Motor | Schema flexibility for evolving user profiles and subscription models; Motor provides native async support matching FastAPI's non-blocking paradigm; GridFS eliminates external file storage complexity. |
| **File Storage** | GridFS (MongoDB) | Transactional consistency with metadata; no external S3/Cloudflare dependencies; simplified deployment and backup strategies. |
| **Frontend Framework** | React 18 | Server-side independence enables seamless frontend updates; Context API with hooks simplifies state management without Redux complexity; TypeScript ensures type safety across large codebase. |
| **Frontend Bundler** | Vite | Sub-100ms HMR enables rapid iteration during development; tree-shaking and code-splitting optimize production bundle size; esbuild-based transpilation delivers 10-100x faster builds than Webpack. |
| **Styling** | Tailwind CSS | Utility-first approach reduces CSS payload; rapid prototyping of responsive layouts; PostCSS pipeline enables production purging. |
| **Payment Processing** | Stripe | Industry-standard PCI compliance; webhook-driven event architecture for subscription lifecycle; native tax/VAT handling. |
| **Authentication (OAuth)** | Google OAuth 2.0 | Reduces password-related security burden; high user adoption rates; reduces support overhead. |
| **HTTP Client (Frontend)** | Axios | Request/response interceptors simplify JWT token refresh logic; automatic JSON serialization; built-in timeout and retry mechanisms. |
| **Internationalization** | i18next | 10+ language translations supported via JSON config; lazy-loading namespaces reduce initial bundle size. |
| **Async HTTP (Backend)** | httpx | AsyncIO-native, eliminating GIL contention; timeout and retry decorators reduce boilerplate for external API resilience. |

---

## ⚙️ Key Engineering Challenges & Solutions

### **Challenge 1: Concurrent Credit Deduction with API Failures**

**Problem**: Race conditions in credit deduction when multiple simultaneous generation requests occur. If an external API fails mid-generation, the user's credits are already deducted but no image is produced.

**Solution Implemented**:
- Credit validation occurs **before** external API invocation
- GridFS image save and credit deduction are **atomically grouped** in a single transaction
- If API succeeds but save fails, credits are not deducted
- Background task logging ensures failed attempts are audited for refund processing
- User-facing error messages distinguish between "insufficient credits" vs. "API temporarily unavailable"

### **Challenge 2: Managing Async File Uploads to GridFS**

**Problem**: Large image files (up to 2.25MP) uploaded to GridFS may timeout or fail mid-upload. Partial uploads corrupt the database. Binary streaming over HTTP requires careful buffering.

**Solution Implemented**:
- GridFS bucket configured with chunked streaming (default 255KB chunks)
- Base64 encoding in request payloads allows synchronous validation before upload begins
- Temporary in-memory BytesIO buffers prevent disk I/O bottlenecks
- PIL Image validation (metadata extraction) ensures image integrity before storage
- GridFS automatic indexing on upload timestamps enables efficient cleanup of orphaned chunks

### **Challenge 3: Seamless JWT Token Refresh Without Circular Dependencies**

**Problem**: Frontend's Axios interceptors must refresh tokens without circular imports. Backend refresh endpoint cannot depend on dependency-injected current user without causing auth loop.

**Solution Implemented**:
- Refresh endpoint validates refresh token **directly** (not via dependency injector)
- Axios interceptor queue mechanism prevents multiple simultaneous refresh requests
- Separate `AuthServiceRef` interface decouples API layer from auth service
- 401 response handler retries original request after obtaining new access token
- Frontend maintains separate `isRefreshing` flag to batch multiple queued requests

### **Challenge 4: Real-Time Credit Balance Consistency**

**Problem**: Subscription downgrades, refunds, and monthly resets must update credit balances across concurrent requests. Stale reads lead to oversold credits.

**Solution Implemented**:
- MongoDB `$inc` operator performs atomic counter updates without read-modify-write cycles
- Generation requests compute cost upfront and check `current_credits >= cost_needed`
- Monthly reset scheduled via system logs with timestamp tracking prevents double-reset bugs
- Admin refund operations trigger audit log entries with operator ID for accountability
- Frontend refetches user data after every transaction to reflect server-side balance

---

## 🔌 High-Level API Architecture

### **Authentication & Authorization**
- **`POST /api/v1/auth/login`**: Credential-based authentication with JWT token issuance
- **`POST /api/v1/auth/register`**: Account creation with email verification
- **`POST /api/v1/auth/google-callback`**: OAuth token exchange and account linking
- **`POST /api/v1/auth/refresh`**: Refresh token rotation for extended sessions
- **`POST /api/v1/auth/logout`**: Token invalidation and session cleanup

### **User Management**
- **`GET /api/v1/users/me`**: Fetch current authenticated user profile with subscription state
- **`PUT /api/v1/users/me`**: Update profile fields (bio, location, website, display name)
- **`PUT /api/v1/users/avatar`**: Upload or update user avatar with GridFS persistence
- **`GET /api/v1/users/{user_id}`**: Public user profile (admin-only detailed view)

### **Image Generation**
- **`POST /api/v1/generation/generate`**: Create images from text or image prompts (async background task)
- **`GET /api/v1/generation/history`**: Paginated generation history with filtering by model/date
- **`GET /api/v1/generation/{generation_id}`**: Retrieve specific generation metadata and image URL
- **`DELETE /api/v1/generation/{generation_id}`**: Soft-delete generation and reclaim storage quota

### **Image Editing**
- **`POST /api/v1/editing/{tool_name}`**: Execute specific editing tool (background-remover, face-swap, etc.)
- **`GET /api/v1/editing/history`**: View edit operation history with tool breakdown statistics
- **`POST /api/v1/editing/{edit_id}/undo`**: Revert single edit and restore prior image state
- **`POST /api/v1/editing/{edit_id}/fork`**: Branch edit chain for A/B testing

### **Gallery Management**
- **`GET /api/v1/gallery`**: List user's saved images with metadata and engagement metrics
- **`POST /api/v1/gallery`**: Create new gallery collection
- **`POST /api/v1/gallery/{gallery_id}/images/{image_id}`**: Add generation/edit output to collection
- **`POST /api/v1/gallery/{image_id}/like`**: Toggle like status with real-time counter updates
- **`GET /api/v1/gallery/public`**: Browse public galleries with full-text search support

### **Subscription & Billing**
- **`GET /api/v1/plans`**: List available subscription tiers with feature comparison
- **`POST /api/v1/subscription/create-checkout`**: Initiate Stripe checkout session for new subscription
- **`POST /api/v1/subscription/cancel`**: Request subscription cancellation with end-of-period option
- **`POST /api/v1/subscription/webhook`**: Stripe webhook handler for subscription lifecycle events (created, updated, deleted)
- **`GET /api/v1/subscription/status`**: Fetch current subscription state and billing details

### **Dashboard & Analytics**
- **`GET /api/v1/dashboard/stats`**: Aggregate statistics (total credits used, generations count, active users)
- **`GET /api/v1/dashboard/usage-breakdown`**: Per-model and per-tool usage metrics for cost optimization

### **System Administration**
- **`GET /api/v1/system-logs`**: Filtered system logs with pagination (admin-only)
- **`POST /api/v1/system-logs/export`**: Export audit logs as CSV for compliance audits
- **`POST /api/v1/users/{user_id}/refund-credits`**: Manual credit refund with operator tracking

---

## 📊 Data Model Highlights

### **User Subscription State Machine**
```
FREE (initial)  
  ↓ (purchase)
ACTIVE (subscription valid)
  ├─ (expiration)
  └─ EXPIRED (auto-triggered on cron)
  ↓ (manual upgrade)
TRIAL (free trial period)
  ├─ (expiration)
  └─ AUTO_CONVERTED_TO_FREE
```

### **Credit Economy**
- **Generation Models**: Ultra ($0.08/img = 80 credits), Core ($0.04 = 40 credits), others ($0.06 = 60 credits)
- **Editing Tools**: Background removal ($0.05 = 50 cr), Face swap ($0.014 = 14 cr), Inpainting ($0.05 = 50 cr), Filters ($0.03 = 30 cr), Upscaling ($0.02 = 20 cr), Object erasure ($0.05 = 50 cr)
- **Monthly Resets**: Annual subscribers receive monthly credit allowance reset; monthly subscribers reset on billing anniversary

---

## 🚀 Deployment Considerations

- **Backend**: Containerized FastAPI on Railway with automatic HTTPS, database connection pooling configured
- **Frontend**: Static site deployment on Vercel/Railway with Vite production builds
- **Environment Parity**: Development (localhost:8000/5173) and production configurations unified via environment variables
- **Database**: MongoDB Atlas with IP whitelist, automatic backups, and read-replica support for scaling
- **Secrets Management**: API keys (Stability AI, Stripe, OpenAI) stored as environment variables, never in version control

---

## 📝 Additional Documentation

For detailed API specifications, refer to the **FastAPI Auto-Generated Docs** available at `/docs` (Swagger UI) or `/redoc` (ReDoc).

For architecture decisions and project philosophy, consult the **Copilot Instructions** embedded in `.github/copilot-instructions.md`.

---

**Built with precision. Powered by AI. Built for creators.**
