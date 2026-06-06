export type ProjectCategory = 'AI Systems' | 'Platforms' | 'Automation' | 'Creative Tools'

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
  screenshots?: {
    desktop: string
    mobile: string
  }
}

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
const projectEntries: Project[] = [
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
    apiUrl: 'https://devia-backend-production.up.railway.app',
    screenshots: {
      desktop: 'projects/devia_web.png',
      mobile: 'projects/devia_mobile.png',
    },
    status: 'live',
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
    apiUrl: 'https://aipoweredchatbot-production.up.railway.app/docs',
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
    status: 'in-progress',
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
    status: 'live',
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
    apiUrl: 'https://nebuluxury.com/api/docs',
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
    status: 'live',
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
    status: 'in-progress',
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
    status: 'in-progress',
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
    status: 'live',
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
    id: 'drawingpic',
    name: 'DrawingPic',
    tagline: 'AI Art Generation with Style Presets',
    category: 'Creative Tools',
    summary:
      'Backend service for generating style-infused images using Google Gemini AI. Supports text-to-image, image-to-image, and iterative refinement with predefined artistic style presets.',
    tags: ['FastAPI', 'Python', 'MongoDB', 'Google Gemini', 'Cloudinary', 'Docker'],
    details: [
      'Text-to-image generation with 5 predefined art styles: Sculpted Impasto, Ethereal Watercolor, Gothic Oil Painting, Art Deco Nouveau, Synthwave Surrealism.',
      'Image-to-image generation (source image + style combination).',
      'Iterative image refinement with persistent metadata in MongoDB.',
      'Cloudinary cloud storage for all generated images.',
      'Full REST API with Swagger documentation.',
    ],
    githubUrl: 'https://github.com/Aun-shahid/DrawingPicAPI',
    status: 'archived',
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
    status: 'archived',
  },
]

const PROJECT_ORDER = [
  'mindscribe',
  'aiqms',
  'healyourhuman',
  'retroai',
  'schedular',
  'corestone',
  'milestonely',
  'motoscout',
  'nebuluxury',
  'cvformatter',
  'aichatbot',
  'devia-crm',
  'antlix',
  'storybook',
  'pocketshrink',
  'lifetrek',
  'drawingpic',
  'faceswap',
  'aiassessment'
]

export const projects: Project[] = [...projectEntries].sort((a, b) => {
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
