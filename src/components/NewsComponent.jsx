import Button from './Button';
import './newscomponent.css';
import { Link } from 'react-router-dom';

function NewsComponent({ imageUrl, title, date, description, color, link }) {
  return (
    <div
      className="news-section-container"
      style={{
        backgroundImage: `url(http://localhost:8080/${imageUrl.replace(
          /\\/g,
          '/'
        )})`,
        color: `${color}`,
      }}
    >
      <h1>{title}</h1>
      <span>{date}</span>
      <p>{description}</p>
      {/* <button className="newscomponent-button">
        <a href={href}>Läs mer</a>
      </button> */}

      <Link to={link}>
        <Button text={'Läs mer'} width={100} />
      </Link>
    </div>
  );
}
export default NewsComponent;
