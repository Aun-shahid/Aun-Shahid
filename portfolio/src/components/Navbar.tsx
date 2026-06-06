import { useState } from 'react'
import { sectionTabs } from '../data/portfolioData'
import type { SectionTabId } from '../data/portfolioData'
import { FaBriefcase, FaMoon, FaSun } from 'react-icons/fa'

type NavbarProps = {
  activeSection: SectionTabId
  darkMode: boolean
  onNavigate: (section: SectionTabId) => void
  onToggleTheme: () => void
}

export default function Navbar({ activeSection, darkMode, onNavigate, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNav(id: SectionTabId) {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex min-h-18 w-[min(1440px,calc(100%-2rem))] items-center justify-between gap-6 sm:w-[min(1440px,calc(100%-3rem))]">
        <button
          type="button"
          className="grid gap-1 text-left transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
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
                  ? 'bg-slate-950 text-white dark:bg-teal-400 dark:text-slate-950'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:bg-slate-100 focus-visible:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:bg-white/10 dark:focus-visible:text-white'
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
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-teal-700/15 transition hover:-translate-y-0.5 hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            onClick={() => handleNav('contact')}
          >
            <FaBriefcase aria-hidden="true" />
            Hire Me
          </button>
          <button
            type="button"
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            {darkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
          </button>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-slate-950 hover:bg-slate-100 dark:text-white dark:hover:bg-white/10 md:hidden"
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
          className="mx-auto grid w-[min(1440px,calc(100%-2rem))] gap-1 border-t border-slate-200 py-4 dark:border-white/10 md:hidden"
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
                  ? 'bg-slate-950 text-white dark:bg-teal-400 dark:text-slate-950'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
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
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-sm font-extrabold text-white"
            onClick={() => handleNav('contact')}
          >
            <FaBriefcase aria-hidden="true" />
            Hire Me
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            onClick={onToggleTheme}
          >
            {darkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      )}
    </header>
  )
}
