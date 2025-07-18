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

const BASE_URL = import.meta.env.VITE_API_BASE;

function AdminProjects() {
  const [projectsHeroImage, setProjectsHeroImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmitImageProjectsHero = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      setLoading(false);

      const result = await response.json();
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
              Byt bild Hero Pågående projekt
            </Typography>
          </div>

          <form
            onSubmit={handleSubmitImageProjectsHero}
            className="newsImageOne-form"
          >
            <FormControl>
              <FormLabel>Välj en bild</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setProjectsHeroImage(e.target.files[0])}
              />
            </FormControl>
            <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
              Spara
            </Button>
          </form>
          {loading && <CircularProgress />}

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
        </Sheet>
      </CssVarsProvider>
    </>
  );
}

export default AdminProjects;
