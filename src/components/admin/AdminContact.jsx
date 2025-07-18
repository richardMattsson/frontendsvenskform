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

function AdminContact() {
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
              Kontakt
            </Typography>
          </div>

          {/* <form onSubmit={handleSubmitImageArchivesHero}>
            <FormControl>
              <FormLabel>Välj en bild</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setArchivesHeroImage(e.target.files[0])}
              />
            </FormControl>
            <Button type="submit" sx={{ mt: 1 }}>
              Spara
            </Button>
          </form> */}

          {/* {archivesHeroImage && (
            <>
              <p>(Förhandgranska)</p>
              <img
                src={URL.createObjectURL(archivesHeroImage)}
                alt="Preview"
                width="200"
              />
            </>
          )} */}
        </Sheet>
      </CssVarsProvider>
    </>
  );
}
export default AdminContact;
