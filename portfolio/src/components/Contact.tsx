import { contactLinks } from '../data/portfolioData'

export default function Contact() {
  return (
    <section className="grid gap-6 py-2">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-3 w-fit rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-800 dark:border-teal-300/20 dark:bg-teal-300/10 dark:text-teal-200">
              Contact
            </p>
            <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Let's build something together. Reach out through any channel.
            </h2>
          </div>
          <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Open to work
          </span>
        </div>

        <div className="max-w-4xl">
          <p className="leading-8 text-slate-600 dark:text-slate-400">
            I'm a Full Stack AI Engineer available for freelance projects, contract work, and full-time roles.
            Whether you need an AI-powered product built from scratch, an existing system scaled up, or
            a technical co-founder for your startup — let's talk.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {contactLinks.map((item) => {
            const Icon = item.icon
            const isExternal = item.href.startsWith('http')
            return (
              <a
                key={item.label}
                className="flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 font-extrabold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white hover:text-teal-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-teal-300/60 dark:hover:text-teal-200"
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                <Icon aria-hidden="true" className="shrink-0 text-teal-700" />
                <span className="min-w-0 break-words">{item.label}</span>
              </a>
            )
          })}
        </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="font-extrabold text-slate-950 dark:text-white">What I can build for you</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600 dark:text-slate-400">
            <li>AI-powered SaaS products (LLM, RAG, agents)</li>
            <li>Full stack platforms with React + FastAPI</li>
            <li>API integrations (OpenAI, Stripe, Google, Shopify)</li>
            <li>Cloud deployment & DevOps (AWS, Railway, Docker)</li>
          </ul>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="font-extrabold text-slate-950 dark:text-white">Availability</h3>
          <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">
            Currently open for remote freelance and contract work. Response time is typically within 24 hours.
            Best contact: email or LinkedIn.
          </p>
        </article>
      </div>
    </section>
  )
}
