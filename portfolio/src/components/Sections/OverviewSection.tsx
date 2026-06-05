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

export function OverviewSection() {
  return (
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
          The tabs above are designed to reduce scanning time. Start with the overview, then jump to experience or
          projects depending on what you want to validate first.
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
  )
}
