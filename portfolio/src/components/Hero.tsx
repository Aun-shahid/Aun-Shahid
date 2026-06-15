import type { CSSProperties } from 'react'
import { contactLinks, heroStrengths } from '../data/portfolioData'
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
      <div className="relative overflow-hidden py-3 sm:py-5 lg:py-7">
        <h1
          className="mt-6 max-w-[10ch] text-5xl font-bold leading-[0.95] tracking-tight text-slate-950 dark:text-white sm:text-7xl lg:text-8xl"
          aria-label={heroName}
        >
          <AnimatedLetters text={heroName} />
          <span className="type-caret" aria-hidden="true" />
        </h1>

        <p
          className="mt-6 max-w-xl text-base leading-[1.75] text-slate-600 dark:text-slate-400 sm:text-lg"
          aria-label={heroDescription}
        >
          <AnimatedLetters text={heroDescription} start="760ms" step="9ms" />
        </p>

        <div className="mt-8 grid gap-3 sm:max-w-md sm:grid-cols-2">
          <button
            type="button"
            className="rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700 dark:bg-teal-700 dark:shadow-teal-700/20 dark:hover:bg-teal-800"
            onClick={() => onNavigate('projects')}
          >
            See My Work
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-teal-400/50"
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
                className="ice-glass-soft flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-teal-300/60 dark:hover:text-teal-200"
              >
                <Icon aria-hidden="true" className="shrink-0 text-orange-600 dark:text-teal-400" />
                <span className="truncate">{item.label}</span>
              </a>
            )
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Core strengths">
          {heroStrengths.map((strength) => (
            <span
              key={strength}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400"
            >
              <span className="h-1 w-1 rounded-full bg-teal-500" aria-hidden="true" />
              {strength}
            </span>
          ))}
        </div>
      </div>

      <aside className="hero-orbit-panel relative overflow-hidden rounded-xl p-6 sm:p-7">
        {/* Subtle teal accent line at top */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 dark:via-teal-500/60 to-transparent" aria-hidden="true" />

        {/* Role header */}
        <div className="mb-6 border-b border-slate-200/70 pb-5 dark:border-white/8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-600 dark:text-teal-400">Full Stack Engineer</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">AI · Backend · Frontend · Cloud</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { value: '20+', label: 'Projects' },
            { value: '10', label: 'Live products' },
            { value: '2+ yrs', label: 'AI experience' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-orange-50/70 p-3 text-center dark:bg-teal-300/8">
              <p className="text-xl font-bold text-orange-700 dark:text-teal-300">{stat.value}</p>
              <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Capabilities list */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">Core capabilities</p>
          <ul className="space-y-2">
            {[
              { area: 'AI & LLMs', detail: 'RAG, agents, voice, document AI' },
              { area: 'Backend', detail: 'APIs, databases, auth, cloud' },
              { area: 'Frontend', detail: 'React, TypeScript, modern UX' },
              { area: 'Architecture', detail: 'Product shape & API design' },
            ].map((item) => (
              <li key={item.area} className="flex items-baseline gap-2 text-sm">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 dark:bg-teal-400" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.area}</span>
                  <span className="ml-1 text-slate-500 dark:text-slate-400">— {item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  )
}
