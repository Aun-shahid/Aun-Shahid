import { FaCertificate, FaGraduationCap } from 'react-icons/fa'
import { certification } from '../data/portfolioData'

const educationRows = [
  {
    year: '2026',
    title: 'Bachelor of Software Engineering',
    meta: 'National University of Science and Technology · Islamabad, Pakistan',
    icon: FaGraduationCap,
    accent: 'bg-blue-500',
    status: 'Expected 2026',
    description:
      'Software engineering degree focused on systems design, databases, backend architecture, web engineering, and production-oriented product development.',
  },
  {
    year: '2025',
    title: certification.title,
    meta: certification.issuer,
    icon: FaCertificate,
    accent: 'bg-amber-400',
    status: certification.date,
    description: 'Certification covering practical AI foundations and applied generative AI workflows.',
  },
]

export default function Education() {
  return (
    <section className="py-2">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
            Education
          </p>
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            University and certifications that support the engineering work.
          </h2>
        </div>
        <span className="ice-glass-chip w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          {educationRows.length} records
        </span>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-[12px] top-0 w-px bg-gradient-to-b from-blue-500 to-amber-400 sm:left-[41px]" />

        <div className="divide-y divide-slate-200/80 dark:divide-white/10">
          {educationRows.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={`${item.year}-${item.title}`}
                className="group relative grid gap-4 py-7 pl-10 sm:grid-cols-[80px_minmax(0,1fr)_minmax(220px,0.42fr)] sm:gap-6 sm:pl-0"
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

                <div className="flex flex-col items-start gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 sm:items-end sm:text-right">
                  <span>{item.meta}</span>
                  <span className="ice-glass-chip rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-extrabold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    {item.status}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}