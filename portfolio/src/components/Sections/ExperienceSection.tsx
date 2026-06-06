import { certification, experience } from '../../portfolioData'

export function ExperienceSection() {
  return (
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
  )
}
