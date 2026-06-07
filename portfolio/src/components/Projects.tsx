import { useRef, useState } from 'react'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {
  FaExternalLinkAlt,
  FaGithub,
  FaCode,
  FaLayerGroup,
  FaRobot,
  FaServer,
  FaCogs,
  FaPaintBrush,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import { getProjectVisual, projects, projectCategories } from '../data/projects'
import type { Project, ProjectCategory } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectDetailsModal from './ProjectDetailsModal'
import ProjectDeviceMockup from './ProjectDeviceMockup'

const categoryIcons = {
  All: FaLayerGroup,
  'AI Systems': FaRobot,
  Platforms: FaServer,
  Automation: FaCogs,
  'Creative Tools': FaPaintBrush,
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  const visibleProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)

  // Top 10 projects for carousel
  const topProjects = visibleProjects.slice(0, 10)

  return (
    <section className="grid gap-8 py-2">
      {/* CATEGORY FILTERS */}
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Project category filters">
        {projectCategories.map((filter) => {
          const Icon = categoryIcons[filter]
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-extrabold transition ${
                activeFilter === filter
                  ? 'border-teal-700 bg-teal-700 text-white dark:border-teal-300 dark:bg-teal-300 dark:text-slate-950'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-teal-300/60 dark:hover:text-teal-200'
              }`}
              onClick={() => {
                setActiveFilter(filter)
                swiperRef.current?.slideToLoop(0)
              }}
            >
              <Icon aria-hidden="true" />
              {filter}
            </button>
          )
        })}
      </div>

      {/* CAROUSEL SECTION */}
      <div className="relative overflow-hidden py-4">
        <Swiper
          key={activeFilter}
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          centeredSlides
          grabCursor
          loop={topProjects.length > 2}
          speed={850}
          slidesPerView="auto"
          spaceBetween={20}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 110, modifier: 1.15, slideShadows: false }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{ prevEl: '.project-carousel-prev', nextEl: '.project-carousel-next' }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          className="project-showcase-swiper !overflow-visible pb-10 pt-2"
        >
          {topProjects.map((project) => {
            const visual = getProjectVisual(project)

            return (
              <SwiperSlide key={project.id} className="!h-auto !w-[90%] max-w-6xl sm:!w-[84%] xl:!w-[78%]">
                <article
                  className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl shadow-slate-900/10"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.screenshots ? (
                    <div className="relative h-full min-h-[560px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-5 sm:p-7 lg:min-h-[500px] lg:p-9">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:right-8 sm:top-8"
                          aria-label={`Visit ${project.name}`}
                        >
                          <FaExternalLinkAlt aria-hidden="true" />
                        </a>
                      )}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(45,212,191,0.22),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(59,130,246,0.2),transparent_28%)]" />
                      <div className="relative grid min-h-[520px] gap-8 lg:min-h-[460px] lg:grid-cols-[minmax(280px,0.58fr)_minmax(360px,1.42fr)] lg:items-center">
                        <div>
                          <div className="mb-6 flex flex-wrap items-start gap-3">
                            <p className="w-fit rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
                              {project.featured ? 'Featured' : project.category}
                            </p>
                            <span className="w-fit shrink-0 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-extrabold uppercase text-white backdrop-blur">
                              {project.status}
                            </span>
                          </div>
                          <h3 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl xl:text-5xl">
                            {project.name}
                          </h3>
                          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">{project.summary}</p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.tags.slice(0, 7).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <button
                              type="button"
                                onClick={(event) => {
                                  event.stopPropagation()
                                  setSelectedProject(project)
                                }}
                              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                            >
                              View Details
                            </button>
                              {project.url && (
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-teal-700"
                                >
                                  <FaExternalLinkAlt aria-hidden="true" />
                                  View Live
                                </a>
                              )}
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20"
                                >
                                  <FaGithub aria-hidden="true" />
                                  GitHub
                                </a>
                              )}
                              {project.apiUrl && (
                                <a
                                  href={project.apiUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/20"
                                >
                                  <FaCode aria-hidden="true" />
                                  API
                                </a>
                              )}
                          </div>
                        </div>
                        <ProjectDeviceMockup project={project} compact />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative h-full min-h-[520px] bg-cover bg-center p-5 sm:p-8 lg:min-h-[500px] lg:p-10"
                      style={{ backgroundImage: `url(${visual.image})` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${visual.accent}`} />
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:right-8 sm:top-8"
                          aria-label={`Visit ${project.name}`}
                        >
                          <FaExternalLinkAlt aria-hidden="true" />
                        </a>
                      )}
                      <div className="relative flex min-h-[480px] flex-col justify-between gap-8 lg:min-h-[440px]">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <p className="w-fit rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur">
                            {project.featured ? 'Featured' : project.category}
                          </p>
                          <span className="w-fit shrink-0 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-extrabold uppercase text-white backdrop-blur">
                            {project.status}
                          </span>
                        </div>
                        <div>
                          <h3 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl xl:text-5xl">
                            {project.name}
                          </h3>
                          <p className="mt-5 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">{project.summary}</p>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              setSelectedProject(project)
                            }}
                            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {topProjects.length > 1 && (
          <div className="pointer-events-none absolute inset-y-0 left-2 right-2 z-20 hidden items-center justify-between md:flex lg:left-6 lg:right-6">
            <button
              type="button"
              className="project-carousel-prev pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-xl shadow-slate-950/20 backdrop-blur transition hover:scale-105 hover:bg-teal-700 active:scale-95 sm:h-14 sm:w-14"
              aria-label="Previous project"
            >
              <FaChevronLeft aria-hidden="true" className="text-lg sm:text-xl" />
            </button>
            <button
              type="button"
              className="project-carousel-next pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/80 text-white shadow-xl shadow-slate-950/20 backdrop-blur transition hover:scale-105 hover:bg-teal-700 active:scale-95 sm:h-14 sm:w-14"
              aria-label="Next project"
            >
              <FaChevronRight aria-hidden="true" className="text-lg sm:text-xl" />
            </button>
          </div>
        )}
      </div>

      {/* ALL PROJECTS GRID */}
      <div>
        <div className="mb-8">
          <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white sm:text-3xl">
            Browse all {visibleProjects.length} projects
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={false}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>
      <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
