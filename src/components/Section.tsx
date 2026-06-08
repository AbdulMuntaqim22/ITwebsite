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
      className={`relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 ${alt ? 'bg-[color:var(--surface-strong)]' : ''} ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(title || subtitle) && (
          <header className="mb-10 text-center sm:mb-12">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--text)] sm:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-3 max-w-2xl text-base text-[color:var(--muted)] sm:text-lg">
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
