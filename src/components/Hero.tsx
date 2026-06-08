import { Button } from './Button'
import { useContent } from '../context/ContentContext'

export function Hero() {
  const { company } = useContent()
  if (!company) return null

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[color:var(--bg)]/60" aria-hidden />
      <div className="pointer-events-none absolute left-0 top-12 h-72 w-72 rounded-full bg-[color:var(--accent-soft)] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-[color:var(--glow)] blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_0.9fr] items-start">
          <div className="space-y-10 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-10 shadow-card sm:p-12">
            <div className="inline-flex rounded-full bg-[color:var(--accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
              {company.name}
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--accent)]">Built for growth</p>
              <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[color:var(--text)] sm:text-6xl">
                {company.tagline}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
                {company.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Button to="/plans" className="w-full">
                View our plans
              </Button>
              <Button to="/contact" variant="outline" className="w-full">
                Contact us
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel rounded-[2rem] p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
                Built for growth
              </p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                  <p className="text-sm font-semibold text-[color:var(--text)]">Launch faster with clarity</p>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                    We turn ideas into modern websites, video, and systems that feel premium.
                  </p>
                </div>
                <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
                  <p className="text-sm font-semibold text-[color:var(--text)]">Trusted creative support</p>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted)]">
                    Every launch is backed by expert delivery and clear communication.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Why clients choose us</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-[color:var(--surface)] p-5">
                  <p className="text-3xl font-semibold text-[color:var(--accent)]">3x</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Faster website launches with streamlined creative support.</p>
                </div>
                <div className="rounded-3xl bg-[color:var(--surface)] p-5">
                  <p className="text-3xl font-semibold text-[color:var(--accent)]">All-in-one</p>
                  <p className="mt-2 text-sm text-[color:var(--muted)]">Design, video, web, and IT support in one cohesive package.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
