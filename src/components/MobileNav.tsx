import { NavLink } from 'react-router-dom'
import { Button } from './Button'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: { to: string; label: string }[]
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  return (
    <nav
      id="mobile-nav"
      className={`border-t border-white/5 bg-navy-900 md:hidden ${
        open ? 'block' : 'hidden'
      }`}
      aria-label="Mobile"
    >
      <ul className="flex flex-col gap-1 px-4 py-4">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `block min-h-11 rounded-lg px-4 py-3 text-base font-medium ${
                  isActive
                    ? 'bg-accent-500/15 text-accent-400'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li className="pt-2">
          <Button to="/contact" className="w-full" onClick={onClose}>
            Get a quote
          </Button>
        </li>
      </ul>
    </nav>
  )
}
