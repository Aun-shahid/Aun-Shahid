import { useState } from 'react'
import { FaExternalLinkAlt, FaGithub, FaCode, FaLayerGroup, FaRobot, FaServer, FaCogs, FaPaintBrush } from 'react-icons/fa'
import { getProjectVisual, projects, projectCategories } from '../data/projects'
import type { ProjectCategory } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectDeviceMockup from './ProjectDeviceMockup'

const categoryIcons = {
  All: FaLayerGroup,
  'AI Systems': FaRobot,
  Platforms: FaServer,
  Automation: FaCogs,
  'Creative Tools': FaPaintBrush,
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All')
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? '')

  const visibleProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const activeProject =
    visibleProjects.find((p) => p.id === activeProjectId) ?? visibleProjects[0] ?? projects[0]
  const activeVisual = getProjectVisual(activeProject)

  return (
    <section className="grid gap-6 py-2">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
              Projects
            </p>
            <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              19 projects, ordered by scope and production depth.
            </h2>
          </div>
          <span className="w-fit shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            {visibleProjects.length} visible
          </span>
        </div>

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Project category filters">
          {projectCategories.map((filter) => {
            const Icon = categoryIcons[filter]
            return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-extrabold transition ${
                activeFilter === filter
                  ? 'border-teal-700 bg-teal-700 text-white dark:border-teal-300 dark:bg-teal-300 dark:text-slate-950'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-teal-300/60 dark:hover:text-teal-200'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              <Icon aria-hidden="true" />
              {filter}
            </button>
            )
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(250px,0.75fr)_minmax(0,1.25fr)]">
          <aside className="grid max-h-[560px] content-start gap-2 overflow-auto pr-2" aria-label="Project list">
            {visibleProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                className="grid gap-1 text-left"
                onClick={() => setActiveProjectId(project.id)}
              >
                <span
                  className={`rounded-lg border px-3 py-2 text-sm font-extrabold transition ${
                    activeProject.id === project.id
                      ? 'border-teal-700 bg-teal-700 text-white dark:border-teal-300 dark:bg-teal-300 dark:text-slate-950'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-white hover:text-teal-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-teal-300/60 dark:hover:text-teal-200'
                  }`}
                >
                  {project.name}
                </span>
                <small className="px-1 text-xs leading-5 text-slate-500 dark:text-slate-500">{project.tagline}</small>
              </button>
            ))}
          </aside>

          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5">
            {activeProject.screenshots ? (
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-6 sm:p-8">
                {activeProject.url && (
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:right-8 sm:top-8"
                    aria-label={`Visit ${activeProject.name}`}
                  >
                    <FaExternalLinkAlt aria-hidden="true" />
                  </a>
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(45,212,191,0.22),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(59,130,246,0.22),transparent_28%)]" />
                <div className="relative grid gap-8 xl:grid-cols-[minmax(0,0.86fr)_minmax(380px,1.14fr)] xl:items-center">
                  <div>
                    <div className="mb-5 flex flex-wrap items-start gap-3">
                      <p className="w-fit rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
                        {activeProject.featured ? 'Featured project' : activeProject.category}
                      </p>
                      <span className="w-fit shrink-0 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-extrabold text-white backdrop-blur">
                        {activeProject.category}
                      </span>
                    </div>
                    <h3 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                      {activeProject.name}
                    </h3>
                    <p className="mt-4 max-w-2xl leading-8 text-white/78">{activeProject.summary}</p>
                  </div>
                  <ProjectDeviceMockup project={activeProject} />
                </div>
              </div>
            ) : (
              <div
                className="relative min-h-64 bg-cover bg-center p-6 sm:p-8"
                style={{ backgroundImage: `url(${activeVisual.image})` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activeVisual.accent}`} />
                {activeProject.url && (
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:right-8 sm:top-8"
                    aria-label={`Visit ${activeProject.name}`}
                  >
                    <FaExternalLinkAlt aria-hidden="true" />
                  </a>
                )}
                <div className="relative flex min-h-52 flex-col justify-between gap-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="w-fit rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
                    {activeProject.featured ? 'Featured project' : activeProject.category}
                  </p>
                  <span className="w-fit shrink-0 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-extrabold text-white backdrop-blur">
                    {activeProject.category}
                  </span>
                </div>
                <div>
                  <h3 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    {activeProject.name}
                  </h3>
                  <p className="mt-3 max-w-3xl leading-8 text-white/80">{activeProject.summary}</p>
                </div>
              </div>
              </div>
            )}

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2" aria-label="Tech stack">
                {activeProject.tags.map((item) => (
                  <span key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    {item}
                  </span>
                ))}
              </div>

              <ul className="mt-6 list-disc space-y-2 pl-5 leading-7 text-slate-600 dark:text-slate-400">
                {activeProject.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              {(activeProject.url || activeProject.githubUrl || activeProject.apiUrl) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {activeProject.url && (
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-teal-800"
                    >
                      <FaExternalLinkAlt aria-hidden="true" />
                      View Live
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                    >
                      <FaGithub aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                  {activeProject.apiUrl && (
                    <a
                      href={activeProject.apiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-teal-300/60"
                    >
                      <FaCode aria-hidden="true" />
                      API Docs
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={project.id === activeProject.id}
              onClick={() => setActiveProjectId(project.id)}
            />
          ))}
        </div>
    </section>
  )
}
