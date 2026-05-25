import { useEffect, useState } from 'react'
import { adminFetch } from '../../lib/api'
import type { ContactSubmission } from '../../types/content'
import { Button } from '../../components/Button'

export function AdminSubmissions() {
  const [items, setItems] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function load() {
    setLoading(true)
    adminFetch<ContactSubmission[]>('/api/admin/submissions')
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  async function toggleRead(id: number, read: boolean) {
    await adminFetch(`/api/admin/submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ read: !read }),
    })
    load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this submission?')) return
    await adminFetch(`/api/admin/submissions/${id}`, { method: 'DELETE' })
    load()
  }

  if (loading) return <p className="text-slate-400">Loading...</p>
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Contact submissions</h1>
      <p className="mt-2 text-sm text-slate-400">{items.length} total</p>

      {items.length === 0 ? (
        <p className="mt-8 text-slate-500">No submissions yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {items.map((s) => (
            <li
              key={s.id}
              className={`rounded-xl border p-5 ${
                s.read
                  ? 'border-white/5 bg-navy-900/50'
                  : 'border-accent-500/30 bg-navy-900'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-white">
                    {s.name}
                    {!s.read && (
                      <span className="ml-2 rounded bg-accent-500/20 px-2 py-0.5 text-xs text-accent-400">
                        New
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-400">
                    {s.email}
                    {s.phone ? ` · ${s.phone}` : ''}
                  </p>
                </div>
                <p className="text-xs text-slate-500">{s.createdAt}</p>
              </div>
              <p className="mt-2 text-sm text-accent-400">{s.service}</p>
              <p className="mt-3 text-sm text-slate-300 whitespace-pre-wrap">{s.message}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => toggleRead(s.id, s.read)}
                >
                  {s.read ? 'Mark unread' : 'Mark read'}
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
