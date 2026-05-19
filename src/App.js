import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from './components/vending/HeroSection';
import StorageSection from './components/vending/StorageSection';
import ScrollProgress from './components/vending/ScrollProgress';
import Footer from './components/vending/Footer';
import VoiceLanguageDetector from './components/vending/VoiceLanguageDetector';
import { LanguageProvider } from './i18n/LanguageContext';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setScrollProgress(value);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Adjust scroll threshold for better mobile experience
  const heroProgress = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const [heroScrollValue, setHeroScrollValue] = useState(0);

  useEffect(() => {
    const unsubscribe = heroProgress.on('change', (value) => {
      setHeroScrollValue(value);
    });
    return () => unsubscribe();
  }, [heroProgress]);

  // Mobile optimizations
  useEffect(() => {
    const preventZoom = () => {
      const viewport = document.querySelector("meta[name=viewport]");
      if (viewport) {
        viewport.content =
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      }
    };
    preventZoom();
    document.body.style.touchAction = 'manipulation';
    return () => {
      document.body.style.touchAction = '';
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-slate-950 min-h-screen">
        <ScrollProgress progress={scrollProgress} />
        {/* Floating voice / language widget */}
        <VoiceLanguageDetector />
        <HeroSection scrollProgress={heroScrollValue} />
        <StorageSection isVisible={scrollProgress > 0.3} />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
