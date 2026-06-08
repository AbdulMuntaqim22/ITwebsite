import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'

const variants: Record<Variant, string> = {
  primary:
    'bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-white hover:brightness-105 focus-visible:ring-[color:var(--accent)] shadow-[0_18px_48px_-28px_rgba(13,129,255,0.85)]',
  secondary:
    'bg-[color:var(--surface-soft)] text-[color:var(--text)] hover:bg-[color:var(--surface)] focus-visible:ring-[color:var(--accent)] border border-[color:var(--border)]',
  outline:
    'border border-[color:var(--accent)] text-[color:var(--accent)] bg-transparent hover:bg-[color:var(--accent-soft)] focus-visible:ring-[color:var(--accent)]',
}

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  to?: string
  href?: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  to,
  href,
  className = '',
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] disabled:opacity-50 disabled:pointer-events-none shadow-sm'

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
