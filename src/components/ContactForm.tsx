import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { useContent } from '../context/ContentContext'
import { Button } from './Button'

export function ContactForm() {
  const { services } = useContent()
  const [searchParams] = useSearchParams()
  const prefillService = searchParams.get('service') ?? ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState(prefillService)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (prefillService) setService(prefillService)
  }, [prefillService])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in name, email, and message.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    const serviceName =
      (services ?? []).find((s) => s.id === service)?.name ??
      (service ? service : 'General inquiry')

    try {
      await apiFetch('/api/submissions', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          service: serviceName,
          message: message.trim(),
        }),
      })

      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setService('')
      setMessage('')
    } catch {
      setStatus('error')
      setErrorMsg(
        'Something went wrong. Please try again or email us directly using the address on this page.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded-[2rem] border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] p-8 text-center shadow-card"
        role="status"
      >
        <p className="text-lg font-semibold text-[color:var(--text)]">Thank you!</p>
        <p className="mt-2 text-[color:var(--muted)]">
          We received your message and will get back to you soon.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus('idle')}
        >
          Send another message
        </Button>
      </div>
    )
  }

  const inputClass =
    'w-full min-h-11 rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:outline-none focus:ring-1 focus:ring-[color:var(--accent)]'

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[color:var(--text)]">
            Name <span className="text-[color:var(--accent)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[color:var(--text)]">
            Email <span className="text-[color:var(--accent)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[color:var(--text)]">
            Phone <span className="text-[color:var(--muted)]">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-[color:var(--text)]">
            Service of interest
          </label>
          <select
            id="service"
            name="service"
            className={inputClass}
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">General inquiry</option>
            {(services ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[color:var(--text)]">
          Message <span className="text-[color:var(--accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {(errorMsg || status === 'error') && (
        <p className="text-sm text-red-400" role="alert">
          {errorMsg || 'Submission failed. Please try again.'}
        </p>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}
