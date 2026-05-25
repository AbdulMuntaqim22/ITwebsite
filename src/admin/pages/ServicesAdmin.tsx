import { useEffect, useState } from 'react'
import { adminFetch } from '../../lib/api'
import type { Service } from '../../types/content'
import { SERVICE_ICONS } from '../../types/content'
import { Button } from '../../components/Button'
import { AdminInput, AdminTextarea } from '../components/AdminInput'

const empty: Omit<Service, 'id'> & { id: string } = {
  id: '',
  name: '',
  description: '',
  icon: 'layout',
  featured: false,
}

export function AdminServices() {
  const [items, setItems] = useState<Service[]>([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function load() {
    adminFetch<Service[]>('/api/admin/services')
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  function startEdit(s: Service) {
    setEditing(s.id)
    setForm({ ...s })
  }

  function startNew() {
    setEditing(null)
    setForm({ ...empty })
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editing) {
        await adminFetch(`/api/admin/services/${editing}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        })
      } else {
        await adminFetch('/api/admin/services', {
          method: 'POST',
          body: JSON.stringify(form),
        })
      }
      startNew()
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this service?')) return
    await adminFetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Services</h1>

      <form onSubmit={save} className="mt-6 space-y-4 rounded-xl border border-white/10 bg-navy-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          {editing ? 'Edit service' : 'Add service'}
        </h2>

        {!editing && (
          <AdminInput
            label="ID (optional — auto-generated from name)"
            id="sid"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            placeholder="web-design"
          />
        )}

        <AdminInput
          label="Name"
          id="sname"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <AdminTextarea
          label="Description"
          id="sdesc"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <div>
          <label htmlFor="sicon" className="mb-1.5 block text-sm font-medium text-slate-300">
            Icon
          </label>
          <select
            id="sicon"
            className="w-full min-h-11 rounded-lg border border-white/10 bg-navy-800 px-4 text-white"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          >
            {SERVICE_ICONS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="h-4 w-4"
          />
          Featured on homepage
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : editing ? 'Update' : 'Add'}
          </Button>
          {editing && (
            <Button type="button" variant="secondary" onClick={startNew}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="mt-8 text-slate-400">Loading...</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {items.map((s) => (
            <li
              key={s.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3"
            >
              <div>
                <p className="font-medium text-white">{s.name}</p>
                <p className="text-xs text-slate-500">
                  {s.id} · {s.icon}
                  {s.featured ? ' · featured' : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => startEdit(s)}>
                  Edit
                </Button>
                <Button type="button" variant="secondary" onClick={() => remove(s.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
