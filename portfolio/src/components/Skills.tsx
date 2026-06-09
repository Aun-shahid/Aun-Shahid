import { skillGroups, deliveryFocus } from '../data/portfolioData'

export default function Skills() {
  return (
    <section className="grid gap-6 py-2">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
              Skills
            </p>
            <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Full-stack coverage built for AI products, backend reliability, and cloud delivery.
            </h2>
          </div>
          <span className="ice-glass-chip w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Capability map
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <div className="ice-glass-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5" key={group.title}>
              <h3 className="font-extrabold text-slate-950 dark:text-white">{group.title}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <span
                      key={item.label}
                      className="ice-glass-soft flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-slate-800 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200"
                    >
                      <Icon aria-hidden="true" className="shrink-0 text-teal-700" />
                      {item.label}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="ice-glass-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="font-extrabold text-slate-950 dark:text-white">Delivery focus</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {deliveryFocus.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="ice-glass-soft flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 font-bold text-slate-800 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200">
                  <Icon aria-hidden="true" className="shrink-0 text-teal-700" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
        </article>

        <article className="ice-glass-card rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="font-extrabold text-slate-950 dark:text-white">What I build</h3>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">
            End-to-end AI products: LLM pipelines, REST APIs, React frontends, and cloud deployments.
            Clean data models, readable code, and systems that are easy to operate in production.
          </p>
        </article>
      </div>
    </section>
  )
}
