import './admin.css';
import Button from '../components/Button';
import { useParams, Link } from 'react-router-dom';
import AdminHome from '../components/admin/AdminHome';
import AdminNews from '../components/admin/AdminNews';
import AdminProjects from '../components/admin/AdminProjects';
import AdminArchives from '../components/admin/AdminArchives';
import AdminAbout from '../components/admin/AdminAbout';
import AdminContact from '../components/admin/AdminContact';
import AdminManual from '../components/admin/AdminManual';

const BASE_URL = import.meta.env.VITE_API_BASE;

function Admin() {
  const { page } = useParams();

  return (
    <>
      {page === 'home' && <AdminHome />}

      {page === 'project' && <AdminProjects />}

      {page === 'news' && <AdminNews />}

      {page === 'archive' && <AdminArchives />}

      {page === 'about' && <AdminAbout />}

      {page === 'contact' && <AdminContact />}

      {page === 'manual' && <AdminManual />}

      <section style={{ padding: '2vh 5vw' }}>
        <div className="navigation-bottom-container">
          <Link to="/profile">
            <Button text={'<< Tillbaka till Profil'} />
          </Link>
          <Link to="/admin/manual">
            <Button text={'Manual'} />
          </Link>
        </div>
      </section>
    </>
  );
}
export default Admin;
