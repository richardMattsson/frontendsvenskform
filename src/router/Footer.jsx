import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white' }}>
      <div className="footer-container">
        <div>
          <Link to="/">
            {/* <li className="navlink">Hem</li> */}
            <img src="/logo-yellow-west.png" alt="Logo" width={120} />
          </Link>
        </div>
        <address>
          Kontakta oss:
          <br />
          vast@svenskform.se
          <br />
          Föreningsgatan 2 i Göteborg
        </address>
        <a href="">
          <img
            src="/square-facebook-brands.svg"
            alt="facebook-logo"
            style={{ filter: 'invert(100%)', width: '30px' }}
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
