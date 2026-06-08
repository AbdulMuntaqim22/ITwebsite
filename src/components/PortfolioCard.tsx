import type { PortfolioItem } from '../types/content'

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-card transition duration-300 hover:-translate-y-1 hover:border-[color:var(--accent)]/30">
      <div className="relative overflow-hidden">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.title} className="h-52 w-full object-cover" />
        ) : (
          <div className="flex h-52 items-center justify-center bg-[color:var(--surface-strong)] text-[color:var(--muted)]">
            <span className="text-sm uppercase tracking-[0.3em]">Portfolio</span>
          </div>
        )}
        {item.category ? (
          <span className="absolute left-4 top-4 inline-flex rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--accent)]">
            {item.category}
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-6">
        <h3 className="text-xl font-semibold text-[color:var(--text)]">{item.title}</h3>
        <p className="text-sm leading-relaxed text-[color:var(--muted)]">{item.description}</p>
      </div>
    </article>
  )
}
