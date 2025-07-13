import { useState } from 'react';

function CreateAccount({ setShowLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCompare, setPasswordCompare] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert('Du har skapat ett nytt konto');
    } else {
      alert('Fel inloggningsuppgifter');
    }
  }

  return (
    <>
      <h2>Skapa konto</h2>

      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={passwordCompare}
          onChange={(e) => setPasswordCompare(e.target.value)}
        />
        <button type="submit">Skapa konto</button>
      </form>
      <button onClick={() => setShowLogin(true)}>Logga in</button>
    </>
  );
}
export default CreateAccount;
