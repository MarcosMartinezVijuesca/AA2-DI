import { describe, it, expect } from 'vitest'
import { authReducer, initialState } from '../reducers/authReducer'
import type { AuthAction } from '../reducers/authReducer'

const mockUser = {
  id: '1',
  username: 'admin',
  role: 'admin'
}

const mockToken = 'fake-jwt-token'

describe('authReducer', () => {
  it('devuelve el estado inicial por defecto', () => {
    const action = { type: 'LOGOUT' } as AuthAction
    const state = authReducer(initialState, action)
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })

  it('LOGIN establece el usuario y el token correctamente', () => {
    const action: AuthAction = {
      type: 'LOGIN',
      payload: { user: mockUser, token: mockToken }
    }
    const state = authReducer(initialState, action)
    expect(state.isAuthenticated).toBe(true)
    expect(state.user).toEqual(mockUser)
    expect(state.token).toBe(mockToken)
  })

  it('LOGOUT limpia el estado completamente', () => {
    const loggedInState = {
      user: mockUser,
      token: mockToken,
      isAuthenticated: true
    }
    const action: AuthAction = { type: 'LOGOUT' }
    const state = authReducer(loggedInState, action)
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
  })
})