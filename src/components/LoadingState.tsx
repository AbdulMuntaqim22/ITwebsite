export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--surface)] shadow-card">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[color:var(--accent)] border-t-transparent" role="status" aria-label="Loading" />
      </div>
      <p className="text-[color:var(--muted)]">{message}</p>
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-lg font-medium text-red-400">Something went wrong</p>
      <p className="max-w-md text-[color:var(--muted)]">{message}</p>
    </div>
  )
}
