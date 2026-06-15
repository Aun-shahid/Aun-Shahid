import { skillGroups, deliveryFocus } from '../data/portfolioData'
import '../styling/skills.css'

export default function Skills() {
  return (
    <section className="grid gap-6 py-2">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between skills-section-header">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-orange-600 dark:text-teal-400 skills-section-badge">
              Skills
            </p>
            <h2 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl skills-section-title">
              Full-stack coverage built for AI products, backend reliability, and cloud delivery.
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <div className="skill-group-card ice-glass-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5" key={group.title}>
              <h3 className="font-semibold text-slate-900 dark:text-white">{group.title}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <span
                      key={item.label}
                      className="skill-item ice-glass-soft flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-slate-800 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200"
                    >
                      <Icon aria-hidden="true" className="skill-item-icon shrink-0 text-orange-600 dark:text-teal-400" />
                      {item.label}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="delivery-focus-card ice-glass-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="font-semibold text-slate-900 dark:text-white">Delivery focus</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {deliveryFocus.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="ice-glass-soft flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 font-bold text-slate-800 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200">
                  <Icon aria-hidden="true" className="delivery-focus-icon shrink-0 text-orange-600 dark:text-teal-400" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
        </article>

        <article className="build-info-card ice-glass-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="font-semibold text-slate-900 dark:text-white">What I build</h3>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">
            End-to-end AI products: LLM pipelines, REST APIs, React frontends, and cloud deployments.
            Clean data models, readable code, and systems that are easy to operate in production.
          </p>
        </article>
      </div>
    </section>
  )
}
