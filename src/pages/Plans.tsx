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

      <div className="border-b border-white/5 bg-navy-900/30 px-4 py-12 text-center sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Plans & Offerings</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Choose a package that fits your goals — pricing is tailored to your project. Request a quote for exact details.
        </p>
      </div>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Section>
    </>
  )
}
