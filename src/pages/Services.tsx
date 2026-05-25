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

      <div className="border-b border-white/5 bg-navy-900/30 px-4 py-12 text-center sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Our Services</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Everything you need to build, promote, and maintain your digital presence.
        </p>
      </div>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Section>
    </>
  )
}
