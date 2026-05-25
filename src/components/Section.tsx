import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  alt?: boolean
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  alt = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${alt ? 'bg-navy-900/50' : ''} ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(title || subtitle) && (
          <header className="mb-10 text-center sm:mb-12">
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400 sm:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
