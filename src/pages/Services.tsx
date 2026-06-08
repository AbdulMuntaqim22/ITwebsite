import { Section } from '../components/Section'
import { ServiceCard } from '../components/ServiceCard'
import { PageMeta } from '../components/PageMeta'
import { useContent } from '../context/ContentContext'

export function Services() {
  const { services } = useContent()

  return (
    <>
      <PageMeta
        title="Services"
        description="Website design, video editing, software development, IT support, and digital marketing from MZA Solutions."
      />

      <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-12 text-center shadow-card sm:px-6 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Services</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[color:var(--text)] sm:text-5xl">Our Services</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
          Everything you need to build, promote, and maintain your digital presence.
        </p>
      </div>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(services ?? []).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>
    </>
  )
}
