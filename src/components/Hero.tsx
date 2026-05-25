import { Button } from './Button'
import { useContent } from '../context/ContentContext'

export function Hero() {
  const { company } = useContent()
  if (!company) return null

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-400">
          {company.name}
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {company.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          {company.description}
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button to="/plans" className="w-full sm:w-auto">
            View our plans
          </Button>
          <Button to="/contact" variant="outline" className="w-full sm:w-auto">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  )
}
