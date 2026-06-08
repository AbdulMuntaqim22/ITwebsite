import { Hero } from '../components/Hero'
import { Section } from '../components/Section'
import { ServiceCard } from '../components/ServiceCard'
import { PortfolioCard } from '../components/PortfolioCard'
import { PageMeta } from '../components/PageMeta'
import { Button } from '../components/Button'
import { useContent } from '../context/ContentContext'

export function Home() {
  const { services, company, portfolio } = useContent()
  const featured = (services ?? []).filter((s) => s.featured)
  const featuredPortfolio = (portfolio ?? []).slice(0, 3)
  const getCategoryLabel = (category?: string) =>
    category ? services.find((s) => s.id === category)?.name ?? category : undefined

  return (
    <>
      <PageMeta
        title="Home"
        description={
          company?.description ??
          'Professional IT services including website design, video editing, and more.'
        }
      />
      <Hero />

      <Section
        title="What we do"
        subtitle="End-to-end digital services for businesses that want to move fast"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {featured.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/services" variant="outline">
            View all services
          </Button>
        </div>
      </Section>

      <Section
        title="Portfolio"
        subtitle="Recent work and projects that show how we solve business problems"
      >
        {featuredPortfolio.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPortfolio.map((item) => (
              <PortfolioCard
                key={item.id}
                item={{
                  ...item,
                  category: getCategoryLabel(item.category),
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-[color:var(--muted)]">Portfolio items will appear here once they are added.</p>
        )}
        <div className="mt-10 text-center">
          <Button to="/contact" variant="outline">
            Talk about your project
          </Button>
        </div>
      </Section>

      <Section alt title="Ready to get started?" subtitle="Tell us about your project — we'll respond with a tailored quote.">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button to="/plans">Explore plans</Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Section>
    </>
  )
}
