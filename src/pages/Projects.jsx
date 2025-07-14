import { useState, useEffect } from 'react';
import HeroComponent from '../components/HeroComponent';
const BASE_URL = import.meta.env.VITE_API_BASE;

function Projects() {
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/getImageProjectsHero`);

        if (!response.ok) {
          throw new Error('Failed to fetch hero image');
        }
        const data = await response.json(); // t.ex. { filepath: "/uploads/image.jpg" }

        setImagePath(data.filepath);
      } catch (error) {
        console.error('Failed to fetch hero image', error);
      }
    })();
  }, []);
  return (
    <>
      <h1>Pågående projekt</h1>
      {imagePath && (
        <HeroComponent
          imageUrl={`${BASE_URL}${imagePath}`}
          title={'Välkommen'}
        />
      )}
    </>
  );
}
export default Projects;
