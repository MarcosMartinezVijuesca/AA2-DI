import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { state, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">Rick & Morty</Link>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/episodes">Episodios</Link>
        <Link to="/locations">Localizaciones</Link>
      </div>

      <div className="navbar-user">
        <span>👤 {state.user?.username} ({state.user?.role})</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  )
}

export default Navbar