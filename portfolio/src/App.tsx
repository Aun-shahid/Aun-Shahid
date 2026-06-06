import { useState } from 'react'
import type { SectionTabId } from './data/portfolioData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState<SectionTabId>('overview')
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100`}>
      <Navbar
        activeSection={activeSection}
        darkMode={darkMode}
        onNavigate={setActiveSection}
        onToggleTheme={() => setDarkMode((value) => !value)}
      />

      <main className="mx-auto w-[min(1440px,calc(100%-2rem))] py-8 sm:w-[min(1440px,calc(100%-3rem))] lg:py-12">
        {activeSection === 'overview' && <Hero onNavigate={setActiveSection} />}

        <div className={activeSection === 'overview' ? '' : 'pt-2'} aria-live="polite">
          {activeSection === 'overview' && <Overview onNavigate={setActiveSection} />}
          {activeSection === 'experience' && <Experience />}
          {activeSection === 'education' && <Education />}
          {activeSection === 'projects' && <Projects />}
          {activeSection === 'skills' && <Skills />}
          {activeSection === 'contact' && <Contact />}
        </div>
      </main>

      <Footer onNavigate={setActiveSection} />
    </div>
  )
}

export default App
