const API_BASE = import.meta.env.VITE_API_URL ?? ''

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = {
    ...options.headers,
  }

  if (!(options.body instanceof FormData)) {
    Object.assign(headers, { 'Content-Type': 'application/json' })
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  })

  const text = await res.text()
  let data: unknown = {}

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error(`Invalid JSON response from ${path}`)
    }
  }

  if (!res.ok) {
    throw new Error(
      ((data as { error?: string }).error ?? `Request failed (${res.status})`) as string,
    )
  }

  return data as T
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('mza_admin_token', token)
  } else {
    localStorage.removeItem('mza_admin_token')
  }
}

export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('mza_admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function adminFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  return apiFetch<T>(path, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  })
}
