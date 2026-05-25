import { useEffect, useState } from 'react'
import { adminFetch } from '../../lib/api'
import type { Company } from '../../types/content'
import { Button } from '../../components/Button'
import { AdminInput, AdminTextarea } from '../components/AdminInput'

export function AdminCompanySettings() {
  const [form, setForm] = useState<Company>({
    name: '',
    tagline: '',
    description: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    adminFetch<Company>('/api/admin/company')
      .then(setForm)
      .finally(() => setLoading(false))
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await adminFetch('/api/admin/company', {
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
      <h1 className="text-2xl font-bold text-white">Company info</h1>
      <p className="mt-2 text-sm text-slate-400">Used in the header, hero, and footer.</p>

      <form onSubmit={save} className="mt-6 max-w-lg space-y-4">
        <AdminInput
          label="Company name"
          id="cname"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <AdminInput
          label="Tagline"
          id="ctag"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          required
        />
        <AdminTextarea
          label="Description"
          id="cdesc"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
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
