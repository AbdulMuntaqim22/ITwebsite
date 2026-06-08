import { useContent } from '../context/ContentContext'

interface DirectContactInfoProps {
  variant?: 'card' | 'inline'
}

export function DirectContactInfo({ variant = 'card' }: DirectContactInfoProps) {
  const { contact } = useContent()
  if (!contact) return null

  const tel = contact.phone.replace(/\s/g, '')

  const items = (
    <>
      <li>
        <span className="block text-[color:var(--muted)]">Email</span>
        <a
          href={`mailto:${contact.email}`}
          className={
            variant === 'card'
              ? 'font-medium text-[color:var(--accent)] hover:underline'
              : 'hover:text-[color:var(--accent)]'
          }
        >
          {contact.email}
        </a>
      </li>
      <li>
        <span className="block text-[color:var(--muted)]">Phone</span>
        <a
          href={`tel:${tel}`}
          className={
            variant === 'card'
              ? 'font-medium text-[color:var(--accent)] hover:underline'
              : 'hover:text-[color:var(--accent)]'
          }
        >
          {contact.phone}
        </a>
      </li>
      <li>
        <span className="block text-[color:var(--muted)]">Address</span>
        <span className={variant === 'card' ? 'text-[color:var(--text)]' : ''}>
          {contact.address}
        </span>
      </li>
      {contact.hours && (
        <li>
          <span className="block text-[color:var(--muted)]">Hours</span>
          <span className={variant === 'card' ? 'text-[color:var(--text)]' : ''}>
            {contact.hours}
          </span>
        </li>
      )}
    </>
  )

  const social = (
    (contact.social.linkedin ||
      contact.social.instagram ||
      contact.social.facebook) && (
      <div className={variant === 'card' ? 'mt-6 flex gap-4' : 'mt-4 flex gap-4'}>
        {contact.social.linkedin && (
          <a
            href={contact.social.linkedin}
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--accent)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        )}
        {contact.social.instagram && (
          <a
            href={contact.social.instagram}
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--accent)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        )}
        {contact.social.facebook && (
          <a
            href={contact.social.facebook}
            className="text-sm text-[color:var(--muted)] hover:text-[color:var(--accent)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        )}
      </div>
    )
  )

  if (variant === 'inline') {
    return (
      <>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-[color:var(--muted)]">{items}</ul>
        {social}
      </>
    )
  }

  return (
    <>
      <ul className="mt-6 space-y-4 text-sm">{items}</ul>
      {social}
    </>
  )
}
