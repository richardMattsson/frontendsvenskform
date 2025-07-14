import Button from './Button';
import './newscomponent.css';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE;

function NewsComponent({ imageUrl, title, date, description, color, link }) {
  return (
    <div
      className="news-section-container"
      style={{
        backgroundImage: `url(${BASE_URL}/${imageUrl.replace(/\\/g, '/')})`,
        color: `${color}`,
      }}
    >
      <h1>{title}</h1>
      <span>{date}</span>
      <p>{description}</p>

      <Link to={link}>
        <Button text={'Läs mer'} width={100} />
      </Link>
    </div>
  );
}
export default NewsComponent;
