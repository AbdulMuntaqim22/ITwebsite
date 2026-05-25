import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export function AdminInput({
  label,
  id,
  ...props
}: {
  label: string
  id: string
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={id}
        className="w-full min-h-11 rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-white focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        {...props}
      />
    </div>
  )
}

export function AdminTextarea({
  label,
  id,
  ...props
}: {
  label: string
  id: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full rounded-lg border border-white/10 bg-navy-800 px-4 py-2.5 text-white focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        {...props}
      />
    </div>
  )
}
