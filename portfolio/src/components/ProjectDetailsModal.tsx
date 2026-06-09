import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { FaCode, FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa'
import type { Project } from '../data/projects'
import ProjectDeviceMockup from './ProjectDeviceMockup'

type ProjectDetailsModalProps = {
  project: Project | null
  onClose: () => void
}

const statusLabels: Record<Project['status'], string> = {
  live: 'Live',
  demo: 'Demo',
  'in-progress': 'In Progress',
  archived: 'Archived',
}

type SectionProps = {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="project-detail-glass-section rounded-xl border p-5 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:shadow-black/10">
      <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{children}</div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, project])

  if (!project) {
    return null
  }

  const { fullDetails } = project

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-labelledby="project-details-title">
      <button className="fixed inset-0 h-full w-full cursor-default" type="button" aria-label="Close project details" onClick={onClose} />

      <div className="project-details-rain project-details-scroll relative mx-auto max-h-[calc(100vh-2rem)] max-w-6xl overflow-y-auto rounded-2xl border border-white/35 bg-slate-50 shadow-2xl shadow-slate-950/40 dark:border-white/15 dark:bg-slate-950 sm:max-h-[calc(100vh-3rem)]">
        <div className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-white/50 bg-white/82 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/78 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300">Project Details</p>
            <h2 id="project-details-title" className="truncate text-xl font-extrabold text-slate-950 dark:text-white sm:text-2xl">
              {project.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label="Close project details"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className="relative z-10 overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950/92 via-slate-900/88 to-teal-950/86 p-5 text-white backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,0.22),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.2),transparent_26%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(360px,1.25fr)] lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] backdrop-blur">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase backdrop-blur">
                  {statusLabels[project.status]}
                </span>
                {project.featured && (
                  <span className="rounded-full border border-teal-200/40 bg-teal-300/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-100 backdrop-blur">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-100/80">{project.tagline}</p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {project.name}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/82">{project.summary}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-teal-700">
                    <FaExternalLinkAlt aria-hidden="true" />
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20">
                    <FaGithub aria-hidden="true" />
                    GitHub
                  </a>
                )}
                {project.apiUrl && (
                  <a href={project.apiUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20">
                    <FaCode aria-hidden="true" />
                    API
                  </a>
                )}
              </div>
            </div>

            {project.screenshots ? (
              <ProjectDeviceMockup project={project} compact />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/10 p-6 text-sm leading-7 text-white/78 backdrop-blur">
                {project.details.slice(0, 4).map((detail) => (
                  <p key={detail} className="border-b border-white/10 py-3 last:border-b-0">
                    {detail}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 grid gap-6 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="project-detail-glass-chip rounded-lg border px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-xl dark:text-slate-200">
                {tag}
              </span>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Section title="Problem">
              <p>{fullDetails.problem}</p>
            </Section>
            <Section title="Solution">
              <p>{fullDetails.solution}</p>
            </Section>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Section title="How It Works">
              <BulletList items={fullDetails.howItWorks} />
            </Section>
            <Section title="Architecture">
              <BulletList items={fullDetails.architecture} />
            </Section>
            <Section title="Architectural Decisions">
              <BulletList items={fullDetails.decisions} />
            </Section>
            <Section title="Challenges">
              <BulletList items={fullDetails.challenges} />
            </Section>
          </div>

          <Section title="Implementation Details">
            <BulletList items={project.details} />
          </Section>

          <Section title="Impact">
            <BulletList items={fullDetails.impact} />
          </Section>
        </div>
      </div>
    </div>
  )
}
