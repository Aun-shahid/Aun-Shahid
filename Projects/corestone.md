# Corestone Grader

**AI-Powered Essay Evaluation for the IBDP Extended Essay and Theory of Knowledge Essays**

Corestone automates the feedback loop for rigorous academic writing through GPT-4 powered semantic analysis of student essays against custom rubrics, solving the time-intensive task of manual essay grading at scale while maintaining institutional grading consistency.

---

## Badges

![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white) ![Python 3.9+](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?logo=mongodb&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-green)

---

## Live Demo & Links

| Link | URL |
|------|-----|
| **Live Application** | [corestonegrader.ai](https://corestonegrader.ai) |
| **Repository** | [GitHub - Corestone](https://github.com/your-org/corestone) |
| **Demo Credentials** | Email: `demo@corestonegrader.ai` / Password: `demo123` |

---

## Key Features & Capabilities

-   **AI-Powered Essay Evaluation**: Automated assessment using OpenAI's GPT-4o model with rubric-aware evaluation logic and detailed criterion-level feedback
-   **Dynamic Rubric Engine**: Create and manage custom evaluation rubrics with flexible scoring structures, criterion weighting, and achievement bands
-   **Role-Based Access Control**: Granular permission system supporting Student, Teacher, Admin, and Super-Admin roles with isolated data contexts
-   **Multi-Document Support**: Process `.pdf` and `.docx` submissions with automated text extraction and format validation
-   **Real-Time Evaluation Tracking**: Polling-based status updates for long-running AI evaluations with client-side queue management
-   **Admin Grade Override System**: Teacher and admin override capabilities with audit trails and approval workflows
-   **Subscription & Credit System**: Stripe-integrated tiered plans with per-user essay credit tracking and unlimited evaluation tiers
-   **Comprehensive Analytics Dashboard**: Real-time performance metrics, submission volume tracking, user engagement analytics, and streaming data pipelines
-   **OAuth 2.0 Integration**: Google authentication with cross-domain token management and secure JWT refresh mechanisms
-   **External Resource Management**: Educational link curation with click-through tracking and institutional analytics

---

## Architecture & Technical Deep Dive

### System Design Overview

Corestone employs a **decoupled monorepo architecture** where the frontend and backend communicate exclusively via REST APIs, enabling independent scaling and deployment. The system handles the full lifecycle of essay evaluation: submission → validation → AI processing → storage → feedback delivery.

**Data Flow:**
```
User Submission → File Extraction → Essay Validation → AI Evaluation Queue 
→ GPT-4o Processing → Rubric-Based Scoring → MongoDB Persistence 
→ Status Polling → Frontend Render → PDF Export
```

### Backend Architecture: Async-First Processing

The backend leverages **FastAPI with Motor (async MongoDB driver)** to eliminate blocking I/O. Every operation—from database queries to external API calls—uses `async/await`, enabling the single-threaded event loop to handle hundreds of concurrent requests efficiently. The **service layer pattern** decouples business logic from HTTP routing:

- **AIEvaluationService**: Manages OpenAI client lifecycle, prompt engineering with rubric context, retry logic with exponential backoff, and timeout handling for long-running evaluations (configurable up to 300s)
- **EvaluationService**: Orchestrates the evaluation workflow—essay credit validation, async evaluation queueing, result persistence, and failure recovery
- **RubricService**: Handles rubric operations, scoring structure validation, criterion extraction, and grading boundary calculation
- **DashboardService**: Aggregates analytics from MongoDB with streaming response support for real-time dashboards

**Critical Design Decision**: The architecture separates concerns into thin HTTP routers (FastAPI endpoints) that delegate to services. This enables testability, reusability, and clear error handling with specific HTTP status codes.

### Frontend State Management Architecture

Rather than Redux, Corestone uses **React Context + Custom Hooks** for optimal code clarity and bundle size. This pattern proved superior for this domain:

- **AuthContext**: Manages user identity, token persistence (localStorage with optional cookie fallback), token expiration logic, and OAuth flow orchestration
- **SubmissionContext**: Maintains essay submission state across components with event-driven updates
- **Custom Hooks** (e.g., `useEvaluation`, `useRealTimeEvaluation`): Encapsulate API call logic, polling mechanisms, and local state, following the container/presentational component pattern

**Key Architecture Pattern**: The `useRealTimeEvaluation` hook implements **exponential backoff polling** to check evaluation status without overwhelming the server. Combined with `isInitializing` and `isLoading` flags, the frontend maintains precise state transitions during auth recovery and async operations.

### Database Design: MongoDB with Motor

Collections employ a **document-oriented schema** with strategic indexing for query performance:

- **users**: User profiles, subscription metadata, essay credits, OAuth identifiers
- **evaluations**: Essay content, submitted rubric reference, AI results, approval status, created/updated timestamps
- **rubrics**: Criterion definitions, scoring structures, extraction logic for automated prompt generation
- **subscriptions**: Stripe payment metadata, plan tier mapping, trial periods, credit allocation
- **external_links**: Educational resources with click-through tracking for institutional analytics

**Async Pattern**: Motor's `AsyncIOMotorClient` integrates seamlessly with FastAPI's async event loop, preventing connection pool exhaustion and enabling graceful shutdown via lifespan context managers.

### External API Integration: Reliability Through Retry Logic

**OpenAI Integration**: The system calls GPT-4o with a **Pydantic-validated system prompt** derived from the selected rubric. The prompt includes:
- Rubric criteria definitions
- Scoring boundaries for each criterion
- Essay type context (Extended Essay vs. TOK)
- Evaluation instructions for holistic commentary

Robustness mechanisms include:
- Configurable max retries (default 3) with exponential backoff
- Request timeouts (default 300s for complex essays)
- Fallback error handling with detailed user messaging
- Essay content validation (min 50 words, max 100k characters) before API calls

**Stripe Integration**: Checkout session creation, webhook validation for payment status, and credit allocation tied to subscription tier.

**Google OAuth**: Token exchange with ID token validation, cross-domain redirect handling, and migration of tokens from cookies (initial auth) to localStorage (subsequent sessions).

---

## Tech Stack & Justification

| Component | Technology | Justification |
|-----------|-----------|---------------|
| **Frontend Framework** | React 18 + TypeScript | Type safety during complex state flows (auth tokens, polling state); extensive ecosystem for educational UIs |
| **Frontend Build** | Vite | 10x faster HMR than Webpack; modern ESM-first approach; production bundle optimization |
| **Frontend Styling** | Tailwind CSS | Utility-first approach minimizes CSS overhead; rapid prototyping of educational dashboards; custom theme classes |
| **Frontend Routing** | React Router v6 | Standardized routing for role-based layouts (student vs. admin vs. teacher views) |
| **Frontend HTTP** | Axios + Interceptors | Automatic JWT injection in headers; centralized error handling; response transformation for Pydantic models |
| **Backend Framework** | FastAPI | Async-first with automatic OpenAPI documentation; Pydantic validation; superior performance vs. Django REST Framework |
| **Backend Async Driver** | Motor (MongoDB) | Fully async, non-blocking database driver; integrates seamlessly with FastAPI event loop |
| **Database** | MongoDB | Flexible schema for rubric variations (Extended Essay vs. TOK); horizontal scalability; native async support via Motor |
| **Authentication** | JWT + python-jose | Stateless authentication enables horizontal scaling; OAuth 2.0 Google integration for institutional SSO |
| **AI Integration** | OpenAI GPT-4o | Superior semantic understanding for essay evaluation; lower latency than alternatives; cost-effective for per-token billing |
| **Payments** | Stripe API | Industry standard; webhook-based architecture for event-driven credit allocation; PCI compliance handled by provider |
| **Response Format** | ORJSON | 3-10x faster JSON serialization vs. stdlib json; critical for real-time dashboards with large datasets |
| **Logging** | Python logging + SystemLogger | Centralized request/response logging; audit trail for grade overrides; production debugging |
| **File Processing** | python-pptx, Mammoth | PDF/DOCX parsing with text extraction; handles institutional document formats |
| **Deployment** | Railway | Container-native deployment; seamless integration with MongoDB Atlas; PostgreSQL-optional for session management |

---

## Key Engineering Challenges & Learnings

### Challenge 1: Asynchronous Processing at Scale

**Problem**: Essay evaluation involves long-running OpenAI API calls (5-30 seconds). Blocking I/O would exhaust server resources with 100+ concurrent users.

**Solution**: 
- Implemented **async/await throughout the stack** using Motor for database operations and AsyncOpenAI client for API calls
- Added **configurable timeouts and retry logic** (exponential backoff) to gracefully handle API failures
- Frontend implements **polling-based status tracking** via `useRealTimeEvaluation` hook with exponential backoff (avoid thundering herd problem)
- Decoupled evaluation processing from HTTP responses using service-layer queueing

**Learning**: True async architecture requires discipline—even a single blocking operation (e.g., synchronous file read) will stall the event loop. Solution: Use `asyncio.to_thread()` for I/O-bound blocking operations, or replace with async libraries (Motor vs. PyMongo).

### Challenge 2: Cross-Domain Authentication State Consistency

**Problem**: OAuth callback flows (Google → Backend → Frontend) create token exchange challenges. Tokens must persist across page refreshes, but OAuth often provides tokens via URL parameters (security risk) or cookies (cross-domain issues).

**Solution**:
- Backend redirects OAuth success to frontend with tokens in URL parameters; frontend immediately moves them to localStorage
- AuthContext maintains **dual state flags**: `isInitializing` (app startup) vs. `isLoading` (user action), preventing race conditions during token refresh
- Automatic token refresh via `useEffect` hook: if access token expires but refresh token exists, fetch new access token before rendering
- Cookie-to-localStorage migration pattern for backward compatibility

**Learning**: OAuth flows are complex when frontend and backend are on different domains. URL parameter handoff is secure if done over HTTPS with immediate token migration. Never store sensitive tokens in localStorage-only—always combine with secure HTTP-only cookies for XSS protection (where applicable).

### Challenge 3: Real-Time Evaluation Feedback Without WebSockets

**Problem**: Users expect live feedback as their essays are being evaluated, but WebSocket infrastructure adds complexity and operational overhead.

**Solution**:
- Implemented **smart polling** via `useRealTimeEvaluation` hook with exponential backoff (start at 1s, increase to 30s)
- Evaluation status returned as quick lightweight queries (just status field)
- PDF generation triggers only after completion (lazy load)
- Streaming responses for dashboard analytics via FastAPI `StreamingResponse`

**Learning**: Polling is underrated for many real-time scenarios. With intelligent backoff, you can achieve acceptable UX without WebSocket complexity. Use server-sent events (SSE) or WebSockets only when true bi-directional communication is required.

---

## High-Level API Architecture

### Authentication & Authorization
- `POST /auth/login`: JWT token generation with 15-minute access token + 7-day refresh token
- `POST /auth/register`: User account creation with email/password or OAuth provider
- `POST /auth/refresh`: Access token renewal using refresh token
- `GET /auth/google/callback`: Google OAuth exchange, token handoff to frontend
- `POST /auth/forgot-password`, `POST /auth/reset-password`: Password reset workflow with email verification

### Essay Evaluation Endpoints
- `POST /evaluation`: Submit essay for evaluation; validates credits, queues AI processing, returns evaluation ID
- `GET /evaluation/{id}`: Retrieve evaluation results (blocking until complete, with timeout)
- `GET /evaluation/my-evaluations`: List user's submissions with pagination and filtering
- `PUT /evaluation/{id}`: Teacher/admin override of grades with approval workflow
- `POST /evaluation/{id}/approve`: Admin approve overridden grade
- `POST /evaluation/{id}/reject`: Reject grade override with comments
- `GET /evaluation/{id}/pdf`: Download evaluation as formatted PDF report

### Rubric Management
- `POST /rubrics`: Create new custom rubric with criterion definitions and scoring structure
- `GET /rubrics`: List available rubrics filtered by type (Extended Essay vs. TOK)
- `PUT /rubrics/{id}`: Update rubric definition (invalidates dependent evaluations)
- `DELETE /rubrics/{id}`: Soft delete rubric from active use
- `POST /rubrics/validate`: Validate rubric structure and scoring boundaries before saving

### User & Role Management
- `GET /users/me`: Retrieve authenticated user profile and permissions
- `PUT /users/profile`: Update user information (name, avatar, preferences)
- `PUT /users/role`: Admin-only endpoint to change user role (Student → Teacher → Admin)
- `GET /users`: Admin list all users with filtering by role and status
- `POST /users/admin-create`: Admin create user with temporary credentials
- `POST /users/{id}/credits`: Admin allocate essay credits to user

### Subscription & Billing
- `GET /plans`: List available subscription plans with feature tiers
- `POST /subscribe/checkout`: Create Stripe checkout session for subscription
- `POST /subscribe/webhook`: Handle Stripe payment status updates (credit allocation)
- `POST /subscribe/trial`: Start free trial period (configurable duration)
- `GET /subscribe/status`: Retrieve user's subscription tier and remaining credits

### Dashboard & Analytics
- `GET /dashboard/stats`: Real-time evaluation metrics (submissions, completion rate, avg. grade)
- `GET /dashboard/performance`: User performance trends (paginated historical data)
- `GET /dashboard/stream`: Streaming endpoint for live dashboard updates (Server-Sent Events)

### External Resources
- `POST /external-links`: Create managed educational resource link
- `GET /external-links`: List available resources for institutional use
- `POST /external-links/{id}/track-click`: Record click-through for analytics

---

## Repository Structure

```
corestone/
├── Backend/                           # FastAPI application
│   ├── src/
│   │   ├── main.py                    # FastAPI app initialization, middleware, CORS
│   │   ├── config.py                  # Pydantic settings with env var loading
│   │   ├── database.py                # Motor MongoDB connection, collection getters
│   │   ├── startup_validator.py       # Health checks at app startup
│   │   ├── logging_config.py          # Centralized logging setup
│   │   ├── api/v1/                    # Versioned API routes
│   │   │   ├── auth/                  # Authentication endpoints
│   │   │   ├── evaluation/            # Essay evaluation workflows
│   │   │   ├── rubrics/               # Rubric management
│   │   │   ├── users/                 # User management
│   │   │   ├── subscribe/             # Stripe subscription
│   │   │   ├── dashboard/             # Analytics endpoints
│   │   │   └── external_links/        # Resource management
│   │   ├── auth/                      # Auth utilities
│   │   │   ├── jwt.py                 # Token creation/verification
│   │   │   ├── dependencies.py        # Dependency injection (get_current_user)
│   │   │   └── permissions.py         # Role-based access control
│   │   ├── models/                    # Pydantic models for serialization
│   │   │   ├── evaluation.py          # Evaluation data structures
│   │   │   ├── users.py               # User models
│   │   │   ├── rubrics.py             # Rubric definitions
│   │   │   └── ...
│   │   └── services/                  # Business logic layer
│   │       ├── ai_evaluation_service.py  # OpenAI integration
│   │       ├── evaluation_service.py     # Evaluation orchestration
│   │       ├── rubric_service.py        # Rubric operations
│   │       ├── dashboard_service.py     # Analytics aggregation
│   │       ├── email_service.py         # SendGrid integration
│   │       ├── oauth_service.py         # Google OAuth
│   │       └── pdf_service.py           # PDF generation
│   └── requirements.txt                # Python dependencies
│
├── Frontend/                           # React + TypeScript application
│   ├── src/
│   │   ├── main.tsx                   # React entry point
│   │   ├── App.tsx                    # Root component with routing
│   │   ├── index.css                  # Global styles and Tailwind directives
│   │   ├── components/                # React components
│   │   │   ├── Auth/                  # Login, OAuth, password reset
│   │   │   ├── Dashboard/             # Student/teacher dashboards
│   │   │   ├── Admin/                 # Admin panels
│   │   │   ├── Upload/                # Essay file upload
│   │   │   ├── Results/               # Evaluation results display
│   │   │   └── common/                # Shared components
│   │   ├── context/                   # React Context providers
│   │   │   ├── AuthContext.tsx        # Authentication state
│   │   │   └── SubmissionContext.tsx  # Submission state
│   │   ├── hooks/                     # Custom React hooks
│   │   │   ├── useAuth.ts             # Auth operations
│   │   │   ├── useEvaluation.ts       # Evaluation CRUD
│   │   │   ├── useRealTimeEvaluation.ts  # Polling for status
│   │   │   ├── useDashboard.ts        # Analytics data
│   │   │   └── ...
│   │   ├── services/                  # API client services
│   │   │   ├── auth.service.ts        # Auth API calls
│   │   │   ├── evaluation.service.ts  # Evaluation API
│   │   │   └── ...
│   │   ├── types/                     # TypeScript interfaces
│   │   │   ├── evaluation.ts          # Evaluation types
│   │   │   ├── users.ts               # User types
│   │   │   └── ...
│   │   └── utils/                     # Utility functions
│   │       ├── validation.ts          # Form validation
│   │       ├── security.ts            # Token handling
│   │       └── ...
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md                          # This file
```

---

## Deployment & Operations

The application is containerized and deployed on **Railway** with the following architecture:

- **Backend**: Uvicorn server with auto-scaling based on memory/CPU
- **Frontend**: Static build deployed to CDN
- **Database**: MongoDB Atlas (managed MongoDB cloud service)
- **Environment Configuration**: `.env` files with separate configs for development, staging, production

Both services are deployed independently, allowing for A/B testing, blue-green deployments, and isolated scaling strategies.

---

**Created**: June 2026 | **Status**: Production | **License**: MIT
