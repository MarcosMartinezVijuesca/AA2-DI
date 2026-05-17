const BASE_URL = 'https://rickandmortyapi.com/api'

export const getCharacters = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/character?page=${page}`)
  if (!response.ok) throw new Error('Error al cargar personajes')
  return response.json()
}

export const getCharacterById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/character/${id}`)
  if (!response.ok) throw new Error('Error al cargar el personaje')
  return response.json()
}

export const getEpisodes = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/episode?page=${page}`)
  if (!response.ok) throw new Error('Error al cargar episodios')
  return response.json()
}

export const getLocations = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/location?page=${page}`)
  if (!response.ok) throw new Error('Error al cargar localizaciones')
  return response.json()
}