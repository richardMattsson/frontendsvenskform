import Button from './Button';
import './newscomponent.css';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE;

function NewsComponent({ imageUrl, title, date, description, color, link }) {
  return (
    <>
      <Link to={link} className="newscomponent-link">
        <div className="news-section-container">
          <div
            className="newscomponent-img-container"
            // style={{
            //   backgroundImage: `url(${BASE_URL}/${imageUrl.replace(/\\/g, '/')})`,
            //   color: `${color}`,
            // }}
          >
            <img
              className="newscomponent-img"
              src={
                imageUrl?.startsWith('blob:')
                  ? imageUrl
                  : `${BASE_URL}/${imageUrl.replace(/\\/g, '/')}`
              }
              alt={`Bild för nyhet med titeln: ${title} `}
            />
          </div>
          <div>
            <h1 style={{ textTransform: 'uppercase' }}>{title}</h1>
            <span style={{ fontSize: '20px' }}>{date}</span>
            <p
              style={{
                whiteSpace: 'pre-line',
                fontWeight: '600',
                fontSize: '20px',
              }}
            >
              {description.slice(0, 125)}
              {description.length > 125 && '...'}
            </p>

            {/* <Button text={'Läs mer'} width={100} /> */}
          </div>
        </div>
      </Link>
    </>
  );
}
export default NewsComponent;
