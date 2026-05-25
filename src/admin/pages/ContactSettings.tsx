import { useEffect, useState } from 'react'
import { adminFetch } from '../../lib/api'
import type { ContactDetails } from '../../types/content'
import { Button } from '../../components/Button'
import { AdminInput } from '../components/AdminInput'

export function AdminContactSettings() {
  const [form, setForm] = useState<ContactDetails>({
    email: '',
    phone: '',
    address: '',
    hours: '',
    social: {},
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    adminFetch<ContactDetails>('/api/admin/contact')
      .then(setForm)
      .finally(() => setLoading(false))
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await adminFetch('/api/admin/contact', {
        method: 'PUT',
        body: JSON.stringify(form),
      })
      setMessage('Saved successfully.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-slate-400">Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Contact details</h1>
      <p className="mt-2 text-sm text-slate-400">
        Shown in the footer and on the Contact page.
      </p>

      <form onSubmit={save} className="mt-6 max-w-lg space-y-4">
        <AdminInput
          label="Email"
          id="cemail"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <AdminInput
          label="Phone"
          id="cphone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <AdminInput
          label="Address"
          id="caddr"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <AdminInput
          label="Hours (optional)"
          id="chours"
          value={form.hours ?? ''}
          onChange={(e) => setForm({ ...form, hours: e.target.value })}
        />
        <AdminInput
          label="LinkedIn URL"
          id="clinkedin"
          value={form.social.linkedin ?? ''}
          onChange={(e) =>
            setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })
          }
        />
        <AdminInput
          label="Instagram URL"
          id="cinsta"
          value={form.social.instagram ?? ''}
          onChange={(e) =>
            setForm({ ...form, social: { ...form.social, instagram: e.target.value } })
          }
        />
        <AdminInput
          label="Facebook URL"
          id="cfb"
          value={form.social.facebook ?? ''}
          onChange={(e) =>
            setForm({ ...form, social: { ...form.social, facebook: e.target.value } })
          }
        />

        {message && (
          <p className={`text-sm ${message.includes('success') ? 'text-accent-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </div>
  )
}
