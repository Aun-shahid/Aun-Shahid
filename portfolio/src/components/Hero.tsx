import type { CSSProperties } from 'react'
import { contactLinks, heroStats, heroStrengths } from '../data/portfolioData'
import type { SectionTabId } from '../data/portfolioData'

type HeroProps = {
  onNavigate: (section: SectionTabId) => void
}

const heroName = 'Aun Shahid'
const heroDescription =
  'I build complete software products across backend systems, modern frontends, automation, and applied AI. The work ranges from fast prototypes to production platforms with clean APIs, reliable data models, and deployable infrastructure.'

function AnimatedLetters({
  text,
  start = '220ms',
  step = '58ms',
}: {
  text: string
  start?: string
  step?: string
}) {
  return (
    <span aria-hidden="true">
      {text.split('').map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={letter === ' ' ? 'letter-space' : 'letter-load'}
          style={
            {
              '--letter-index': index,
              '--letter-start': start,
              '--letter-step': step,
            } as CSSProperties
          }
        >
          {letter}
        </span>
      ))}
    </span>
  )
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="mb-12 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
      <div className="relative overflow-hidden py-8 sm:py-12 lg:py-16">
        <div className="flex flex-wrap items-center gap-3">
          <p className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
            Full Stack Engineer
          </p>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Available for product-focused work
          </span>
        </div>

        <h1
          className="mt-6 max-w-[10ch] text-5xl font-extrabold leading-[0.95] tracking-tight text-slate-950 dark:text-white sm:text-7xl lg:text-8xl"
          aria-label={heroName}
        >
          <AnimatedLetters text={heroName} />
          <span className="type-caret" aria-hidden="true" />
        </h1>

        <p
          className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg"
          aria-label={heroDescription}
        >
          <AnimatedLetters text={heroDescription} start="760ms" step="9ms" />
        </p>

        <div className="mt-8 grid gap-3 sm:max-w-md sm:grid-cols-2">
          <button
            type="button"
            className="rounded-lg bg-teal-700 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-teal-700/15 transition hover:-translate-y-0.5 hover:bg-teal-800"
            onClick={() => onNavigate('projects')}
          >
            Browse Projects
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-teal-300/60"
            onClick={() => onNavigate('contact')}
          >
            Get in Touch
          </button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2" aria-label="Contact links">
          {contactLinks.map((item) => {
            const Icon = item.icon
            const isExternal = item.href.startsWith('http')
            return (
              <a
                key={item.label}
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
                className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-teal-300/60 dark:hover:text-teal-200"
              >
                <Icon aria-hidden="true" className="shrink-0 text-teal-700" />
                <span className="truncate">{item.label}</span>
              </a>
            )
          })}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2" aria-label="Core strengths">
          {heroStrengths.map((strength) => (
            <span
              key={strength}
              className="rounded-lg border border-teal-100 bg-teal-50 px-3 py-2 text-center text-sm font-bold text-teal-900 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-100"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>

      <aside className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-8 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
        <div className="w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
          Open for full-stack product work
        </div>

        <div className="grid gap-6">
          <div>
            <h3 className="font-extrabold text-slate-950 dark:text-white">End-to-End Builder</h3>
            <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
              I can take a product from architecture to backend APIs, frontend screens, integrations,
              and deployment.
            </p>
          </div>
          <div>
            <h3 className="font-extrabold text-slate-950 dark:text-white">Practical AI Systems</h3>
            <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
              RAG, agents, voice, document workflows, and model integrations built around real user flows.
            </p>
          </div>
          <div>
            <h3 className="font-extrabold text-slate-950 dark:text-white">Production-First</h3>
            <p className="mt-2 leading-7 text-slate-600 dark:text-slate-400">
              Stable data models, clean API contracts, and deployment pipelines that hold up under
              real traffic.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {heroStats.map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-slate-950/40">
              <strong className="block text-xl font-extrabold text-slate-950 dark:text-white">{item.value}</strong>
              <span className="text-xs font-bold leading-5 text-slate-500 dark:text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  )
}
