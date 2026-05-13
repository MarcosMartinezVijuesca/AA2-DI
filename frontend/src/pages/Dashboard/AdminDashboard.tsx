import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getUsersList } from '../../services/authService'

type User = {
  id: string
  username: string
  role: string
}

const AdminDashboard = () => {
  const { state } = useAuth()

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await getUsersList(state.token!)
        setUsers(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Error al cargar los usuarios')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [state.token])

  const filteredAndSorted = useMemo(() => {
    return users
      .filter(u => {
        const matchesSearch = u.username.toLowerCase().includes(search.toLowerCase())
        const matchesRole = roleFilter ? u.role === roleFilter : true
        return matchesSearch && matchesRole
      })
      .sort((a, b) => {
        return sortOrder === 'asc'
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username)
      })
  }, [users, search, roleFilter, sortOrder])

  const summary = useMemo(() => ({
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    regularUsers: users.filter(u => u.role === 'user').length
  }), [users])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel de Administración</h1>
        <span>👤 {state.user?.username} ({state.user?.role})</span>
      </div>

      {/* Tarjetas de resumen */}
      <div className="summary-cards">
        <div className="summary-card">
          <span>Total usuarios</span>
          <strong>{summary.total}</strong>
        </div>
        <div className="summary-card alive">
          <span>Administradores</span>
          <strong>{summary.admins}</strong>
        </div>
        <div className="summary-card unknown">
          <span>Usuarios</span>
          <strong>{summary.regularUsers}</strong>
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
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="">Todos los roles</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </select>
      </div>

      {/* Estados */}
      {loading && <p className="dashboard-loading">Cargando usuarios...</p>}
      {error && <p className="dashboard-error">{error}</p>}
      {!loading && !error && filteredAndSorted.length === 0 && (
        <p className="dashboard-empty">No se encontraron usuarios.</p>
      )}

      {/* Tabla */}
      {!loading && !error && filteredAndSorted.length > 0 && (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
                Nombre {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminDashboard