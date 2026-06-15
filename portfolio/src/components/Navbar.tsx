import { useState, useRef, useEffect } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [coords, setCoords] = useState<{ left: number; top: number; width: number; height: number } | null>(null)

  function handleNav(id: SectionTabId) {
    onNavigate(id)
    setMenuOpen(false)
  }

  useEffect(() => {
    function updateCoords() {
      const activeBtn = buttonRefs.current[activeSection]
      const container = containerRef.current
      if (activeBtn && container) {
        const containerRect = container.getBoundingClientRect()
        const btnRect = activeBtn.getBoundingClientRect()
        setCoords({
          left: btnRect.left - containerRect.left,
          top: btnRect.top - containerRect.top,
          width: btnRect.width,
          height: btnRect.height,
        })
      } else {
        setCoords(null)
      }
    }

    // Run initially and set a short timeout to let the page settle
    updateCoords()
    const timeoutId = setTimeout(updateCoords, 100)

    window.addEventListener('resize', updateCoords)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateCoords)
    }
  }, [activeSection])

  return (
    <header className="site-glass-nav sticky top-0 z-50 border-b border-white/50 transition-colors dark:border-white/10">
      <div className="mx-auto flex min-h-18 w-[min(1440px,calc(100%-2rem))] items-center justify-between gap-6 sm:w-[min(1440px,calc(100%-3rem))]">
        <button
          type="button"
          className="grid gap-1 rounded-lg text-left transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
          onClick={() => handleNav('overview')}
          aria-label="Go to overview"
        >
          <span className="text-base font-bold leading-none tracking-tight text-slate-950 dark:text-white">Aun Shahid</span>
          <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-teal-400 sm:block">
            Full Stack Engineer
          </span>
        </button>

        <div ref={containerRef} className="relative hidden items-center justify-end gap-1 md:flex">
          {coords && (
            <div
              className="absolute rounded-lg border border-orange-600 bg-orange-600/5 transition-all duration-300 ease-out pointer-events-none dark:border-teal-400/50 dark:bg-teal-500/10"
              style={{
                left: `${coords.left}px`,
                top: `${coords.top}px`,
                width: `${coords.width}px`,
                height: `${coords.height}px`,
              }}
            />
          )}

          {sectionTabs.map((link) => {
            const Icon = link.icon
            return (
            <button
              key={link.id}
              ref={(el) => {
                buttonRefs.current[link.id] = el
              }}
              type="button"
              className={`relative z-10 inline-flex items-center gap-2 rounded-lg border border-transparent px-3.5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                activeSection === link.id
                  ? 'text-orange-600 dark:text-teal-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
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
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/60 bg-white/55 text-slate-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
          >
            <ThemeToggleIcon darkMode={darkMode} />
          </button>
        </div>

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
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-3 text-left text-sm font-semibold transition-all ${
                activeSection === link.id
                  ? 'border-orange-600 bg-orange-600/5 text-orange-600 dark:border-teal-400/50 dark:bg-teal-500/10 dark:text-teal-300'
                  : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
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
