import { contactLinks, heroStats, heroStrengths } from '../../portfolioData'

interface HeroSectionProps {
  onBrowseProjects: () => void
  onContactClick: () => void
}

export function HeroSection({ onBrowseProjects, onContactClick }: HeroSectionProps) {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <div className="hero-topline">
          <p className="eyebrow">Backend AI Engineer</p>
          <span className="hero-tag">19 projects organized for fast review</span>
        </div>

        <h1>Aun Shahid</h1>

        <p className="lede">
          Backend AI Engineer with 2+ years of experience building and shipping production-grade AI systems, from
          agentic assessment flows and real-time voice platforms to CRM automation and multi-tenant SaaS.
        </p>

        <div className="hero-actions">
          <button type="button" className="hero-action hero-action--primary" onClick={onBrowseProjects}>
            Browse projects
          </button>
          <button type="button" className="hero-action hero-action--secondary" onClick={onContactClick}>
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
        <p>Specialized in FastAPI, LangChain, OpenAI APIs, and deployment workflows that hold up in production.</p>

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
  )
}
