import { useAuth } from '../../context/AuthContext'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

const Dashboard = () => {
  const { state } = useAuth()

  return state.user?.role === 'admin'
    ? <AdminDashboard />
    : <UserDashboard />
}

export default Dashboard