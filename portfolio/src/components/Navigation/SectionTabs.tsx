import { sectionTabs, type SectionTabId } from '../../portfolioData'

interface SectionTabsProps {
  activeSection: SectionTabId
  onTabChange: (tabId: SectionTabId) => void
}

export function SectionTabs({ activeSection, onTabChange }: SectionTabsProps) {
  return (
    <nav className="section-tabs" role="tablist" aria-label="Portfolio sections">
      {sectionTabs.map((tab) => {
        const isActive = activeSection === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`section-tab ${isActive ? 'is-active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
