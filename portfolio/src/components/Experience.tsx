import { FaBriefcase } from 'react-icons/fa'
import { experience } from '../data/portfolioData'

const markerAccents = [
  'bg-orange-500 dark:bg-teal-500',
  'bg-orange-600 dark:bg-teal-600',
  'bg-orange-400 dark:bg-teal-400'
]

const timelineRows = experience.map((job, index) => ({
    year: job.period.split(' - ')[0].split('/')[1] ?? job.period,
    title: job.role,
    meta: `${job.company} · ${job.location}`,
    icon: FaBriefcase,
    accent: markerAccents[index] ?? 'bg-slate-500',
    description: job.points.join(' '),
  }))

export default function Experience() {
  return (
    <section className="py-2">
      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-orange-600 dark:text-teal-400">
          Experience
        </p>
        <h2 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Work history, internships, and production delivery.
        </h2>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-[12px] top-0 w-px bg-gradient-to-b from-orange-500 to-orange-300 dark:from-teal-400 dark:to-teal-600/40 sm:left-[41px]" />

        <div className="divide-y divide-slate-200/80 dark:divide-white/10">
          {timelineRows.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={`${item.year}-${item.title}`}
                className="group relative grid gap-4 py-7 pl-10 sm:grid-cols-[80px_minmax(0,1fr)_minmax(220px,0.48fr)] sm:gap-6 sm:pl-0"
              >
                <div className="hidden pt-1 text-sm font-extrabold text-slate-500 dark:text-slate-400 sm:block">
                  {item.year}
                </div>
                <div className={`absolute left-0 top-12 flex h-5 w-5 items-center justify-center rounded-full ${item.accent} ring-transparent sm:left-8`}>
                  <Icon aria-hidden="true" className="h-2.5 w-2.5 text-white" />
                </div>

                <div>
                  <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-400 sm:hidden">
                    {item.year}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-orange-700 dark:text-white dark:group-hover:text-teal-300 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-start justify-start text-sm font-bold text-slate-500 dark:text-slate-400 sm:justify-end sm:text-right">
                  {item.meta}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
