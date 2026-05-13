import { useState, useEffect, useMemo } from 'react'
import { getCharacters } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

type Character = {
  id: number
  name: string
  status: string
  species: string
  gender: string
  origin: { name: string }
}

const UserDashboard = () => {
  const { state, logout } = useAuth()

  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortField, setSortField] = useState<keyof Character>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getCharacters()
        setCharacters(data.results)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Error al cargar los datos')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredAndSorted = useMemo(() => {
    return characters
      .filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter ? c.status === statusFilter : true
        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        const aVal = String(a[sortField])
        const bVal = String(b[sortField])
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      })
  }, [characters, search, statusFilter, sortField, sortOrder])

  const summary = useMemo(() => ({
    total: characters.length,
    alive: characters.filter(c => c.status === 'Alive').length,
    dead: characters.filter(c => c.status === 'Dead').length,
    unknown: characters.filter(c => c.status === 'unknown').length
  }), [characters])

  const handleSort = (field: keyof Character) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-user">
          <span>👤 {state.user?.username} ({state.user?.role})</span>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="summary-cards">
        <div className="summary-card">
          <span>Total</span>
          <strong>{summary.total}</strong>
        </div>
        <div className="summary-card alive">
          <span>Vivos</span>
          <strong>{summary.alive}</strong>
        </div>
        <div className="summary-card dead">
          <span>Muertos</span>
          <strong>{summary.dead}</strong>
        </div>
        <div className="summary-card unknown">
          <span>Desconocido</span>
          <strong>{summary.unknown}</strong>
        </div>
      </div>

      {/* Filtros */}
      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      {/* Estados de carga y error */}
      {loading && <p className="dashboard-loading">Cargando personajes...</p>}
      {error && <p className="dashboard-error">{error}</p>}
      {!loading && !error && filteredAndSorted.length === 0 && (
        <p className="dashboard-empty">No se encontraron personajes.</p>
      )}

      {/* Tabla */}
      {!loading && !error && filteredAndSorted.length > 0 && (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Nombre {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => handleSort('status')}>
                Estado {sortField === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => handleSort('species')}>
                Especie {sortField === 'species' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th onClick={() => handleSort('gender')}>
                Género {sortField === 'gender' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th>Origen</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map(character => (
              <tr key={character.id}>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>{character.species}</td>
                <td>{character.gender}</td>
                <td>{character.origin.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserDashboard