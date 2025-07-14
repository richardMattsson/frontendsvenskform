import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
const BASE_URL = import.meta.env.VITE_API_BASE;

export default function Logout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include', // 🧠 viktigt för att skicka cookies
      });

      // Om du har global state (AuthContext, etc), töm det här också

      navigate('/profile'); // 👈 skicka användaren till login-sidan

      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={logout}>Logout</button>;
}
