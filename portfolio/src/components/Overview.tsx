import type { SectionTabId } from '../data/portfolioData'
import {
  FaArrowRight,
  FaBezierCurve,
  FaBrain,
  FaCloud,
  FaCode,
  FaCogs,
  FaDatabase,
  FaDocker,
  FaFileAlt,
  FaLayerGroup,
  FaMicrophone,
  FaNetworkWired,
  FaProjectDiagram,
  FaRocket,
  FaRoute,
  FaSearch,
  FaShieldAlt,
} from 'react-icons/fa'

const overviewCards = [
  {
    title: 'What I build',
    text: 'AI products with backend depth, frontend polish, and real deployment paths.',
    icon: FaLayerGroup,
    accent: 'from-cyan-400 to-teal-300',
  },
  {
    title: 'How I work',
    text: 'Clear APIs, stable data models, and workflows that stay operable after launch.',
    icon: FaCogs,
    accent: 'from-amber-300 to-orange-300',
  },
  {
    title: 'Where to start',
    text: 'Jump into projects, skills, or experience based on what you want to inspect.',
    icon: FaRoute,
    accent: 'from-emerald-300 to-sky-300',
  },
]

const aiCapabilities = [
  { label: 'LLM Pipelines', desc: 'OpenAI, Gemini, Claude, DeepSeek', icon: FaProjectDiagram, tone: 'cyan' },
  { label: 'AI Agents', desc: 'LangGraph, LangChain, HITL workflows', icon: FaCogs, tone: 'amber' },
  { label: 'RAG Systems', desc: 'Vector search, chunking, retrieval', icon: FaDatabase, tone: 'emerald' },
  { label: 'Voice & Multimodal', desc: 'Whisper, TTS, document vision', icon: FaMicrophone, tone: 'rose' },
  { label: 'Full Stack', desc: 'React, FastAPI, Next.js, Django', icon: FaCode, tone: 'sky' },
  { label: 'Cloud & DevOps', desc: 'AWS, Railway, Docker, Nginx', icon: FaCloud, tone: 'lime' },
]

const stackLayers = [
  { label: 'Prompt + UI', icon: FaCode, x: 96, y: 96, className: 'border-sky-300/45 bg-sky-100/80 text-sky-950 dark:border-sky-300/50 dark:bg-sky-400/10 dark:text-sky-100' },
  { label: 'Infra', icon: FaDocker, x: 260, y: 68, className: 'border-lime-400/45 bg-lime-100/80 text-lime-950 dark:border-lime-300/50 dark:bg-lime-300/10 dark:text-lime-100' },
  { label: 'Agent Logic', icon: FaBrain, x: 430, y: 118, className: 'border-amber-400/45 bg-amber-100/80 text-amber-950 dark:border-amber-300/50 dark:bg-amber-300/10 dark:text-amber-100' },
  { label: 'Retrieval', icon: FaSearch, x: 112, y: 264, className: 'border-emerald-400/45 bg-emerald-100/80 text-emerald-950 dark:border-emerald-300/50 dark:bg-emerald-300/10 dark:text-emerald-100' },
  { label: 'Documents', icon: FaFileAlt, x: 400, y: 282, className: 'border-rose-400/45 bg-rose-100/80 text-rose-950 dark:border-rose-300/50 dark:bg-rose-300/10 dark:text-rose-100' },
]

const toneClasses: Record<string, { chip: string; bar: string; card: string }> = {
  cyan: { chip: 'border-cyan-300/40 bg-cyan-400/10 text-cyan-100', bar: 'bg-cyan-300/70', card: 'ui-3d-tone-cyan' },
  amber: { chip: 'border-amber-300/40 bg-amber-300/10 text-amber-100', bar: 'bg-amber-300/70', card: 'ui-3d-tone-amber' },
  emerald: { chip: 'border-teal-300/40 bg-teal-300/10 text-teal-100', bar: 'bg-teal-300/70', card: 'ui-3d-tone-teal' },
  rose: { chip: 'border-rose-300/40 bg-rose-300/10 text-rose-100', bar: 'bg-rose-300/70', card: 'ui-3d-tone-rose' },
  sky: { chip: 'border-sky-300/40 bg-sky-300/10 text-sky-100', bar: 'bg-sky-300/70', card: 'ui-3d-tone-sky' },
  lime: { chip: 'border-amber-200/40 bg-amber-200/10 text-amber-100', bar: 'bg-amber-200/70', card: 'ui-3d-tone-gold' },
}

type OverviewProps = {
  onNavigate: (section: SectionTabId) => void
}

