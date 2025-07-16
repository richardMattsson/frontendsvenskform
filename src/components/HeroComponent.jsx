import './hero.css';

function HeroComponent({
  imageUrl,
  title,
  // description,
  // buttonText,
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
          {/* <p
            style={{
              marginLeft: '130px',
              marginRight: '130px',
              textAlign: 'center',
            }}
          >
            {description}
          </p> */}
          {/* <button
            className="hero-button"
            style={{
              width: 'auto',
              padding: '10px 20px',
              backgroundColor: 'rgb(253, 224, 4)',
              // borderRadius: '10px',
              border: 'none',
              color: 'black',
              textTransform: 'uppercase',
              fontWeight: '500',
              fontSize: 'large',
            }}
          >
            {buttonText}
          </button> */}
        </div>
      </div>
    </>
  );
}
export default HeroComponent;
