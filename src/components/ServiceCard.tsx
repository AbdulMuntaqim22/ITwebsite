import type { Service } from '../types/content'
import { ServiceIcon } from './icons'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex min-h-[240px] flex-col rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)]/40">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
        <ServiceIcon name={service.icon} />
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Service</p>
      <h3 className="mt-4 text-xl font-semibold text-[color:var(--text)]">{service.name}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--muted)]">
        {service.description}
      </p>
    </article>
  )
}
