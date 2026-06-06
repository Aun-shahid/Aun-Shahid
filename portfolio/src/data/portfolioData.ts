import type { IconType } from 'react-icons'
import {
  FaAws,
  FaEnvelope,
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaRocket,
  FaRegFolderOpen,
  FaShieldAlt,
  FaStar,
  FaLock,
  FaSpider,
  FaClock,
  FaPalette,
  FaMoneyBillWave,
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
  SiGoogle,
  SiAnthropic,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiShopify,
  SiMeta,
} from 'react-icons/si'

export type SectionTabId = 'overview' | 'experience' | 'education' | 'projects' | 'skills' | 'contact'

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

export const sectionTabs: Array<{ id: SectionTabId; label: string; icon: IconType }> = [
  { id: 'overview', label: 'Overview', icon: FaStar },
  { id: 'experience', label: 'Experience', icon: FaRegFolderOpen },
  { id: 'education', label: 'Education', icon: FaGraduationCap },
  { id: 'projects', label: 'Projects', icon: FaRocket },
  { id: 'skills', label: 'Skills', icon: FaShieldAlt },
  { id: 'contact', label: 'Contact', icon: FaEnvelope },
]

export const heroStats = [
  { value: '19+', label: 'Projects shipped' },
  { value: '5', label: 'Live products' },
  { value: '2+', label: 'Years in AI engineering' },
]

export const heroStrengths = [
  'FastAPI & LangChain',
  'LLM Product Engineering',
  'Full Stack React',
  'Cloud Deployment',
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Web',
    items: [
      { label: 'Python', icon: SiPython },
      { label: 'JavaScript', icon: SiReact },
      { label: 'FastAPI', icon: SiFastapi },
      { label: 'Flask', icon: SiFlask },
      { label: 'Django', icon: SiDjango },
      { label: 'React', icon: SiReact },
      { label: 'Next.js', icon: SiNextdotjs },
      { label: 'Tailwind', icon: SiTailwindcss },
      { label: 'Authentication', icon: FaLock },
      { label: 'OAuth2', icon: FaShieldAlt },
      { label: 'Google Login', icon: SiGoogle },
    ],
  },
  {
    title: 'AI & Automation',
    items: [
      { label: 'OpenAI', icon: SiOpenai },
      { label: 'Anthropic', icon: SiAnthropic },
      { label: 'Gemini', icon: SiGoogle },
      { label: 'Vertex AI', icon: SiGoogle },
      { label: 'ElevenLabs', icon: SiOpenai },
      { label: 'LangChain', icon: SiLangchain },
      { label: 'ComfyUI', icon: FaPalette },
      { label: 'NumPy', icon: SiNumpy },
      { label: 'Pandas', icon: SiPandas },
      { label: 'Scikit-learn', icon: SiScikitlearn },
      { label: 'Web Scraping', icon: FaSpider },
      { label: 'Automation', icon: FaClock },
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
      { label: 'Amazon S3', icon: FaAws },
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
      { label: 'Meta Dev', icon: SiMeta },
      { label: 'Shopify', icon: SiShopify },
      { label: 'Wise API', icon: FaMoneyBillWave },
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: 'Codexcape',
    role: 'Backend Developer',
    period: '07/2025 - Present',
    location: 'Remote',
    points: [
      'Responsible for designing the entire application architecture, implementing robust backend systems, and managing full-cycle deployment.',
      'Shipped production AI applications with FastAPI, keeping API contracts type-safe and maintainable across fast delivery cycles.',
      'Built LangChain pipelines connecting OpenAI and Gemini models to CRM, voice, and content workflows.',
      'Implemented webhook and Redis pub/sub systems for responsive AI agent workflows with lower perceived latency.',
    ],
  },
  {
    company: 'SoftSuite Technologies',
    role: 'AI Engineer',
    period: '04/2025 - 07/2025',
    location: 'Onsite',
    points: [
      'Built the backend for a social media automation platform with FastAPI, auth flows, rate-limit handling, and scheduling logic.',
      'Integrated LangChain-driven content generation to help marketing teams draft platform-specific posts faster.',
    ],
  },
  {
    company: 'Upwork Freelancing',
    role: 'Full Stack Developer',
    period: '10/2024 - 04/2025',
    location: 'Remote / Client-based',
    points: [
      'Built a POS system for Madina Yakhni Pulao in Multan, covering sales, order handling, and day-to-day shop operations.',
      'Built a CRM system for Karim and Sons in Multan to manage customers, sales activity, and business follow-ups.',
      'Delivered an intelligent lease management system with AI assistance for lease tracking, document workflows, and operational support.',
    ],
  },
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

export const contactLinks = [
  { label: 'Rawalpindi, Pakistan', href: 'https://www.google.com/maps/search/Rawalpindi', icon: FaMapMarkerAlt },
  { label: 'aun.shahid114@gmail.com', href: 'mailto:aun.shahid114@gmail.com', icon: FaEnvelope },
  { label: 'linkedin.com/in/aun-shahid', href: 'https://www.linkedin.com/in/aun-shahid-8b6556268/', icon: FaLinkedin },
  { label: 'github.com/Aun-shahid', href: 'https://github.com/Aun-shahid', icon: FaGithub },
]
