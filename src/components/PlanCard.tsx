import type { Plan } from '../types/content'
import { Button } from './Button'

export function PlanCard({ plan }: { plan: Plan }) {
  const quoteUrl = plan.relatedServiceId
    ? `/contact?service=${encodeURIComponent(plan.relatedServiceId)}`
    : '/contact'

  return (
    <article className="group flex flex-col rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)]/40">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[color:var(--text)]">{plan.name}</h3>
          <p className="mt-2 text-sm text-[color:var(--accent)]">{plan.tagline}</p>
        </div>
        <span className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">
          Package
        </span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {Array.isArray(plan.includes)
          ? plan.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[color:var(--text)]">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-2xl bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))
          : null}
      </ul>

      <p className="mt-6 text-xs text-[color:var(--muted)]">
        <span className="font-medium text-[color:var(--text)]">Ideal for: </span>
        {plan.idealFor}
      </p>

      <div className="mt-8">
        <Button to={quoteUrl} className="w-full">
          Get a quote
        </Button>
      </div>
    </article>
  )
}
