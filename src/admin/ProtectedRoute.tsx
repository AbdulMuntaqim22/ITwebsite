import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { LoadingState } from '../components/LoadingState'

export function ProtectedRoute() {
  const { username, loading } = useAuth()

  if (loading) return <LoadingState message="Checking session..." />
  if (!username) return <Navigate to="/mza/portal" replace />

  return <Outlet />
}
