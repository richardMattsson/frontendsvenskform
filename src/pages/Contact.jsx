import { useEffect } from 'react';
import './contact.css';

import HeroComponent from '../components/HeroComponent';

function Contact() {
  useEffect(() => {
    document.title = 'Kontakt | Svensk Form Väst';
  }, []);
  return (
    <>
      {/* <HeroComponent
        imageUrl={'firmbee-com-SpVHcbuKi6E-unsplash.jpg'}
        title={'Kontakt'}
      /> */}
      <div
        className="contact-info-container"
        style={{ textTransform: 'uppercase' }}
      >
        <h1>Kontaktuppgifter</h1>
        <h2>Telefon</h2>
        <p className="info-p-element">0703-456500</p>
        <p className="info-p-element">0708-487822</p>
        <h2>E-post</h2>
        <a
          href="mailto:alice@example.com"
          className="info-p-element"
          style={{
            textTransform: 'lowercase',
            color: 'black',
          }}
        >
          alice@example.com
        </a>
        <h2>Adress</h2>
        <p className="info-p-element" style={{ textTransform: 'lowercase' }}>
          Föreningsgatan 2, 414 42, Göteborg
        </p>
      </div>
    </>
  );
}
export default Contact;
