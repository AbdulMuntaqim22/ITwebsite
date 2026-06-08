import { Link } from 'react-router-dom'

export function AdminOverview() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-2 text-slate-400">
        Use the menu to manage your site content and review contact form submissions.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { to: '/mza/submissions', label: 'Submissions', desc: 'Contact form inbox' },
          { to: '/mza/services', label: 'Services', desc: 'Add or edit services' },
          { to: '/mza/plans', label: 'Plans', desc: 'Offerings and packages' },
          { to: '/mza/portfolio', label: 'Portfolio', desc: 'Manage homepage portfolio items' },
          { to: '/mza/contact', label: 'Contact info', desc: 'Email, phone, address' },
          { to: '/mza/company', label: 'Company', desc: 'Name, tagline, about' },
        ].map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="block rounded-xl border border-white/10 bg-navy-900/80 p-5 transition-colors hover:border-accent-500/30"
            >
              <p className="font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
