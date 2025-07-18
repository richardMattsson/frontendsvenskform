import { useState, useEffect } from 'react';
// import Button from '../Button';

import { CssVarsProvider } from '@mui/joy/styles';

import {
  Textarea,
  Button,
  Input,
  FormLabel,
  FormControl,
  Typography,
  Sheet,
  Select,
  Option,
} from '@mui/joy';

const BASE_URL = import.meta.env.VITE_API_BASE;

function AdminNews() {
  const [selectOption, setSelectOption] = useState('');

  const [news, setNews] = useState(null);
  const [imageNews, setImageNews] = useState(null);
  const [titleNews, setTitleNews] = useState('');
  const [dateNews, setDateNews] = useState('');
  const [descriptionNews, setDescriptionNews] = useState('');
  const [url, setUrl] = useState('');
  const [textColor, setTextColor] = useState('');
  const [idNews, setIdNews] = useState('');
  const [newsToUpdate, setNewsToUpdate] = useState(null);

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
      <Select
        sx={{
          width: 500,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
        placeholder="Välj vad du vill göra."
        onChange={(event, newValue) => setSelectOption(newValue)}
      >
        <Option value="post">Lägga till en nyhet</Option>
        <Option value="update">Uppdatera en nyhet</Option>
        <Option value="delete">Radera en nyhet</Option>
      </Select>

      {selectOption === 'post' && (
        <CssVarsProvider>
          <Sheet
            variant="outlined"
            sx={{
              width: 500,
              mx: 'auto', // margin left & right
              my: 4, // margin top & bottom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'sm',
              boxShadow: 'md',
            }}
          >
            <div>
              <Typography level="h4" component="h1">
                Lägg till en nyhet
              </Typography>
            </div>

            <form onSubmit={submitNews}>
              <FormControl>
                <FormLabel>Rubrik</FormLabel>
                <Input
                  placeholder="Rubrik"
                  value={titleNews}
                  onChange={(e) => setTitleNews(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Datum</FormLabel>
                <Input
                  type="date"
                  placeholder="Datum"
                  value={dateNews}
                  onChange={(e) => setDateNews(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Beskrivning</FormLabel>
                <Textarea
                  minRows={5}
                  placeholder="Beskrivning..."
                  value={descriptionNews}
                  onChange={(e) => setDescriptionNews(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Textfärg</FormLabel>
                <Select
                  placeholder="Välj ett alternativ"
                  onChange={(event, newValue) =>
                    setTextColor({
                      newValue,
                    })
                  }
                >
                  <Option value="black">Svart</Option>
                  <Option value="white">Vit</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Bild</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  value={dateNews}
                  onChange={(e) => setImageNews(e.target.files[0])}
                />
              </FormControl>
              <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
                Skicka
              </Button>
            </form>
          </Sheet>
        </CssVarsProvider>
      )}

      {/* <section className="newsImageOne-container">
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
      </section> */}

      {selectOption === 'update' && (
        <CssVarsProvider>
          <Sheet
            variant="outlined"
            sx={{
              width: 500,
              mx: 'auto', // margin left & right
              my: 4, // margin top & bottom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'sm',
              boxShadow: 'md',
            }}
          >
            <div>
              <Typography level="h4" component="h1">
                Ändra en nyhet
              </Typography>
            </div>

            <form onSubmit={updateNews}>
              <FormControl>
                <FormLabel>Välj vilken nyhet att ändra</FormLabel>
                <Select
                  placeholder="Välj ett alternativ"
                  value={idNews || ''}
                  onChange={(event, newValue) => setIdNews(newValue)}
                >
                  {news &&
                    news.map((n) => (
                      <Option key={n.id} value={String(n.id)}>
                        Rubrik: {n.title} Skapad: {n.date} id: {n.id}
                      </Option>
                    ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Rubrik</FormLabel>
                <Input
                  placeholder="Rubrik"
                  value={newsToUpdate?.title || ''}
                  onChange={(e) => {
                    if (!newsToUpdate) return;
                    setNewsToUpdate({ ...newsToUpdate, title: e.target.value });
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Datum</FormLabel>
                <Input
                  type="date"
                  placeholder="Datum"
                  value={newsToUpdate?.date || ''}
                  onChange={(e) =>
                    setNewsToUpdate({ ...newsToUpdate, date: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Beskrivning</FormLabel>
                <Textarea
                  minRows={5}
                  placeholder="Beskrivning..."
                  value={newsToUpdate?.description || ''}
                  onChange={(e) =>
                    setNewsToUpdate({
                      ...newsToUpdate,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Textfärg</FormLabel>
                <Select
                  placeholder="Välj ett alternativ"
                  onChange={(e) =>
                    setNewsToUpdate({
                      ...newsToUpdate,
                      textcolor: e.target.value,
                    })
                  }
                >
                  <Option value="black">Svart</Option>
                  <Option value="white">Vit</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Länk</FormLabel>
                <Input
                  placeholder="Länk"
                  value={newsToUpdate?.url || ''}
                  onChange={(e) =>
                    setNewsToUpdate({ ...newsToUpdate, url: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Bild</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewsToUpdate({
                      ...newsToUpdate,
                      filename: e.target.files[0],
                    })
                  }
                />
              </FormControl>
              <Button type="submit" sx={{ mt: 3 }}>
                Skicka
              </Button>
            </form>
          </Sheet>
        </CssVarsProvider>
      )}

      {/* <section className="newsImageOne-container">
        <h1>Ändra en nyhet</h1>
        <form onSubmit={updateNews} className="homePageData-form">
          <label>Välj vilken nyhet att ändra</label>
          <select value={idNews} onChange={(e) => setIdNews(e.target.value)}>
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
      </section> */}

      {selectOption === 'delete' && (
        <CssVarsProvider>
          <Sheet
            variant="outlined"
            sx={{
              width: 500,
              mx: 'auto', // margin left & right
              my: 4, // margin top & bottom
              py: 3, // padding top & bottom
              px: 2, // padding left & right
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRadius: 'sm',
              boxShadow: 'md',
            }}
          >
            <div>
              <Typography level="h4" component="h1">
                Radera en nyhet
              </Typography>
            </div>

            <form onSubmit={() => deleteNews(idNews)}>
              <FormControl>
                <FormLabel>Välj vilken nyhet att radera</FormLabel>

                <Select
                  placeholder="Välj"
                  value={idNews}
                  onChange={(event, newValue) => setIdNews(newValue)}
                >
                  {news &&
                    news.map((n) => (
                      <Option key={n.id} value={String(n.id)}>
                        {n.title} {n.date} {n.id}
                      </Option>
                    ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                sx={{ mt: 1 /* margin top */ }}
                color="danger"
              >
                Radera
              </Button>
            </form>
          </Sheet>
        </CssVarsProvider>
      )}

      {/* <section className="newsImageOne-container">
        <h1>Radera en nyhet</h1>
        <form onSubmit={() => deleteNews(idNews)} className="homePageData-form">
          <label>Välj vilken nyhet att ändra</label>

          <select value={idNews} onChange={(e) => setIdNews(e.target.value)}>
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
      </section> */}

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
      </section>  */}
    </>
  );
}

export default AdminNews;
