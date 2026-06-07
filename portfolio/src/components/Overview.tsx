import type { SectionTabId } from '../data/portfolioData'
import {
  FaArrowRight,
  FaCloud,
  FaCode,
  FaCogs,
  FaDatabase,
  FaLayerGroup,
  FaMicrophone,
  FaProjectDiagram,
  FaRocket,
  FaRoute,
} from 'react-icons/fa'
import PortfolioInsights from './PortfolioInsights'

const overviewCards = [
  {
    title: 'What I build',
    text: 'AI-enabled products with strong backend foundations — from LangGraph agents and RAG pipelines to full React frontends, Stripe billing, and Docker deployments.',
    icon: FaLayerGroup,
  },
  {
    title: 'How I work',
    text: 'Clean API contracts, stable data models, and a clear handoff between frontend and backend. Every product I ship is easy to operate, not just easy to demo.',
    icon: FaCogs,
  },
  {
    title: 'Where to start',
    text: 'Browse Projects to see live products and case studies. Check Skills for the full stack, and Experience for the professional background.',
    icon: FaRoute,
  },
]

const aiCapabilities = [
  { label: 'LLM Pipelines', desc: 'OpenAI, Gemini, Claude, DeepSeek', icon: FaProjectDiagram },
  { label: 'AI Agents', desc: 'LangGraph, LangChain, HITL workflows', icon: FaCogs },
  { label: 'RAG Systems', desc: 'Vector search, chunking, retrieval', icon: FaDatabase },
  { label: 'Voice & Multimodal', desc: 'Whisper, TTS, document vision', icon: FaMicrophone },
  { label: 'Full Stack', desc: 'React, FastAPI, Next.js, Django', icon: FaCode },
  { label: 'Cloud & DevOps', desc: 'AWS, Railway, Docker, Nginx', icon: FaCloud },
]

type OverviewProps = {
  onNavigate: (section: SectionTabId) => void
}

export default function Overview({ onNavigate }: OverviewProps) {
  return (
    <div className="grid gap-5">
      <section className="py-2">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
              Overview
            </p>
            <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Full Stack Engineer building complete AI products end to end.
            </h2>
          </div>
          <span className="w-fit shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Portfolio map
          </span>
        </div>
        <p className="max-w-4xl leading-8 text-slate-600 dark:text-slate-400">
          From the first prompt to production deployment — I design the architecture, build the backend,
          wire up the frontend, and ship it. 19+ projects across AI systems, SaaS platforms, automation
          tools, and creative applications.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {overviewCards.map((card) => {
          const Icon = card.icon
          return (
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5" key={card.title}>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-300/10 dark:text-teal-200">
              <Icon aria-hidden="true" />
            </div>
            <h3 className="font-extrabold text-slate-950 dark:text-white">{card.title}</h3>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{card.text}</p>
          </article>
          )
        })}
      </div>

      <PortfolioInsights />

      <section className="py-6">
        <div className="mb-5">
          <div>
            <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
              AI Capabilities
            </p>
            <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Every layer of the AI stack, covered.
            </h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {aiCapabilities.map((cap) => (
            <div key={cap.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700 shadow-sm dark:bg-teal-300/10 dark:text-teal-200">
                <cap.icon aria-hidden="true" />
              </div>
              <h4 className="font-extrabold text-slate-950 dark:text-white">{cap.label}</h4>
              <p className="mt-2 leading-6 text-slate-600 dark:text-slate-400">{cap.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-lg bg-teal-700 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-teal-700/15 transition hover:-translate-y-0.5 hover:bg-teal-800"
            onClick={() => onNavigate('projects')}
          >
            <FaRocket aria-hidden="true" className="mr-2 inline" />
            See All Projects
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-teal-300/60"
            onClick={() => onNavigate('contact')}
          >
            <FaArrowRight aria-hidden="true" className="mr-2 inline" />
            Work With Me
          </button>
        </div>
      </section>
    </div>
  )
}
