import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Button } from '../../components/Button'
import { AdminInput } from '../components/AdminInput'

export function AdminLogin() {
  const { username, loading, login } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && username) {
    return <Navigate to="/mza" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(user, pass)
      navigate('/mza')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-navy-900 p-8">
        <h1 className="text-2xl font-bold text-white">Admin login</h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage services, plans, contact settings, and submissions.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <AdminInput
            label="Username"
            id="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            autoComplete="username"
          />
          <AdminInput
            label="Password"
            id="password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}
