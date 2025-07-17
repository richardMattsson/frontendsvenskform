import { createContext, useContext, useState, useEffect } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = inte inloggad

  // Hämta användarinfo när appen startar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/profile`, {
          credentials: 'include', // 🧠 viktigt för cookies
        });

        if (res.ok) {
          const data = await res.json();
          // console.log(data);
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook för enkel åtkomst
export const useAuth = () => useContext(AuthContext);
