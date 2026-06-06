import { FaExternalLinkAlt, FaGithub, FaCode } from 'react-icons/fa'
import { getProjectVisual } from '../data/projects'
import type { Project } from '../data/projects'
import ProjectDeviceMockup from './ProjectDeviceMockup'

type ProjectCardProps = {
  project: Project
  isActive: boolean
  onClick: () => void
}

const statusLabels: Record<Project['status'], string> = {
  live: 'Live',
  demo: 'Demo',
  'in-progress': 'In Progress',
  archived: 'Archived',
}

const statusColors: Record<Project['status'], string> = {
  live: 'border-teal-200 bg-teal-50 text-teal-800',
  demo: 'border-blue-200 bg-blue-50 text-blue-700',
  'in-progress': 'border-amber-200 bg-amber-50 text-amber-700',
  archived: 'border-slate-200 bg-white text-slate-500',
}

export default function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  const visual = getProjectVisual(project)

  return (
    <article
      className={`group cursor-pointer overflow-hidden rounded-xl border bg-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 dark:bg-white/5 dark:hover:shadow-black/20 ${
        isActive ? 'border-teal-500 shadow-xl shadow-slate-900/5 dark:border-teal-300' : 'border-slate-200 dark:border-white/10'
      }`}
      id={project.id}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {project.screenshots ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-5 pt-12">
          <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
              <span className={`rounded-full border px-2.5 py-1 text-xs font-extrabold ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs font-extrabold text-white backdrop-blur">
                {project.category}
              </span>
          </div>
          <ProjectDeviceMockup project={project} compact />
        </div>
      ) : (
        <div
          className="relative min-h-40 bg-cover bg-center p-5"
          style={{ backgroundImage: `url(${visual.image})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${visual.accent}`} />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="flex flex-wrap gap-2">
              <span className={`rounded-full border px-2.5 py-1 text-xs font-extrabold ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
              <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs font-extrabold text-white backdrop-blur">
                {project.category}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/75">{project.tagline}</p>
              <h3 className="mt-1 text-xl font-extrabold tracking-tight text-white">{project.name}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="p-5">
        {project.screenshots && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{project.tagline}</p>
            <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">{project.name}</h3>
          </div>
        )}
        <p className="leading-7 text-slate-600 dark:text-slate-400">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((item) => (
            <span key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-300">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-3 py-2 text-xs font-extrabold text-white transition hover:bg-teal-800"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Visit ${project.name}`}
            >
              <FaExternalLinkAlt aria-hidden="true" />
              <span>Live</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-xs font-extrabold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              onClick={(e) => e.stopPropagation()}
              aria-label={`GitHub repo for ${project.name}`}
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
          )}
          {project.apiUrl && (
            <a
              href={project.apiUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-extrabold text-slate-950 transition hover:border-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-teal-300/60"
              onClick={(e) => e.stopPropagation()}
              aria-label={`API docs for ${project.name}`}
            >
              <FaCode aria-hidden="true" />
              <span>API</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
