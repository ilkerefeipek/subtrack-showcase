import { useCallback, useState } from 'react';
import Section0Loader from './components/sections/Section0Loader';
import Section1Hero from './components/sections/Section1Hero';
import Section2Problem from './components/sections/Section2Problem';
import Section3Floating from './components/sections/Section3Floating';
import Section4Solution from './components/sections/Section4Solution';
import Section5MoneyReveal from './components/sections/Section5MoneyReveal';
import Section6ComingSoon from './components/sections/Section6ComingSoon';
import Section7Footer from './components/sections/Section7Footer';
import { useLenisScroll } from './hooks/useLenisScroll';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenisScroll();
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Section0Loader onDone={handleLoaded} />}
      <main
        className="relative"
        aria-hidden={!loaded}
        style={{ visibility: loaded ? 'visible' : 'hidden' }}
      >
        <Section1Hero />
        <Section2Problem />
        <Section3Floating />
        <Section4Solution />
        <Section5MoneyReveal />
        <Section6ComingSoon />
        <Section7Footer />
      </main>
    </>
  );
}
