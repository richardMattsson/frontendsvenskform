import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './NavBar.css';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import ProtectedRoute from './ProtectedRoute';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Projects from '../pages/Projects';
import News from '../pages/News';
import Archives from '../pages/Archives';
import Navbar from './Navbar';
import NavbarAdmin from './NavbarAdmin';
import Footer from './Footer';

function Root() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname.includes('/admin') ? <NavbarAdmin /> : <Navbar />}

      <main className="App-main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

function Router() {
  const { user } = useAuth();
  const router = createBrowserRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Profile />, path: '/profile' },
        { element: <About />, path: '/about' },
        { element: <Contact />, path: '/contact' },
        { element: <Projects />, path: '/projects' },
        { element: <News />, path: '/news/:id' },
        { element: <Archives />, path: '/archives' },
        {
          element: (
            <ProtectedRoute isAuthenticated={user}>
              <Admin />
            </ProtectedRoute>
          ),
          path: '/admin/:page',
        },
      ],
      element: (
        <>
          <Root />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
