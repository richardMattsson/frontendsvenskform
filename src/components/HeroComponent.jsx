import './hero.css';

function HeroComponent({ imageUrl, title }) {
  return (
    <>
      <div
        className="homepage-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
        // src={`http://localhost:8080${imagePath}`}
        alt="Startsida-bild"
      >
        <div className="hero-container">
          <h1 style={{ textAlign: 'center' }}>{title}</h1>
          <p
            style={{
              marginLeft: '130px',
              marginRight: '130px',
              textAlign: 'center',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            explicabo praesentium id dolorum quas quae dolorem molestiae sint.
            Minus dolorum, temporibus ducimus consequatur tenetur blanditiis.
            Officia labore min butus corporis consequatur!
          </p>
          <button
            className="hero-button"
            style={{
              width: '150px',
              padding: '10px',
              backgroundColor: 'rgb(253, 224, 4)',
              // borderRadius: '10px',
              border: 'none',
              color: 'black',
              textTransform: 'uppercase',
              fontWeight: '500',
              fontSize: 'large',
            }}
          >
            Klicka här
          </button>
        </div>
      </div>
    </>
  );
}
export default HeroComponent;
