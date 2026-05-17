import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Unauthorized from './pages/Unauthorized/Unauthorized'
import PrivateRoute from './guards/PrivateRoute'
import Dashboard from './pages/Dashboard/Dashboard'
import Episodes from './pages/Episodes/Episodes'
import Locations from './pages/Locations/Locations'
import Navbar from './components/Navbar/Navbar'
import { useAuth } from './context/AuthContext'

const App = () => {
  const { state } = useAuth()

  return (
    <div className="app-layout">
      {state.isAuthenticated && <Navbar />}
      <div className="app-content">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/episodes" element={<PrivateRoute><Episodes /></PrivateRoute>} />
        <Route path="/locations" element={<PrivateRoute><Locations /></PrivateRoute>} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </div>
    </div>
  )
}

export default App