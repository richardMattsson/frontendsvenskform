import React, { useState, useEffect } from 'react';

import './home.css';
import NewsComponent from '../components/NewsComponent';
import NewsLarge from '../components/NewsLarge';
import HeroComponent from '../components/HeroComponent';
const BASE_URL = import.meta.env.VITE_API_BASE;

function Home() {
  console.log('BASE_URL:', BASE_URL);
  const [homePageData, setHomePageData] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [news, setNews] = useState(null);

  // GET home page data
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/homePageData`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch homePage data');
        }

        const data = await response.json();
        setHomePageData(data);
      } catch (error) {
        console.error('Logout failed', error);
      }
    })();
  }, []);
  // GET image hero
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getUpload`);

        if (!response.ok) {
          throw new Error('Failed to fetch hero image');
        }
        const data = await response.json(); // t.ex. { filepath: "/uploads/image.jpg" }

        setHeroImage(data.filepath);
      } catch (error) {
        console.error('Failed to fetch hero image', error);
      }
    })();
  }, []);

  // GET news
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getNews`);

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json(); // t.ex. { filepath: "/uploads/image.jpg" }

        setNews(data);
        console.log('newsArray: ', data);
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
    })();
  }, []);

  return (
    <>
      {heroImage && (
        <HeroComponent
          imageUrl={`${BASE_URL}${heroImage}`}
          title={'Välkommen'}
        />
      )}

      {homePageData &&
        homePageData.map((data) => {
          return (
            <React.Fragment key={data.id}>
              <div className="homePageData-container">
                <h1>{data.title}</h1>
                <h3>{data.subtitle}</h3>
                <p>{data.paragraph}</p>
              </div>
            </React.Fragment>
          );
        })}

      <div className="news-container">
        {news &&
          news.map((n) => {
            return (
              <NewsComponent
                key={n.id}
                imageUrl={n.filepath}
                color={n.textcolor}
                title={n.title}
                date={n.date}
                description={n.description}
                link={`/news/${n.id}`}
              />
            );
          })}
      </div>
      {news &&
        news.map((n) => {
          return (
            <NewsLarge
              key={n.id}
              imageSrc={n.filepath}
              title={n.title}
              date={n.date}
              description={n.description}
              url={n.url}
            />
          );
        })}
    </>
  );
}

export default Home;
