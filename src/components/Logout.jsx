import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Logout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // 🧠 viktigt för att skicka cookies
      });

      // Om du har global state (AuthContext, etc), töm det här också

      navigate('/profile'); // 👈 skicka användaren till login-sidan
      // setLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={logout}>Logout</button>;
}
