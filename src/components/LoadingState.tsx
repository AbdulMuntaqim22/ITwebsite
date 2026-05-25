export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-accent-500 border-t-transparent"
        role="status"
        aria-label="Loading"
      />
      <p className="text-slate-400">{message}</p>
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-lg font-medium text-red-400">Something went wrong</p>
      <p className="max-w-md text-slate-400">{message}</p>
    </div>
  )
}
