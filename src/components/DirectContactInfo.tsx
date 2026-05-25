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
        <span className="block text-slate-500">Email</span>
        <a
          href={`mailto:${contact.email}`}
          className={
            variant === 'card'
              ? 'font-medium text-accent-400 hover:underline'
              : 'hover:text-accent-400'
          }
        >
          {contact.email}
        </a>
      </li>
      <li>
        <span className="block text-slate-500">Phone</span>
        <a
          href={`tel:${tel}`}
          className={
            variant === 'card'
              ? 'font-medium text-accent-400 hover:underline'
              : 'hover:text-accent-400'
          }
        >
          {contact.phone}
        </a>
      </li>
      <li>
        <span className="block text-slate-500">Address</span>
        <span className={variant === 'card' ? 'text-slate-300' : ''}>
          {contact.address}
        </span>
      </li>
      {contact.hours && (
        <li>
          <span className="block text-slate-500">Hours</span>
          <span className={variant === 'card' ? 'text-slate-300' : ''}>
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
            className="text-sm text-slate-400 hover:text-accent-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        )}
        {contact.social.instagram && (
          <a
            href={contact.social.instagram}
            className="text-sm text-slate-400 hover:text-accent-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        )}
        {contact.social.facebook && (
          <a
            href={contact.social.facebook}
            className="text-sm text-slate-400 hover:text-accent-400"
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
        <ul className="mt-4 flex flex-col gap-2 text-sm text-slate-400">{items}</ul>
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
