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

export interface ServicesData {
  services: Service[]
}

export interface PlansData {
  plans: Plan[]
}
