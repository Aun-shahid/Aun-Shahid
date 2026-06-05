import { deliveryFocus, skillGroups } from '../../portfolioData'

export function SkillsSection() {
  return (
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
  )
}
