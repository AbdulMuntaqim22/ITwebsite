import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { apiFetch } from '../lib/api'
import type { Company, ContactDetails, Plan, Service } from '../types/content'

interface ContentPayload {
  services: Service[]
  plans: Plan[]
  company: Company | null
  contact: ContactDetails | null
}

interface ContentState extends ContentPayload {
  loading: boolean
  error: string | null
  refresh: () => void
}

const ContentContext = createContext<ContentState | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>({
    services: [],
    plans: [],
    company: null,
    contact: null,
    loading: true,
    error: null,
    refresh: () => {},
  })

  function load() {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    apiFetch<ContentPayload>('/api/content')
      .then((data) => {
        setState({
          ...data,
          loading: false,
          error: null,
          refresh: load,
        })
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            'Unable to load site content. Make sure the API server is running (npm run dev:server).',
          refresh: load,
        }))
      })
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <ContentContext.Provider value={state}>{children}</ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
