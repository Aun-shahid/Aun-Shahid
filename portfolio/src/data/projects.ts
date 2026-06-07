export type ProjectCategory = 'AI Systems' | 'Platforms' | 'Automation' | 'Creative Tools'

export type ProjectFullDetails = {
  problem: string
  solution: string
  howItWorks: string[]
  architecture: string[]
  decisions: string[]
  challenges: string[]
  impact: string[]
}

export type Project = {
  id: string
  name: string
  tagline: string
  category: ProjectCategory
  summary: string
  tags: string[]
  details: string[]
  url?: string
  apiUrl?: string
  githubUrl?: string
  status: 'live' | 'demo' | 'in-progress' | 'archived'
  featured?: boolean
  fullDetails: ProjectFullDetails
  screenshots?: {
    desktop: string
    mobile: string
  }
}

type ProjectEntry = Omit<Project, 'fullDetails'>

export const projectCategoryVisuals: Record<ProjectCategory, { image: string; accent: string }> = {
  'AI Systems': {
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80',
    accent: 'from-teal-950/90 via-slate-950/70 to-slate-900/35',
  },
  Platforms: {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80',
    accent: 'from-slate-950/90 via-slate-900/70 to-blue-950/35',
  },
  Automation: {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    accent: 'from-slate-950/90 via-teal-950/70 to-cyan-950/35',
  },
  'Creative Tools': {
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80',
    accent: 'from-slate-950/90 via-indigo-950/70 to-fuchsia-950/35',
  },
}

export function getProjectVisual(project: Project) {
  return projectCategoryVisuals[project.category]
}

