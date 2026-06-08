export interface Service {
  id: string
  name: string
  description: string
  icon: string
  featured: boolean
}

export interface Plan {
  id: string
  name: string
  tagline: string
  relatedServiceId?: string
  includes: string[]
  idealFor: string
}

export interface Company {
  name: string
  tagline: string
  description: string
}

export interface ContactDetails {
  email: string
  phone: string
  address: string
  hours?: string
  social: {
    linkedin?: string
    instagram?: string
    facebook?: string
  }
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  category?: string
  imageUrl?: string
}

export interface ContactSubmission {
  id: number
  name: string
  email: string
  phone: string | null
  service: string
  message: string
  createdAt: string
  read: boolean
}

export interface ServicesData {
  services: Service[]
}

export interface PlansData {
  plans: Plan[]
}

export const SERVICE_ICONS = [
  'layout',
  'video',
  'palette',
  'code',
  'shield',
  'chart',
] as const
