import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  allowedRoles: string[]
}

const RoleGuard = ({ children, allowedRoles }: Props) => {
  const { state } = useAuth()

  if (!state.user || !allowedRoles.includes(state.user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

export default RoleGuard