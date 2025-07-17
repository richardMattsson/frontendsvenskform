import { useState, useEffect } from 'react';
import './admin.css';
import Button from '../components/Button';
import { useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE;

function Admin() {
  const { page } = useParams();

  // const [image, setImage] = useState(null);

  const [heroLandingPage, setHeroLandingPage] = useState(null);
  // const [newsHeroImage, setNewsHeroImage] = useState(null);
  const [projectsHeroImage, setProjectsHeroImage] = useState(null);
  const [archivesHeroImage, setArchivesHeroImage] = useState(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [textColor, setTextColor] = useState('black');

  const [imageNews, setImageNews] = useState(null);

  const [titleNews, setTitleNews] = useState('');
  const [dateNews, setDateNews] = useState('');
  const [descriptionNews, setDescriptionNews] = useState('');
  const [url, setUrl] = useState('');
  const [news, setNews] = useState(null);
  const [idNews, setIdNews] = useState('');
  const [newsToUpdate, setNewsToUpdate] = useState(null);
  const [heroLandingPageToUpdate, setHeroLandingPageToUpdate] = useState(null);

  const postHeroLandingPage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('paragraph', paragraph);
    formData.append('buttonText', buttonText);
    formData.append('file', imageNews);
    formData.append('textColor', textColor);

    console.log(formData);

    const response = await fetch(`${BASE_URL}/api/uploadHeroLandingPage`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      //credentials: 'include', // 🧠 om du använder cookies för auth
      body: formData,
    });

    if (response.ok) {
      console.log('Du har lagt till en nyhet');
      alert('Du har lagt till en nyhet');
    } else {
      console.error('Misslyckades att lägga till en nyhet');
      alert(
        'Något gick fel med att lägga upp nyheten. Se till att alla fält är ifyllda.'
      );
    }
  };

  const updateHeroLandingPage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', heroLandingPageToUpdate.id);

    if (title !== heroLandingPageToUpdate.title) {
      formData.append('title', heroLandingPageToUpdate.title);
    }
    if (subtitle !== heroLandingPageToUpdate.date) {
      formData.append('date', heroLandingPageToUpdate.date);
    }
    if (paragraph !== heroLandingPageToUpdate.description) {
      formData.append('description', heroLandingPageToUpdate.description);
    }
    if (textColor !== heroLandingPageToUpdate.textcolor) {
      formData.append('textcolor', heroLandingPageToUpdate.textcolor);
    }
    if (buttonText !== heroLandingPageToUpdate.url) {
      formData.append('url', heroLandingPageToUpdate.url);
    }
    if (imageNews !== heroLandingPageToUpdate.filename) {
      formData.append('file', heroLandingPageToUpdate.filename);
    }

    const response = await fetch(`${BASE_URL}/api/updateHeroLandingPage`, {
      method: 'PATCH',
      body: formData,
    });
    if (response.ok) {
      console.log('Du har uppdaterat HeroLandingPage');
      alert('Du har uppdaterat HeroLandingPage');
    } else {
      console.error('Misslyckades att uppdatera HeroLandingPage');
    }
  };

  // hämtar heroLandingPage från backend
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getHeroLandingPage`);

        if (!response.ok) {
          throw new Error('Failed to fetch hero langing page data');
        }
        const data = await response.json(); // t.ex. { filepath: "/uploads/image.jpg" }

        setHeroLandingPage(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
    })();
  }, []);

  // Matchar info om HeroLandingPage
  useEffect(() => {
    let data;
    if (heroLandingPage) {
      data = heroLandingPage[0];
      setHeroLandingPageToUpdate(data);

      console.log('data från hero landing...', data);
    }

    if (data) {
      setTitle(data.title);
      setSubtitle(data.subtitle);
      setParagraph(data.paragraph);
      setTextColor(data.textcolor);
      setButtonText(data.buttonText);
      setImageNews(data.filename);
    }
  }, [heroLandingPage]);

  const updateHomePageData = async (event) => {
    event.preventDefault();

    const response = await fetch(`${BASE_URL}/api/homePageData`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      //credentials: 'include', // 🧠 om du använder cookies för auth
      body: JSON.stringify({
        title: title,
        subtitle: subtitle,
        paragraph: paragraph,
      }),
    });

    if (response.ok) {
      console.log('Uppdaterad!');
      alert('Uppdaterad!');
    } else {
      console.error('Misslyckades att uppdatera');
    }
  };

  const handleSubmitImageProjectsHero = async (e) => {
    e.preventDefault();
    if (!projectsHeroImage) {
      alert('Välj en bild först!');
      return;
    }

    const formData = new FormData();
    formData.append('file', projectsHeroImage); // image från e.target.files[0]

    try {
      const response = await fetch(`${BASE_URL}/api/uploadImageProjectsHero`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Upload succeeded:', result);
      alert('Du har laddat upp en bild.');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // const handleSubmitImageNewsHero = async (e) => {
  //   e.preventDefault();
  //   if (!newsHeroImage) {
  //     alert('Välj en bild först!');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', newsHeroImage); // image från e.target.files[0]

  //   try {
  //     const response = await fetch('/api/uploadImageNewsHero', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     const result = await response.json();
  //     console.log('Upload succeeded:', result);
  //     alert('Du har laddat upp en bild.');
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //   }
  // };

  const handleSubmitImageArchivesHero = async (e) => {
    e.preventDefault();
    if (!archivesHeroImage) {
      alert('Välj en bild först!');
      return;
    }

    const formData = new FormData();
    formData.append('file', archivesHeroImage); // image från e.target.files[0]

    try {
      const response = await fetch(`${BASE_URL}/api/uploadImageArchivesHero`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Upload succeeded:', result);
      alert('Du har laddat upp en bild.');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // hämtar nyheter från backend
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

  // Lägga till nyhet
  const submitNews = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', titleNews);
    formData.append('date', dateNews);
    formData.append('description', descriptionNews);
    formData.append('textcolor', textColor);
    formData.append('url', url);
    formData.append('file', imageNews);

    console.log(formData);

    const response = await fetch(`${BASE_URL}/api/postNews`, {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      //credentials: 'include', // 🧠 om du använder cookies för auth
      body: formData,
    });

    if (response.ok) {
      console.log('Du har lagt till en nyhet');
      alert('Du har lagt till en nyhet');
    } else {
      console.error('Misslyckades att lägga till en nyhet');
      alert(
        'Något gick fel med att lägga upp nyheten. Se till att alla fält är ifyllda.'
      );
    }
  };

  // Uppdatera en nyhet
  const updateNews = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', newsToUpdate.id);

    if (titleNews !== newsToUpdate.title) {
      formData.append('title', newsToUpdate.title);
    }
    if (dateNews !== newsToUpdate.date) {
      formData.append('date', newsToUpdate.date);
    }
    if (descriptionNews !== newsToUpdate.description) {
      formData.append('description', newsToUpdate.description);
    }
    if (textColor !== newsToUpdate.textcolor) {
      formData.append('textcolor', newsToUpdate.textcolor);
    }
    if (url !== newsToUpdate.url) {
      formData.append('url', newsToUpdate.url);
    }
    if (imageNews !== newsToUpdate.filename) {
      formData.append('file', newsToUpdate.filename);
    }

    const response = await fetch(`${BASE_URL}/api/updateNews`, {
      method: 'PATCH',
      body: formData,
    });
    if (response.ok) {
      console.log('Du har uppdaterat en nyhet');
      alert('Du har uppdaterat en nyhet');
    } else {
      console.error('Misslyckades att uppdatera en nyhet');
    }
  };

  // Matchar info om den nyhet som ska ändras.
  useEffect(() => {
    let found;
    if (news) {
      found = news.find((n) => n.id === Number(idNews));
      console.log(found);
      setNewsToUpdate(found);
    }

    if (found) {
      setTitleNews(found.title);
      setDateNews(found.date);
      setDescriptionNews(found.description);
      setTextColor(found.textcolor);
      setUrl(found.url);
      setImageNews(found.filename);
    }
  }, [idNews]);

  // Raderar en nyhet
  async function deleteNews(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/deleteNews/${Number(id)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Nyheten raderades.');
        alert('Nyheten raderades.');
      } else {
        console.log('Misslyckades att radera nyheten.');
        alert('Misslyckades att radera nyheten.');
      }
    } catch (error) {
      console.log('Fel vid fetch', error);
      alert('Något gick fel.');
    }
  }

  return (
    <>
      <h1>Admin</h1>

      {/* Hemsida */}
      {page === 'home' && (
        <>
          {/* Uppdatera home page data */}
          <section className="newsImageOne-container">
            <h1>Uppdatera home page data</h1>
            <form onSubmit={updateHomePageData} className="homePageData-form">
              <label>Rubrik:</label>
              <input
                className="input-admin"
                placeholder="Rubrik"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Underrubrik:</label>
              <input
                className="input-admin"
                placeholder="Underrubrik"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <label>Beskrivning:</label>

              <textarea
                className="textarea-admin"
                cols={30}
                rows={10}
                placeholder="Beskrivning..."
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
              />
              <Button type={'submit'} text={'Skicka'} />
            </form>
          </section>
          {/* Posta till hero Landing page */}
          <section className="newsImageOne-container">
            <h1>Posta till hero Landing page</h1>
            <form onSubmit={postHeroLandingPage} className="homePageData-form">
              <label>Rubrik:</label>
              <input
                className="input-admin"
                placeholder="Rubrik"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Underrubrik:</label>
              <input
                className="input-admin"
                placeholder="Underrubrik"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <label>Textfärg:</label>
              <select onChange={(e) => setTextColor(e.target.value)}>
                <option value="black">Svart</option>
                <option value="white">Vit</option>
              </select>
              <label>Beskrivning:</label>
              <textarea
                className="textarea-admin"
                cols={30}
                rows={10}
                placeholder="Beskrivning..."
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
              />
              <label>Knapptext:</label>
              <input
                className="input-admin"
                placeholder="Knapptext"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
              <label>Bild:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageNews(e.target.files[0])}
              />
              <Button type={'submit'} text={'Skicka'} />
              {/* <button type="submit">Skicka</button> */}
            </form>
          </section>
          {/* Uppdatera Hero hemsida */}
          <section className="newsImageOne-container">
            <h1>Uppdatera Hero hemsida</h1>

            <form
              onSubmit={updateHeroLandingPage}
              className="homePageData-form"
            >
              <label>Rubrik:</label>
              <input
                className="input-admin"
                placeholder="Rubrik"
                value={heroLandingPageToUpdate?.title || ''}
                onChange={(e) => {
                  if (!heroLandingPageToUpdate) return;
                  setHeroLandingPageToUpdate({
                    ...heroLandingPageToUpdate,
                    title: e.target.value,
                  });
                }}
              />
              <label>Underrubrik:</label>
              <input
                className="input-admin"
                placeholder="Underrubrik"
                value={heroLandingPageToUpdate?.subtitle || ''}
                onChange={(e) => {
                  if (!heroLandingPageToUpdate) return;
                  setHeroLandingPageToUpdate({
                    ...heroLandingPageToUpdate,
                    subtitle: e.target.value,
                  });
                }}
              />

              <label>Paragraf:</label>
              <textarea
                className="textarea-admin"
                cols={30}
                rows={10}
                placeholder="Paragraf..."
                value={heroLandingPageToUpdate?.paragraph || ''}
                onChange={(e) =>
                  setHeroLandingPageToUpdate({
                    ...heroLandingPageToUpdate,
                    paragraph: e.target.value,
                  })
                }
              />
              <label>Textfärg</label>
              <select
                onChange={(e) =>
                  setHeroLandingPageToUpdate({
                    ...heroLandingPageToUpdate,
                    textColor: e.target.value,
                  })
                }
              >
                <option value="black">Svart</option>
                <option value="white">Vit</option>
              </select>

              <label>Knapptext</label>
              <input
                className="input-admin"
                placeholder="Knapptext"
                value={heroLandingPageToUpdate?.buttonText || ''}
                onChange={(e) =>
                  setHeroLandingPageToUpdate({
                    ...heroLandingPageToUpdate,
                    buttonText: e.target.value,
                  })
                }
              />
              <label>Bild:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setHeroLandingPageToUpdate({
                    ...heroLandingPageToUpdate,
                    filename: e.target.files[0],
                  })
                }
              />
              <Button type={'submit'} text={'Skicka'} />
            </form>
          </section>
        </>
      )}

      {/* Pågående projekt */}
      {page === 'project' && (
        <section className="newsImageOne-container">
          <h1>Byt bild Hero Pågående projekt</h1>
          <form
            onSubmit={handleSubmitImageProjectsHero}
            className="newsImageOne-form"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProjectsHeroImage(e.target.files[0])}
            />
            <button type="submit">Spara</button>
          </form>

          {projectsHeroImage && (
            <>
              <p>(Förhandgranska)</p>
              <img
                src={URL.createObjectURL(projectsHeroImage)}
                alt="Preview"
                width="200"
              />
            </>
          )}
        </section>
      )}

      {/*Nyheter */}
      {page === 'news' && (
        <>
          <section className="newsImageOne-container">
            <h1>Lägg till en nyhet</h1>
            <form onSubmit={submitNews} className="homePageData-form">
              <label>Rubrik:</label>
              <input
                className="input-admin"
                placeholder="Rubrik"
                value={titleNews}
                onChange={(e) => setTitleNews(e.target.value)}
              />
              <label>Datum:</label>
              <input
                type="date"
                className="input-admin"
                placeholder="Datum"
                value={dateNews}
                onChange={(e) => setDateNews(e.target.value)}
              />
              <label>Beskrivning:</label>
              <textarea
                className="textarea-admin"
                cols={30}
                rows={10}
                placeholder="Beskrivning..."
                value={descriptionNews}
                onChange={(e) => setDescriptionNews(e.target.value)}
              />
              <label>Textfärg</label>
              <select onChange={(e) => setTextColor(e.target.value)}>
                <option value="black">Svart</option>
                <option value="white">Vit</option>
              </select>
              <label>Länk</label>
              <input
                className="input-admin"
                placeholder="Länk"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <label>Bild:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageNews(e.target.files[0])}
              />
              <Button type={'submit'} text={'Skicka'} />
            </form>
          </section>
          <section className="newsImageOne-container">
            <h1>Ändra en nyhet</h1>

            <form onSubmit={updateNews} className="homePageData-form">
              <label>Välj vilken nyhet att ändra</label>
              <select
                value={idNews}
                onChange={(e) => setIdNews(e.target.value)}
              >
                <option value="">Välj</option>
                {news &&
                  news.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.title} {n.date} {n.id}
                    </option>
                  ))}
              </select>
              <label>Rubrik:</label>
              <input
                className="input-admin"
                placeholder="Rubrik"
                value={newsToUpdate?.title || ''}
                onChange={(e) => {
                  if (!newsToUpdate) return;
                  setNewsToUpdate({ ...newsToUpdate, title: e.target.value });
                }}
              />
              <label>Datum:</label>
              <input
                type="date"
                className="input-admin"
                placeholder="Datum"
                value={newsToUpdate?.date || ''}
                onChange={(e) =>
                  setNewsToUpdate({ ...newsToUpdate, date: e.target.value })
                }
              />
              <label>Beskrivning:</label>
              <textarea
                className="textarea-admin"
                cols={30}
                rows={10}
                placeholder="Beskrivning..."
                value={newsToUpdate?.description || ''}
                onChange={(e) =>
                  setNewsToUpdate({
                    ...newsToUpdate,
                    description: e.target.value,
                  })
                }
              />
              <label>Textfärg</label>
              <select
                onChange={(e) =>
                  setNewsToUpdate({
                    ...newsToUpdate,
                    textcolor: e.target.value,
                  })
                }
              >
                <option value="black">Svart</option>
                <option value="white">Vit</option>
              </select>
              <label>Länk</label>
              <input
                className="input-admin"
                placeholder="Länk"
                value={newsToUpdate?.url || ''}
                onChange={(e) =>
                  setNewsToUpdate({ ...newsToUpdate, url: e.target.value })
                }
              />
              <label>Bild:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewsToUpdate({
                    ...newsToUpdate,
                    filename: e.target.files[0],
                  })
                }
              />
              <Button type={'submit'} text={'Skicka'} />
            </form>
          </section>
          <section className="newsImageOne-container">
            <h1>Radera en nyhet</h1>

            <form
              onSubmit={() => deleteNews(idNews)}
              className="homePageData-form"
            >
              <label>Välj vilken nyhet att ändra</label>

              <select
                value={idNews}
                onChange={(e) => setIdNews(e.target.value)}
              >
                <option value="">Välj</option>
                {news &&
                  news.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.title} {n.date} {n.id}
                    </option>
                  ))}
              </select>

              <Button type={'submit'} text={'Skicka'} />
            </form>
          </section>
        </>
      )}
      {/* Arkiv */}
      {page === 'archive' && (
        <>
          <section className="newsImageOne-container">
            <h1>Byt bild Hero Arkiv</h1>
            <form
              onSubmit={handleSubmitImageArchivesHero}
              className="newsImageOne-form"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setArchivesHeroImage(e.target.files[0])}
              />
              <button type="submit">Spara</button>
            </form>

            {archivesHeroImage && (
              <>
                <p>(Förhandgranska)</p>
                <img
                  src={URL.createObjectURL(archivesHeroImage)}
                  alt="Preview"
                  width="200"
                />
              </>
            )}
          </section>
        </>
      )}
      {/* Om oss */}
      {page === 'about' && (
        <>
          <h1>Om oss</h1>
        </>
      )}
      {/* Kontakt */}
      {page === 'contact' && (
        <>
          <h1>Kontakt</h1>
        </>
      )}

      {/* Byt bild Hero Nyheter */}
      {/* <section className="newsImageOne-container">
        <h1>Byt bild Hero Nyheter</h1>
        <form
          onSubmit={handleSubmitImageNewsHero}
          className="newsImageOne-form"
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewsHeroImage(e.target.files[0])}
          />
          <button type="submit">Spara</button>
        </form>

        {newsHeroImage && (
          <>
            <p>(Förhandgranska)</p>
            <img
              src={URL.createObjectURL(newsHeroImage)}
              alt="Preview"
              width="200"
            />
          </>
        )}
      </section> */}
    </>
  );
}
export default Admin;
