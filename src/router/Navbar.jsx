import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar-header">
      <div className="logo">
        <Link to="/">
          {/* <li className="navlink">Hem</li> */}
          <img src="/logo_black.png" alt="Logo" width={160} />
        </Link>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          {/* <Link to="/">
            <li className="navlink">Hem</li>
          </Link> */}

          <Link to="/projects">
            <li className="navlink">Pågående projekt</li>
          </Link>
          <Link to="/news/:id">
            <li className="navlink">Nyheter</li>
          </Link>
          <Link to="/archives">
            <li className="navlink">Arkiv</li>
          </Link>

          <Link to="/about">
            <li className="navlink">Om oss</li>
          </Link>
          <Link to="/contact">
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
  );
}

export default Navbar;
