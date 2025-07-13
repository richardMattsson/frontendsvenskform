import { useState, useEffect } from 'react';
import HeroComponent from '../components/HeroComponent';

function Projects() {
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/getImageProjectsHero');

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
          imageUrl={`http://localhost:8080${imagePath}`}
          title={'Välkommen'}
        />
      )}
    </>
  );
}
export default Projects;
