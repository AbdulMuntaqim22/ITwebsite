import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const nav = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/submissions', label: 'Submissions' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/plans', label: 'Plans' },
  { to: '/admin/contact', label: 'Contact info' },
  { to: '/admin/company', label: 'Company' },
]

export function AdminLayout() {
  const { username, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <header className="border-b border-white/10 bg-navy-900 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
              Admin
            </p>
            <p className="text-sm text-slate-400">Signed in as {username}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="text-sm text-slate-400 hover:text-white">
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-slate-400 hover:text-white"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6 sm:py-8">
        <nav className="flex shrink-0 flex-row flex-wrap gap-1 sm:w-48 sm:flex-col">
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `min-h-10 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-accent-500/15 text-accent-400'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
