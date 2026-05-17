import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Acceso denegado</h2>
        <p>No tienes permisos para ver esta página.</p>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  )
}

export default Unauthorized