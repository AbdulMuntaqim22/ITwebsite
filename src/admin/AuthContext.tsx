import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { adminFetch, apiFetch, setAuthToken } from '../lib/api'

interface AuthState {
  username: string | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('mza_admin_token')
    if (!token) {
      setLoading(false)
      return
    }
    adminFetch<{ username: string }>('/api/auth/me')
      .then((data) => setUsername(data.username))
      .catch(() => {
        setAuthToken(null)
        setUsername(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function login(user: string, pass: string) {
    const data = await apiFetch<{ token: string; username: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username: user, password: pass }),
    })
    setAuthToken(data.token)
    setUsername(data.username)
  }

  async function logout() {
    await apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
    setAuthToken(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ username, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
