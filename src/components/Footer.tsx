import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { DirectContactInfo } from './DirectContactInfo'

export function Footer() {
  const { company, contact } = useContent()
  if (!company) return null

  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.3fr_0.9fr_1fr] lg:gap-12">
        <div className="space-y-5">
          <p className="text-lg font-bold text-[color:var(--text)]">{company.name}</p>
          <p className="max-w-sm text-sm leading-relaxed text-[color:var(--muted)]">{company.tagline}</p>
          <div className="rounded-[2rem] bg-[color:var(--surface-strong)] p-6 shadow-card">
            <p className="text-sm text-[color:var(--muted)]">
              Ready to build a polished website, campaign, or video strategy? Share your vision and we&apos;ll respond with a tailored plan.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[color:var(--accent-strong)]"
            >
              Contact us
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--muted)]">
            Quick links
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {[
              { to: '/services', label: 'Services' },
              { to: '/plans', label: 'Plans' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-[color:var(--text)] transition hover:text-[color:var(--accent)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {contact && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--muted)]">
              Contact
            </p>
            <DirectContactInfo variant="inline" />
          </div>
        )}
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-center text-xs text-[color:var(--muted)]">
        &copy; {year} {company.name}. All rights reserved.
      </p>
    </footer>
  )
}
