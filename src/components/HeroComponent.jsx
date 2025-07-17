import Button from './Button';
import './hero.css';

function HeroComponent({
  imageUrl,
  title,
  description,
  buttonText,
  textColor,
}) {
  return (
    <>
      <div
        className="homepage-image"
        style={{ backgroundImage: `url(${imageUrl})`, color: textColor }}
        alt="Startsida-bild"
      >
        <div className="hero-container" style={{ color: { textColor } }}>
          <h1 style={{ textAlign: 'center', fontSize: '56px' }}>{title}</h1>
          <p
            style={{
              marginLeft: '130px',
              marginRight: '130px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 'large',
            }}
          >
            {description}
          </p>
          <Button text={buttonText} width={150} />
        </div>
      </div>
    </>
  );
}
export default HeroComponent;
