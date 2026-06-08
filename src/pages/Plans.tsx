import { Section } from '../components/Section'
import { PlanCard } from '../components/PlanCard'
import { PageMeta } from '../components/PageMeta'
import { useContent } from '../context/ContentContext'

export function Plans() {
  const { plans } = useContent()

  return (
    <>
      <PageMeta
        title="Plans"
        description="Flexible IT service packages from MZA Solutions. Request a custom quote for any plan."
      />

      <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-12 text-center shadow-card sm:px-6 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Plans</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[color:var(--text)] sm:text-5xl">Plans & Offerings</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
          Choose a package that fits your goals — pricing is tailored to your project. Request a quote for exact details.
        </p>
      </div>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(plans ?? []).map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Section>
    </>
  )
}
