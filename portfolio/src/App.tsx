import { useState } from 'react'
import { type ProjectFilterId, type SectionTabId, projects } from './portfolioData'
import {
  HeroSection,
  SectionTabs,
  OverviewSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  ContactSection,
  Footer,
} from './components'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState<SectionTabId>('overview')
  const [activeProjectFilter, setActiveProjectFilter] = useState<ProjectFilterId>('All')
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? '')

  return (
    <main className="portfolio-shell">
      <HeroSection
        onBrowseProjects={() => setActiveSection('projects')}
        onContactClick={() => setActiveSection('contact')}
      />

      <SectionTabs activeSection={activeSection} onTabChange={setActiveSection} />

      <section className="tab-panel" aria-live="polite">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'experience' && <ExperienceSection />}
        {activeSection === 'projects' && (
          <ProjectsSection
            activeFilter={activeProjectFilter}
            activeProjectId={activeProjectId}
            onFilterChange={setActiveProjectFilter}
            onProjectSelect={setActiveProjectId}
          />
        )}
        {activeSection === 'skills' && <SkillsSection />}
        {activeSection === 'contact' && <ContactSection />}
      </section>

      <Footer />
    </main>
  )
}

export default App
