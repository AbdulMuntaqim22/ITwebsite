import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import { ThemeToggle } from './ThemeToggle'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: { to: string; label: string }[]
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  return (
    <nav
      id="mobile-nav"
      className={`border-t border-[color:var(--border)] bg-[color:var(--surface)]/98 backdrop-blur-xl md:hidden ${
        open ? 'block' : 'hidden'
      } shadow-card`}
      aria-label="Mobile"
    >
      <div className="border-b border-[color:var(--border)] px-4 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Navigation</p>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">Explore services, plans, and get started with your next project.</p>
      </div>
      <ul className="flex flex-col gap-3 px-4 py-4">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `block min-h-11 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-base font-medium transition ${
                  isActive
                    ? 'text-[color:var(--accent)] shadow-card'
                    : 'text-[color:var(--text)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <Button to="/contact" className="w-full" onClick={onClose}>
            Start project
          </Button>
        </li>
        <li className="pt-2">
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </li>
      </ul>
    </nav>
  )
}
