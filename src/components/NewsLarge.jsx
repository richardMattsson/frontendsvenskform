import Button from './Button';
import './newscomponent.css';

function NewsLarge({ imageSrc, title, date, description, url }) {
  const formatUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <>
      <div className="news-section-large">
        <div className="news-image-container">
          <img
            src={`http://localhost:8080/${imageSrc.replace(/\\/g, '/')}`}
            alt=""
            style={{ maxWidth: '100%' }}
          />
        </div>
        <div className="news-text-container">
          <h1>{title}</h1>
          <span>{date}</span>
          <p>{description}</p>
          <a href={formatUrl(url)}>
            <Button text={'Läs mer'} width={150} />
          </a>
        </div>
      </div>
    </>
  );
}
export default NewsLarge;
