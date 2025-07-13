import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = inte inloggad

  // Hämta användarinfo när appen startar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/profile', {
          credentials: 'include', // 🧠 viktigt för cookies
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('appen startar?');
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
