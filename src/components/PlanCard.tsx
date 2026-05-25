import type { Plan } from '../types/content'
import { Button } from './Button'

export function PlanCard({ plan }: { plan: Plan }) {
  const quoteUrl = plan.relatedServiceId
    ? `/contact?service=${encodeURIComponent(plan.relatedServiceId)}`
    : '/contact'

  return (
    <article className="flex flex-col rounded-xl border border-white/10 bg-navy-900/80 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
      <p className="mt-2 text-sm text-accent-400">{plan.tagline}</p>

      <ul className="mt-6 flex-1 space-y-2">
        {plan.includes.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-slate-300">
            <span className="mt-0.5 text-accent-500" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-slate-500">
        <span className="font-medium text-slate-400">Ideal for: </span>
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
