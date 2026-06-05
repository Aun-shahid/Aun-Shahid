import { projectFilters, projects, type ProjectFilterId } from '../../portfolioData'

interface ProjectsSectionProps {
  activeFilter: ProjectFilterId
  activeProjectId: string
  onFilterChange: (filter: ProjectFilterId) => void
  onProjectSelect: (projectId: string) => void
}

export function ProjectsSection({ activeFilter, activeProjectId, onFilterChange, onProjectSelect }: ProjectsSectionProps) {
  const visibleProjects = activeFilter === 'All' ? projects : projects.filter((project) => project.category === activeFilter)

  const activeProject = visibleProjects.find((project) => project.id === activeProjectId) ?? visibleProjects[0] ?? projects[0]

  return (
    <div className="section-stack">
      <article className="section-card">
        <div className="section-head">
          <div>
            <p className="section-kicker">Projects</p>
            <h2>Use the tabs to filter, then open a project to inspect the full note.</h2>
          </div>
          <span className="section-badge">{visibleProjects.length} visible</span>
        </div>

        <div className="project-filter-bar" role="tablist" aria-label="Project filters">
          {projectFilters.map((filter) => {
            const isActive = activeFilter === filter

            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`project-filter ${isActive ? 'is-active' : ''}`}
                onClick={() => onFilterChange(filter)}
              >
                {filter}
              </button>
            )
          })}
        </div>

        <div className="project-browser">
          <aside className="project-rail" aria-label="Project tabs">
            {visibleProjects.map((project) => {
              const isActive = project.id === activeProject.id

              return (
                <button
                  key={project.id}
                  type="button"
                  className={`project-rail__tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => onProjectSelect(project.id)}
                >
                  <span>{project.name}</span>
                  <small>{project.tagline}</small>
                </button>
              )
            })}
          </aside>

          <article className="project-detail">
            <div className="project-detail__header">
              <div>
                <p className="section-kicker">Featured project</p>
                <h3>{activeProject.name}</h3>
                <p className="project-detail__summary">{activeProject.summary}</p>
              </div>
              <span className="section-badge">{activeProject.category}</span>
            </div>

            <div className="project-stack" aria-label="Project stack">
              {activeProject.tags.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <ul className="project-detail__list">
              {activeProject.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article
              className={`project-card ${project.id === activeProject.id ? 'is-active' : ''}`}
              key={project.id}
              id={project.id}
            >
              <div className="project-card__top">
                <div>
                  <p>{project.tagline}</p>
                  <h3>{project.name}</h3>
                </div>
                <span>{project.category}</span>
              </div>
              <p className="project-card__summary">{project.summary}</p>
              <div className="project-stack project-stack--card">
                {project.tags.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>
    </div>
  )
}
