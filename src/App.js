import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from './components/vending/HeroSection';
import StorageSection from './components/vending/StorageSection';
import ScrollProgress from './components/vending/ScrollProgress';
import Footer from './components/vending/Footer';

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

  // Add this useEffect to App.js if not already present
useEffect(() => {
  // Prevent zoom on input focus on mobile
  const preventZoom = () => {
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
      viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    }
  };
  
  preventZoom();
  
  // Add touch-action for better scrolling
  document.body.style.touchAction = 'manipulation';
  
  return () => {
    document.body.style.touchAction = '';
  };
}, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      <ScrollProgress progress={scrollProgress} />
      <HeroSection scrollProgress={heroScrollValue} />
      <StorageSection isVisible={scrollProgress > 0.3} />
      <Footer />
    </div>
  );
}

export default App;