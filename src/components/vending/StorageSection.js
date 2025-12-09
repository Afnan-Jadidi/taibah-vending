import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Check, ShieldCheck, ShoppingCart, CreditCard, Star, X, Package, Lock, Truck, BookAudio, BookA, BookImage, BookIcon, BookOpen } from 'lucide-react';
import ProductStory from './ProductStory';

export default function StorageSection({ isVisible }) {
  const [selectedShelfItem, setSelectedShelfItem] = useState(null);
  const [isDispensing, setIsDispensing] = useState(false);
  const [dispensingStep, setDispensingStep] = useState(0);
  const [isScreenZoomed, setIsScreenZoomed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isPaymentScreenZoomed, setIsPaymentScreenZoomed] = useState(false);
  const [cart, setCart] = useState([]);
  const [highlightedColumn, setHighlightedColumn] = useState(null);
  const [elevatorPath, setElevatorPath] = useState([]);
  const [currentElevatorPosition, setCurrentElevatorPosition] = useState({ x: 335, y: 450 });

  const products = [
    { 
      id: 1, 
      name: "سبحة ورد المدينة", 
      price: 45, 
      rating: 4.8, 
      icon: "📿",
      story: "سبحة يدوية الصنع من ورد المدينة المنورة، صُنعت بحرفية عالية في ورش المدينة."
    },
    { 
      id: 3, 
      name: "تمر عجوة", 
      price: 85, 
      rating: 4.7, 
      icon: "🌴",
      story: "تمر العجوة الأصلي من مزارع المدينة المنورة."
    },
  ];

  // تحديد أعمدة المنتجات
  const columns = [
    { id: 0, x: 280, shelves: [0, 3, 6, 9, 12], name: "العمود 1" },
    { id: 1, x: 335, shelves: [1, 4, 7, 10, 13], name: "العمود 2" },
    { id: 2, x: 390, shelves: [2, 5, 8, 11, 14], name: "العمود 3" },
    { id: 3, x: 399, shelves: [15], name: "العمود 4" },
  ];

  const shelfItems = [
    { shelf: 1, pos: 0, name: "تمر عجوة", x: 280, y: 172, column: 0 },
    { shelf: 1, pos: 1, name: "تمر سكري", x: 335, y: 172, column: 1 },
    { shelf: 1, pos: 2, name: "تمر عنبر", x: 390, y: 172, column: 2 },
    { shelf: 2, pos: 0, name: "عطر عود", x: 278, y: 238, column: 0 },
    { shelf: 2, pos: 1, name: "عطر مسك", x: 323, y: 238, column: 1 },
    { shelf: 2, pos: 2, name: "عطر ورد", x: 368, y: 238, column: 2 },
    { shelf: 3, pos: 0, name: "سبحة ورد", x: 280, y: 301, column: 0 },
    { shelf: 3, pos: 1, name: "سبحة كريستال", x: 335, y: 301, column: 1 },
    { shelf: 3, pos: 2, name: "سبحة عود", x: 390, y: 301, column: 2 },
    { shelf: 4, pos: 0, name: "مصحف", x: 272, y: 361, column: 0 },
    { shelf: 4, pos: 1, name: "كتاب", x: 352, y: 361, column: 1 },
    { shelf: 4, pos: 2, name: "سجادة", x: 392, y: 361, column: 2 },
    { shelf: 4, pos: 3, name: "ساعة حائط", x: 432, y: 361, column: 3 },
    { shelf: 5, pos: 0, name: "بخور", x: 277, y: 415, column: 0 },
    { shelf: 5, pos: 1, name: "عنبر", x: 327, y: 415, column: 1 },
    { shelf: 5, pos: 2, name: "مسواك", x: 367, y: 415, column: 2 },
    { shelf: 5, pos: 3, name: "زمزم", x: 399, y: 415, column: 3 },
  ];



// استبدل دالة handleSelectItem الحالية بـ:
const handleSelectItem = (item) => {
  if (isDispensing) return;
  
  console.log("Selected item:", item); // لأغراض التصحيح
  
  if (!item) {
    console.error("No item selected!");
    return;
  }
  
  setSelectedShelfItem(item);
  setIsDispensing(true);
  setDispensingStep(0);
  
  // بدء عملية التوصيل
  startDispensingProcess();
};

// أضف دالة جديدة لإدارة عملية التوصيل:
const startDispensingProcess = () => {
  const steps = [0, 1, 2, 3, 4]; // خطوات أكثر وضوحاً
  let currentStep = 0;
  
  const interval = setInterval(() => {
    currentStep++;
    setDispensingStep(currentStep);
    
    if (currentStep >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        setIsDispensing(false);
        setSelectedShelfItem(null);
        setDispensingStep(0);
      }, 2000);
    }
  }, 1000); // كل ثانية خطوة
};