// Source order still runs largest/most complex to smallest; export sorting lifts paid/custom domains first.
const projectEntries: ProjectEntry[] = [
  // ─── LARGE FEATURED PROJECTS ───────────────────────────────────────────────
  {
    id: 'devia-crm',
    name: 'DevIA CRM',
    tagline: 'AI-Powered Construction Management SaaS',
    category: 'Platforms',
    summary:
      'Construction management CRM with GPT-4 quote/invoice generation, OpenAI Whisper voice commands, real-time project tracking, and full financial management. Built for the French market with VAT compliance and bilingual (EN/FR) support.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'OpenAI GPT-4', 'Whisper', 'Stripe', 'Google Calendar', 'Railway'],
    details: [
      'GPT-4-powered quote and invoice generation with French market pricing and VAT compliance.',
      'OpenAI Whisper voice command interface for hands-free document creation.',
      'Full client CRM with project history, communication logs, and milestone tracking.',
      'Financial analytics: multi-period reporting, VAT compliance, sales metrics.',
      'Bidirectional Google Calendar sync and Stripe subscription tiers (Free/Starter/Pro).',
      'Multi-language: English + French with automatic browser detection.',
      '12 modular API routers and a tab-based SPA frontend with no page reloads.',
    ],
    screenshots: {
      desktop: 'projects/devia_web.png',
      mobile: 'projects/devia_mobile.png',
    },
    status: 'archived',
    featured: true,
  },
  {
    id: 'corestone',
    name: 'Corestone Grader',
    tagline: 'AI Essay Evaluation Platform for IBDP',
    category: 'AI Systems',
    summary:
      'AI-powered essay evaluation platform for IBDP Extended Essays and TOK submissions. Automates rubric-aware GPT-4o grading with criterion-level feedback, PDF/DOCX support, and a full subscription + admin workflow.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'OpenAI GPT-4o', 'Stripe', 'Google OAuth', 'Railway'],
    details: [
      'GPT-4o essay evaluation with dynamic rubric engine: custom criteria, weighting, and achievement bands.',
      '4-tier RBAC: Student, Teacher, Admin, Super-Admin with grade override and audit trails.',
      'Multi-document support (PDF, DOCX) with real-time evaluation tracking via polling + exponential backoff.',
      'Stripe-integrated subscription + per-user essay credit tracking.',
      'Comprehensive analytics dashboard and PDF export of evaluation reports.',
      'Google OAuth 2.0 and JWT-based authentication with 7-day refresh tokens.',
    ],
    url: 'https://corestonegrader.ai',
    screenshots: {
      desktop: 'projects/corestonegrader_web.png',
      mobile: 'projects/corestonegrader_mobile.png',
    },
    status: 'live',
    featured: true,
  },
  {
    id: 'aichatbot',
    name: 'AI Chatbot Platform',
    tagline: 'Multi-Tenant Enterprise Chatbot with RAG',
    category: 'AI Systems',
    summary:
      'Enterprise-grade multi-tenant chatbot platform with full RAG pipeline, 4-tier RBAC, real-time streaming, public iframe embedding, and production-ready deployment on Railway.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'PostgreSQL', 'pgvector', 'LangChain', 'OpenAI', 'Docker', 'Railway'],
    details: [
      'Full RAG pipeline: ingestion → chunking → vectorization (text-embedding-3-small) → retrieval → streaming generation.',
      'Multi-format document support: PDF, DOCX, TXT with citation/source attribution.',
      'Multi-tenant architecture with 4-tier RBAC (Super Admin, Admin, Instructor, User).',
      'Public chatbot embedding via iframe + API key authentication.',
      'Adaptive batch embedding (16–512 items), exponential backoff rate limiting.',
      'Per-chatbot custom system prompts and async-first stack (motor, asyncpg, aiohttp).',
    ],
    url: 'https://aipoweredchatbot-production.up.railway.app/',
    screenshots: {
      desktop: 'projects/aichatbot_web.png',
      mobile: 'projects/aichatbot_mobile.png',
    },
    status: 'live',
    featured: true,
  },
  {
    id: 'aiassessment',
    name: 'EduAssess',
    tagline: 'Agentic AI Assessment Generation',
    category: 'AI Systems',
    summary:
      'Stateful LangGraph AI agent that guides teachers through generating curriculum-aligned assessments. Features human-in-the-loop HTTP cycle pausing, vector search for textbook retrieval, and episodic memory persistence.',
    tags: ['LangGraph', 'LangChain', 'FastAPI', 'MongoDB Atlas', 'OpenAI GPT-4o', 'React', 'Vite'],
    details: [
      'LangGraph state machine with Human-in-the-Loop (HITL): agent pauses and resumes over HTTP cycles.',
      'Curriculum semantic search to map teacher intent to Domains, Subdomains, and Learning Outcomes.',
      'MongoDB Atlas Vector Search for textbook chunk retrieval with teacher-driven rejection and re-querying.',
      'Episodic memory persistence: agent remembers prior conversation context across sessions.',
      'Generates Markdown-formatted MCQ and short-answer assessments.',
      'Dynamic pivoting when teacher changes constraints mid-conversation.',
    ],
    screenshots: {
      desktop: 'projects/eduassess_web.png',
      mobile: 'projects/eduassess_mobile.png',
    },
    status: 'archived',
    featured: true,
  },
  {
    id: 'aiqms',
    name: 'GrazieMille AI-QMS',
    tagline: 'AI-Powered Quality Management System',
    category: 'Platforms',
    summary:
      'Multi-tenant AI quality management system for SMEs and certification teams. Turns fragmented documentation, risk registers, and compliance workflows into a governed QMS workspace with AI-assisted decision support.',
    tags: ['Next.js', 'React', 'FastAPI', 'MongoDB', 'Google Gemini', 'OpenAI', 'Stripe', 'Docker', 'Railway'],
    details: [
      'Multi-tenant QMS workspaces with full data isolation and document lifecycle (draft → review → approval → controlled).',
      'AI-assisted documentation workflows (Gemini + OpenAI): generation, compliance checks, process extraction.',
      'Embedding-based redundancy detection (sentence-level vectors, cosine similarity).',
      'Risk register with 5×5 likelihood-impact model, heatmap aggregation, and AI-generated recommendations.',
      'Training and competence governance: modules, records, competency matrices.',
      'Stripe billing, WebSocket notifications, Google OAuth, and TOTP 2FA.',
    ],
    url: 'https://www.aiqms.live/',
    screenshots: {
      desktop: 'projects/aiqms_web.png',
      mobile: 'projects/aiqms_mobile.png',
    },
    status: 'in-progress',
    featured: true,
  },
  {
    id: 'motoscout',
    name: 'MotoScout Automation',
    tagline: 'AI Dealer Operations for AutoScout24',
    category: 'Automation',
    summary:
      'AI-assisted dealer operations control plane for the AutoScout24 marketplace. Syncs inventory, accelerates lead handling, and orchestrates marketplace actions across multiple seller accounts with a LangGraph AI agent.',
    tags: ['React', 'FastAPI', 'MongoDB', 'LangGraph', 'LangChain', 'OpenAI', 'APScheduler', 'SSE', 'Docker', 'Railway'],
    details: [
      'Multi-account credential vault (encrypted, user-scoped) for AutoScout24 marketplace.',
      'Mirrored inventory architecture: local query-optimized mirror of live AutoScout24 listings.',
      'Full bi-directional inventory lifecycle: create, update, activate, deactivate, remove, republish, bulk ops.',
      'Human-in-the-loop LangGraph AI agent: proposes actions, requires confirmation before mutations.',
      'SSE streaming for real-time import/sync progress and agent responses.',
      'APScheduler cron jobs for daily status consistency and time-based republish automation.',
      'Defense-in-depth auth: JWT + refresh + HTTP-only cookies + OAuth + 2FA.',
    ],
    url: 'https://platform.mototech.ch/',
    screenshots: {
      desktop: 'projects/motoscout_web.png',
      mobile: 'projects/motoscout_mobile.png',
    },
    status: 'live',
  },
  {
    id: 'nebuluxury',
    name: 'Nēbu Luxury',
    tagline: 'AI Gmail Assistant for Luxury Brands',
    category: 'AI Systems',
    summary:
      'AI-powered Gmail customer service assistant for luxury brands. Uses Claude AI to generate brand-voice-consistent email draft replies with Shopify order context enrichment. All AI outputs are Gmail drafts for human review — never auto-sends.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'Anthropic Claude', 'Gmail API', 'Shopify API', 'Stripe', 'Docker', 'Railway'],
    details: [
      'Claude-powered email draft generation analyzing thread tone and customer sentiment.',
      'Customizable brand voice: tone presets, FAQ injection, policy reference, phrase preferences.',
      'Gmail OAuth2 integration with automatic token refresh (PKCE).',
      'Shopify context enrichment: real-time order/customer/product data injected into Claude prompts.',
      'Background email polling every 5 minutes: sync → classify → draft → thread analysis.',
      'Never auto-sends — all AI outputs are Gmail drafts labeled for human review.',
      'TOTP 2FA, RBAC, and Stripe subscription management.',
    ],
    url: 'https://nebuluxury.com',
    screenshots: {
      desktop: 'projects/nebuluxury_web.png',
      mobile: 'projects/nebuluxury_mobile.png',
    },
    status: 'live',
  },
  {
    id: 'milestonely',
    name: 'Milestonely',
    tagline: 'AI Roadmap Orchestration Platform',
    category: 'Platforms',
    summary:
      'AI-augmented roadmap platform that turns meeting recordings and goals into actionable milestone graphs. Uses Whisper + GPT to generate React Flow roadmaps from audio/video with real-time multi-user collaboration.',
    tags: ['React', 'React Flow', 'FastAPI', 'MongoDB', 'OpenAI Whisper', 'GPT', 'Stripe', 'WebSocket', 'S3', 'Google Calendar'],
    details: [
      'React Flow graph-based roadmap editor: milestones, swimlanes, text, and image nodes.',
      'AI roadmap generation from meeting audio/video uploads (Whisper transcription + GPT structuring).',
      'Multi-user collaboration with WebSocket presence awareness.',
      'Public/embedded roadmap consumption with API-key-gated control.',
      'Stripe subscriptions with seat-based billing and proration.',
      'Google Calendar OAuth integration and S3-compatible storage for attachments.',
    ],
    url: 'https://milestonely-production.up.railway.app/',
    screenshots: {
      desktop: 'projects/milestonely_web.png',
      mobile: 'projects/milestonely_mobile.png',
    },
    status: 'in-progress',
  },
  {
    id: 'schedular',
    name: 'Corestone Schedular',
    tagline: 'Enterprise Tutoring Marketplace',
    category: 'Platforms',
    summary:
      'Tutoring marketplace connecting tutors with students through intelligent multi-slot booking, Stripe payments, Wise bank payouts, real-time WebSocket chat, and bidirectional Google Calendar sync.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'Stripe', 'Wise API', 'WebSocket', 'Google Calendar', 'Railway'],
    details: [
      'Multi-slot session booking in a single transaction with dynamic per-slot CAD pricing.',
      'Automated Stripe checkout with payout splitting (tutor 88%, platform 12%).',
      'Wise payout system: bank transfers, quote generation, multi-currency support.',
      'WebSocket real-time chat + notifications with persistent message history.',
      'Bidirectional Google Calendar sync with meeting link generation.',
      '5-tier RBAC: Super Admin, Admin, Tutor, Student, User.',
      'Blog system with SEO-optimized educational articles.',
    ],
    url: 'https://schedular.dev.codexcape.solutions/',
    screenshots: {
      desktop: 'projects/schedular_web.png',
      mobile: 'projects/schedular_mobile.png',
    },
    status: 'live',
  },
  {
    id: 'healyourhuman',
    name: 'Heal Your Human',
    tagline: 'AI DNA Health Analysis Platform',
    category: 'AI Systems',
    summary:
      'Transforms raw DNA data (23andMe, Ancestry) into actionable health insights with GPT-5 narrative reports in Gary Brecka optimization style. Includes supplement recommendations, blood lab integration, and HIPAA-aligned audit logging.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'OpenAI GPT-5', 'Stripe', 'SendGrid', 'TOTP 2FA'],
    details: [
      'Multi-source DNA parsing: 23andMe, Ancestry, and generic formats with biomarker alias resolution (40+ naming variations).',
      'GPT-5 health narrative generation in Gary Brecka optimization style.',
      'Structured output: gene status, biochemical optimization paths, supplement recommendations.',
      'Free snapshot preview (gated, color-coded) + Full PDF report post-purchase.',
      'Blood lab integration: Quest, LabCorp, manual entry with genetic-biomarker correlation engine.',
      'HIPAA-aligned audit logging, rate limiting, login lockout, and TOTP 2FA.',
    ],
    url: 'https://healyourhuman.com/',
    screenshots: {
      desktop: 'projects/healyourhuman_web.png',
      mobile: 'projects/healyourhuman_mobile.png',
    },
    status: 'live',
  },
  {
    id: 'pocketshrink',
    name: 'Pocket Shrink',
    tagline: 'AI Mental Wellness Platform',
    category: 'AI Systems',
    summary:
      'AI-powered mental wellness platform with always-available therapeutic chat, age-aware access control, multimodal interaction (voice input + TTS), and subscription-driven monetization.',
    tags: ['Next.js', 'React', 'FastAPI', 'MongoDB', 'OpenAI Whisper', 'TTS', 'Stripe', 'Zustand'],
    details: [
      'Age-aware entitlement model: teen vs. adult access paths with distinct messaging privileges.',
      'Multimodal interaction: voice input transcription (Whisper) + TTS output.',
      'Subscription lifecycle: Stripe checkout, trial initiation, cancellation, webhook sync.',
      'Adaptive privacy/anonymous mode as a plan-level entitlement.',
      'Conversation continuity: persisted client-side across sessions with Zustand.',
      'Message quota governance with can-send-message entitlement checks.',
    ],
    screenshots: {
      desktop: 'projects/pocketshrink_web.png',
      mobile: 'projects/pocketshrink_mobile.png',
    },
    status: 'archived',
  },
  {
    id: 'lifetrek',
    name: 'LifeTrek AI',
    tagline: 'AI Life Coaching Platform',
    category: 'AI Systems',
    summary:
      'AI coaching platform that turns personal and professional roadblocks into structured action plans. Combines conversational AI, subscription lifecycle management, and persistent user context.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'OpenAI', 'Stripe', 'Zustand', 'i18next'],
    details: [
      'Persistent conversation objects — stateful coaching sessions, not one-off prompts.',
      'Dual response modes: standard completions and real-time streaming.',
      'Subscription-aware usage/message quotas with Stripe billing.',
      'Axios interceptors with refresh-token queuing to prevent race conditions.',
      'Multilingual AI prompting with frontend i18n (i18next).',
      'Demo-safe product funnel with persisted demo limits.',
    ],
    screenshots: {
      desktop: 'projects/lifetrek_web.png',
      mobile: 'projects/lifetrek_mobile.png',
    },
    status: 'archived',
  },
  {
    id: 'mindscribe',
    name: 'MindScribe',
    tagline: 'AI Clinical Documentation for Therapists',
    category: 'AI Systems',
    summary:
      'AI-powered assistant for psychologists and psychotherapists to automate clinical documentation. Listens to therapy sessions, performs sentiment analysis, and generates SOAP notes with Urdu-to-text transcription.',
    tags: ['Django', 'PostgreSQL', 'React Native', 'Expo', 'AI', 'NLP', 'SOAP Notes'],
    details: [
      'AI-powered SOAP note generation (Subjective, Objective, Assessment, Plan).',
      'Advanced NLP sentiment analysis on session recordings.',
      'Urdu-to-text multilingual transcription for local market needs.',
      'Mobile app built with React Native (Expo) for recording therapy sessions.',
      'Web frontend for practice management and patient records.',
    ],
    url: 'https://mindscribe-frontendd.dev.codexcape.solutions/',
    screenshots: {
      desktop: 'projects/mindscribe_web.png',
      mobile: 'projects/mindscribe_mobile.png',
    },
    status: 'live',
  },
  {
    id: 'antlix',
    name: 'ANTLIX',
    tagline: 'AI Image Generation & Editing Platform',
    category: 'Creative Tools',
    summary:
      'Full-stack AI image generation and editing platform. Users generate photorealistic/artistic images from text prompts and enhance them with 7 AI editing tools, backed by a credit-based subscription ecosystem.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'Stability AI', 'Stripe', 'Google OAuth', 'GridFS'],
    details: [
      'Multi-model image generation: Ultra, Core, Realistic, Anime, Artistic, Portrait styles.',
      '7 editing tools: background removal, face swapping, inpainting, AI filters, upscaling, object erasure.',
      'Credit-based subscriptions: Free (10), Basic (100), Intermediate (500), Unlimited.',
      'Monthly/yearly billing via Stripe webhooks.',
      '3-tier RBAC (User, Admin, Super Admin) with admin dashboard and system logging.',
      'Gallery with public/private/shared visibility and like/unlike engagement metrics.',
    ],
    screenshots: {
      desktop: 'projects/antlix_web.png',
      mobile: 'projects/antlix_mobile.png',
    },
    status: 'archived',
  },
  {
    id: 'retroai',
    name: 'RetroAI',
    tagline: 'Vintage AI Image & Video Generator',
    category: 'Creative Tools',
    summary:
      'Generates retro-style images and videos with a 1940s–1950s archival film aesthetic using Google Gemini and Veo. Users create personalized messages overlaid on vintage visuals for special occasions.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'Google Gemini', 'Google Veo', 'GridFS', 'Railway'],
    details: [
      '1940s–1950s archival film aesthetic: monochrome, film grain, soft focus, cinematic lighting, vintage artifacts.',
      'AI video generation with vintage film style (Google Veo 3.1).',
      'Custom text message overlays with retro typography.',
      'Style and occasion customization (birthday, anniversary, custom).',
      'Public gallery to browse and share generated content.',
      'Asynchronous video generation with status tracking (processing/completed/failed).',
    ],
    url: 'https://www.retromsg.ai/',
    screenshots: {
      desktop: 'projects/retroai_web.png',
      mobile: 'projects/retroai_mobile.png',
    },
    status: 'live',
  },
  {
    id: 'storybook',
    name: 'Storybook',
    tagline: 'AI-Assisted Creative Writing Platform',
    category: 'Creative Tools',
    summary:
      'Comprehensive creative writing platform for authors to manage books, chapters, characters, and world-building elements. Uses GPT-4 for chapter generation and DALL-E for AI character portraits.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'OpenAI GPT-4', 'DALL-E', 'S3', 'Beanie ODM'],
    details: [
      'Manage books, chapters, characters, worlds, locations, and custom elements (magic systems, cultures, religions).',
      'AI chapter content generation (GPT-4) with character/location/element context injection.',
      'AI character portrait generation with DALL-E.',
      'Chapters with automatic sequencing and numbering.',
      'S3-compatible storage for covers and images (migrated from GridFS).',
    ],
    screenshots: {
      desktop: 'projects/storybook_web.png',
      mobile: 'projects/storybook_mobile.png',
    },
    status: 'archived',
  },
  {
    id: 'cvformatter',
    name: 'FormatLab',
    tagline: 'Multi-LLM CV Extraction & Formatting',
    category: 'Creative Tools',
    summary:
      'AI-powered CV extraction and formatting platform that intelligently extracts 30+ structured fields from PDF/DOCX documents using multi-provider LLM orchestration (OpenAI, Gemini, DeepSeek).',
    tags: ['Next.js', 'TypeScript', 'FastAPI', 'MongoDB', 'OpenAI', 'Google Gemini', 'DeepSeek', 'Stripe', 'Railway'],
    details: [
      '30+ structured field extraction: education, experience, certifications, languages, and more.',
      'Multi-provider LLM: OpenAI, Gemini, DeepSeek — swappable via environment variable.',
      'Vision fallback for complex PDF layouts (rasterized pages sent to vision-capable models).',
      'Optional data sanitization (second LLM pass for garbled text).',
      'Text coverage metrics: character/word count, transfer percentage, integrity flags.',
      'JWT + Google OAuth + TOTP 2FA + RBAC + Stripe subscription.',
    ],
    url: 'https://cv-formatter.dev.codexcape.solutions/',
    screenshots: {
      desktop: 'projects/cvformatter_web.png',
      mobile: 'projects/cvformatter_mobile.png',
    },
    status: 'live',
  },
  {
    id: 'styleclone',
    name: 'StyleClone AI',
    tagline: 'Adaptive Communication Style Cloning Platform',
    category: 'AI Systems',
    summary:
      'AI writing assistant that learns and adapts communication style from user telemetry, documents, and conversation history. Built with asynchronous OpenAI thread synchronization, resilient fallback execution, and multi-tenant access control.',
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'OpenAI', 'Stripe', 'RBAC', 'Async Queues'],
    details: [
      'Adaptive writing style engine analyzes lexicon, tone, response length, sentence complexity, and conversation telemetry.',
      'Background synchronization keeps local MongoDB conversations in sync with OpenAI thread APIs without blocking user interactions.',
      'Circuit-breaker fallback routes requests to direct chat completions during Assistant API failures or rate limits.',
      'Document ingestion pipeline supports PDF, DOCX, and TXT with header/footer cleanup and layout reconstruction.',
      'Multi-tenant RBAC and Stripe subscriptions manage roles, credit allocation, and access tiers.',
    ],
    screenshots: {
      desktop: 'projects/styleclone_web.png',
      mobile: 'projects/styleclone_mobile.png',
    },
    status: 'archived',
  },
  {
    id: 'energyaudit',
    name: 'Energy Audit',
    tagline: 'AI-Assisted Energy Measurement Reporting',
    category: 'Automation',
    summary:
      'Energy audit app for processing noisy meter files, normalizing time-series data, extracting KPIs, detecting anomalies, and generating client-ready reports with charts and recommendations.',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'Pandas', 'PDF Reports', 'Data Processing'],
    details: [
      'Ingests CSV and TXT measurement files from meters and data loggers. ',
      'Cleans, resamples, interpolates, and flags noisy or inconsistent time-series readings.',
      'Computes total energy, peak demand, load factor, daily and weekly profiles, and anomaly signals.',
      'Generates repeatable reports with visualizations through a backend reporting pipeline.',
      'API-first architecture supports uploads, progress tracking, and result visualization from the frontend.',
    ],
    url: 'https://energy-audit-frontend.dev.codexcape.solutions',
    screenshots: {
      desktop: 'projects/energyaudit_web.png',
      mobile: 'projects/energyaudit_mobile.png',
    },
    status: 'live',
  },
  {
    id: 'faceswap',
    name: 'Cartoon Face Swap',
    tagline: 'AI Face-to-Cartoon & Face Swap Tool',
    category: 'Creative Tools',
    summary:
      'Application that converts faces to cartoon style and performs face swapping. Built a workflow in ComfyUI using an image segmenter masker, two open-source models (flux kontext and flux kontext fill), and a LoRA adapter to maintain the cartoon style.',
    tags: ['ComfyUI', 'Flux Kontext', 'Flux Kontext Fill', 'LoRA', 'Image Segmentation'],
    details: [
      'Custom ComfyUI workflow for precise face isolation and stylization.',
      'Image segmenter masker isolates the target face automatically.',
      'Powered by Flux Kontext and Flux Kontext Fill for high-fidelity generation and blending.',
      'LoRA adapter applied to enforce a consistent and high-quality cartoon style.',
    ],
    screenshots: {
      desktop: 'projects/faceswap_web.png',
      mobile: 'projects/faceswap_mobile.png',
    },
    status: 'archived',
  },
]

