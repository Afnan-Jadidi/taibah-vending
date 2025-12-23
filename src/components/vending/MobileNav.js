import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Gift, MapPin, Info, Users } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, text: 'الرئيسية', href: '#' },
    { icon: Gift, text: 'منتجاتنا', href: '#storage-section' },
    { icon: MapPin, text: 'مواقعنا', href: '#locations' },
    { icon: Info, text: 'عن المشروع', href: '#about' },
    { icon: Users, text: 'كن شريكاً', href: '#partners' },
  ];

  return (
    <div className="md:hidden fixed top-4 right-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-emerald-800/90 backdrop-blur-sm rounded-full border border-amber-500/30 flex items-center justify-center touch-target"
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'menu'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-14 right-0 bg-emerald-900/95 backdrop-blur-sm rounded-2xl p-4 border border-amber-500/20 min-w-[220px] shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-3 text-white hover:text-amber-400 transition-colors py-3 px-4 rounded-xl hover:bg-emerald-800/50"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: -5 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.text}</span>
                </motion.a>
              ))}
              
              {/* Brand Logo */}
              <motion.div 
                className="mt-4 pt-4 border-t border-amber-500/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-bold text-sm">هدايا هوية طيبة</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}