export default function Overview({ onNavigate }: OverviewProps) {
  return (
    <div className="grid gap-10">
      <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:block">
            <div>
              <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
                Overview
              </p>
              <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                Full Stack Engineer building complete AI products end to end.
              </h2>
            </div>
            <span className="ice-glass-chip w-fit shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300 lg:mt-5">
              Portfolio map
            </span>
          </div>
          <p className="max-w-3xl leading-8 text-slate-600 dark:text-slate-400">
            From first prompt to production deployment, the work moves through architecture, AI workflow,
            product interface, and release. The path below makes that loop easier to scan than another wall of copy.
          </p>
        </div>

        <div className="ice-glass-card relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="absolute inset-x-8 top-1/2 hidden h-px bg-gradient-to-r from-cyan-300 via-amber-300 to-emerald-300 opacity-70 lg:block" aria-hidden="true" />
          <div className="grid gap-4 lg:grid-cols-3">
            {overviewCards.map((card, index) => {
              const Icon = card.icon
              return (
                <article key={card.title} className="ice-glass-soft relative rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/50">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${card.accent} text-slate-950 shadow-lg shadow-slate-950/10`}>
                    <Icon aria-hidden="true" />
                  </div>
                  <span className="text-xs font-extrabold uppercase text-slate-400">Step 0{index + 1}</span>
                  <h3 className="mt-2 font-extrabold text-slate-950 dark:text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{card.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-6 py-2 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="lg:col-start-1">
            <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
              AI Capabilities
            </p>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Every layer of the AI stack, covered.
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-600 dark:text-slate-400">
              The stack map shows how prompts, agent logic, retrieval, documents, and infrastructure connect.
              The swipeable cards on the right break those layers into the actual systems I build.
            </p>
        </div>

        <div className="stack-map-panel relative min-h-[360px] overflow-hidden rounded-lg border p-5 shadow-sm lg:col-start-1 lg:row-start-2">
            <div className="relative z-10 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
              <FaBezierCurve aria-hidden="true" className="text-teal-700 dark:text-teal-200" />
              Visual stack map
            </div>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 360" aria-hidden="true">
              <defs>
                <linearGradient id="stack-route" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="48%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <path className="stack-route-line" d="M260 176 C220 128 164 104 96 96" />
              <path className="stack-route-line stack-route-delay" d="M260 176 C260 132 260 96 260 68" />
              <path className="stack-route-line stack-route-delay-long" d="M260 176 C318 123 370 111 430 118" />
              <path className="stack-route-line stack-route-delay" d="M260 176 C202 207 158 235 112 264" />
              <path className="stack-route-line stack-route-delay-long" d="M260 176 C316 220 356 257 400 282" />
              <circle className="stack-ring stack-ring-core" cx="260" cy="176" r="82" fill="none" strokeWidth="2" />
              <circle className="stack-ring stack-ring-mid" cx="260" cy="176" r="118" fill="none" strokeDasharray="8 12" strokeWidth="1.5" />
              <circle className="stack-ring stack-ring-wide" cx="260" cy="176" r="152" fill="none" strokeDasharray="2 15" strokeWidth="1" />
              {stackLayers.map((layer) => (
                <g key={layer.label} className="stack-node-glow">
                  <circle className="stack-node-shell" cx={layer.x} cy={layer.y} r="8" strokeWidth="2" />
                  <circle className="stack-node-dot" cx={layer.x} cy={layer.y} r="3" />
                </g>
              ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="stack-core flex h-32 w-32 items-center justify-center rounded-full border border-teal-500/25 bg-teal-100/60 text-teal-950 shadow-2xl shadow-teal-600/10 backdrop-blur dark:border-teal-200/30 dark:bg-teal-300/10 dark:text-teal-100 dark:shadow-teal-400/10">
                <FaNetworkWired aria-hidden="true" className="text-5xl" />
              </div>
            </div>
            {stackLayers.map((layer) => {
              const Icon = layer.icon
              return (
                <div
                  key={layer.label}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-3 py-2 shadow-lg shadow-black/20 backdrop-blur ${layer.className}`}
                  style={{ left: `${(layer.x / 520) * 100}%`, top: `${(layer.y / 360) * 100}%` }}
                >
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em]">
                    <Icon aria-hidden="true" />
                    {layer.label}
                  </div>
                </div>
              )
            })}
          </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:col-start-1 lg:row-start-3">
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

        <div className="ice-glass-card overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 lg:col-start-2 lg:row-start-2 lg:row-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-200">
                Layer cards
              </p>
              <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                Swipe through the build layers.
              </h3>
            </div>
            <div className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400 sm:flex">
              <FaShieldAlt aria-hidden="true" />
              Swipe or scroll
            </div>
          </div>
          <div className="capability-rail flex snap-x gap-3 overflow-x-auto pb-3" aria-label="AI capability slides">
            {aiCapabilities.map((cap, index) => (
              <article key={cap.label} className="ui-3d-parent min-w-[84%] snap-center sm:min-w-[46%] lg:min-w-[58%] xl:min-w-[46%]">
                <div className={`ui-3d-card ${toneClasses[cap.tone].card}`}>
                  <div className="ui-3d-logo" aria-hidden="true">
                    <span className="ui-3d-circle ui-3d-circle-1" />
                    <span className="ui-3d-circle ui-3d-circle-2" />
                    <span className="ui-3d-circle ui-3d-circle-3" />
                    <span className="ui-3d-circle ui-3d-circle-4" />
                    <span className="ui-3d-circle ui-3d-circle-5 text-white">
                      <cap.icon aria-hidden="true" />
                    </span>
                  </div>
                  <div className="ui-3d-glass" aria-hidden="true" />
                  <div className="ui-3d-content">
                    <span className="ui-3d-eyebrow">Layer 0{index + 1}</span>
                    <h4 className="ui-3d-title mt-2 text-xl font-black">{cap.label}</h4>
                    <p className="ui-3d-text mt-4 text-sm font-semibold leading-6">{cap.desc}</p>
                  </div>
                  <div className="ui-3d-bottom">
                    <div className="flex gap-2">
                      <span className={`ui-3d-pill ${toneClasses[cap.tone].chip}`} aria-hidden="true">
                        <cap.icon />
                      </span>
                    </div>
                    <span className="ui-3d-link flex items-center gap-1 text-xs font-black">
                      
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400 sm:hidden">
            <FaShieldAlt aria-hidden="true" />
            Swipe or scroll
          </div>
        </div>
      </section>
    </div>
  )
}
