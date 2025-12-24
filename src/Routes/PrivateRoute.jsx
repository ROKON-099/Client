import { Navigate, useLocation } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Provider/Authprovider'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    // Meets Requirement: Loading Spinner
    return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    )
  }

  if (!user) {
    // Redirects to login, saving the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute