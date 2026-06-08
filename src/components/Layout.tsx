import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { useContent } from '../context/ContentContext'
import { ErrorState, LoadingState } from './LoadingState'

export function Layout() {
  const { loading, error } = useContent()

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[color:var(--bg)]">
        <div className="h-14 border-b border-[color:var(--border)] bg-[color:var(--surface)]" />
        <LoadingState message="Loading site content..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-[color:var(--bg)]">
        <ErrorState message={error} />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--bg)]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
