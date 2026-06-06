content = """import { useState } from 'react'
import type { SectionTabId } from './data/portfolioData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState<SectionTabId>('overview')

  return (
    <>
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="portfolio-shell">
        <Hero onNavigate={setActiveSection} />

        <div className="tab-panel" aria-live="polite">
          {activeSection === 'overview' && <Overview onNavigate={setActiveSection} />}
          {activeSection === 'experience' && <Experience />}
          {activeSection === 'projects' && <Projects />}
          {activeSection === 'skills' && <Skills />}
          {activeSection === 'contact' && <Contact />}
        </div>

        <footer className="footer-note">
          Aun Shahid \u2014 Full Stack AI Engineer \u00b7 Built with React + Vite
        </footer>
      </main>
    </>
  )
}

export default App
"""

with open(r'd:\\Work\\Python\\Aun Shahid\\portfolio\\src\\App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