useEffect(() => {
  if (isDispensing) {
    const steps = [1, 2, 3, 4];
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setDispensingStep(currentStep);
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDispensing(false);
          setSelectedShelfItem(null);
          setDispensingStep(0);
        }, 2000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }
}, [isDispensing]);

const protectionFeatures = [
  
  {
    icon: Star, // أو Gift للهدايا
    title: "مشاهدة ثلاثية الأبعاد",
    description: "استكشاف المنتج بزاوية 360° وتفاصيله الدقيقة",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: BookIcon, // إذا كان لديك هذا الأيقونة، أو استخدم أيقونة أخرى
    title: "قصة المنتج",
    description: "تعرف على القصة والتراث خلف كل منتج",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: ShieldCheck,
    title: "نظام مصعد آمن",
    description: "مصعد ذكي يضمن نقل المنتجات دون تلف أو خدش",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Package,
    title: "حماية المنتجات",
    description: "تغليف مضاد للصدمات",
    color: "from-amber-500 to-amber-600"
  }
];

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 overflow-hidden py-20">
      <div className="relative max-w-6xl mx-auto px-6">

        {/* Main Container - Horizontal Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Side - Vending Machine */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative bg-emerald-900/30 rounded-3xl p-6 border border-amber-500/20">
              <svg viewBox="0 0 580 550" className="w-full max-w-[700px] drop-shadow-2xl">
                <defs>
                  <linearGradient id="sideGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#143d32" />
                    <stop offset="100%" stopColor="#0f2e26" />
                  </linearGradient>
                  <linearGradient id="sidePatternGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#143d32" />
                    <stop offset="100%" stopColor="#0a1f1a" />
                  </linearGradient>
                  <linearGradient id="goldAccent3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a67c3d" />
                    <stop offset="50%" stopColor="#c9a227" />
                    <stop offset="100%" stopColor="#a67c3d" />
                  </linearGradient>
                  <linearGradient id="screenGlow3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f5f5f5" />
                    <stop offset="100%" stopColor="#e8e8e8" />
                  </linearGradient>
                  <linearGradient id="shelfLight3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fff8e7" />
                    <stop offset="100%" stopColor="#f5e6c8" />
                  </linearGradient>
                  <pattern id="islamicPattern3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#1a4d3e" />
                    <circle cx="10" cy="10" r="8" fill="none" stroke="#c9a227" strokeWidth="0.5" opacity="0.4" />
                    <path d="M10 2 L10 18 M2 10 L18 10" stroke="#c9a227" strokeWidth="0.3" opacity="0.3" />
                    <path d="M4 4 L16 16 M16 4 L4 16" stroke="#c9a227" strokeWidth="0.3" opacity="0.2" />
                  </pattern>
                  
                  {/* تسليط الضوء على العمود */}
                  <linearGradient id="columnHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Shadow */}
                <ellipse cx="290" cy="545" rx="220" ry="12" fill="#000" opacity="0.3" />

                {/* Islamic Top with Side Pointed Arches */}
                <path d="M30 120 L30 75 Q30 60 55 52 Q70 46 85 40 Q100 46 115 52 Q140 60 140 75 L140 120" fill="url(#islamicPattern3)" stroke="url(#goldAccent3)" strokeWidth="3" />
                <circle cx="85" cy="43" r="3" fill="url(#goldAccent3)" />
                <path d="M360 120 L360 75 Q360 60 385 52 Q400 46 415 40 Q430 46 445 52 Q470 60 470 75 L470 120" fill="url(#islamicPattern3)" stroke="url(#goldAccent3)" strokeWidth="3" />
                <circle cx="415" cy="43" r="3" fill="url(#goldAccent3)" />
                <path d="M140 120 L140 60 Q140 40 195 25 Q225 15 250 0 Q275 15 305 25 Q360 40 360 60 L360 120" fill="url(#islamicPattern3)" stroke="url(#goldAccent3)" strokeWidth="3" />
                <path d="M155 120 L155 65 Q155 45 200 32 Q225 22 250 10 Q275 22 300 32 Q345 45 345 65 L345 120" fill="#1a4d3e" stroke="url(#goldAccent3)" strokeWidth="2" />
                <circle cx="250" cy="3" r="5" fill="url(#goldAccent3)" />

                {/* Main Body */}
                <rect x="30" y="120" width="440" height="400" fill="#1e5a47" />
                <rect x="30" y="120" width="440" height="400" fill="none" stroke="url(#goldAccent3)" strokeWidth="3" />

                {/* Islamic Pattern Borders */}
                <rect x="30" y="120" width="35" height="400" fill="url(#islamicPattern3)" />
                <rect x="30" y="120" width="35" height="400" fill="none" stroke="url(#goldAccent3)" strokeWidth="1" />
                <rect x="435" y="120" width="35" height="400" fill="url(#islamicPattern3)" />
                <rect x="435" y="120" width="35" height="400" fill="none" stroke="url(#goldAccent3)" strokeWidth="1" />

                {/* Top Logo Area */}
                <image href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692dcb8fc91935112f972891/26de27144____1447-06-12__201912_64739d25-removebg-preview.png" x="150" y="60" width="200" height="50" preserveAspectRatio="xMidYMid meet" />

                {/* Left Section - Touch Screen */}
                <g className="cursor-pointer" onClick={() => setIsScreenZoomed(true)}>
                  <rect x="70" y="130" width="160" height="320" rx="8" fill="#163d32" />
                  <rect x="70" y="130" width="160" height="320" rx="8" fill="none" stroke="url(#goldAccent3)" strokeWidth="2" />
                  <rect x="80" y="140" width="140" height="250" rx="4" fill="url(#screenGlow3)" />
                  <image href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692dcb8fc91935112f972891/26de27144____1447-06-12__201912_64739d25-removebg-preview.png" x="105" y="180" width="100" height="50" preserveAspectRatio="xMidYMid meet" />
                  {/* Book Open Icon on Screen */}
                  <g transform="translate(130, 265)">
                    <foreignObject width="40" height="40">
                      <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '30px', height: '30px' }}>
                        <BookOpen 
                          className="text-amber-400" 
                          style={{ 
                            width: '40', 
                            height: '40',
                            color: '#b5994cff'
                          }} 
                        />
                      </div>
                    </foreignObject>
                  </g>
                  
                  <text x="150" y="320" textAnchor="middle" fill="#1e5a47" fontSize="10" fontWeight="bold">اضغط لاختيار المنتج</text>
                  <rect x="80" y="400" width="60" height="40" rx="4" fill="#163d32" stroke="url(#goldAccent3)" strokeWidth="1" />
                  <text x="110" y="425" textAnchor="middle" fill="#c9a227" fontSize="10">Buy</text>
                  <rect x="150" y="400" width="60" height="40" rx="4" fill="#163d32" stroke="url(#goldAccent3)" strokeWidth="1" />
                  <text x="180" y="425" textAnchor="middle" fill="#c9a227" fontSize="10">Stories</text>
                </g>

                {/* Right Section - Glass Display */}
                <rect x="245" y="130" width="180" height="320" rx="4" fill="#1a1a1a" />
                <rect x="250" y="135" width="170" height="310" rx="2" fill="url(#shelfLight3)" />
                <rect x="245" y="130" width="180" height="320" rx="4" fill="none" stroke="url(#goldAccent3)" strokeWidth="2" />

                {/* تسليط الضوء على العمود */}
                {highlightedColumn !== null && columns[highlightedColumn] && (
                  <rect 
                    x={columns[highlightedColumn].x - 25} 
                    y="135" 
                    width="50" 
                    height="310" 
                    fill="url(#columnHighlight)" 
                  />
                )}

                {/* Shelf 1 - Premium Dates */}
                <g className="cursor-pointer">
                  <rect x="255" y="145" width="50" height="55" rx="4" fill="#2a1810" />
                  <rect x="258" y="148" width="44" height="35" rx="2" fill="#3d2317" />
                  <ellipse cx="280" cy="165" rx="15" ry="10" fill="#1a0f0a" />
                  <circle cx="275" cy="163" r="4" fill="#2d1a12" />
                  <circle cx="285" cy="167" r="3" fill="#2d1a12" />
                  <circle cx="280" cy="162" r="3" fill="#3d2317" />
                  <text x="280" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">عجوة</text>
                  
                  <rect x="310" y="145" width="50" height="55" rx="4" fill="#4a3520" onClick={() => handleSelectItem(shelfItems[1])} />
                  <rect x="313" y="148" width="44" height="35" rx="2" fill="#5c4428" />
                  <ellipse cx="335" cy="165" rx="15" ry="10" fill="#3d2a15" />
                  <circle cx="330" cy="163" r="4" fill="#4a3520" />
                  <circle cx="340" cy="167" r="3" fill="#4a3520" />
                  <text x="335" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">سكري</text>
                  
                  <rect x="365" y="145" width="50" height="55" rx="4" fill="#5c3d1e" onClick={() => handleSelectItem(shelfItems[2])} />
                  <rect x="368" y="148" width="44" height="35" rx="2" fill="#6b4a25" />
                  <ellipse cx="390" cy="165" rx="15" ry="10" fill="#4a3215" />
                  <circle cx="385" cy="163" r="4" fill="#5c3d1e" />
                  <circle cx="395" cy="167" r="3" fill="#5c3d1e" />
                  <text x="390" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">عنبر</text>
                  
                  <rect x="250" y="202" width="170" height="3" fill="url(#goldAccent3)" opacity="0.9" />
                </g>

                {/* Shelf 2 - Luxury Perfumes */}
                <g className="cursor-pointer">
                  <rect x="258" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" onClick={() => handleSelectItem(shelfItems[3])} />
                  <rect x="270" y="235" width="16" height="28" rx="3" fill="#8B5A2B" />
                  <rect x="268" y="232" width="20" height="6" rx="1" fill="#c9a227" />
                  <rect x="274" y="220" width="8" height="12" rx="1" fill="#c9a227" />
                  <circle cx="278" cy="216" r="4" fill="#ffd700" opacity="0.8" />
                  
                  <rect x="303" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" onClick={() => handleSelectItem(shelfItems[4])} />
                  <path d="M315 263 L315 240 Q315 232 323 232 Q331 232 331 240 L331 263" fill="#f5f5f5" />
                  <rect x="313" y="228" width="20" height="6" rx="1" fill="#c9a227" />
                  <circle cx="323" cy="222" r="5" fill="#e8e8e8" />
                  
                  <rect x="348" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" onClick={() => handleSelectItem(shelfItems[5])} />
                  <rect x="360" y="238" width="16" height="25" rx="2" fill="#d4a5a5" />
                  <rect x="358" y="233" width="20" height="7" rx="1" fill="#c9a227" />
                  <path d="M368 225 L364 233 L372 233 Z" fill="#c9a227" />
                  
                  <rect x="250" y="267" width="170" height="3" fill="url(#goldAccent3)" opacity="0.9" />
                </g>

                {/* Shelf 3 - Prayer Beads (Sibha) */}
                <g className="cursor-pointer">
                  
                  <rect x="255" y="275" width="50" height="52" rx="4" fill="#1e3a2f" onClick={() => handleSelectItem(shelfItems[6])} />
                  <ellipse cx="280" cy="298" rx="14" ry="18" fill="none" stroke="#c97b63" strokeWidth="4" />
                  <circle cx="280" cy="316" r="5" fill="#c97b63" />
                  <path d="M280 280 L280 275" stroke="#c97b63" strokeWidth="2" />
                  <text x="280" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">ورد</text>
                  
                  <rect x="310" y="275" width="50" height="52" rx="4" fill="#1a2f3d" onClick={() => handleSelectItem(shelfItems[7])} />
                  <ellipse cx="335" cy="298" rx="14" ry="18" fill="none" stroke="#87CEEB" strokeWidth="4" />
                  <circle cx="335" cy="316" r="5" fill="#87CEEB" />
                  <path d="M335 280 L335 275" stroke="#87CEEB" strokeWidth="2" />
                  <text x="335" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">كريستال</text>
                  
                  <rect x="365" y="275" width="50" height="52" rx="4" fill="#2d1f1a" onClick={() => handleSelectItem(shelfItems[8])} />
                  <ellipse cx="390" cy="298" rx="14" ry="18" fill="none" stroke="#8B4513" strokeWidth="4" />
                  <circle cx="390" cy="316" r="5" fill="#8B4513" />
                  <path d="M390 280 L390 275" stroke="#8B4513" strokeWidth="2" />
                  <text x="390" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">عود</text>
                  
                  <rect x="250" y="329" width="170" height="3" fill="url(#goldAccent3)" opacity="0.9" />
                </g>

                {/* Shelf 4 - Books & Qurans */}
                <g className="cursor-pointer">
                  
                  <rect x="255" y="337" width="35" height="48" rx="2" fill="#1e5a47" onClick={() => handleSelectItem(shelfItems[9])} />
                  <rect x="258" y="340" width="29" height="42" rx="1" fill="#2d7a5f" />
                  <rect x="262" y="355" width="21" height="3" fill="#c9a227" />
                  <rect x="265" y="362" width="15" height="2" fill="#c9a227" opacity="0.6" />
                  <path d="M273 348 L268 352 L278 352 Z" fill="#c9a227" />

                  <rect x="335" y="337" width="35" height="48" rx="2" fill="#1a3d5c" onClick={() => handleSelectItem(shelfItems[10])} />
                  <rect x="338" y="340" width="29" height="42" rx="1" fill="#2a5a7a" />
                  <circle cx="352" cy="355" r="8" fill="none" stroke="#c9a227" strokeWidth="1" />
                  <path d="M352 349 L352 361 M346 355 L358 355" stroke="#c9a227" strokeWidth="1" />

                  {/* Prayer Mat rolled */}
                  <rect x="375" y="345" width="35" height="40" rx="3" fill="#2d5a4a" onClick={() => handleSelectItem(shelfItems[11])} />
                  <ellipse cx="392" cy="365" rx="12" ry="15" fill="#1e4a3a" />
                  <path d="M385 355 Q392 350 399 355" stroke="#c9a227" strokeWidth="1" fill="none" />
                  <path d="M385 365 Q392 360 399 365" stroke="#c9a227" strokeWidth="1" fill="none" />
                  <path d="M385 375 Q392 370 399 375" stroke="#c9a227" strokeWidth="1" fill="none" />

                  <rect x="250" y="387" width="170" height="3" fill="url(#goldAccent3)" opacity="0.9" />

                  <rect x="293" y="337" width="40" height="48" rx="3" fill="#1e3a5c" onClick={() => handleSelectItem(shelfItems[12])} />
                  <circle cx="313" cy="361" r="15" fill="#2d5a7a" />
                  <circle cx="313" cy="361" r="2" fill="#c9a227" />
                  <line x1="313" y1="361" x2="313" y2="351" stroke="#c9a227" strokeWidth="1.5" />
                  <line x1="313" y1="361" x2="303" y2="361" stroke="#c9a227" strokeWidth="1" />
                  <text x="313" y="390" textAnchor="middle" fill="#c9a227" fontSize="5">ساعة</text>
                                    
                </g>

                {/* Shelf 5 - Incense & Misc */}
                <g className="cursor-pointer">
                  {/* Bakhoor Box 1 */}
                  <rect x="255" y="395" width="45" height="40" rx="3" fill="#3d2a1a" onClick={() => handleSelectItem(shelfItems[12])} />
                  <rect x="260" y="400" width="35" height="25" rx="2" fill="#5c4020" />
                  <path d="M277 408 Q277 400 285 408 Q277 416 277 408" fill="#c9a227" opacity="0.6" />
                  <text x="277" y="432" textAnchor="middle" fill="#c9a227" fontSize="5">بخور</text>

                  {/* Bakhoor Box 2 */}
                  <rect x="305" y="395" width="45" height="40" rx="3" fill="#2a3d1a" onClick={() => handleSelectItem(shelfItems[13])} />
                  <rect x="310" y="400" width="35" height="25" rx="2" fill="#3d5c20" />
                  <circle cx="327" cy="412" r="6" fill="none" stroke="#c9a227" strokeWidth="1" />
                  <text x="327" y="432" textAnchor="middle" fill="#c9a227" fontSize="5">عنبر</text>

                  {/* Miswak Bundle */}
                  <rect x="355" y="395" width="25" height="40" rx="2" fill="#4a3d2a" onClick={() => handleSelectItem(shelfItems[14])} />
                  <line x1="362" y1="400" x2="362" y2="430" stroke="#8B7355" strokeWidth="3" />
                  <line x1="368" y1="400" x2="368" y2="430" stroke="#9C8465" strokeWidth="3" />
                  <line x1="374" y1="402" x2="374" y2="428" stroke="#8B7355" strokeWidth="3" />

                  {/* Zamzam Water */}
                  <rect x="385" y="395" width="28" height="40" rx="3" fill="#e8f4f8" onClick={() => handleSelectItem(shelfItems[15])} />
                  <rect x="390" y="405" width="18" height="25" rx="2" fill="#b8d4e8" />
                  <text x="399" y="422" textAnchor="middle" fill="#1e5a47" fontSize="4" fontWeight="bold">زمزم</text>
                  <rect x="392" y="400" width="14" height="6" fill="#c9a227" />
                </g>

                {/* Elevator Animation */}
                <AnimatePresence>
                  {isDispensing && selectedShelfItem && (
                    <motion.g
                      key={selectedShelfItem.name}
                      initial={{ x: 335, y: 450 }} // وضع البداية (المنتجع)
                      animate={{ 
                        x: dispensingStep === 1 ? selectedShelfItem.x : 
                            dispensingStep === 2 ? selectedShelfItem.x : 
                            dispensingStep === 3 ? 335 : 335,
                        y: dispensingStep === 1 ? selectedShelfItem.y : 
                            dispensingStep === 2 ? selectedShelfItem.y : 
                            dispensingStep === 3 ? 450 : 450
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                      <rect x="-10" y="-5" width="20" height="3" fill="#c9a227" opacity="0.8" rx="1" />
                      {dispensingStep >= 2 && (
                        <motion.rect
                          x="-8"
                          y="-20"
                          width="16"
                          height="16"
                          rx="2"
                          fill="#8B4513"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                        />
                      )}
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Payment Terminal - On Right Border */}
                <g className="cursor-pointer" onClick={() => setIsPaymentScreenZoomed(true)}>
                  {/* Payment Screen Frame */}
                  <rect x="441" y="250" width="22" height="80" rx="2" fill="#1a1a1a" />
                  <rect x="441" y="250" width="22" height="80" rx="2" fill="none" stroke="url(#goldAccent3)" strokeWidth="0.5" />

                  {/* Payment Screen Display */}
                  <rect x="443" y="255" width="18" height="40" rx="1" fill="url(#screenGlow3)" />

                  {/* Screen Content - Shopping Cart Icon */}
                  <g transform="translate(452, 268)">
                    <circle r="8" fill="#1e5a47" opacity="0.2" />
                    <path d="M-2 -2 L2 -2 L2.8 2 L-2.8 2 Z" fill="#1e5a47" strokeWidth="0.3" stroke="#1e5a47" />
                    <circle cx="-1.2" cy="3" r="0.6" fill="#1e5a47" />
                    <circle cx="1.2" cy="3" r="0.6" fill="#1e5a47" />
                    <text y="8" textAnchor="middle" fill="#c9a227" fontSize="2" fontWeight="bold">اضغط</text>
                    <text y="10.5" textAnchor="middle" fill="#1e5a47" fontSize="1.5">للشراء</text>
                  </g>

                  {/* Card Reader Slot */}
                  <rect x="444" y="300" width="16" height="8" rx="1" fill="#333" />
                  <rect x="445" y="302" width="14" height="2" rx="0.5" fill="#1e5a47" />
                  <text x="452" y="306" textAnchor="middle" fill="#c9a227" fontSize="2" fontWeight="bold">💳</text>

                  {/* Keypad */}
                  <g>
                    {[0, 1, 2].map((row) => 
                      [0, 1, 2].map((col) => (
                        <rect 
                          key={`${row}-${col}`}
                          x={444 + col * 5} 
                          y={312 + row * 4} 
                          width="4" 
                          height="3" 
                          rx="0.3" 
                          fill="#163d32"
                          stroke="url(#goldAccent3)"
                          strokeWidth="0.2"
                        />
                      ))
                    )}
                  </g>

                  {/* LED Status Light */}
                  <circle cx="452" cy="327" r="1" fill="#10b981">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Pickup Slot */}
                <rect x="70" y="455" width="355" height="50" rx="6" fill="#163d32" />
                <rect x="70" y="455" width="355" height="50" rx="6" fill="none" stroke="url(#goldAccent3)" strokeWidth="2" />

                {/* Product in pickup slot */}
                {dispensingStep >= 3 && selectedShelfItem && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <rect x="240" y="472" width="16" height="16" rx="2" fill="#8B4513" />
                    <text x="248" y="482" textAnchor="middle" fill="#c9a227" fontSize="4">✓</text>
                  </motion.g>
                )}

                <text x="247.5" y={dispensingStep >= 3 ? "475" : "485"} textAnchor="middle" fill="#c9a227" fontSize="11" fontWeight="bold">
                  {dispensingStep >= 3 ? 'جاهز! ▼' : 'استلم هديتك ▼'}
                </text>

                {/* Status indicator */}
                <g>
                  <rect x="250" y="125" width="100" height="20" rx="10" fill="#1a4d3e" opacity="0.9" />
                  <circle cx="262" cy="135" r="3" fill={isDispensing ? "#fbbf24" : "#10b981"}>
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                  <text x="272" y="138" fill="#c9a227" fontSize="8">
                    {!isDispensing && 'اختر منتجاً'}
                    {isDispensing && dispensingStep === 0 && 'جاري الذهاب للعمود'}
                    {isDispensing && dispensingStep === 1 && 'تحميل المنتج'}
                    {isDispensing && dispensingStep === 2 && 'إنزال المنتج'}
                    {isDispensing && dispensingStep === 3 && 'جاهز!'}
                  </text>
                </g>

                {/* Decorative corners */}
                <rect x="65" y="125" width="15" height="15" fill="url(#goldAccent3)" opacity="0.6" />
                <rect x="420" y="125" width="15" height="15" fill="url(#goldAccent3)" opacity="0.6" />
                <rect x="65" y="445" width="15" height="15" fill="url(#goldAccent3)" opacity="0.6" />
                <rect x="420" y="445" width="15" height="15" fill="url(#goldAccent3)" opacity="0.6" />
              </svg>

              {/* Steps indicator */}
              <div className="mt-6 flex justify-center gap-2" dir="rtl">
                {['ذهاب للعمود', 'تحميل المنتج', 'إنزال آمن', 'استلام'].map((step, i) => (
                  <div 
                    key={i}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      dispensingStep > i 
                        ? 'bg-amber-500 text-white' 
                        : dispensingStep === i && isDispensing
                        ? 'bg-amber-500/50 text-white'
                        : 'bg-emerald-800 text-emerald-100/50'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Protection Features */}
          <motion.div 
            className="lg:w-2/5 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            dir="rtl"
          >
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">
              استلام <span className="text-amber-400">آمن ومحمي</span>
            </h2>
            <p className="mt-4 text-emerald-100/70 max-w-xl mx-auto">
              اختر منتجاً وشاهد كيف يصل إليك بأمان تام
            </p>
              
            {protectionFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 rounded-2xl p-6 border border-amber-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(251, 191, 36, 0.4)" }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
                    <p className="text-emerald-100/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* بقية الكود بدون تغيير */}
        <AnimatePresence>
          {isScreenZoomed && !selectedProduct && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScreenZoomed(false)}
            >
              <motion.div
                className="relative bg-gradient-to-br from-[#f5f0e6] via-[#faf8f3] to-[#f5f0e6] rounded-3xl p-6 max-w-md w-full h-[600px] overflow-auto"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
              >
                {/* Header */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-emerald-800 font-bold">هدايا طيبة</h3>
                      <p className="text-emerald-600/70 text-xs">اختر لعرض القصة أو 3D</p>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {products.map((product, i) => (
                    <motion.button
                      key={product.id}
                      className="relative p-3 md:p-4 rounded-xl border-2 transition-all duration-300 text-center border-emerald-600/30 bg-white/50 hover:border-amber-500/50 hover:bg-white/70"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="w-full aspect-square rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-5xl md:text-6xl">{product.icon}</span>
                      </div>

                      <h4 className="text-emerald-800 font-medium text-sm">{product.name}</h4>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setIsScreenZoomed(false)}
                  className="absolute top-4 left-4 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Product Detail Inside Screen */}
          {selectedProduct && isScreenZoomed && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsScreenZoomed(false);
                setSelectedProduct(null);
                setViewMode(null);
                setRotation({ x: 0, y: 0 });
              }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-[#f5f0e6] via-[#faf8f3] to-[#f5f0e6] rounded-3xl p-6 max-w-md w-full h-[600px] overflow-hidden"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
              >
                {!viewMode ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="w-32 h-32 rounded-2xl mb-4 flex items-center justify-center">
                      <span className="text-7xl">{selectedProduct.icon}</span>
                    </div>
                    <h3 className="text-emerald-800 font-bold text-2xl">{selectedProduct.name}</h3>
                    <p className="text-emerald-600/70 mt-3 max-w-sm text-center text-sm">{selectedProduct.story}</p>

                    <div className="flex gap-3 mt-6 justify-center">
                      <motion.button
                        onClick={() => setViewMode('story')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 rounded-xl text-white hover:bg-emerald-600 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        شاهد القصة
                      </motion.button>
                      <motion.button
                        onClick={() => setViewMode('3d')}
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 rounded-xl text-white hover:bg-emerald-600 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        عرض 3D
                      </motion.button>
                    </div>
                  </motion.div>
                ) : viewMode === 'story' ? (
                  <div className="h-full">
                    <ProductStory 
                      product={selectedProduct} 
                      onClose={() => setViewMode(null)} 
                    />
                  </div>
                ) : viewMode === '3d' ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <p className="text-emerald-600/70 text-xs mb-3">اسحب للتدوير</p>
                    
                    <motion.div
                      className="cursor-grab active:cursor-grabbing"
                      drag
                      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                      dragElastic={0}
                      onDrag={(e, info) => {
                        setRotation(prev => ({
                          x: prev.x + info.delta.y * 0.5,
                          y: prev.y + info.delta.x * 0.5
                        }));
                      }}
                      style={{ perspective: 1000 }}
                    >
                      <motion.div
                        className="w-52 h-64 flex items-center justify-center"
                        style={{
                          rotateX: rotation.x,
                          rotateY: rotation.y,
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <span className="text-[160px] drop-shadow-2xl">{selectedProduct.icon}</span>
                      </motion.div>
                    </motion.div>

                    <div className="mt-4 text-center">
                      <h3 className="text-emerald-800 font-bold text-xl">{selectedProduct.name}</h3>
                    </div>

                    <motion.button 
                      onClick={() => setViewMode(null)}
                      className="mt-5 px-5 py-2.5 bg-emerald-700 rounded-xl text-white hover:bg-emerald-600 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      رجوع للمنتج
                    </motion.button>
                  </motion.div>
                ) : null}

                <button
                  onClick={() => {
                    setIsScreenZoomed(false);
                    setSelectedProduct(null);
                    setViewMode(null);
                    setRotation({ x: 0, y: 0 });
                  }}
                  className="absolute top-4 left-4 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Payment Screen Zoom Overlay */}
          {isPaymentScreenZoomed && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentScreenZoomed(false)}
            >
              <motion.div
                className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-3xl p-6 max-w-md w-full h-[500px] overflow-auto border-2 border-amber-500/30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">اطلب الآن</h3>
                      <p className="text-emerald-400/70 text-xs">اختر المنتجات وادفع</p>
                    </div>
                  </div>
                  <div className="bg-emerald-700/50 px-3 py-1 rounded-full border border-amber-500/30">
                    <span className="text-amber-400 font-bold">{cart.length}</span>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {products.map((product) => {
                    const inCart = cart.find(item => item.id === product.id);
                    return (
                      <motion.div
                        key={product.id}
                        className="relative p-4 rounded-xl border-2 bg-emerald-900/30 border-emerald-700/50"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-full aspect-square rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-5xl">{product.icon}</span>
                        </div>
                        
                        <h4 className="text-white font-medium text-sm mb-1">{product.name}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-amber-400 font-bold text-lg">{product.price} ر.س</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-emerald-300/70 text-xs">{product.rating}</span>
                          </div>
                        </div>

                        {inCart ? (
                          <div className="flex items-center justify-between bg-emerald-700/50 rounded-lg p-2">
                            <button
                              onClick={() => setCart(cart.filter(item => item.id !== product.id))}
                              className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center text-white font-bold transition-colors"
                            >
                              -
                            </button>
                            <span className="text-white font-bold">{inCart.quantity}</span>
                            <button
                              onClick={() => setCart(cart.map(item => 
                                item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                              ))}
                              className="w-7 h-7 bg-emerald-600 hover:bg-emerald-500 rounded-md flex items-center justify-center text-white font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCart([...cart, { ...product, quantity: 1 }])}
                            className="w-full py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-bold transition-colors"
                          >
                            أضف للسلة
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Cart Summary */}
                {cart.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-900/50 rounded-xl p-4 border border-amber-500/30"
                  >
                    <h4 className="text-white font-bold mb-3">ملخص الطلب</h4>
                    <div className="space-y-2 mb-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-emerald-200">{item.name} × {item.quantity}</span>
                          <span className="text-amber-400 font-bold">{item.price * item.quantity} ر.س</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-amber-500/20 pt-3 flex justify-between items-center">
                      <span className="text-white font-bold text-lg">الإجمالي</span>
                      <span className="text-amber-400 font-bold text-2xl">
                        {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} ر.س
                      </span>
                    </div>
                    <motion.button
                      className="w-full mt-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Get first item from cart to dispense
                        const firstItem = cart[0];
                        // Find matching shelf item
                        const shelfItem = shelfItems.find(item => 
                          item.name.includes(firstItem.name.split(' ')[1]) || 
                          firstItem.name.includes(item.name)
                        );
                        
                        if (shelfItem) {
                          setSelectedShelfItem(shelfItem);
                          setIsDispensing(true);
                          setDispensingStep(0);
                        }
                        
                        setCart([]);
                        setIsPaymentScreenZoomed(false);
                      }}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>ادفع الآن</span>
                    </motion.button>
                  </motion.div>
                )}

                <button
                  onClick={() => setIsPaymentScreenZoomed(false)}
                  className="absolute top-4 left-4 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}