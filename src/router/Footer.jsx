import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white' }}>
      <div>
        <Link to="/">
          {/* <li className="navlink">Hem</li> */}
          <img src="/svenskformost.jpg" alt="Logo" width={160} />
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
    </footer>
  );
}

export default Footer;
