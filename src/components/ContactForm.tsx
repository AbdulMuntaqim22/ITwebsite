import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import { Button } from './Button'

export function ContactForm() {
  const { services, contact } = useContent()
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

    const recipientEmail = contact?.email?.trim()
    if (!recipientEmail) {
      setErrorMsg(
        'Contact email is not configured. Add an email address in public/content/contact.json.',
      )
      setStatus('error')
      return
    }

    setStatus('loading')

    const serviceName =
      services.find((s) => s.id === service)?.name ??
      (service ? service : 'General inquiry')

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || 'Not provided',
            service: serviceName,
            message: message.trim(),
            _subject: `New inquiry from ${name.trim()} — MZA Solutions`,
            _template: 'table',
            _captcha: 'false',
          }),
        },
      )

      const data = (await res.json()) as { success?: string; message?: string }

      if (!res.ok) {
        throw new Error(data.message ?? 'Submission failed')
      }

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
        className="rounded-xl border border-accent-500/30 bg-accent-500/10 p-8 text-center"
        role="status"
      >
        <p className="text-lg font-semibold text-white">Thank you!</p>
        <p className="mt-2 text-slate-400">
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
    'w-full min-h-11 rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from users, blocks simple bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
          Name <span className="text-accent-400">*</span>
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
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
          Email <span className="text-accent-400">*</span>
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

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-300">
          Phone <span className="text-slate-500">(optional)</span>
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
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-slate-300">
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
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
          Message <span className="text-accent-400">*</span>
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
