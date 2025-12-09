import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Gift } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-6 py-16" dir="rtl">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl"> هدايا هوية طيبة</span>
            </div>
            <p className="text-emerald-100/70 max-w-md">
              آلة بيع ذكية توفر لك أجمل الهدايا والتذكارات من المدينة المنورة. تجربة تسوق فريدة في أجواء روحانية.
            </p>
            
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-emerald-100/70 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>المدينة المنورة، السعودية</span>
              </li>
              <li className="flex items-center gap-3 text-emerald-100/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>859 050 563 966+</span>
              </li>
              <li className="flex items-center gap-3 text-emerald-100/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>taibahid@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-amber-400 font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              {['عن المشروع', 'منتجاتنا', 'مواقعنا', 'كن شريكاً'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-emerald-100/70 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}