const BASE_URL = 'http://localhost:3001/api/auth'

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al iniciar sesión')
  }

  return response.json()
}

export const registerUser = async (username: string, password: string, role: string) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Error al registrarse')
  }

  return response.json()
}

export const getMe = async (token: string) => {
  const response = await fetch(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!response.ok) {
    throw new Error('Sesión expirada')
  }

  return response.json()
}

export const getUsersList = async (token: string) => {
  const response = await fetch(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!response.ok) {
    throw new Error('Error al cargar los usuarios')
  }

  return response.json()
}