import { useState } from 'react';

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
  CircularProgress,
} from '@mui/joy';
import HeroComponent from '../HeroComponent';

const BASE_URL = import.meta.env.VITE_API_BASE;

function AdminArchives() {
  const [archivesHeroImage, setArchivesHeroImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitImageArchivesHero = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
      console.log('Upload succeeded:', result);
      alert('Du har laddat upp en bild.');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <>
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
              Byt bild Hero Arkiv
            </Typography>
          </div>

          <form onSubmit={handleSubmitImageArchivesHero}>
            <FormControl>
              <FormLabel>Välj en bild</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setArchivesHeroImage(e.target.files[0])}
              />
            </FormControl>
            <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
              Spara
            </Button>
          </form>

          {loading && <CircularProgress />}
        </Sheet>
      </CssVarsProvider>

      {archivesHeroImage && (
        <>
          <p>(Förhandgranska) {URL.createObjectURL(archivesHeroImage)}</p>
          {/* <img
            src={URL.createObjectURL(archivesHeroImage)}
            alt="Preview"
            width="200"
          /> */}
          <HeroComponent
            imageUrl={URL.createObjectURL(archivesHeroImage)}
            subtitle={'Arkiv'}
          />
        </>
      )}
      {/* <section className="newsImageOne-container">
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
      </section> */}
    </>
  );
}

export default AdminArchives;