const projectFullDetails: Record<string, ProjectFullDetails> = {
  mindscribe: {
    problem:
      'Therapists and psychologists lose time after sessions translating conversations into clinical notes, sentiment observations, and structured patient records. This becomes harder in multilingual contexts where Urdu speech, mobile recording, and web-based practice workflows need to stay connected.',
    solution:
      'MindScribe captures session context, transcribes and analyzes it, then generates therapist-ready SOAP notes and practice insights through a connected mobile and web experience.',
    howItWorks: [
      'A mobile app records or captures therapy session material and sends it into the backend workflow.',
      'The backend transcribes session content, applies NLP and sentiment analysis, and structures the output around clinical documentation needs.',
      'Generated SOAP notes are stored with patient/session context so the therapist can review, adjust, and reuse them from the dashboard.',
    ],
    architecture: [
      'Django backend with PostgreSQL for durable patient, session, and documentation records.',
      'React Native and Expo mobile app for recording and therapist-side capture flows.',
      'Separate web dashboard for reviewing generated notes, patient records, and practice activity.',
    ],
    decisions: [
      'Used SOAP notes as the core output format because therapists already understand that clinical structure.',
      'Kept AI output reviewable instead of treating generated documentation as final medical truth.',
      'Supported Urdu transcription to fit local usage rather than assuming English-only clinical sessions.',
    ],
    challenges: [
      'Balancing useful automation with clinical responsibility and human review.',
      'Handling multilingual audio quality and therapy-specific terminology.',
      'Keeping mobile capture and web review flows consistent across devices.',
    ],
    impact: [
      'Reduces repetitive post-session documentation work.',
      'Gives therapists a faster path from raw session material to structured notes.',
      'Creates a foundation for richer practice analytics and patient history review.',
    ],
  },
  aiqms: {
    problem:
      'Quality management teams often run compliance, documents, risks, training, and audits across disconnected files and manual review cycles. That makes ISO readiness slow, inconsistent, and hard to govern across tenants or client organizations.',
    solution:
      'GrazieMille AI-QMS centralizes QMS workspaces and uses AI to assist documentation, compliance checks, risk recommendations, and process extraction while keeping controlled approval workflows intact.',
    howItWorks: [
      'Users create tenant-isolated workspaces for documents, risks, training records, and QMS workflows.',
      'AI assists with drafting, process extraction, compliance review, and redundancy detection.',
      'Controlled document states move content from draft to review, approval, and controlled release.',
    ],
    architecture: [
      'Next.js/React frontend with FastAPI services and MongoDB-backed workspace data.',
      'Gemini and OpenAI integrations for generation, review, and decision support.',
      'Stripe billing, WebSocket notifications, OAuth, and TOTP 2FA around the core platform.',
    ],
    decisions: [
      'Designed as multi-tenant from the start so each organization has isolated QMS data.',
      'Used document lifecycle states to preserve governance instead of letting AI bypass approvals.',
      'Represented risk through a familiar 5x5 likelihood-impact model for audit-friendly interpretation.',
    ],
    challenges: [
      'Keeping AI suggestions useful while preserving compliance accountability.',
      'Detecting redundancy across sentence-level document embeddings without over-merging distinct controls.',
      'Coordinating billing, roles, notifications, and controlled documents in one workflow.',
    ],
    impact: [
      'Turns fragmented QMS work into a governed workspace.',
      'Speeds up compliance documentation and review preparation.',
      'Improves visibility into risks, training, and controlled document status.',
    ],
  },
  healyourhuman: {
    problem:
      'Consumers can download DNA and bloodwork data, but raw files and lab values are difficult to interpret together. Most tools either stay too generic or fail to turn genetic context into clear, actionable health narratives.',
    solution:
      'Heal Your Human reads DNA and biomarker data together, generates plain-language health reports, and connects genetic patterns to optimization recommendations and supplement guidance.',
    howItWorks: [
      'Users upload DNA files from sources such as 23andMe or Ancestry, or enter blood lab values manually.',
      'The backend normalizes biomarker aliases, correlates genetic and lab signals, and prepares structured context for the AI report engine.',
      'Users can preview a free snapshot before purchasing a full generated PDF report.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI and MongoDB backend services.',
      'Parsing layer for multiple DNA formats and biomarker naming variations.',
      'Stripe purchase flow, SendGrid messaging, audit logging, rate limiting, and TOTP 2FA.',
    ],
    decisions: [
      'Separated preview and full report flows to make the product understandable before checkout.',
      'Built biomarker alias resolution because lab and DNA sources use inconsistent naming.',
      'Added audit and security controls around sensitive health-related data.',
    ],
    challenges: [
      'Normalizing heterogeneous genomic and lab formats without losing meaning.',
      'Presenting health insights in a useful way while avoiding overclaiming.',
      'Designing a report flow that feels trustworthy for sensitive data.',
    ],
    impact: [
      'Makes DNA and bloodwork data easier for users to understand together.',
      'Creates a productized health report workflow with purchase gating.',
      'Improves repeatability compared with manual interpretation and report writing.',
    ],
  },
  styleclone: {
    problem:
      'AI assistants often sound generic because they do not learn a user or organization style over time. At the same time, synchronizing external AI threads directly during chat can introduce latency, API failures, and a fragile user experience.',
    solution:
      'StyleClone AI adapts writing style from user telemetry, documents, and conversation history while keeping local conversation state responsive and synchronizing with OpenAI services in the background.',
    howItWorks: [
      'User messages and telemetry are written immediately to MongoDB for fast local rendering.',
      'A style analyzer evaluates lexicon, sentence complexity, tone, and response length across a sliding window.',
      'Background workers synchronize messages with OpenAI thread APIs, while fallback chat completions preserve service continuity during outages.',
    ],
    architecture: [
      'React/TypeScript frontend paired with a FastAPI backend and MongoDB/Motor data access.',
      'Asynchronous priority queue for thread replication, retries, and synchronization scheduling.',
      'RBAC, subscriptions, persona management, document ingestion, telemetry, and export endpoints.',
    ],
    decisions: [
      'Used local-first message persistence so UI responsiveness does not depend on external AI API latency.',
      'Added a circuit breaker to prevent Assistant API failures from cascading into the user experience.',
      'Used MongoDB documents for evolving persona, conversation, telemetry, and log schemas.',
    ],
    challenges: [
      'Preventing context pollution when ingesting PDFs, DOCX, TXT files, headers, footers, and layout artifacts.',
      'Keeping asynchronous thread synchronization reliable with retries and backoff.',
      'Adapting style without making the assistant unstable or overfitted to a small sample.',
    ],
    impact: [
      'Creates more personalized AI communication without manual fine-tuning.',
      'Keeps chat interactions resilient during API rate limits or external downtime.',
      'Supports multi-tenant access, billing, personas, and document-driven style corpora.',
    ],
  },
  energyaudit: {
    problem:
      'Energy auditors receive large CSV and TXT meter exports that are noisy, inconsistent, and sampled at different intervals. Manually cleaning them, extracting KPIs, and preparing reports can take hours per site.',
    solution:
      'Energy Audit automates file ingestion, time-series cleaning, KPI extraction, anomaly detection, and client-ready report generation with visualizations.',
    howItWorks: [
      'Users upload energy bills, analyzer data, load inventory, or related measurement files from the frontend.',
      'The backend normalizes time intervals, interpolates missing data, flags outliers, and computes energy metrics.',
      'The reporting layer turns the cleaned results into repeatable PDF/DOC/TXT-style outputs and charts.',
    ],
    architecture: [
      'Vite React/TypeScript frontend for upload, progress, and results visualization.',
      'Python backend services for file processing, AI/heuristic analysis, and report generation.',
      'Modular pipeline split into ingestion, cleaning/resampling, feature extraction, analysis, and report output.',
    ],
    decisions: [
      'Kept the processing pipeline modular so new formats and analysis modules can be added later.',
      'Focused on common audit KPIs: total energy, peak demand, load factor, and daily/weekly load profiles.',
      'Used programmatic report generation to make outputs consistent and auditable.',
    ],
    challenges: [
      'Handling messy files with inconsistent timestamps, missing values, and outliers.',
      'Turning technical time-series results into client-readable recommendations.',
      'Supporting multiple upload types without making the frontend workflow confusing.',
    ],
    impact: [
      'Reduces manual preprocessing and report preparation from hours to minutes.',
      'Produces repeatable, auditable results across many facilities.',
      'Gives auditors a scalable base for additional ML or rule-based analysis.',
    ],
  },
  retroai: {
    problem:
      'People want personalized cinematic messages, but creating vintage-styled visuals and videos normally requires design skills, editing tools, and manual post-production.',
    solution:
      'RetroAI uses modern image and video models to generate retro 1940s-1960s style messages with vintage typography, film grain, and shareable outputs.',
    howItWorks: [
      'Users enter a message, choose an occasion or custom style, and request a retro visual or video.',
      'The backend queues generation jobs, calls Gemini/Veo models, stores assets, and tracks processing status.',
      'Generated content can be viewed, shared, and browsed through a public gallery.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI, MongoDB, GridFS, and Railway deployment.',
      'Google Gemini for image/text generation and Google Veo for video generation.',
      'Asynchronous status model for processing, completed, and failed generation states.',
    ],
    decisions: [
      'Committed to a narrow archival film aesthetic instead of a generic image generator.',
      'Used async generation because video jobs can take long enough to require status tracking.',
      'Stored generated assets centrally to support gallery and sharing workflows.',
    ],
    challenges: [
      'Maintaining a consistent vintage look across different model outputs.',
      'Handling long-running video generation and failure states gracefully.',
      'Balancing creative freedom with a simple user flow.',
    ],
    impact: [
      'Turns personal messages into distinctive AI-generated retro media.',
      'Provides a reusable pipeline for image and video generation workflows.',
      'Creates a visually memorable product experience around a focused style.',
    ],
  },
  schedular: {
    problem:
      'Tutoring marketplaces need booking, payments, tutor payouts, chat, calendar sync, and role control to work together. Managing those pieces manually creates scheduling errors and payment friction.',
    solution:
      'Corestone Schedular combines tutoring marketplace booking, Stripe payments, Wise payouts, real-time chat, notifications, and Google Calendar sync in one platform.',
    howItWorks: [
      'Students book one or multiple tutoring slots and checkout through Stripe.',
      'The platform records session state, syncs calendar events, and enables real-time chat around bookings.',
      'Tutor payout calculations are split between platform fees and Wise transfer workflows.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI and MongoDB backend services.',
      'Stripe checkout for payments and Wise API for bank payout flows.',
      'WebSocket layer for chat and notifications plus Google Calendar OAuth integration.',
    ],
    decisions: [
      'Supported multi-slot booking as one transaction to reduce checkout friction.',
      'Encoded payout splitting directly into the workflow for predictable tutor/platform accounting.',
      'Used role tiers to separate super admin, admin, tutor, student, and user capabilities.',
    ],
    challenges: [
      'Coordinating payments, bookings, chat, calendars, and payouts without state drift.',
      'Keeping real-time communication persistent and reliable.',
      'Handling multi-currency and payout edge cases through Wise.',
    ],
    impact: [
      'Creates an end-to-end tutoring marketplace workflow.',
      'Reduces manual scheduling and payout operations.',
      'Gives tutors and students a single place for sessions, payments, and communication.',
    ],
  },
  corestone: {
    problem:
      'IBDP students and teachers need rubric-aware essay feedback, but manual evaluation of Extended Essays and TOK submissions is slow, inconsistent, and difficult to scale across users.',
    solution:
      'Corestone Grader automates essay evaluation using GPT-4o, criterion-level rubrics, document uploads, subscriptions, and admin review tools.',
    howItWorks: [
      'Users upload PDF or DOCX essays and choose the relevant evaluation flow.',
      'The backend extracts content, applies rubric criteria, and generates criterion-level feedback and scoring.',
      'Results are displayed with improvement tips, rubric analysis, and exportable evaluation reports.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI, MongoDB, Google OAuth, Stripe, and Railway deployment.',
      'GPT-4o grading engine with dynamic rubric criteria and weighted achievement bands.',
      'Polling and exponential backoff for real-time evaluation tracking.',
    ],
    decisions: [
      'Used criterion-level feedback so results map to how IBDP work is actually assessed.',
      'Added grade override and audit trails to preserve teacher/admin control.',
      'Built credit and subscription tracking because evaluation is compute-intensive.',
    ],
    challenges: [
      'Extracting reliable text from student documents.',
      'Keeping AI feedback aligned to rubric language rather than generic writing advice.',
      'Managing long-running evaluation status and user expectations.',
    ],
    impact: [
      'Speeds up essay review and feedback generation.',
      'Gives students clearer criterion-by-criterion improvement guidance.',
      'Creates a scalable assessment workflow for educational teams.',
    ],
  },
  milestonely: {
    problem:
      'Teams often leave meetings with vague goals and scattered notes instead of actionable roadmaps. Turning recordings into structured milestones manually is slow and inconsistent.',
    solution:
      'Milestonely turns audio/video meetings and user goals into visual milestone roadmaps with collaboration, attachments, calendar integration, and public sharing.',
    howItWorks: [
      'Users upload meeting recordings or define goals inside the roadmap workspace.',
      'Whisper transcribes audio/video and GPT structures the content into milestone graph nodes.',
      'Users refine the roadmap visually with React Flow, collaborate in real time, and sync deadlines to calendars.',
    ],
    architecture: [
      'React and React Flow frontend for graph editing and roadmap interaction.',
      'FastAPI/MongoDB backend with WebSocket presence and S3-compatible attachment storage.',
      'OpenAI Whisper and GPT services for transcription and roadmap generation.',
    ],
    decisions: [
      'Used graph-based roadmaps because milestones, swimlanes, and dependencies are naturally visual.',
      'Added collaboration and public embed support so roadmaps can be shared beyond one user.',
      'Integrated calendar and file storage to keep planning artifacts attached to the roadmap.',
    ],
    challenges: [
      'Converting messy meeting transcripts into useful roadmap structure.',
      'Managing real-time collaboration and presence without corrupting graph state.',
      'Balancing AI generation with manual editing control.',
    ],
    impact: [
      'Transforms meetings into actionable plans faster.',
      'Improves visibility across teams working toward milestones.',
      'Creates a reusable planning surface for goals, recordings, and attachments.',
    ],
  },
  motoscout: {
    problem:
      'AutoScout24 dealers need to manage inventory, leads, listing status, and marketplace actions across accounts. Manual syncing and response handling wastes time and creates stale listings.',
    solution:
      'MotoScout Automation provides an AI-assisted dealer operations control plane with mirrored inventory, marketplace actions, sync jobs, and a human-confirmed LangGraph agent.',
    howItWorks: [
      'Dealer credentials are stored in a user-scoped vault and used to synchronize marketplace inventory.',
      'A local mirror of listings enables fast search, filtering, and bulk operations.',
      'The LangGraph agent proposes listing or lead actions and waits for human confirmation before mutating marketplace data.',
    ],
    architecture: [
      'React frontend, FastAPI backend, MongoDB listing mirror, and Railway/Docker deployment.',
      'LangGraph and LangChain agent layer backed by OpenAI.',
      'APScheduler for recurring jobs and SSE for real-time import/sync progress.',
    ],
    decisions: [
      'Built a mirrored inventory model instead of querying the marketplace for every UI interaction.',
      'Kept AI actions human-in-the-loop because inventory mutations affect live dealership listings.',
      'Used scheduled consistency checks to keep local and remote states aligned.',
    ],
    challenges: [
      'Maintaining consistency between local mirrors and marketplace state.',
      'Handling long-running imports and communicating progress clearly.',
      'Designing AI automation that is helpful without being risky.',
    ],
    impact: [
      'Speeds up dealer inventory operations and lead handling.',
      'Reduces stale listing risk through sync and scheduled consistency jobs.',
      'Creates a command center for marketplace automation.',
    ],
  },
  nebuluxury: {
    problem:
      'Luxury customer support needs replies that are fast, accurate, and brand-consistent. Generic automation can damage tone, and auto-sending AI email is risky when order context or policies matter.',
    solution:
      'Nebu Luxury drafts Gmail replies with Claude using brand voice rules and Shopify order context, but leaves every output as a human-reviewed Gmail draft.',
    howItWorks: [
      'The system syncs Gmail threads, classifies customer messages, and enriches prompts with Shopify customer/order data.',
      'Claude generates a brand-consistent draft using policy, FAQ, tone, and thread context.',
      'Drafts are written back to Gmail for human review instead of being sent automatically.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI, MongoDB, Gmail API, Shopify API, Claude, Stripe, and Docker/Railway deployment.',
      'Background polling jobs sync email, classify threads, and prepare drafts.',
      'OAuth2 PKCE, token refresh, TOTP 2FA, RBAC, and subscription management.',
    ],
    decisions: [
      'Never auto-send AI outputs to preserve customer trust and brand safety.',
      'Used Shopify enrichment so responses can reference real order context.',
      'Made brand voice configurable instead of hard-coding a single support tone.',
    ],
    challenges: [
      'Keeping OAuth tokens fresh across Gmail and Shopify integrations.',
      'Generating polished luxury-brand language without hallucinating policy or order details.',
      'Coordinating background sync, labels, and draft creation reliably.',
    ],
    impact: [
      'Reduces repetitive support drafting work.',
      'Improves consistency of customer communication.',
      'Keeps human oversight in the loop for sensitive customer replies.',
    ],
  },
  cvformatter: {
    problem:
      'Recruiting teams and candidates often need CVs converted into client-specific templates, but extracting structured data from PDF/DOCX files is messy and formatting mistakes are common.',
    solution:
      'FormatLab extracts 30+ CV fields with multi-provider LLM orchestration, validates coverage, supports quick edits, and exports formatted candidate documents.',
    howItWorks: [
      'Users upload PDF or DOCX CV files into a guided upload flow.',
      'The backend extracts structured candidate data, optionally rasterizes complex PDF layouts for vision fallback, and sanitizes garbled output when needed.',
      'Users preview/edit the formatted result and export the final document.',
    ],
    architecture: [
      'Next.js/TypeScript frontend with FastAPI and MongoDB backend services.',
      'Swappable LLM providers including OpenAI, Gemini, and DeepSeek.',
      'JWT, Google OAuth, TOTP 2FA, RBAC, Stripe subscription, and Railway deployment.',
    ],
    decisions: [
      'Used multi-provider orchestration so the extraction layer is not locked to one LLM vendor.',
      'Added text coverage metrics to detect low-quality extraction before export.',
      'Included vision fallback for CVs where text extraction alone misses layout or content.',
    ],
    challenges: [
      'Extracting consistent fields from inconsistent CV formats and layouts.',
      'Detecting and repairing garbled text from PDFs.',
      'Balancing automated formatting with user quick-edit control.',
    ],
    impact: [
      'Speeds up CV formatting workflows for recruitment contexts.',
      'Improves repeatability and quality checks before export.',
      'Supports secure authenticated usage and monetization.',
    ],
  },
  aichatbot: {
    problem:
      'Organizations need chatbots grounded in their documents, but many tools lack tenant isolation, streaming answers, citations, public embedding, and role-based administration in one production-ready system.',
    solution:
      'AI Chatbot Platform provides multi-tenant RAG with document ingestion, vector retrieval, streaming generation, iframe embedding, API keys, and layered access control.',
    howItWorks: [
      'Admins upload documents such as PDFs, DOCX, TXT, and images into a chatbot knowledge base.',
      'The backend chunks content, embeds it, stores vectors, retrieves relevant context, and streams answers with source attribution.',
      'Chatbots can be deployed through public iframe embedding or managed inside authenticated dashboards.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI, MongoDB, PostgreSQL, pgvector, LangChain, OpenAI, Docker, and Railway.',
      'Async-first backend using motor, asyncpg, aiohttp, adaptive embedding batches, and rate-limit backoff.',
      'Four-tier RBAC across super admin, admin, instructor, and user roles.',
    ],
    decisions: [
      'Used a full RAG pipeline rather than generic chat so responses stay grounded in uploaded content.',
      'Added iframe embedding because deployment outside the admin dashboard is a core product need.',
      'Kept custom system prompts per chatbot to support different assistant behaviors.',
    ],
    challenges: [
      'Processing heterogeneous documents into clean chunks and useful citations.',
      'Scaling embedding throughput while respecting API rate limits.',
      'Balancing public chatbot access with API key security and tenant boundaries.',
    ],
    impact: [
      'Lets organizations deploy document-aware assistants quickly.',
      'Supports enterprise administration and public embedding from one platform.',
      'Creates a reusable RAG foundation for multiple domains.',
    ],
  },
  'devia-crm': {
    problem:
      'Construction businesses often manage quotes, invoices, clients, jobs, VAT, and schedules in separate tools. That fragmentation slows operations and makes financial tracking difficult, especially for bilingual French-market workflows.',
    solution:
      'DevIA CRM brings construction CRM, AI quote/invoice generation, voice commands, calendar sync, and financial analytics into a single SaaS workflow.',
    howItWorks: [
      'Users manage clients, jobs, quotes, invoices, and project history from a tab-based dashboard.',
      'GPT-4 assists with quotes and invoices while Whisper enables voice-driven document creation.',
      'Financial analytics and calendar sync keep operational and revenue data connected.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI, MongoDB, OpenAI GPT-4, Whisper, Stripe, Google Calendar, and Railway deployment.',
      'Modular API routers separate CRM, billing, scheduling, analytics, and AI workflows.',
      'Bilingual English/French UX with automatic browser language detection.',
    ],
    decisions: [
      'Focused on the construction domain instead of building a generic CRM.',
      'Included VAT and French-market assumptions directly in quote/invoice workflows.',
      'Used a no-page-reload SPA dashboard for operational speed.',
    ],
    challenges: [
      'Keeping AI-generated commercial documents accurate enough for business use.',
      'Coordinating CRM state with billing, calendar, and analytics modules.',
      'Supporting bilingual usage without duplicating the whole product flow.',
    ],
    impact: [
      'Reduces admin work for construction companies.',
      'Creates faster quote and invoice workflows with AI assistance.',
      'Centralizes customer, project, schedule, and revenue visibility.',
    ],
  },
  antlix: {
    problem:
      'Creative users need image generation and editing tools, but switching between prompt generation, background removal, face swapping, upscaling, and billing systems is fragmented.',
    solution:
      'ANTLIX combines text-to-image generation, seven editing tools, gallery management, credits, subscriptions, and admin controls into one creative AI platform.',
    howItWorks: [
      'Users choose image styles and generate visuals from prompts.',
      'Generated assets can be edited through tools such as background removal, face swap, inpainting, filters, upscaling, and object erasure.',
      'Credits and subscription plans govern usage while the gallery handles visibility and engagement.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI, MongoDB, Stability AI, Stripe, Google OAuth, and GridFS.',
      'Role-based admin dashboard and system logging for user, content, and billing oversight.',
      'Credit ledger tied to monthly/yearly Stripe subscription lifecycle.',
    ],
    decisions: [
      'Combined generation and editing so users do not leave the product after the first output.',
      'Used a credit system to make usage and subscription limits understandable.',
      'Added public/private/shared gallery states for different creative workflows.',
    ],
    challenges: [
      'Managing large generated media files and gallery visibility rules.',
      'Connecting multiple AI tools without overwhelming the interface.',
      'Keeping billing, credits, and generation usage consistent.',
    ],
    impact: [
      'Provides a full creative image workflow in one place.',
      'Supports monetization through credits and subscriptions.',
      'Gives admins visibility into usage, users, and generated content.',
    ],
  },
  storybook: {
    problem:
      'Authors managing long-form fiction need organized chapters, characters, locations, world rules, and research context. Generic writing tools do not preserve that structure for AI-assisted generation.',
    solution:
      'Storybook provides a structured creative writing workspace with books, chapters, characters, world-building elements, AI chapter help, and generated portraits.',
    howItWorks: [
      'Authors create books, chapters, characters, worlds, locations, and custom story elements.',
      'AI generation uses selected character/location/world context to help draft chapter content.',
      'DALL-E portrait generation and S3-compatible storage keep visual assets attached to the writing workspace.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI, MongoDB, Beanie ODM, OpenAI GPT-4, DALL-E, and S3-compatible storage.',
      'Structured domain models for books, chapters, characters, worlds, locations, and custom elements.',
      'Automatic sequencing and metadata management for chapter organization.',
    ],
    decisions: [
      'Modeled story entities explicitly so AI prompts can receive relevant context.',
      'Migrated media away from database blobs toward S3-compatible asset storage.',
      'Included visual generation because characters and scenes are part of the creative workflow.',
    ],
    challenges: [
      'Keeping generated writing consistent with existing story canon.',
      'Managing many related creative entities without making the UI dense.',
      'Injecting enough context for useful AI output without overloading prompts.',
    ],
    impact: [
      'Helps authors organize complex fiction projects.',
      'Makes AI assistance more context-aware than a blank chat prompt.',
      'Combines manuscript, outline, research, world, character, and media workflows.',
    ],
  },
  pocketshrink: {
    problem:
      'People need accessible mental wellness support, but mental health tools must handle age, privacy, quotas, voice interaction, and subscription boundaries carefully.',
    solution:
      'Pocket Shrink offers an AI mental wellness companion with age-aware access, voice input, TTS output, privacy modes, quotas, and subscription-driven entitlements.',
    howItWorks: [
      'Users enter the wellness chat experience through entitlement-aware account flows.',
      'The app accepts text or voice input, transcribes audio, and can return spoken responses through TTS.',
      'Plan and age rules determine available features, message limits, and privacy options.',
    ],
    architecture: [
      'Next.js/React frontend with FastAPI, MongoDB, OpenAI Whisper, TTS services, Stripe, and Zustand.',
      'Client-side state continuity through Zustand with persisted conversations.',
      'Backend entitlement checks for message quotas and plan features.',
    ],
    decisions: [
      'Separated teen and adult access paths to respect age-aware product requirements.',
      'Made privacy/anonymous mode a plan-level entitlement instead of a universal toggle.',
      'Used multimodal input/output to make support feel more accessible.',
    ],
    challenges: [
      'Designing supportive interactions without presenting AI as a replacement for professionals.',
      'Maintaining quotas and subscription state across client and server.',
      'Handling voice features reliably across browsers/devices.',
    ],
    impact: [
      'Provides always-available wellness support in a simple product flow.',
      'Supports monetization while keeping safety and privacy controls explicit.',
      'Creates a base for richer mental wellness interactions and continuity.',
    ],
  },
  lifetrek: {
    problem:
      'People often know they need to act but struggle with unclear goals, overwhelm, or lack of structure. Basic chatbots do not preserve coaching context or connect usage limits, subscriptions, and multilingual flows.',
    solution:
      'LifeTrek AI provides persistent coaching sessions that turn roadblocks into action plans, with streaming responses, subscriptions, quotas, multilingual support, and demo-safe limits.',
    howItWorks: [
      'Users interact with a coaching assistant through persistent conversation objects.',
      'The backend generates either standard or streaming responses based on session state and user context.',
      'Subscription and demo logic govern access, usage, and message quotas.',
    ],
    architecture: [
      'React/TypeScript frontend with FastAPI, MongoDB, OpenAI, Stripe, Zustand, and i18next.',
      'Axios interceptors handle refresh-token queuing to avoid authentication race conditions.',
      'Persistent coaching sessions store context across user visits.',
    ],
    decisions: [
      'Used stateful coaching sessions instead of one-off prompts so the assistant can remember progress.',
      'Added demo limits to support a product funnel without unlimited free usage.',
      'Included i18n and multilingual prompting for broader access.',
    ],
    challenges: [
      'Preventing auth refresh races during active chat usage.',
      'Balancing motivational tone with actionable planning.',
      'Keeping demo, subscription, and quota states aligned.',
    ],
    impact: [
      'Turns vague personal goals into clearer action steps.',
      'Supports a paid coaching product model with usage governance.',
      'Provides continuity across repeated coaching sessions.',
    ],
  },
  faceswap: {
    problem:
      'Face-to-cartoon and face swap workflows often require manual ComfyUI setup, careful masking, and prompt/model tuning to preserve style and blend quality.',
    solution:
      'Cartoon Face Swap packages a ComfyUI workflow that isolates faces, applies Flux Kontext models, and uses a LoRA adapter for consistent cartoon stylization.',
    howItWorks: [
      'The workflow receives an image and segments the target face region.',
      'Flux Kontext and Flux Kontext Fill generate and blend the transformed face area.',
      'A LoRA adapter guides the output toward a consistent cartoon style.',
    ],
    architecture: [
      'ComfyUI workflow composed of segmentation, generation, fill/blend, and LoRA style steps.',
      'Open-source model stack centered on Flux Kontext and Flux Kontext Fill.',
      'Image-segmentation masking layer for precise face targeting.',
    ],
    decisions: [
      'Used a proven visual workflow tool instead of hand-rolling image model orchestration.',
      'Separated masking from generation so the model only edits the intended region.',
      'Applied LoRA for style consistency across different input faces.',
    ],
    challenges: [
      'Keeping identity cues recognizable while changing visual style.',
      'Avoiding bad blends around hairlines, skin tones, and face boundaries.',
      'Tuning the workflow for repeatable output quality.',
    ],
    impact: [
      'Creates a reusable AI image workflow for cartoon face transformation.',
      'Improves consistency compared with ad hoc prompt-only generation.',
      'Demonstrates practical ComfyUI pipeline design.',
    ],
  },
  aiassessment: {
    problem:
      'Teachers need to turn broad classroom intent into curriculum-aligned assessments grounded in provided textbook chunks. Generic LLM prompts can drift outside curriculum boundaries or fail to handle teacher feedback mid-flow.',
    solution:
      'EduAssess uses a LangGraph human-in-the-loop agent that maps teacher intent to domains, subdomains, learning outcomes, retrieves textbook context, and generates assessment questions only after review.',
    howItWorks: [
      'The teacher starts a conversation and describes the topic or student weakness they want to assess.',
      'The agent searches curriculum semantics, proposes domains/LOs, retrieves textbook chunks, and summarizes them.',
      'The teacher can approve, reject, or refine chunks before the agent generates Markdown-formatted questions.',
    ],
    architecture: [
      'LangGraph state machine on FastAPI with MongoDB Atlas Vector Search and cross-session episodic memory.',
      'OpenAI GPT-4o for reasoning, routing, summarization, and generation; text-embedding-3-small for vectors.',
      'React/Vite frontend with Mermaid.js graph visualization for agent flow visibility.',
    ],
    decisions: [
      'Used LangGraph because the workflow requires cyclic planning, pausing, human feedback, and resuming over HTTP.',
      'Stored memory in the backend so sessions persist beyond the frontend runtime.',
      'Grounded generation in retrieved textbook chunks to reduce hallucination and curriculum drift.',
    ],
    challenges: [
      'Designing HTTP-friendly human-in-the-loop pauses without losing graph state.',
      'Mapping broad teacher language to precise curriculum targets.',
      'Handling dynamic pivots when the teacher changes constraints mid-conversation.',
    ],
    impact: [
      'Turns teacher intent into aligned assessment material faster.',
      'Keeps human review in control of curriculum and source chunks.',
      'Demonstrates a full stateful agent architecture rather than a single prompt chain.',
    ],
  },
}

const PROJECT_ORDER = [
  'mindscribe',
  'aiqms',
  'healyourhuman',
  'nebuluxury',
  'cvformatter',
  'retroai',
  'schedular',
  'corestone',
  'milestonely',
  'motoscout',
  'aichatbot',
  'devia-crm',
  'styleclone',
  'energyaudit',
  'antlix',
  'storybook',
  'pocketshrink',
  'lifetrek',
  'faceswap',
  'aiassessment'
]

export const projects: Project[] = [...projectEntries].map((project) => ({
  ...project,
  fullDetails: projectFullDetails[project.id],
})).sort((a, b) => {
  const indexA = PROJECT_ORDER.indexOf(a.id)
  const indexB = PROJECT_ORDER.indexOf(b.id)
  
  // If a project is missing from the list, put it at the end
  if (indexA === -1) return 1
  if (indexB === -1) return -1
  
  return indexA - indexB
})

export const projectCategories: Array<'All' | ProjectCategory> = [
  'All',
  'AI Systems',
  'Platforms',
  'Automation',
  'Creative Tools',
]
