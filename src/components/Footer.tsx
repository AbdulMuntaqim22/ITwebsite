import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { DirectContactInfo } from './DirectContactInfo'

export function Footer() {
  const { company, contact } = useContent()
  if (!company) return null

  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-navy-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{company.name}</p>
          <p className="mt-2 text-sm text-slate-400">{company.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Quick links
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {[
              { to: '/services', label: 'Services' },
              { to: '/plans', label: 'Plans' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-slate-400 transition-colors hover:text-accent-400"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {contact && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </p>
            <DirectContactInfo variant="inline" />
          </div>
        )}
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-slate-500">
        &copy; {year} {company.name}. All rights reserved.
      </p>
    </footer>
  )
}
