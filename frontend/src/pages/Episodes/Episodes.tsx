import { useState, useEffect } from 'react'
import { getEpisodes } from '../../services/api'

type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
}

const Episodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [seasonFilter, setSeasonFilter] = useState('')
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getEpisodes()
        setEpisodes(data.results)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Error al cargar los episodios')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const seasons = [...new Set(episodes.map(e => e.episode.slice(0, 3)))]

  const filtered = episodes.filter(e => {
  const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase())
  const matchesSeason = seasonFilter ? e.episode.startsWith(seasonFilter) : true
  return matchesSearch && matchesSeason
})

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Episodios</h1>
      </div>
        <div className="dashboard-filters">
            <input
                type="text"
                placeholder="Buscar episodio..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <select value={seasonFilter} onChange={e => setSeasonFilter(e.target.value)}>
                <option value="">Todas las temporadas</option>
                {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
                ))}
            </select>
        </div>

      {loading && <p className="dashboard-loading">Cargando episodios...</p>}
      {error && <p className="dashboard-error">{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="dashboard-empty">No se encontraron episodios.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Episodio</th>
              <th>Fecha de emisión</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(episode => (
              <tr key={episode.id}>
                <td>{episode.name}</td>
                <td>{episode.episode}</td>
                <td>{episode.air_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Episodes