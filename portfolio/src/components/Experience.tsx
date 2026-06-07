import { FaBriefcase } from 'react-icons/fa'
import { experience } from '../data/portfolioData'

const markerAccents = ['bg-teal-400', 'bg-violet-400', 'bg-blue-500']

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
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
            Experience Timeline
          </p>
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Work history, internships, and production delivery.
          </h2>
        </div>
        <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          {timelineRows.length} milestones
        </span>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-[12px] top-0 w-px bg-gradient-to-b from-blue-500 via-teal-400 to-violet-500 sm:left-[41px]" />

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
                  <h3 className="text-lg font-extrabold text-slate-950 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-200 sm:text-xl">
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
