import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
// import Link from '@mui/joy/Link';
import { Link } from 'react-router-dom';

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
  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          {/* <Typography level="h4" component="h1">
            Logga ut
          </Typography> */}
          <Button
            color="danger"
            onClick={logout}
            sx={{ mt: 1, /* margin top */ mb: 2 }}
          >
            Logga ut
          </Button>

          {/* <Typography
            endDecorator={
              <Link to="/admin/home">Gå tillbaka till Admin-sidan</Link>
            }
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Gå tillbaka till Admin-sidan
          </Typography> */}
          {/* <Typography level="body-sm">
            <button onClick={logout}>Logout</button>
          </Typography> */}
        </div>
        <div>
          <Link to="/admin/home">
            <Button color="success" sx={{ mt: 1, /* margin top */ mb: 2 }}>
              Gå till admin-sidan
            </Button>
          </Link>
        </div>
      </Sheet>
    </CssVarsProvider>
  );
}
