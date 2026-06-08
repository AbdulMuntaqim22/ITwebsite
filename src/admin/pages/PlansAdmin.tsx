import { useEffect, useState } from 'react'
import { adminFetch } from '../../lib/api'
import type { Plan, Service } from '../../types/content'
import { Button } from '../../components/Button'
import { AdminInput, AdminTextarea } from '../components/AdminInput'

const empty: Plan = {
  id: '',
  name: '',
  tagline: '',
  relatedServiceId: '',
  includes: [''],
  idealFor: '',
}

export function AdminPlans() {
  const [items, setItems] = useState<Plan[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function load() {
    Promise.all([
      adminFetch<Plan[]>('/api/admin/plans'),
      adminFetch<Service[]>('/api/admin/services'),
    ])
      .then(([plans, svcs]) => {
        setItems(plans)
        setServices(svcs)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  function startEdit(p: Plan) {
    setEditing(p.id)
    setForm({
      ...p,
      includes: p.includes.length ? p.includes : [''],
      relatedServiceId: p.relatedServiceId ?? '',
    })
  }

  function startNew() {
    setEditing(null)
    setForm({ ...empty })
  }

  function updateInclude(i: number, value: string) {
    const next = [...form.includes]
    next[i] = value
    setForm({ ...form, includes: next })
  }

  function addInclude() {
    setForm({ ...form, includes: [...form.includes, ''] })
  }

  function removeInclude(i: number) {
    setForm({ ...form, includes: form.includes.filter((_, idx) => idx !== i) })
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      includes: form.includes.filter((x) => x.trim()),
      relatedServiceId: form.relatedServiceId || undefined,
    }
    try {
      if (editing) {
        await adminFetch(`/api/admin/plans/${editing}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
      } else {
        await adminFetch('/api/admin/plans', {
          method: 'POST',
          body: JSON.stringify(payload),
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
    if (!confirm('Delete this plan?')) return
    await adminFetch(`/api/admin/plans/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Plans & offerings</h1>

      <form onSubmit={save} className="mt-6 space-y-4 rounded-xl border border-white/10 bg-navy-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          {editing ? 'Edit plan' : 'Add plan'}
        </h2>

        <AdminInput
          label="Name"
          id="pname"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <AdminInput
          label="Tagline"
          id="ptag"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          required
        />

        <div>
          <label htmlFor="psvc" className="mb-1.5 block text-sm font-medium text-slate-300">
            Related service
          </label>
          <select
            id="psvc"
            className="w-full min-h-11 rounded-lg border border-white/10 bg-navy-800 px-4 text-white"
            value={form.relatedServiceId ?? ''}
            onChange={(e) => setForm({ ...form, relatedServiceId: e.target.value })}
          >
            <option value="">None</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-300">Includes</p>
          {form.includes.map((line, i) => (
            <div key={i} className="mb-2 flex gap-2">
              <input
                className="min-h-10 flex-1 rounded-lg border border-white/10 bg-navy-800 px-3 text-white"
                value={line}
                onChange={(e) => updateInclude(i, e.target.value)}
              />
              <button
                type="button"
                className="text-sm text-slate-500 hover:text-red-400"
                onClick={() => removeInclude(i)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-accent-400 hover:underline"
            onClick={addInclude}
          >
            + Add line
          </button>
        </div>

        <AdminTextarea
          label="Ideal for"
          id="pideal"
          rows={2}
          value={form.idealFor}
          onChange={(e) => setForm({ ...form, idealFor: e.target.value })}
          required
        />

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
          {items.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3"
            >
              <div>
                <p className="font-medium text-white">{p.name}</p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => startEdit(p)}>
                  Edit
                </Button>
                <Button type="button" variant="secondary" onClick={() => remove(p.id)}>
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
