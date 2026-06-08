import { useEffect, useState, type FormEvent } from 'react'
import { adminFetch } from '../../lib/api'
import type { PortfolioItem, Service } from '../../types/content'
import { Button } from '../../components/Button'
import { AdminInput, AdminTextarea } from '../components/AdminInput'

const empty: Omit<PortfolioItem, 'id'> & { id: string } = {
  id: '',
  title: '',
  description: '',
  category: '',
  imageUrl: '',
}

export function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  function load() {
    Promise.all([
      adminFetch<PortfolioItem[]>('/api/admin/portfolio'),
      adminFetch<Service[]>('/api/admin/services'),
    ])
      .then(([items, svcs]) => {
        setItems(items)
        setServices(svcs)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  function startEdit(item: PortfolioItem) {
    setEditing(item.id)
    setForm({ ...item })
  }

  function startNew() {
    setEditing(null)
    setForm({ ...empty })
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('image', file)
      const result = await adminFetch<{ url: string }>('/api/admin/portfolio/upload', {
        method: 'POST',
        body: formData,
      })
      setForm((prev) => ({ ...prev, imageUrl: result.url }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editing) {
        await adminFetch(`/api/admin/portfolio/${editing}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        })
      } else {
        await adminFetch('/api/admin/portfolio', {
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
    if (!confirm('Delete this portfolio item?')) return
    await adminFetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Portfolio</h1>
      <p className="mt-2 text-slate-400">Manage the portfolio items that appear on the homepage.</p>

      <form onSubmit={save} className="mt-6 space-y-4 rounded-xl border border-white/10 bg-navy-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          {editing ? 'Edit portfolio item' : 'Add portfolio item'}
        </h2>


        <AdminInput
          label="Title"
          id="ptitle"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <AdminTextarea
          label="Description"
          id="pdesc"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <div>
          <label htmlFor="pcat" className="mb-1.5 block text-sm font-medium text-slate-300">
            Category (service)
          </label>
          <select
            id="pcat"
            className="w-full min-h-11 rounded-lg border border-white/10 bg-navy-800 px-4 text-white"
            value={form.category ?? ''}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">None</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <AdminInput
          label="Image URL"
          id="pimage"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          placeholder="https://..."
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-300" htmlFor="pimageFile">
            Upload image
          </label>
          <input
            id="pimageFile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-3 text-sm text-slate-100"
          />
          {uploading && (
            <p className="mt-2 text-sm text-slate-400">Uploading image…</p>
          )}
          {form.imageUrl && (
            <p className="mt-2 text-sm text-slate-400">
              Uploaded image URL: <span className="text-white">{form.imageUrl}</span>
            </p>
          )}
        </div>

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
          {items.map((item) => {
            const categoryLabel = services.find((s) => s.id === item.category)?.name ?? item.category
            return (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  {categoryLabel ? (
                    <p className="text-xs text-slate-500">{categoryLabel}</p>
                  ) : null}
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => startEdit(item)}>
                    Edit
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => remove(item.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
