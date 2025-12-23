import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Gift } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16" dir="rtl">
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