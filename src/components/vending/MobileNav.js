import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Gift, MapPin, Info, Users, Phone } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function MobileNav() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, text: t('nav.home'), href: '#', color: 'text-blue-400' },
    { icon: Gift, text: t('nav.products'), href: '#storage-section', color: 'text-amber-400' },
    { icon: MapPin, text: t('nav.locations'), href: '#locations', color: 'text-emerald-400' },
    { icon: Info, text: t('nav.about'), href: '#about', color: 'text-purple-400' },
    { icon: Users, text: t('nav.partners'), href: '#partners', color: 'text-rose-400' },
  ];

  const contactInfo = [
    { icon: Phone, text: '859 050 563 966+', href: 'tel:+966563050859' }
  ];

  const handleItemClick = () => {
    setIsOpen(false);
    // Add slight delay to ensure smooth transition
    setTimeout(() => {
      document.activeElement?.blur();
    }, 100);
  };

  return (
    <div className={`md:hidden fixed top-4 ${lang === 'ar' ? 'right-4' : 'right-4'} z-50`}>
      {/* Menu Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-emerald-800/90 backdrop-blur-sm rounded-full border border-amber-500/30 flex items-center justify-center touch-target shadow-lg"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        aria-label={isOpen ? t('nav.close_menu') : t('nav.open_menu')}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'menu'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
      
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute top-14 -right-1 bg-emerald-900/95 backdrop-blur-sm rounded-2xl p-4 border border-amber-500/20 min-w-[240px] max-w-[calc(100vw-32px)] shadow-2xl"
            style={{ 
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto'
            }}
          >
            <div className="flex flex-col gap-1">
              {/* Navigation Items */}
              {navItems.map((item, index) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-3 text-white hover:text-white transition-all duration-200 py-3 px-4 rounded-xl hover:bg-emerald-800/50 active:bg-emerald-700/50 touch-target group"
                  onClick={handleItemClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={item.text}
                >
                  <div className={`w-10 h-10 rounded-lg bg-emerald-800/50 flex items-center justify-center group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className={`font-medium text-sm flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{item.text}</span>
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-amber-400/50 opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.a>
              ))}
              
              {/* Divider */}
              <div className="my-2 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
              
              {/* Quick Contact */}
              <div className="px-3 py-2">
                <p className="text-emerald-200/70 text-xs mb-2 text-center">{t('nav.quick_contact')}</p>
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.text}
                    href={item.href}
                    className="flex items-center justify-center gap-2 text-emerald-100/70 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-emerald-800/30 text-sm touch-target"
                    onClick={handleItemClick}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <item.icon className="w-4 h-4 text-amber-400" />
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
              
              {/* Brand Logo */}
              <motion.div 
                className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-800/30 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">{t('nav.brand_name')}</span>
                    <span className="text-emerald-200/50 text-[10px]">{t('nav.brand_sub')}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Close Hint */}
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-emerald-200/40 text-xs">{t('nav.close_hint')}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}