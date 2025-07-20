import { useEffect } from 'react';

import HeroComponent from '../components/HeroComponent';

function About() {
  useEffect(() => {
    document.title = 'Om oss | Svensk Form Väst';
  }, []);
  return (
    <>
      <HeroComponent
        imageUrl={'./swapnil-dwivedi-w46tRF64qNc-unsplash.jpg'}
        title={'Om oss'}
      />
      <h1>Om oss</h1>
    </>
  );
}
export default About;
