import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const { state } = useAuth()

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default PrivateRoute