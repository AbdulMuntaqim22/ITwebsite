import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { useContent } from '../context/ContentContext'
import { ErrorState, LoadingState } from './LoadingState'

export function Layout() {
  const { loading, error } = useContent()

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="h-14 border-b border-white/5 bg-navy-950" />
        <LoadingState message="Loading site content..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <ErrorState message={error} />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
