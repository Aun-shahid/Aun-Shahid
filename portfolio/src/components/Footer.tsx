import type { SectionTabId } from '../data/portfolioData'
import { contactLinks } from '../data/portfolioData'
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa'

type FooterProps = {
  onNavigate: (section: SectionTabId) => void
}

const footerLinks: Array<{ id: SectionTabId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer({ onNavigate }: FooterProps) {
  const email = contactLinks.find((item) => item.href.startsWith('mailto:'))
  const linkedIn = contactLinks.find((item) => item.href.includes('linkedin.com'))
  const github = contactLinks.find((item) => item.href.includes('github.com'))

  return (
    <footer className="site-glass-footer border-t border-white/50 dark:border-white/10">
      <div className="mx-auto grid w-[min(1440px,calc(100%-2rem))] gap-6 py-8 sm:w-[min(1440px,calc(100%-3rem))] lg:grid-cols-[1fr_auto_auto] lg:items-center">
        <div>
          <strong className="block font-extrabold text-slate-950 dark:text-white">Aun Shahid</strong>
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Full Stack Engineer building reliable AI products, APIs, and web platforms.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className="text-sm font-bold text-slate-500 transition hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-200"
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-wrap gap-4">
          {email && (
            <a className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-200" href={email.href}>
              <FaEnvelope aria-hidden="true" />
              Email
            </a>
          )}
          {linkedIn && (
            <a className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-200" href={linkedIn.href} target="_blank" rel="noreferrer">
              <FaLinkedin aria-hidden="true" />
              LinkedIn
            </a>
          )}
          {github && (
            <a className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-200" href={github.href} target="_blank" rel="noreferrer">
              <FaGithub aria-hidden="true" />
              GitHub
            </a>
          )}
          <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500">
            <FaMapMarkerAlt aria-hidden="true" />
            Rawalpindi
          </span>
        </div>
      </div>
    </footer>
  )
}