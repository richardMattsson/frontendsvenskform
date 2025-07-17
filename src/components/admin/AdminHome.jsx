import { useState, useEffect } from 'react';
// import Button from '../Button';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { Textarea } from '@mui/joy';
import Button from '@mui/joy/Button';
import { Select, Option } from '@mui/joy';

const BASE_URL = import.meta.env.VITE_API_BASE;

function AdminHome() {
  const [selectOption, setSelectOption] = useState('postHero');
  const [heroLandingPage, setHeroLandingPage] = useState(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [textColor, setTextColor] = useState('black');

  const [imageNews, setImageNews] = useState(null);

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

  useEffect(() => {}, [selectOption]);
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
        <Option value="postHero">Lägga till en ny Hero</Option>
        <Option value="updateHero">Uppdatera hero</Option>
        <Option value="homePageData">Uppdatera info text</Option>
      </Select>

      {selectOption === 'homePageData' && (
        <CssVarsProvider>
          <Sheet
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
          >
            <div>
              <Typography level="h4" component="h1">
                Uppdatera home page data
              </Typography>
            </div>
            <form onSubmit={updateHomePageData}>
              <FormControl>
                <FormLabel>Rubrik</FormLabel>
                <Input
                  // html input attribute
                  name="title"
                  type="text"
                  placeholder="Rubrik"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Underrubrik</FormLabel>
                <Input
                  // html input attribute
                  name="subtitle"
                  type="text"
                  placeholder="Underrubrik"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Beskrivning</FormLabel>
                <Textarea
                  // html input attribute
                  name="paragraph"
                  minRows={3}
                  maxRows={6}
                  placeholder="Beskrivning"
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                />
              </FormControl>

              <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
                Skicka
              </Button>
            </form>
          </Sheet>
        </CssVarsProvider>
      )}

      {selectOption === 'postHero' && (
        <CssVarsProvider>
          <Sheet
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
          >
            <div>
              <Typography level="h4" component="h1">
                Skapa Hero hemsida (startsidan)
              </Typography>
            </div>

            <form onSubmit={postHeroLandingPage}>
              <FormControl>
                <FormLabel>Rubrik</FormLabel>
                <Input
                  name="title"
                  type="text"
                  placeholder="Rubrik"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Underrubrik</FormLabel>
                <Input
                  name="subtitle"
                  type="text"
                  placeholder="Underrubrik"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Beskrivning</FormLabel>
                <Textarea
                  // html input attribute
                  name="paragraph"
                  minRows={3}
                  maxRows={6}
                  placeholder="Beskrivning"
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Textfärg</FormLabel>
                <Select
                  placeholder="Välj ett alternativ"
                  onChange={(e) => setTextColor(e.target.value)}
                >
                  <Option value="black">Svart</Option>
                  <Option value="white">Vit</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Knapp-text (vad ska stå i knappen)</FormLabel>
                <Input
                  name="buttonText"
                  type="text"
                  accept="image/*"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Bild</FormLabel>
                <Input
                  name="buttonText"
                  type="file"
                  placeholder="Knapp-text"
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

      {selectOption === 'updateHero' && (
        <CssVarsProvider>
          <Sheet
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
          >
            <div>
              <Typography level="h4" component="h1">
                Uppdatera Hero för hemsidan
              </Typography>
            </div>

            <form onSubmit={updateHeroLandingPage}>
              <FormControl>
                <FormLabel>Rubrik</FormLabel>
                <Input
                  name="title"
                  type="text"
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
              </FormControl>
              <FormControl>
                <FormLabel>Underrubrik</FormLabel>
                <Input
                  name="subtitle"
                  type="text"
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
              </FormControl>

              <FormControl>
                <FormLabel>Beskrivning</FormLabel>
                <Textarea
                  // html input attribute
                  name="paragraph"
                  minRows={3}
                  maxRows={6}
                  placeholder="Beskrivning"
                  value={heroLandingPageToUpdate?.paragraph || ''}
                  onChange={(e) =>
                    setHeroLandingPageToUpdate({
                      ...heroLandingPageToUpdate,
                      paragraph: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Textfärg</FormLabel>
                <Select
                  placeholder="Välj ett alternativ"
                  onChange={(e) =>
                    setHeroLandingPageToUpdate({
                      ...heroLandingPageToUpdate,
                      textColor: e.target.value,
                    })
                  }
                >
                  <Option value="black">Svart</Option>
                  <Option value="white">Vit</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Knapp-text (vad ska stå i knappen)</FormLabel>
                <Input
                  name="buttonText"
                  type="text"
                  accept="image/*"
                  value={heroLandingPageToUpdate?.buttonText || ''}
                  onChange={(e) =>
                    setHeroLandingPageToUpdate({
                      ...heroLandingPageToUpdate,
                      buttonText: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Bild</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setHeroLandingPageToUpdate({
                      ...heroLandingPageToUpdate,
                      filename: e.target.files[0],
                    })
                  }
                />
              </FormControl>

              <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
                Skicka
              </Button>
            </form>
          </Sheet>
        </CssVarsProvider>
      )}
      {/* Uppdatera home page data */}
      {/* <section className="container-homepage">
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
      </section> */}
      {/* Posta till hero Landing page */}
      {/* <section className="newsImageOne-container">
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
      
        </form>
      </section> */}

      {/* Uppdatera Hero hemsida */}
      {/* <section className="newsImageOne-container">
        <h1>Uppdatera Hero hemsida</h1>

        <form onSubmit={updateHeroLandingPage} className="homePageData-form">
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
      </section> */}
    </>
  );
}

export default AdminHome;
