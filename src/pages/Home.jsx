import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './home.css';
import NewsComponent from '../components/NewsComponent';
import NewsLarge from '../components/NewsLarge';
import HeroComponent from '../components/HeroComponent';
import Button from '../components/Button';

const BASE_URL = import.meta.env.VITE_API_BASE;

function Home() {
  // console.log('BASE_URL:', BASE_URL);
  // const [homePageData, setHomePageData] = useState([]);
  // const [heroImage, setHeroImage] = useState(null);
  const [news, setNews] = useState(null);
  const [heroData, setHeroData] = useState(null);

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

        // const data = await response.json();
        // console.log(data);
        // setHomePageData(data);
      } catch (error) {
        console.error('Logout failed', error);
      }
    })();
  }, []);
  // GET image hero
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/api/getUpload`);

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch hero image');
  //       }
  //       const data = await response.json();
  //       console.log('images: ', data.filepath);
  //       setHeroImage(data.filepath);
  //     } catch (error) {
  //       console.error('Failed to fetch hero image', error);
  //     }
  //   })();
  // }, []);

  // GET hero data
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getHeroLandingPage`);

        if (!response.ok) {
          throw new Error('Failed to fetch hero data');
        }
        const data = await response.json(); // t.ex. { filepath: "/uploads/image.jpg" }

        setHeroData(data);
        console.log('herodata: ', data);
        console.log('hero data imagelink', data[0].filepath);
      } catch (error) {
        console.error('Failed to fetch hero data', error);
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
        // console.log('newsArray: ', data);
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
    })();
  }, []);

  // const normalizedPath = image.filepath.replace(/\\/g, '/');

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= scrollRef.current.offsetWidth;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += scrollRef.current.offsetWidth;
  };

  return (
    <>
      {heroData && (
        <HeroComponent
          imageUrl={`${BASE_URL}/${heroData[0].filepath.replace(/\\/g, '/')}`}
          title={heroData[0].title}
          subtitle={heroData[0].subtitle}
          description={heroData[0].paragraph}
          buttonText={heroData[0].buttonText}
          textColor={heroData[0].textColor}
        />
      )}

      {heroData && (
        <section className="homePageData-section">
          <div className="homePageData-container">
            <h4>{heroData[0].paragraph}</h4>
          </div>
        </section>
      )}

      <section style={{ padding: '3vh 6vw' }}>
        <h1>NYHETER</h1>
      </section>

      <section className="news-section">
        <button onClick={scrollLeft} className="scroll-button left">
          ◀
        </button>

        <div className="news-container" ref={scrollRef}>
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

        <button onClick={scrollRight} className="scroll-button right">
          ▶
        </button>
      </section>

      <section className="about-section">
        <img
          className="about-img"
          src="/Illustration_4_RGB.jpg"
          alt="om oss bild"
        />
        <div className="about-container">
          <h1>Om oss</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
            possimus. Veniam tenetur incidunt placeat quasi voluptatem quaerat
            quae natus? Delectus ipsa fuga aperiam sed officiis maiores nobis,
            explicabo dolorem excepturi?
          </p>
          <Link to="/about">
            <Button text={'Läs mer  >>'} type={'button'} />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
