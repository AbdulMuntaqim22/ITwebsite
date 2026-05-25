import type { Service } from '../types/content'
import { ServiceIcon } from './icons'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex flex-col rounded-xl border border-white/10 bg-navy-900/80 p-6 transition-colors hover:border-accent-500/30">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500/10">
        <ServiceIcon name={service.icon} />
      </div>
      <h3 className="text-lg font-semibold text-white">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
        {service.description}
      </p>
    </article>
  )
}
