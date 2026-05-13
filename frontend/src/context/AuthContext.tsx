import { createContext, useContext, useReducer, useEffect } from 'react'
import type { ReactNode } from 'react'
import { authReducer, initialState } from '../reducers/authReducer'
import type { AuthState, AuthAction, User } from '../reducers/authReducer'

type AuthContextType = {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (user: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    // Recupera la sesión del localStorage al recargar
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: true
      }
    }
    return initialState
  })

  // Sincroniza localStorage cuando cambia el estado
  useEffect(() => {
    if (state.isAuthenticated && state.token && state.user) {
      localStorage.setItem('token', state.token)
      localStorage.setItem('user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [state])

  const login = (user: User, token: string) => {
    dispatch({ type: 'LOGIN', payload: { user, token } })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}