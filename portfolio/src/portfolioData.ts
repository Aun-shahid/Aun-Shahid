import type { IconType } from 'react-icons'
import {
  FaAws,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRocket,
  FaRegFolderOpen,
  FaShieldAlt,
  FaStar,
} from 'react-icons/fa'
import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiGooglecalendar,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiRailway,
  SiStripe,
  SiTailwindcss,
} from 'react-icons/si'

export type SectionTabId = 'overview' | 'experience' | 'projects' | 'skills' | 'contact'

export type ProjectFilterId = 'All' | 'AI Systems' | 'Platforms' | 'Automation' | 'Creative Tools'

export type SkillGroup = {
  title: string
  items: Array<{ label: string; icon: IconType }>
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  points: string[]
}

export type ProjectItem = {
  id: string
  name: string
  tagline: string
  category: Exclude<ProjectFilterId, 'All'>
  summary: string
  tags: string[]
  details: string[]
  status: string
  featured?: boolean
}

export const sectionTabs: Array<{ id: SectionTabId; label: string; icon: IconType }> = [
  { id: 'overview', label: 'Overview', icon: FaStar },
  { id: 'experience', label: 'Experience', icon: FaRegFolderOpen },
  { id: 'projects', label: 'Projects', icon: FaRocket },
  { id: 'skills', label: 'Skills', icon: FaShieldAlt },
  { id: 'contact', label: 'Contact', icon: FaEnvelope },
]

export const heroStats = [
  { value: '19', label: 'Projects tracked' },
  { value: '3', label: 'Detailed case studies' },
  { value: '2+', label: 'Years shipping AI products' },
]

export const heroStrengths = [
  'FastAPI architecture',
  'LLM product engineering',
  'Real-time workflows',
  'Deployment and delivery',
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Web',
    items: [
      { label: 'Python', icon: SiPython },
      { label: 'JavaScript', icon: SiReact },
      { label: 'React', icon: SiReact },
      { label: 'Next.js', icon: SiNextdotjs },
      { label: 'Tailwind', icon: SiTailwindcss },
    ],
  },
  {
    title: 'AI & Automation',
    items: [
      { label: 'FastAPI', icon: SiFastapi },
      { label: 'LangChain', icon: SiLangchain },
      { label: 'OpenAI', icon: SiOpenai },
      { label: 'Django', icon: SiDjango },
      { label: 'Flask', icon: SiFlask },
    ],
  },
  {
    title: 'Data & Infra',
    items: [
      { label: 'PostgreSQL', icon: SiPostgresql },
      { label: 'MySQL', icon: SiMysql },
      { label: 'MongoDB', icon: SiMongodb },
      { label: 'Redis', icon: SiRedis },
      { label: 'Docker', icon: SiDocker },
    ],
  },
  {
    title: 'Delivery & Integrations',
    items: [
      { label: 'AWS', icon: FaAws },
      { label: 'Railway', icon: SiRailway },
      { label: 'Nginx', icon: SiNginx },
      { label: 'Stripe', icon: SiStripe },
      { label: 'Google APIs', icon: SiGooglecalendar },
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: 'Codexcape',
    role: 'AI Software Engineer',
    period: '07/2025 - Present',
    location: 'Remote',
    points: [
      'Architected and shipped production AI applications with FastAPI, keeping API contracts type-safe and maintainable across fast delivery cycles.',
      'Built LangChain pipelines that connect OpenAI and Gemini models to CRM, voice, and content workflows.',
      'Owned deployment end-to-end on AWS and Railway, including domains, SSL, and environment management.',
      'Implemented webhook and Redis pub/sub systems for responsive AI agent workflows with lower perceived latency.',
    ],
  },
  {
    company: 'SoftSuite Technologies',
    role: 'AI Engineer',
    period: '04/2025 - 07/2025',
    location: 'Remote',
    points: [
      'Built the backend for a social media automation platform with FastAPI, auth flows, rate-limit handling, and scheduling logic.',
      'Integrated LangChain-driven content generation to help marketing teams draft platform-specific posts faster.',
    ],
  },
]

