import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Gift, Twitter } from 'lucide-react';

export default function Footer() {
  return (
<footer className="relative bg-emerald-950 border-t border-amber-500/20">
  <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-16" dir="rtl">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Gift className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg md:text-xl">هدايا هوية طيبة</span>
            </div>
            <p className="text-emerald-100/70 text-sm md:text-base max-w-md">
              آلة بيع ذكية توفر لك أجمل الهدايا والتذكارات من المدينة المنورة. تجربة تسوق فريدة في أجواء روحانية.
            </p>
          </div>

          {/* Contact */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-amber-400 font-bold text-base md:text-lg mb-3 md:mb-4">تواصل معنا</h4>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center gap-2 md:gap-3 text-emerald-100/70 hover:text-white transition-colors text-sm md:text-base">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">المدينة المنورة، السعودية</span>
              </li>
              <li>
                <a 
                  href="tel:+966563050859" 
                  className="flex items-center gap-2 md:gap-3 text-emerald-100/70 hover:text-white transition-colors text-sm md:text-base"
                >
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400 flex-shrink-0" />
                  <span className="truncate">859 050 563 966+</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:taibahid1@gmail.com" 
                  className="flex items-center gap-2 md:gap-3 text-emerald-100/70 hover:text-white transition-colors text-sm md:text-base"
                >
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400 flex-shrink-0" />
                  <span className="truncate">taibahid1@gmail.com</span>
                </a>
              </li>
            </ul>
            
            {/* Social Media Links */}
            <div className="mt-4 md:mt-6">
              <h5 className="text-amber-400 font-semibold text-sm md:text-base mb-2 md:mb-3">تابعنا</h5>
              <div className="flex gap-3">
                <a
                  href="https://www.tiktok.com/@taibahid1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-900/50 hover:bg-amber-500 flex items-center justify-center transition-colors group"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-100/70 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/taibahID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-900/50 hover:bg-amber-500 flex items-center justify-center transition-colors group"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-4 h-4 md:w-5 md:h-5 text-emerald-100/70 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-8 md:mt-0">
            <h4 className="text-amber-400 font-bold text-base md:text-lg mb-3 md:mb-4">روابط سريعة</h4>
            <ul className="space-y-2 md:space-y-3">
              {['عن المشروع', 'منتجاتنا', 'مواقعنا', 'كن شريكاً'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-emerald-100/70 hover:text-white transition-colors text-sm md:text-base block py-1">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright - Mobile optimized */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-amber-500/20">
          <p className="text-emerald-100/50 text-center text-xs md:text-sm">
            © {new Date().getFullYear()} هدايا هوية طيبة. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}