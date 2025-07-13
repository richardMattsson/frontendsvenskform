import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    alert('Du måste logga in för att använda admin');
  }

  return user ? children : <Navigate to="/profile" />;
}
export default ProtectedRoute;
