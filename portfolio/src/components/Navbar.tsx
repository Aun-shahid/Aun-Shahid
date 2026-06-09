import { useState } from 'react'
import { sectionTabs } from '../data/portfolioData'
import type { SectionTabId } from '../data/portfolioData'

type NavbarProps = {
  activeSection: SectionTabId
  darkMode: boolean
  onNavigate: (section: SectionTabId) => void
  onToggleTheme: () => void
}

function ThemeToggleIcon({ darkMode }: { darkMode: boolean }) {
  return (
    <span className={`theme-toggle-orb ${darkMode ? 'theme-toggle-orb--dark' : ''}`} aria-hidden="true">
      <span className="theme-toggle-circle">
        <span className="theme-toggle-crescent" />
      </span>
    </span>
  )
}

export default function Navbar({ activeSection, darkMode, onNavigate, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNav(id: SectionTabId) {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <header className="site-glass-nav sticky top-0 z-50 border-b border-white/50 transition-colors dark:border-white/10">
      <div className="mx-auto flex min-h-18 w-[min(1440px,calc(100%-2rem))] items-center justify-between gap-6 sm:w-[min(1440px,calc(100%-3rem))]">
        <button
          type="button"
          className="grid gap-1 rounded-lg text-left transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
          onClick={() => handleNav('overview')}
          aria-label="Go to overview"
        >
          <span className="text-base font-extrabold leading-none tracking-tight text-slate-950 dark:text-white">Aun Shahid</span>
          <span className="hidden text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-300 sm:block">
            Full Stack Engineer
          </span>
        </button>

        <nav className="hidden items-center justify-end gap-1 md:flex" aria-label="Site sections">
          {sectionTabs.map((link) => {
            const Icon = link.icon
            return (
            <button
              key={link.id}
              type="button"
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-bold transition-colors ${
                activeSection === link.id
                  ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:bg-teal-300 dark:text-slate-950 dark:shadow-teal-300/10'
                  : 'text-slate-700 hover:bg-white/55 hover:text-slate-950 focus-visible:bg-white/55 focus-visible:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:bg-white/10 dark:focus-visible:text-white'
              }`}
              onClick={() => handleNav(link.id)}
            >
              <Icon aria-hidden="true" className="text-xs" />
              {link.label}
            </button>
            )
          })}
          <button
            type="button"
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 bg-white/55 text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            <ThemeToggleIcon darkMode={darkMode} />
          </button>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-slate-950 hover:bg-white/55 dark:text-white dark:hover:bg-white/10 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="mx-auto grid w-[min(1440px,calc(100%-2rem))] gap-1 border-t border-white/50 py-4 dark:border-white/10 md:hidden"
          aria-label="Mobile navigation"
        >
          {sectionTabs.map((link) => {
            const Icon = link.icon
            return (
            <button
              key={link.id}
              type="button"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-bold ${
                activeSection === link.id
                  ? 'bg-slate-950 text-white dark:bg-teal-300 dark:text-slate-950'
                  : 'text-slate-700 hover:bg-white/55 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
              }`}
              onClick={() => handleNav(link.id)}
            >
              <Icon aria-hidden="true" />
              {link.label}
            </button>
            )
          })}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 bg-white/55 text-slate-800 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            <ThemeToggleIcon darkMode={darkMode} />
          </button>
        </nav>
      )}
    </header>
  )
}
