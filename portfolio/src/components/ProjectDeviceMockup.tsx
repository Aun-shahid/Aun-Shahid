import type { Project } from '../data/projects'

type ProjectDeviceMockupProps = {
  project: Project
  compact?: boolean
}

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

export default function ProjectDeviceMockup({ project, compact = false }: ProjectDeviceMockupProps) {
  if (!project.screenshots) {
    return null
  }

  const desktopUrl = assetUrl(project.screenshots.desktop)
  const mobileUrl = assetUrl(project.screenshots.mobile)

  return (
    <div className={`relative mx-auto w-full ${compact ? 'max-w-xl pb-8' : 'max-w-4xl pb-12'}`}>
      <div className="relative rounded-[1.25rem] border-[7px] border-slate-950 bg-slate-950 shadow-2xl shadow-black/35 dark:border-slate-900">
        <div className="overflow-hidden rounded-[0.75rem] bg-slate-900">
          <img
            src={desktopUrl}
            alt={`${project.name} desktop landing page`}
            className={`h-full w-full object-cover ${compact ? 'aspect-[16/10]' : 'aspect-[16/9]'}`}
            loading="lazy"
          />
        </div>
      </div>
      <div className="mx-auto h-2 w-[82%] rounded-b-2xl bg-slate-800 shadow-lg shadow-black/20" />

      <div className={`absolute bottom-0 right-3 w-[28%] min-w-24 max-w-44 rounded-[1.6rem] border-[7px] border-slate-950 bg-slate-950 shadow-2xl shadow-black/40 ${compact ? 'right-2' : 'sm:right-8'}`}>
        <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-10 -translate-x-1/2 rounded-full bg-slate-800" />
        <div className="overflow-hidden rounded-[1rem] bg-slate-900">
          <img
            src={mobileUrl}
            alt={`${project.name} mobile landing page`}
            className="aspect-[9/19] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}