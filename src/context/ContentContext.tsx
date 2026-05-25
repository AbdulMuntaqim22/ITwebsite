import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Company, ContactDetails, Plan, Service } from '../types/content'

interface ContentState {
  services: Service[]
  plans: Plan[]
  company: Company | null
  contact: ContactDetails | null
  loading: boolean
  error: string | null
}

const ContentContext = createContext<ContentState | null>(null)

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load ${url}`)
  return res.json() as Promise<T>
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>({
    services: [],
    plans: [],
    company: null,
    contact: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    async function load() {
      try {
        const [servicesData, plansData, company, contact] = await Promise.all([
          fetchJson<{ services: Service[] }>('/content/services.json'),
          fetchJson<{ plans: Plan[] }>('/content/plans.json'),
          fetchJson<Company>('/content/company.json'),
          fetchJson<ContactDetails>('/content/contact.json'),
        ])
        setState({
          services: servicesData.services,
          plans: plansData.plans,
          company,
          contact,
          loading: false,
          error: null,
        })
      } catch {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            'Unable to load site content. Please check that content files exist in public/content/.',
        }))
      }
    }
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
