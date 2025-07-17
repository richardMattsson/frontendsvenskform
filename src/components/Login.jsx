import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

import { useState } from 'react';
import { useAuth } from '../AuthContext';
const BASE_URL = import.meta.env.VITE_API_BASE;

import { useNavigate } from 'react-router-dom';

export default function Login({ setShowLogin }) {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/api/login`, {
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
      navigate('/admin/home');
      console.log('Du är inloggad');
      setUser(user);
    }
  }

  return (
    <>
      <CssVarsProvider>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              Välkommen!
            </Typography>
            <Typography level="body-sm">Logga in för att fortsätta.</Typography>
          </div>

          <form onSubmit={handleLogin}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                // html input attribute
                name="email"
                type="email"
                placeholder="johndoe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
              Logga in
            </Button>
          </form>

          {/* <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don't have an account?
          </Typography> */}
        </Sheet>
      </CssVarsProvider>

      {/* <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Logga in</button>
      </form>
      <button onClick={() => setShowLogin(false)}>Skapa konto</button> */}
    </>
  );
}
