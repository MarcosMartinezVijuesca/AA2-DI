import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Unauthorized from './pages/Unauthorized/Unauthorized'
import PrivateRoute from './guards/PrivateRoute'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Rutas privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/characters"
        element={
          <PrivateRoute>
            <div>Characters (próximamente)</div>
          </PrivateRoute>
        }
      />

      <Route
        path="/episodes"
        element={
          <PrivateRoute>
            <div>Episodes (próximamente)</div>
          </PrivateRoute>
        }
      />

      <Route
        path="/locations"
        element={
          <PrivateRoute>
            <div>Locations (próximamente)</div>
          </PrivateRoute>
        }
      />

      {/* Redirige la raíz al login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Ruta no encontrada */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App