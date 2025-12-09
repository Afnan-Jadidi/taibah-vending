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

  const heroProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const [heroScrollValue, setHeroScrollValue] = useState(0);

  useEffect(() => {
    const unsubscribe = heroProgress.on('change', (value) => {
      setHeroScrollValue(value);
    });
    return () => unsubscribe();
  }, [heroProgress]);

  return (
    <div className="bg-slate-950 min-h-screen">
      <ScrollProgress progress={scrollProgress} />
      <HeroSection scrollProgress={heroScrollValue} />
      <StorageSection isVisible={scrollProgress > 0.2} />
      <Footer />

      <motion.div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrollProgress < 0.9 ? 1 : 0, y: scrollProgress < 0.9 ? 0 : 20 }}
      >
        <div className="px-4 py-2 bg-slate-800/90 backdrop-blur-sm rounded-full border border-slate-700 flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 0.33, 0.66].map((pos, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  scrollProgress >= pos && scrollProgress < (pos + 0.33) ? 'bg-blue-400' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-slate-400 text-xs">Scroll to explore</span>
        </div>
      </motion.div>
    </div>
  );
}

export default App;