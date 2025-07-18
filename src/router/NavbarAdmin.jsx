import { Link } from 'react-router-dom';
import { useState } from 'react';

function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="navbar-section">
      <header className="navbar-header">
        <div className="logo">
          <Link to="/">
            {/* <li className="navlink">Hem</li> */}
            <img src="/logo-white.png" alt="Logo" width={160} />
          </Link>

          <button
            className="hamburger"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <img
              src="/hamburger-menu-svgrepo-com.svg"
              alt=""
              style={{ maxWidth: '100%' }}
            />
          </button>
        </div>
        <nav className="navbar">
          <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
            <Link to="/admin/home">
              <li className="navlink">Hem</li>
            </Link>
            <Link to="/admin/project">
              <li className="navlink">Pågående projekt</li>
            </Link>
            <Link to="/admin/news">
              <li className="navlink">Nyheter</li>
            </Link>
            <Link to="/admin/archive">
              <li className="navlink">Arkiv</li>
            </Link>

            <Link to="/admin/about">
              <li className="navlink">Om oss</li>
            </Link>
            <Link to="/admin/contact">
              <li className="navlink">Kontakt</li>
            </Link>

            {/* <Link to="/profile">
            <li className="navlink">Profil</li>
          </Link>
          <Link to="/admin">
            <li className="navlink">Admin</li>
          </Link> */}
          </ul>
        </nav>
      </header>
    </section>
  );
}

export default NavbarAdmin;
