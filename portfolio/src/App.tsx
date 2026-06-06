import { useState } from 'react'
import {
  certification,
  contactLinks,
  deliveryFocus,
  experience,
  heroStats,
  heroStrengths,
  projectFilters,
  sectionTabs,
  skillGroups,
  projects,
  type ProjectFilterId,
  type SectionTabId,
} from './portfolioData'
import './App.css'

const overviewCards = [
  {
    title: 'What I build',
    text: 'AI-enabled products with strong backend foundations, clear API design, and deployable workflows that work in production.',
  },
  {
    title: 'How I work',
    text: 'I like stable data models, clean handoffs between frontend and backend, and interfaces that help people find the right place quickly.',
  },
  {
    title: 'What to check first',
    text: 'Use the project tabs to jump between categories, then open the project rail to inspect each build in detail.',
  },
]

function App() {
  const [activeSection, setActiveSection] = useState<SectionTabId>('overview')
  const [activeProjectFilter, setActiveProjectFilter] = useState<ProjectFilterId>('All')
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? '')

  const visibleProjects =
    activeProjectFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeProjectFilter)

  const activeProject =
    visibleProjects.find((project) => project.id === activeProjectId) ?? visibleProjects[0] ?? projects[0]

  return (
    <main className="portfolio-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="hero-topline">
            <p className="eyebrow">Backend AI Engineer</p>
            <span className="hero-tag">19 projects organized for fast review</span>
          </div>

          <h1>Aun Shahid</h1>

          <p className="lede">
            Backend AI Engineer with 2+ years of experience building and shipping production-grade AI systems,
            from agentic assessment flows and real-time voice platforms to CRM automation and multi-tenant SaaS.
          </p>

          <div className="hero-actions">
            <button type="button" className="hero-action hero-action--primary" onClick={() => setActiveSection('projects')}>
              Browse projects
            </button>
            <button type="button" className="hero-action hero-action--secondary" onClick={() => setActiveSection('contact')}>
              Contact details
            </button>
          </div>

          <div className="contact-strip" aria-label="Contact links">
            {contactLinks.map((item) => {
              const Icon = item.icon
              const isExternal = item.href.startsWith('http')

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              )
            })}
          </div>

          <div className="strengths" aria-label="Core strengths">
            {heroStrengths.map((strength) => (
              <span key={strength}>{strength}</span>
            ))}
          </div>
        </div>

        <aside className="hero-card">
          <div className="hero-card__badge">Open for impactful AI and backend work</div>
          <h2>Production-first builder</h2>
          <p>
            Specialized in FastAPI, LangChain, OpenAI APIs, and deployment workflows that hold up in production.
          </p>

          <div className="metrics">
            {heroStats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <nav className="section-tabs" role="tablist" aria-label="Portfolio sections">
        {sectionTabs.map((tab) => {
          const isActive = activeSection === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`section-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveSection(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>

      <section className="tab-panel" aria-live="polite">
        {activeSection === 'overview' && (
          <div className="section-stack">
            <article className="section-card intro-card">
              <div className="section-head">
                <div>
                  <p className="section-kicker">Overview</p>
                  <h2>Focused on AI products that are easy to operate, easy to ship, and easy to inspect.</h2>
                </div>
                <span className="section-badge">Portfolio map</span>
              </div>
              <p className="section-lead">
                The tabs above are designed to reduce scanning time. Start with the overview, then jump to experience
                or projects depending on what you want to validate first.
              </p>
            </article>

            <div className="section-grid">
              {overviewCards.map((card) => (
                <article className="section-card info-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="section-stack">
            <article className="section-card">
              <div className="section-head">
                <div>
                  <p className="section-kicker">Experience</p>
                  <h2>Production delivery across AI, backend systems, and deployment work.</h2>
                </div>
                <span className="section-badge">Timeline</span>
              </div>

              <div className="timeline">
                {experience.map((job) => (
                  <article className="timeline-item" key={`${job.company}-${job.role}`}>
                    <div className="timeline-heading">
                      <div>
                        <h3>{job.company}</h3>
                        <p>
                          {job.role} <span>•</span> {job.location}
                        </p>
                      </div>
                      <span>{job.period}</span>
                    </div>
                    <ul>
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </article>

            <div className="section-grid section-grid--experience">
              <article className="section-card compact-card">
                <h3>Education</h3>
                <div className="timeline-item compact">
                  <div>
                    <h3>National University of Science and Technology</h3>
                    <p>Islamabad, Pakistan</p>
                  </div>
                  <span>Bachelor of Software Engineering</span>
                </div>
                <div className="timeline-meta">Expected 2026</div>
              </article>

              <article className="section-card compact-card">
                <h3>Certification</h3>
                <div className="timeline-item compact">
                  <div>
                    <h3>{certification.title}</h3>
                    <p>{certification.issuer}</p>
                  </div>
                  <span>{certification.date}</span>
                </div>
              </article>
            </div>
          </div>
        )}

        {activeSection === 'projects' && (
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
                  const isActive = activeProjectFilter === filter

                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`project-filter ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveProjectFilter(filter)}
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
                        onClick={() => setActiveProjectId(project.id)}
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
        )}

        {activeSection === 'skills' && (
          <div className="section-stack">
            <article className="section-card">
              <div className="section-head">
                <div>
                  <p className="section-kicker">Skills</p>
                  <h2>Stack coverage built for AI products, delivery, and backend reliability.</h2>
                </div>
                <span className="section-badge">Capability map</span>
              </div>

              <div className="skill-grid">
                {skillGroups.map((group) => (
                  <div className="skill-group" key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="skill-list">
                      {group.items.map((item) => {
                        const Icon = item.icon

                        return (
                          <span key={item.label} className="skill-pill">
                            <Icon aria-hidden="true" />
                            {item.label}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <div className="section-grid section-grid--experience">
              <article className="section-card compact-card">
                <h3>Delivery focus</h3>
                <div className="delivery-grid">
                  {deliveryFocus.map((item) => {
                    const Icon = item.icon

                    return (
                      <div key={item.label}>
                        <Icon aria-hidden="true" />
                        <span>{item.label}</span>
                      </div>
                    )
                  })}
                </div>
              </article>

              <article className="section-card compact-card">
                <h3>Working style</h3>
                <p className="compact-copy">
                  Stable APIs, readable data models, and interfaces that make complex products easier to understand.
                </p>
              </article>
            </div>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="section-stack">
            <article className="section-card">
              <div className="section-head">
                <div>
                  <p className="section-kicker">Contact</p>
                  <h2>Reach out through the channel that is easiest for you.</h2>
                </div>
                <span className="section-badge">Availability</span>
              </div>

              <div className="contact-grid">
                {contactLinks.map((item) => {
                  const Icon = item.icon
                  const isExternal = item.href.startsWith('http')

                  return (
                    <a
                      key={item.label}
                      className="contact-card"
                      href={item.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noreferrer' : undefined}
                    >
                      <Icon aria-hidden="true" />
                      <span>{item.label}</span>
                    </a>
                  )
                })}
              </div>
            </article>

            <div className="section-grid section-grid--experience">
              <article className="section-card compact-card">
                <h3>Delivery note</h3>
                <p className="compact-copy">
                  I work best on AI and backend products that need clear navigation, practical deployment, and a crisp
                  product story.
                </p>
              </article>

              <article className="section-card compact-card">
                <h3>Portfolio state</h3>
                <p className="compact-copy">
                  This site now exposes all archived projects through tabs, filters, and a browsable project rail.
                </p>
              </article>
            </div>
          </div>
        )}
      </section>

      <footer className="footer-note">
        Built to present a focused backend and AI portfolio with a warm, navigable visual language.
      </footer>
    </main>
  )
}

export default App
