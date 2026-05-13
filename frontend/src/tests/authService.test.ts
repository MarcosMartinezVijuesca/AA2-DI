/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loginUser, registerUser } from '../services/authService'

describe('authService', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('loginUser devuelve datos cuando la respuesta es correcta', async () => {
    const mockResponse = {
      token: 'fake-token',
      user: { id: '1', username: 'admin', role: 'admin' }
    }

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    })

    const data = await loginUser('admin', 'admin123')
    expect(data.token).toBe('fake-token')
    expect(data.user.username).toBe('admin')
  })

  it('loginUser lanza un error cuando la respuesta falla', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Usuario no encontrado' })
    })

    await expect(loginUser('wrong', 'wrong')).rejects.toThrow('Usuario no encontrado')
  })

  it('registerUser lanza un error si el usuario ya existe', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'El usuario ya existe' })
    })

    await expect(registerUser('admin', '123', 'user')).rejects.toThrow('El usuario ya existe')
  })
})