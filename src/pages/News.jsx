import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeroComponent from '../components/HeroComponent';
import NewsLarge from '../components/NewsLarge';
import NewsComponent from '../components/NewsComponent';

function News() {
  // const [imagePath, setImagePath] = useState(null);
  const [news, setNews] = useState(null);
  const { id } = useParams();
  const [selectedNews, setSelectedNews] = useState(null);

  console.log(id);

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
        const response = await fetch('/api/getNews');

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
      <h1>Nyheter</h1>

      {/* {imagePath && (
        <HeroComponent
          imageUrl={`http://localhost:8080${imagePath}`}
          title={'Välkommen'}
        />
      )} */}

      {selectedNews ? (
        <NewsLarge
          imageSrc={selectedNews.filepath}
          title={selectedNews.title}
          date={selectedNews.date}
          description={selectedNews.description}
          url={selectedNews.url}
        />
      ) : (
        news &&
        news.map((n) => (
          <NewsComponent
            key={n.id}
            imageUrl={n.filepath}
            color={n.textcolor}
            title={n.title}
            date={n.date}
            description={n.description}
            link={`/news/${n.id}`}
          />
        ))
      )}

      {/* {news &&
        news.map((n) => (
          <NewsLarge
            key={n.id}
            imageSrc={n.filepath}
            title={n.title}
            date={n.date}
            description={n.description}
          />
        ))} */}
    </>
  );
}
export default News;
