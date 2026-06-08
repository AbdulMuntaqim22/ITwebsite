import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/plans', label: 'Plans' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { company } = useContent()
  const name = company?.name ?? 'MZA Solutions'
  const tagline = company?.tagline ?? 'Strategic IT for modern brands'

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--surface)]/92 shadow-[0_24px_80px_-35px_rgba(15,23,42,0.16)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-4 rounded-[1.75rem] border border-transparent bg-[color:var(--surface-soft)] px-4 py-3 transition duration-300 hover:border-[color:var(--accent-soft)] hover:bg-[color:var(--surface)]"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[color:var(--accent-soft)] text-[color:var(--accent)] shadow-sm">
            <span className="text-lg font-semibold">{name.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-[color:var(--text)] transition group-hover:text-[color:var(--accent)]">
              {name}
            </p>
            <p className="truncate text-[0.7rem] uppercase tracking-[0.33em] text-[color:var(--muted)]">
              {tagline}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full bg-[color:var(--surface-soft)] px-3 py-2 md:flex" aria-label="Primary navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? 'bg-[color:var(--accent-soft)] text-[color:var(--accent)] shadow-sm'
                    : 'text-[color:var(--text)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--accent)]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text)] shadow-sm transition duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
    </header>
  )
}
