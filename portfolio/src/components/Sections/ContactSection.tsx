import { contactLinks } from '../../portfolioData'

export function ContactSection() {
  return (
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
  )
}
