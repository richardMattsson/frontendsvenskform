import { useState } from 'react';
import { useAuth } from '../AuthContext';

// import { useNavigate } from 'react-router-dom';

export default function Login({ setShowLogin }) {
  const { setUser } = useAuth();

  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // const text = await res.text(); // 👈 istället för .json()

    // console.log('Server response:', text);

    if (res.ok) {
      const user = await res.json(); // t.ex. { id, email }
      alert('Du har loggat in');
      console.log('Du är inloggad');
      setUser(user);
    }
  }

  return (
    <>
      <h2>Logga in</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Logga in</button>
      </form>
      <button onClick={() => setShowLogin(false)}>Skapa konto</button>
    </>
  );
}
