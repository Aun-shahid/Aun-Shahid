styleclone
# StyleClone AI

> **Democratizing personalized interaction by cloning and adapting communication styles through real-time telemetry, asynchronous thread synchronization, and resilient fallback execution.**

---



---

### Live Demo & Credentials

* **Production Live Link:** [StyleClone AI Interface](https://aipoweredchatbot-frontend-production.up.railway.app)
* **Code Repository Link:** [StyleClone Core Repository](https://github.com/Codebybiya/styleclone)
* **Demo Administrator Access:**
  * **Identifier:** admin@styleclone.ai
  * **Credential:** StyleCloneAdmin2026!
* **Demo Customer Access:**
  * **Identifier:** customer@styleclone.ai
  * **Credential:** StyleCloneCustomer2026!

---

### Key Features & Capabilities

* **Adaptive Writing Style Adaptation Engine:** Evaluates user conversation telemetry (lexicon, sentence complexity, tone, response length) via a sliding-window analyzer. The engine leverages language models to synthesize these patterns into dynamic system instructions, updating the persona's prompt dynamically without manual fine-tuning.
* **Asynchronous Hybrid Thread Synchronization:** Eliminates blocking network calls during user interactions by maintaining a local message cache in MongoDB. A background sync worker manages an asynchronous priority queue to serialize, schedule, and replicate chat states with OpenAI's Thread APIs, handling connection retries with exponential backoff.
* **Fault-Tolerant Direct Fallback Pipeline:** Maintains application availability during API rate limits or outages. When OpenAI's Assistant API fails, the backend triggers a service-level circuit breaker, routing traffic to a direct Chat Completion fallback that compiles local MongoDB conversation history to preserve user experience.
* **Multiformat Document Processing and Ingestion Engine:** Automates raw data ingest (PDF, DOCX, TXT) into stylized reference corpora. The pipeline features thread-pooled processing for CPU-bound extraction, character encoding auto-detection (using confidence heuristics), repeating header/footer stripping (filtering structural page clutter appearing on more than 60% of pages), and paragraph/table layout reconstruction.
* **Multi-Tenant Access Control & Billing Integration:** Implements role-based access controls (Super Admin, Admin, Course Admin, Customer) paired with Stripe subscription tier verification, regulating system features, credit allocations, and analytical dashboards.

---

### Architecture & Technical Deep Dive

#### High-Level System Design & Data Flow
The application follows a decoupled client-server architecture. The Frontend client interacts with the FastAPI backend through a unified REST API layer. When a user interacts with the chatbot:
1. Message telemetry is written immediately to the local MongoDB database.
2. The User Chat component renders the response instantly, bypassing blocking network synchronization.
3. The Sync Service schedules message replication to the remote OpenAI Thread asynchronously in the background.
4. When a run completes, the assistant's response is pulled back, stored locally, and pushed to the client.
5. If the OpenAI API fails, the Fallback Service triggers direct prompt compilation using local historical context to avoid timeouts or crashes.

#### Database Schema Choices
MongoDB serves as the central data store, selected for its schema-less documents, which accommodate evolving persona configurations, dynamic system logs, and unstructured thread history. Key models include:
* **Users & Subscriptions:** Stores credentials, RBAC roles, Stripe status, and daily credit usage.
* **Personas:** Contains specialized instructions, temperature settings, and style profiles.
* **Conversations & Messages:** Logs localized chat histories, unique external Thread identifiers, and synchronization states.
* **System Logs:** Captures telemetry events, database performance metrics, and fallback occurrences.

#### Design Patterns and State Management
The system utilizes several design patterns to guarantee resilience and high performance:
* **Circuit Breaker Pattern:** Monitored within the Fallback Service to track errors per external service.
* **Scheduler/Queue Pattern:** Powered by an asynchronous FIFO queue with exponential backoff retry delays.
* **Singleton Pattern:** Employed for centralized caching and log management.
* **Custom LRU-TTL Cache Store:** Implemented using Python's OrderedDict and an asynchronous Lock, caching database queries to reduce database latency.
* **React Context State:** Manages user sessions and authentication states at the frontend root.

---

### Tech Stack & Justification

| Layer | Technology | Engineering Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 & Vite | Facilitates high-performance UI rendering and fast development cycles using hot module replacement, optimizing dashboard telemetry updates. |
| **Programming Language** | TypeScript | Provides compile-time type safety across complex structures (such as user sessions, log details, and persona attributes), reducing runtime exceptions. |
| **Styling Engine** | Tailwind CSS | Speeds up the implementation of consistent, responsive UI layout configurations and academic design aesthetics without overhead CSS weight. |
| **Backend Framework** | FastAPI | Offers high-concurrency async capabilities natively compatible with Python’s async-await syntax, crucial for handling concurrent OpenAI streaming and sync requests. |
| **Database** | MongoDB & Motor | Supports schema-less documents, which are essential for evolving persona configurations, message objects, and unstructured telemetry logs, powered by an async driver. |
| **AI Integration** | OpenAI Assistant API & GPT-4o-mini | Power the underlying conversational reasoning, custom assistant generation, and real-time stylistic evaluation. |
| **Payment Gateway** | Stripe SDK | Enables secure, automated credit provisioning, webhooks, and subscription lifecycle management across free and professional tiers. |

---

### Key Engineering Challenges & Learnings

#### Taming API Latency and Mitigating Downtime with Circuit Breakers
Relying on external LLM services introduces severe API latency variations and connection failures. To address this, the architecture implements service-level circuit breakers that monitor failures. If a service crosses the error threshold, the breaker opens, immediately routing traffic to a direct Chat Completion model. This fallback compiles local MongoDB history into a structured context window, ensuring the user gets a seamless chat response while avoiding cascading request timeouts.

#### Preventing Context Pollution in Ingestion Pipelines
Ingesting documents (PDF/DOCX) into AI prompts can easily pollute the context window with repetitive page elements like headers, footers, page numbers, and soft hyphens. The Ingestion Engine solves this by applying statistical analysis to detect recurring lines of text (identifying lines that appear on more than 60% of pages as headers/footers) and automatically stripping them out, while cleaning up hyphenations and soft line breaks. This optimizes token utilization and maintains prompt quality.

---

### High-Level API Architecture

* **Authentication (auth):** Handles user sign-up, secure credential validation, JWT token exchange, and refresh cycles to maintain secure user sessions.
* **User Management (users):** Provides administrators and super admins with user creation, role modification (e.g., transitioning customers to moderators), and account status toggles.
* **Subscription Engine (subscription & plans):** Coordinates Stripe-integrated plan querying, checkout session creation, webhook listening, and billing tier validation.
* **Persona Management (personas):** Facilitates the CRUD lifecycle of AI agents, system prompt overrides, OpenAI Assistant synchronization, and on-demand model tuning.
* **Conversational Logic (conversations):** Manages chat thread creations, local database storage of chat message histories, and triggers style telemetry checks.
* **Telemetry & Logging (system-logs):** Exposes centralized logging records containing database performance, API errors, system alerts, and fallback activations.
* **Data Export (export):** Compiles persona configurations, chat archives, and ingestion reports, exporting them in standardized structural formats.
