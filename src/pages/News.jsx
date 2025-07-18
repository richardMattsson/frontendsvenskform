import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeroComponent from '../components/HeroComponent';
import NewsLarge from '../components/NewsLarge';
import NewsComponent from '../components/NewsComponent';

import './news.css';
const BASE_URL = import.meta.env.VITE_API_BASE;

function News() {
  // const [imagePath, setImagePath] = useState(null);
  const [news, setNews] = useState(null);
  const { id } = useParams();
  const [selectedNews, setSelectedNews] = useState(null);

  // hämtar hero bild
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch('/api/getImageNewsHero');

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch hero image');
  //       }
  //       const data = await response.json(); // t.ex. { filepath: "/uploads/image.jpg" }

  //       setImagePath(data.filepath);
  //     } catch (error) {
  //       console.error('Failed to fetch hero image', error);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getNews`);

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json(); // t.ex. { filepath: "/uploads/image.jpg" }

        setNews(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (news) {
      const match = news.find((n) => n.id === Number(id));
      console.log(match);
      setSelectedNews(match);
    }
  }, [news, id]);

  return (
    <>
      {/* {imagePath && (
        <HeroComponent
          imageUrl={`http://localhost:8080${imagePath}`}
          title={'Välkommen'}
        />
      )} */}

      {selectedNews ? (
        <section className="newsLarge-section">
          <NewsLarge
            imageSrc={selectedNews.filepath}
            title={selectedNews.title}
            date={selectedNews.date}
            description={selectedNews.description}
            url={selectedNews.url}
          />
        </section>
      ) : (
        news &&
        news.map((n) => (
          <section key={n.id} className="newscomponent-section">
            <NewsComponent
              imageUrl={n.filepath}
              color={n.textcolor}
              title={n.title}
              date={n.date}
              description={n.description}
              link={`/news/${n.id}`}
            />
          </section>
        ))
      )}
    </>
  );
}
export default News;
