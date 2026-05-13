export type User = {
  id: string
  username: string
  role: string
}

export type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export type AuthAction =
  | { type: 'LOGIN'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false
}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}