export const projects: ProjectItem[] = [
  {
    id: 'devia-crm',
    name: 'DevIA CRM',
    tagline: 'Construction Management with AI',
    category: 'Platforms',
    summary: 'Construction management SaaS with a tab-based UX, AI assistant flows, and business tooling for field operations.',
    tags: ['React', 'FastAPI', 'MongoDB', 'Google Calendar', 'AI assistant'],
    details: [
      'Built a React/TypeScript frontend and FastAPI backend for quotes, invoices, clients, calendar, expenses, and reports.',
      'Integrated voice and text AI assistant capabilities plus Google Calendar and mail/payment workflows.',
      'Delivered role-based admin flows and bilingual support for English and French users.',
    ],
    status: 'Detailed case study',
    featured: true,
  },
  {
    id: 'corestone',
    name: 'Corestone',
    tagline: 'AI Essay Evaluation Platform',
    category: 'AI Systems',
    summary: 'AI-powered essay evaluation platform for IBDP Extended Essays and TOK submissions.',
    tags: ['React', 'FastAPI', 'OpenAI', 'Stripe', 'MongoDB'],
    details: [
      'Delivered rubric-based essay grading with role-based access for students, teachers, and administrators.',
      'Supported PDF and DOCX uploads, submission tracking, analytics dashboards, and secure JWT authentication.',
      'Shipped the product as a full-stack monorepo with FastAPI, MongoDB, Stripe, and a modern React frontend.',
    ],
    status: 'Detailed case study',
    featured: true,
  },
  {
    id: 'aiassessment',
    name: 'EduAssess',
    tagline: 'AI-Powered Assessment Generation',
    category: 'AI Systems',
    summary: 'Stateful, conversational assessment agent that turns teacher intent into curriculum-aligned questions.',
    tags: ['LangGraph', 'LangChain', 'FastAPI', 'MongoDB Atlas', 'OpenAI'],
    details: [
      'Used LangGraph to manage a human-in-the-loop conversation that maps teacher prompts to domains, subdomains, and learning outcomes.',
      'Retrieved textbook chunks with vector search, summarized them, and iterated on teacher feedback before final question generation.',
      'Generated assessment output in clean Markdown with a persistent backend memory layer.',
    ],
    status: 'Detailed case study',
    featured: true,
  },
  {
    id: 'aichatbot',
    name: 'AI Chatbot',
    tagline: 'Conversational AI System',
    category: 'AI Systems',
    summary: 'Archived AI chatbot concept kept visible in the portfolio archive.',
    tags: ['AI', 'Chat', 'Automation'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'aitherapy',
    name: 'AI Therapy',
    tagline: 'Wellness-Focused AI Support',
    category: 'AI Systems',
    summary: 'Archived wellness-focused AI concept for guided interactions and support flows.',
    tags: ['AI', 'Voice', 'Workflow'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'documentai',
    name: 'Document AI',
    tagline: 'Document Intelligence System',
    category: 'AI Systems',
    summary: 'Document intelligence concept for extracting and organizing information from files.',
    tags: ['AI', 'Documents', 'Extraction'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'retroai',
    name: 'RetroAI',
    tagline: 'Retro-Styled AI Experience',
    category: 'AI Systems',
    summary: 'Retro-styled AI concept positioned for an expressive product experience.',
    tags: ['AI', 'Creative UX', 'Product'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'lifetrek',
    name: 'LifeTrek',
    tagline: 'Life Planning & Progress Tracking',
    category: 'Platforms',
    summary: 'Life-planning concept for tracking progress and turning goals into visible milestones.',
    tags: ['Planning', 'Tracking', 'Productivity'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'milestonely',
    name: 'Milestonely',
    tagline: 'Milestone Tracking Platform',
    category: 'Platforms',
    summary: 'Milestone tracking concept focused on progress visibility and structured delivery.',
    tags: ['Milestones', 'Planning', 'Delivery'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'pocketshrink',
    name: 'PocketShrink',
    tagline: 'Personal Productivity Utility',
    category: 'Platforms',
    summary: 'Compact utility concept for personal productivity or budget-focused workflows.',
    tags: ['Utility', 'Personal tools', 'Planning'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'storybook',
    name: 'Storybook',
    tagline: 'Story & Documentation Platform',
    category: 'Platforms',
    summary: 'Story-focused project note retained in the archive for future expansion.',
    tags: ['Documentation', 'Content', 'Product'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'antlix',
    name: 'Antlix',
    tagline: 'Workflow Automation System',
    category: 'Automation',
    summary: 'Archived automation concept stored in the project archive for reference.',
    tags: ['Automation', 'Systems', 'Workflow'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'motoscout-automation',
    name: 'MotoScout Automation',
    tagline: 'Browser Task Automation',
    category: 'Automation',
    summary: 'Automation concept for streamlining repetitive Motoscout tasks and workflows.',
    tags: ['Automation', 'Browser', 'Ops'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'schedular',
    name: 'Schedular',
    tagline: 'Scheduling & Time Management',
    category: 'Automation',
    summary: 'Scheduling utility concept centered on clear planning and time management.',
    tags: ['Scheduling', 'Planning', 'Utility'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'cvformatter',
    name: 'CV Formatter',
    tagline: 'Professional CV Formatting Tool',
    category: 'Creative Tools',
    summary: 'Utility concept for structuring, formatting, and polishing CV content.',
    tags: ['Docs', 'Formatting', 'Utility'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'drawingpic',
    name: 'DrawingPic',
    tagline: 'Sketch to Visual Converter',
    category: 'Creative Tools',
    summary: 'Creative concept for turning sketches, drawings, or ideas into polished visuals.',
    tags: ['Creative', 'Visuals', 'AI'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'faceswap',
    name: 'FaceSwap',
    tagline: 'Face Transformation Tool',
    category: 'Creative Tools',
    summary: 'Media editing concept for face transformation workflows and visual experimentation.',
    tags: ['Creative', 'Media', 'AI'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'healyourhuman',
    name: 'Heal Your Human',
    tagline: 'Wellness & Support Platform',
    category: 'Creative Tools',
    summary: 'Human-centered concept positioned around support, reflection, or wellness.',
    tags: ['Wellness', 'Creative', 'Experience'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
  {
    id: 'styleclone',
    name: 'StyleClone',
    tagline: 'Style Reproduction Tool',
    category: 'Creative Tools',
    summary: 'Style reproduction concept for visual experimentation and clone-based workflows.',
    tags: ['Creative', 'Style', 'AI'],
    details: ['Project note currently captures the concept as a title-only entry in the workspace.'],
    status: 'Compact project note',
  },
]

export const projectFilters: ProjectFilterId[] = ['All', 'AI Systems', 'Platforms', 'Automation', 'Creative Tools']

export const contactLinks = [
  { label: 'Rawalpindi', href: 'https://www.google.com/maps/search/Rawalpindi', icon: FaMapMarkerAlt },
  { label: '+92 303 4486565', href: 'tel:+923034486565', icon: FaPhoneAlt },
  { label: 'aun.shahid114@gmail.com', href: 'mailto:aun.shahid114@gmail.com', icon: FaEnvelope },
  { label: 'linkedin.com/in/aun-shahid', href: 'https://www.linkedin.com/in/aun-shahid', icon: FaLinkedin },
  { label: 'github.com/Aun-shahid', href: 'https://github.com/Aun-shahid', icon: FaGithub },
]

export const deliveryFocus = [
  { label: 'LLM applications', icon: SiOpenai },
  { label: 'Backend APIs', icon: SiFastapi },
  { label: 'Real-time systems', icon: SiRedis },
  { label: 'Cloud deployment', icon: FaAws },
]

export const certification = {
  title: 'AI for All: From Basics to GenAI Practice',
  issuer: 'Nvidia',
  date: '07/2025',
}
