import { useState, useEffect } from 'react'
import { getLocations } from '../../services/api'

type Location = {
  id: number
  name: string
  type: string
  dimension: string
}

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getLocations()
        setLocations(data.results)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Error al cargar las localizaciones')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const types = [...new Set(locations.map(l => l.type))]

  const filtered = locations.filter(l => {
  const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase())
  const matchesType = typeFilter ? l.type === typeFilter : true
  return matchesSearch && matchesType
})

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Localizaciones</h1>
      </div>

        <div className="dashboard-filters">
            <input
                type="text"
                placeholder="Buscar localización..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="">Todos los tipos</option>
                {types.map(type => (
                <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>

      {loading && <p className="dashboard-loading">Cargando localizaciones...</p>}
      {error && <p className="dashboard-error">{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="dashboard-empty">No se encontraron localizaciones.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Dimensión</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(location => (
              <tr key={location.id}>
                <td>{location.name}</td>
                <td>{location.type}</td>
                <td>{location.dimension}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Locations