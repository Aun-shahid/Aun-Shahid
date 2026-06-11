import { useEffect, useState } from 'react'
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

const sectionPathById: Record<SectionTabId, string> = {
  overview: 'overview',
  experience: 'experience',
  education: 'education',
  projects: 'projects',
  skills: 'skills',
  contact: 'contact',
}

function appBasePath() {
  return import.meta.env.BASE_URL.replace(/\/$/, '')
}

function sectionFromPath(pathname: string): SectionTabId {
  const basePath = appBasePath()
  const relativePath = pathname
    .replace(basePath, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')

  const section = Object.entries(sectionPathById).find(([, path]) => path === relativePath)?.[0]
  return (section as SectionTabId | undefined) ?? 'overview'
}

function pathForSection(section: SectionTabId) {
  const basePath = appBasePath()
  return `${basePath}/${sectionPathById[section]}`
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionTabId>(() => sectionFromPath(window.location.pathname))
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('portfolioTheme')
    return storedTheme ? storedTheme === 'dark' : true
  })

  const handleNavigate = (section: SectionTabId) => {
    setActiveSection(section)

    const nextPath = pathForSection(section)
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ section }, '', nextPath)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handlePopState = () => {
      setActiveSection(sectionFromPath(window.location.pathname))
      window.scrollTo({ top: 0 })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolioTheme', darkMode ? 'dark' : 'light')
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const mainClassName =
    activeSection === 'projects'
      ? 'w-full flex-1 py-0'
      : 'mx-auto w-[min(1440px,calc(100%-2rem))] flex-1 py-8 sm:w-[min(1440px,calc(100%-3rem))] lg:py-1'

  return (
    <div className={`${darkMode ? 'dark' : ''} site-pattern-bg flex min-h-screen flex-col bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100`}>
      <Navbar
        activeSection={activeSection}
        darkMode={darkMode}
        onNavigate={handleNavigate}
        onToggleTheme={() => setDarkMode((value) => !value)}
      />

      <main className={mainClassName}>
        {activeSection === 'overview' && <Hero onNavigate={handleNavigate} />}

        <div className={activeSection === 'overview' || activeSection === 'projects' ? '' : 'pt-2'} aria-live="polite">
          {activeSection === 'overview' && <Overview onNavigate={handleNavigate} />}
          {activeSection === 'experience' && <Experience />}
          {activeSection === 'education' && <Education />}
          {activeSection === 'projects' && <Projects />}
          {activeSection === 'skills' && <Skills />}
          {activeSection === 'contact' && <Contact />}
        </div>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App
