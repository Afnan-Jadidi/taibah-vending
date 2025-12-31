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
  const [currentElevatorPosition, setCurrentElevatorPosition] = useState({ x: 385, y: 450 });

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
    { id: 0, x: 330, shelves: [0, 3, 6, 9, 12], name: "العمود 1" },
    { id: 1, x: 385, shelves: [1, 4, 7, 10, 13], name: "العمود 2" },
    { id: 2, x: 440, shelves: [2, 5, 8, 11, 14], name: "العمود 3" },
    { id: 3, x: 449, shelves: [15], name: "العمود 4" },
  ];

  const shelfItems = [
    { shelf: 1, pos: 0, name: "تمر عجوة", x: 330, y: 172, column: 0 },
    { shelf: 1, pos: 1, name: "تمر سكري", x: 385, y: 172, column: 1 },
    { shelf: 1, pos: 2, name: "تمر عنبر", x: 440, y: 172, column: 2 },
    { shelf: 2, pos: 0, name: "عطر عود", x: 328, y: 238, column: 0 },
    { shelf: 2, pos: 1, name: "عطر مسك", x: 373, y: 238, column: 1 },
    { shelf: 2, pos: 2, name: "عطر ورد", x: 418, y: 238, column: 2 },
    { shelf: 3, pos: 0, name: "سبحة ورد", x: 330, y: 301, column: 0 },
    { shelf: 3, pos: 1, name: "سبحة كريستال", x: 385, y: 301, column: 1 },
    { shelf: 3, pos: 2, name: "سبحة عود", x: 440, y: 301, column: 2 },
    { shelf: 4, pos: 0, name: "مصحف", x: 322, y: 361, column: 0 },
    { shelf: 4, pos: 1, name: "كتاب", x: 402, y: 361, column: 1 },
    { shelf: 4, pos: 2, name: "سجادة", x: 442, y: 361, column: 2 },
    { shelf: 4, pos: 3, name: "ساعة حائط", x: 482, y: 361, column: 3 },
    { shelf: 5, pos: 0, name: "بخور", x: 327, y: 415, column: 0 },
    { shelf: 5, pos: 1, name: "عنبر", x: 377, y: 415, column: 1 },
    { shelf: 5, pos: 2, name: "مسواك", x: 417, y: 415, column: 2 },
    { shelf: 5, pos: 3, name: "زمزم", x: 449, y: 415, column: 3 },
  ];

  const handleSelectItem = (item) => {
    if (isDispensing) return;
    
    console.log("Selected item:", item);
    
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

  const startDispensingProcess = () => {
    const steps = [0, 1, 2, 3, 4];
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
      icon: Star,
      title: "مشاهدة ثلاثية الأبعاد",
      description: "استكشاف المنتج بزاوية 360° وتفاصيله الدقيقة",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BookIcon,
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
<section id="storage-section" className="relative min-h-screen w-full bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 overflow-hidden py-8 sm:py-12 md:py-20 flex items-center justify-center"> {/* Added flex items-center justify-center */}
  <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full"> {/* Added w-full */}
        
        {/* Main Container - Horizontal Layout */}
<div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center justify-center"> {/* Changed to items-center and added justify-center */}
          
          {/* Left Side - Vending Machine */}
          <motion.div 
zzzzzzzzz
          >
            <div className="relative bg-emerald-900/30 rounded-xl md:rounded-3xl p-4 md:p-6 border border-amber-500/20">
<svg viewBox="0 0 630 550" className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] drop-shadow-2xl mx-auto">                <defs>
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
                <ellipse cx="340" cy="545" rx="220" ry="12" fill="#000" opacity="0.3" />

                {/* Islamic Top with Side Pointed Arches */}
                <path d="M80 120 L80 75 Q80 60 105 52 Q120 46 135 40 Q150 46 165 52 Q190 60 190 75 L190 120" fill="url(#islamicPattern3)" stroke="url(#goldAccent3)" strokeWidth="3" />
                <circle cx="135" cy="43" r="3" fill="url(#goldAccent3)" />
                <path d="M410 120 L410 75 Q410 60 435 52 Q450 46 465 40 Q480 46 495 52 Q520 60 520 75 L520 120" fill="url(#islamicPattern3)" stroke="url(#goldAccent3)" strokeWidth="3" />
                <circle cx="465" cy="43" r="3" fill="url(#goldAccent3)" />
                <path d="M190 120 L190 60 Q190 40 245 25 Q275 15 300 0 Q325 15 355 25 Q410 40 410 60 L410 120" fill="url(#islamicPattern3)" stroke="url(#goldAccent3)" strokeWidth="3" />
                <path d="M205 120 L205 65 Q205 45 250 32 Q275 22 300 10 Q325 22 350 32 Q395 45 395 65 L395 120" fill="#1a4d3e" stroke="url(#goldAccent3)" strokeWidth="2" />
                <circle cx="300" cy="3" r="5" fill="url(#goldAccent3)" />

                {/* Main Body */}
                <rect x="80" y="120" width="440" height="400" fill="#1e5a47" />
                <rect x="80" y="120" width="440" height="400" fill="none" stroke="url(#goldAccent3)" strokeWidth="3" />

                {/* Islamic Pattern Borders */}
                <rect x="80" y="120" width="35" height="400" fill="url(#islamicPattern3)" />
                <rect x="80" y="120" width="35" height="400" fill="none" stroke="url(#goldAccent3)" strokeWidth="1" />
                <rect x="485" y="120" width="35" height="400" fill="url(#islamicPattern3)" />
                <rect x="485" y="120" width="35" height="400" fill="none" stroke="url(#goldAccent3)" strokeWidth="1" />

                {/* Top Logo Area */}
                <image href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692dcb8fc91935112f972891/26de27144____1447-06-12__201912_64739d25-removebg-preview.png" x="200" y="60" width="200" height="50" preserveAspectRatio="xMidYMid meet" />

{/* Left Section - Touch Screen */}
<g className="cursor-pointer" onClick={() => setIsScreenZoomed(true)}>
  <rect x="120" y="130" width="160" height="320" rx="8" fill="#163d32" />
  <rect x="120" y="130" width="160" height="320" rx="8" fill="none" stroke="url(#goldAccent3)" strokeWidth="2" />
  <rect x="130" y="140" width="140" height="250" rx="4" fill="url(#screenGlow3)" />
  
  {/* Language Selector Button */}
  <g className="cursor-pointer" onClick={(e) => {
    e.stopPropagation();
    // Language selector functionality will be implemented later
    console.log("Language selector clicked");
  }}>
    <rect x="140" y="150" width="120" height="25" rx="4" fill="#1e5a47" />
    <rect x="140" y="150" width="120" height="25" rx="4" fill="none" stroke="url(#goldAccent3)" strokeWidth="1" />
    <text x="200" y="166" textAnchor="middle" fill="#c9a227" fontSize="8" fontWeight="bold">🌐 اللغة / Language</text>
  </g>
  
  {/* Main Logo */}
  <image href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692dcb8fc91935112f972891/26de27144____1447-06-12__201912_64739d25-removebg-preview.png" 
    x="155" y="180" width="100" height="50" preserveAspectRatio="xMidYMid meet" />
  
  {/* Book Open Icon on Screen */}
  <g transform="translate(180, 265)">
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
  
  <text x="200" y="320" textAnchor="middle" fill="#1e5a47" fontSize="10" fontWeight="bold">اضغط لاختيار المنتج</text>
  
  {/* Action Buttons */}
  <rect x="130" y="400" width="60" height="40" rx="4" fill="#163d32" stroke="url(#goldAccent3)" strokeWidth="1" />
  <text x="160" y="425" textAnchor="middle" fill="#c9a227" fontSize="10">Buy</text>
  <rect x="200" y="400" width="60" height="40" rx="4" fill="#163d32" stroke="url(#goldAccent3)" strokeWidth="1" />
  <text x="230" y="425" textAnchor="middle" fill="#c9a227" fontSize="10">Stories</text>
</g>
                  


                {/* Right Section - Glass Display */}
                <rect x="295" y="130" width="180" height="320" rx="4" fill="#1a1a1a" />
                <rect x="300" y="135" width="170" height="310" rx="2" fill="url(#shelfLight3)" />
                <rect x="295" y="130" width="180" height="320" rx="4" fill="none" stroke="url(#goldAccent3)" strokeWidth="2" />

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
                  <rect x="305" y="145" width="50" height="55" rx="4" fill="#2a1810" />
                  <rect x="308" y="148" width="44" height="35" rx="2" fill="#3d2317" />
                  <ellipse cx="330" cy="165" rx="15" ry="10" fill="#1a0f0a" />
                  <circle cx="325" cy="163" r="4" fill="#2d1a12" />
                  <circle cx="335" cy="167" r="3" fill="#2d1a12" />
                  <circle cx="330" cy="162" r="3" fill="#3d2317" />
                  <text x="330" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">عجوة</text>
                  
                  <rect x="360" y="145" width="50" height="55" rx="4" fill="#4a3520" onClick={() => handleSelectItem(shelfItems[1])} />
                  <rect x="363" y="148" width="44" height="35" rx="2" fill="#5c4428" />
                  <ellipse cx="385" cy="165" rx="15" ry="10" fill="#3d2a15" />
                  <circle cx="380" cy="163" r="4" fill="#4a3520" />
                  <circle cx="390" cy="167" r="3" fill="#4a3520" />
                  <text x="385" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">سكري</text>
                  
                  <rect x="415" y="145" width="50" height="55" rx="4" fill="#5c3d1e" onClick={() => handleSelectItem(shelfItems[2])} />
                  <rect x="418" y="148" width="44" height="35" rx="2" fill="#6b4a25" />
                  <ellipse cx="440" cy="165" rx="15" ry="10" fill="#4a3215" />
                  <circle cx="435" cy="163" r="4" fill="#5c3d1e" />
                  <circle cx="445" cy="167" r="3" fill="#5c3d1e" />
                  <text x="440" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">عنبر</text>
                  
                  <rect x="300" y="202" width="170" height="3" fill="url(#goldAccent3)" opacity="0.9" />
                </g>

                {/* Shelf 2 - Luxury Perfumes */}
                <g className="cursor-pointer">
                  <rect x="308" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" onClick={() => handleSelectItem(shelfItems[3])} />
                  <rect x="320" y="235" width="16" height="28" rx="3" fill="#8B5A2B" />
                  <rect x="318" y="232" width="20" height="6" rx="1" fill="#c9a227" />
                  <rect x="324" y="220" width="8" height="12" rx="1" fill="#c9a227" />
                  <circle cx="328" cy="216" r="4" fill="#ffd700" opacity="0.8" />
                  
                  <rect x="353" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" onClick={() => handleSelectItem(shelfItems[4])} />
                  <path d="M365 263 L365 240 Q365 232 373 232 Q381 232 381 240 L381 263" fill="#f5f5f5" />
                  <rect x="363" y="228" width="20" height="6" rx="1" fill="#c9a227" />
                  <circle cx="373" cy="222" r="5" fill="#e8e8e8" />
                  
                  <rect x="398" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" onClick={() => handleSelectItem(shelfItems[5])} />
                  <rect x="410" y="238" width="16" height="25" rx="2" fill="#d4a5a5" />
                  <rect x="408" y="233" width="20" height="7" rx="1" fill="#c9a227" />
                  <path d="M418 225 L414 233 L422 233 Z" fill="#c9a227" />
                  
                  <rect x="300" y="267" width="170" height="3" fill="url(#goldAccent3)" opacity="0.9" />
                </g>

                {/* Shelf 3 - Prayer Beads (Sibha) */}
                <g className="cursor-pointer">
                  <rect x="305" y="275" width="50" height="52" rx="4" fill="#1e3a2f" onClick={() => handleSelectItem(shelfItems[6])} />
                  <ellipse cx="330" cy="298" rx="14" ry="18" fill="none" stroke="#c97b63" strokeWidth="4" />
                  <circle cx="330" cy="316" r="5" fill="#c97b63" />
                  <path d="M330 280 L330 275" stroke="#c97b63" strokeWidth="2" />
                  <text x="330" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">ورد</text>
                  
                  <rect x="360" y="275" width="50" height="52" rx="4" fill="#1a2f3d" onClick={() => handleSelectItem(shelfItems[7])} />
                  <ellipse cx="385" cy="298" rx="14" ry="18" fill="none" stroke="#87CEEB" strokeWidth="4" />
                  <circle cx="385" cy="316" r="5" fill="#87CEEB" />
                  <path d="M385 280 L385 275" stroke="#87CEEB" strokeWidth="2" />
                  <text x="385" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">كريستال</text>
                  
                  <rect x="415" y="275" width="50" height="52" rx="4" fill="#2d1f1a" onClick={() => handleSelectItem(shelfItems[8])} />
                  <ellipse cx="440" cy="298" rx="14" ry="18" fill="none" stroke="#8B4513" strokeWidth="4" />
                  <circle cx="440" cy="316" r="5" fill="#8B4513" />
                  <path d="M440 280 L440 275" stroke="#8B4513" strokeWidth="2" />
                  <text x="440" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">عود</text>
                  
                  <rect x="300" y="329" width="170" height="3" fill="url(#goldAccent3)" opacity="0.9" />
                </g>

                {/* Shelf 4 - Books & Qurans */}
                <g className="cursor-pointer">
                  <rect x="305" y="337" width="35" height="48" rx="2" fill="#1e5a47" onClick={() => handleSelectItem(shelfItems[9])} />
                  <rect x="308" y="340" width="29" height="42" rx="1" fill="#2d7a5f" />
                  <rect x="312" y="355" width="21" height="3" fill="#c9a227" />
                  <rect x="315" y="362" width="15" height="2" fill="#c9a227" opacity="0.6" />
                  <path d="M323 348 L318 352 L328 352 Z" fill="#c9a227" />

                  <rect x="385" y="337" width="35" height="48" rx="2" fill="#1a3d5c" onClick={() => handleSelectItem(shelfItems[10])} />
                  <rect x="388" y="340" width="29" height="42" rx="1" fill="#2a5a7a" />
                  <circle cx="402" cy="355" r="8" fill="none" stroke="#c9a227" strokeWidth="1" />
                  <path d="M402 349 L402 361 M396 355 L408 355" stroke="#c9a227" strokeWidth="1" />

                  {/* Prayer Mat rolled */}
                  <rect x="425" y="345" width="35" height="40" rx="3" fill="#2d5a4a" onClick={() => handleSelectItem(shelfItems[11])} />
                  <ellipse cx="442" cy="365" rx="12" ry="15" fill="#1e4a3a" />
                  <path d="M425 355 Q432 350 439 355" stroke="#c9a227" strokeWidth="1" fill="none" />
                  <path d="M425 365 Q432 360 439 365" stroke="#c9a227" strokeWidth="1" fill="none" />
                  <path d="M425 375 Q432 370 439 375" stroke="#c9a227" strokeWidth="1" fill="none" />

                  <rect x="300" y="387" width="170" height="3" fill="url(#goldAccent3)" opacity="0.9" />

                  <rect x="343" y="337" width="40" height="48" rx="3" fill="#1e3a5c" onClick={() => handleSelectItem(shelfItems[12])} />
                  <circle cx="363" cy="361" r="15" fill="#2d5a7a" />
                  <circle cx="363" cy="361" r="2" fill="#c9a227" />
                  <line x1="363" y1="361" x2="363" y2="351" stroke="#c9a227" strokeWidth="1.5" />
                  <line x1="363" y1="361" x2="353" y2="361" stroke="#c9a227" strokeWidth="1" />
                  <text x="363" y="390" textAnchor="middle" fill="#c9a227" fontSize="5">ساعة</text>
                </g>

                {/* Shelf 5 - Incense & Misc */}
                <g className="cursor-pointer">
                  {/* Bakhoor Box 1 */}
                  <rect x="305" y="395" width="45" height="40" rx="3" fill="#3d2a1a" onClick={() => handleSelectItem(shelfItems[12])} />
                  <rect x="310" y="400" width="35" height="25" rx="2" fill="#5c4020" />
                  <path d="M327 408 Q327 400 335 408 Q327 416 327 408" fill="#c9a227" opacity="0.6" />
                  <text x="327" y="432" textAnchor="middle" fill="#c9a227" fontSize="5">بخور</text>

                  {/* Bakhoor Box 2 */}
                  <rect x="355" y="395" width="45" height="40" rx="3" fill="#2a3d1a" onClick={() => handleSelectItem(shelfItems[13])} />
                  <rect x="360" y="400" width="35" height="25" rx="2" fill="#3d5c20" />
                  <circle cx="377" cy="412" r="6" fill="none" stroke="#c9a227" strokeWidth="1" />
                  <text x="377" y="432" textAnchor="middle" fill="#c9a227" fontSize="5">عنبر</text>

                  {/* Miswak Bundle */}
                  <rect x="405" y="395" width="25" height="40" rx="2" fill="#4a3d2a" onClick={() => handleSelectItem(shelfItems[14])} />
                  <line x1="412" y1="400" x2="412" y2="430" stroke="#8B7355" strokeWidth="3" />
                  <line x1="418" y1="400" x2="418" y2="430" stroke="#9C8465" strokeWidth="3" />
                  <line x1="424" y1="402" x2="424" y2="428" stroke="#8B7355" strokeWidth="3" />

                  {/* Zamzam Water */}
                  <rect x="435" y="395" width="28" height="40" rx="3" fill="#e8f4f8" onClick={() => handleSelectItem(shelfItems[15])} />
                  <rect x="440" y="405" width="18" height="25" rx="2" fill="#b8d4e8" />
                  <text x="449" y="422" textAnchor="middle" fill="#1e5a47" fontSize="4" fontWeight="bold">زمزم</text>
                  <rect x="442" y="400" width="14" height="6" fill="#c9a227" />
                </g>

                {/* Elevator Animation */}
                <AnimatePresence>
                  {isDispensing && selectedShelfItem && (
                    <motion.g
                      key={selectedShelfItem.name}
                      initial={{ x: 385, y: 450 }}
                      animate={{ 
                        x: dispensingStep === 1 ? selectedShelfItem.x : 
                            dispensingStep === 2 ? selectedShelfItem.x : 
                            dispensingStep === 3 ? 385 : 385,
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
                  <rect x="491" y="250" width="22" height="80" rx="2" fill="#1a1a1a" />
                  <rect x="491" y="250" width="22" height="80" rx="2" fill="none" stroke="url(#goldAccent3)" strokeWidth="0.5" />

                  {/* Payment Screen Display */}
                  <rect x="493" y="255" width="18" height="40" rx="1" fill="url(#screenGlow3)" />

                  {/* Screen Content - Shopping Cart Icon */}
                  <g transform="translate(502, 268)">
                    <circle r="8" fill="#1e5a47" opacity="0.2" />
                    <path d="M-2 -2 L2 -2 L2.8 2 L-2.8 2 Z" fill="#1e5a47" strokeWidth="0.3" stroke="#1e5a47" />
                    <circle cx="-1.2" cy="3" r="0.6" fill="#1e5a47" />
                    <circle cx="1.2" cy="3" r="0.6" fill="#1e5a47" />
                    <text y="8" textAnchor="middle" fill="#c9a227" fontSize="2" fontWeight="bold">اضغط</text>
                    <text y="10.5" textAnchor="middle" fill="#1e5a47" fontSize="1.5">للشراء</text>
                  </g>

                  {/* Card Reader Slot */}
                  <rect x="494" y="300" width="16" height="8" rx="1" fill="#333" />
                  <rect x="495" y="302" width="14" height="2" rx="0.5" fill="#1e5a47" />
                  <text x="502" y="306" textAnchor="middle" fill="#c9a227" fontSize="2" fontWeight="bold">💳</text>

                  {/* Keypad */}
                  <g>
                    {[0, 1, 2].map((row) => 
                      [0, 1, 2].map((col) => (
                        <rect 
                          key={`${row}-${col}`}
                          x={494 + col * 5} 
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
                  <circle cx="502" cy="327" r="1" fill="#10b981">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Pickup Slot */}
                <rect x="120" y="455" width="355" height="50" rx="6" fill="#163d32" />
                <rect x="120" y="455" width="355" height="50" rx="6" fill="none" stroke="url(#goldAccent3)" strokeWidth="2" />

                {/* Product in pickup slot */}
                {dispensingStep >= 3 && selectedShelfItem && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <rect x="290" y="472" width="16" height="16" rx="2" fill="#8B4513" />
                    <text x="298" y="482" textAnchor="middle" fill="#c9a227" fontSize="4">✓</text>
                  </motion.g>
                )}

                <text x="297.5" y={dispensingStep >= 3 ? "475" : "485"} textAnchor="middle" fill="#c9a227" fontSize="11" fontWeight="bold">
                  {dispensingStep >= 3 ? 'جاهز! ▼' : 'استلم هديتك ▼'}
                </text>

                {/* Status indicator */}
                <g>
                  <rect x="300" y="125" width="100" height="20" rx="10" fill="#1a4d3e" opacity="0.9" />
                  <circle cx="312" cy="135" r="3" fill={isDispensing ? "#fbbf24" : "#10b981"}>
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                  <text x="322" y="138" fill="#c9a227" fontSize="8">
                    {!isDispensing && 'اختر منتجاً'}
                    {isDispensing && dispensingStep === 0 && 'جاري الذهاب للعمود'}
                    {isDispensing && dispensingStep === 1 && 'تحميل المنتج'}
                    {isDispensing && dispensingStep === 2 && 'إنزال المنتج'}
                    {isDispensing && dispensingStep === 3 && 'جاهز!'}
                  </text>
                </g>

                {/* Decorative corners */}
                <rect x="115" y="125" width="15" height="15" fill="url(#goldAccent3)" opacity="0.6" />
                <rect x="470" y="125" width="15" height="15" fill="url(#goldAccent3)" opacity="0.6" />
                <rect x="115" y="445" width="15" height="15" fill="url(#goldAccent3)" opacity="0.6" />
                <rect x="470" y="445" width="15" height="15" fill="url(#goldAccent3)" opacity="0.6" />
              </svg>

              {/* Steps indicator - Mobile optimized */}
              <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-1 md:gap-2" dir="rtl">
                {['ذهاب للعمود', 'تحميل', 'إنزال آمن', 'استلام'].map((step, i) => (
                  <div 
                    key={i}
                    className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
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

 
  {/* Interactive Instructions - جنب بعض تحت مؤشر الخطوات */}
  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 w-full mt-3" dir="rtl">
  <motion.div 
    className="bg-gradient-to-r from-blue-900/40 to-blue-800/30 rounded-xl p-2 xs:p-3 border border-blue-500/30 backdrop-blur-sm"

      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >

       <div className="flex items-center gap-1.5 xs:gap-2 h-full">
      <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-3 h-3 xs:w-4 xs:h-4 text-blue-400" />
      </div>
      <div className="flex-1 text-right">
        <p className="text-white font-semibold text-[10px] xs:text-xs mb-0.5 xs:mb-1">اضغط على الشاشة الكبيرة</p>
        <p className="text-blue-200/60 text-[9px] xs:text-[10px] leading-tight">
          استكشاف المنتجات ومشاهدة قصصها
        </p>
      </div>
    </div>
  </motion.div>
  
  <motion.div 
    className="bg-gradient-to-r from-amber-900/40 to-amber-800/30 rounded-xl p-2 xs:p-3 border border-amber-500/30 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >

       <div className="flex items-center gap-1.5 xs:gap-2 h-full">
      <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
        <ShoppingCart className="w-3 h-3 xs:w-4 xs:h-4 text-amber-400" />
      </div>
      <div className="flex-1 text-right">
        <p className="text-white font-semibold text-[10px] xs:text-xs mb-0.5 xs:mb-1">اضغط على شاشة الدفع</p>
        <p className="text-amber-200/60 text-[9px] xs:text-[10px] leading-tight">
          لتجربة عملية الشراء
        </p>
      </div>
    </div>
  </motion.div>
</div>
          </motion.div>

          


          {/* Right Side - Protection Features */}
          <motion.div 
            className="lg:w-2/5 space-y-4 md:space-y-6 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            dir="rtl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              استلام <span className="text-amber-400">آمن ومحمي</span>
            </h2>
            <p className="text-emerald-100/70 text-sm md:text-base max-w-xl mx-auto">
              اختر منتجاً وشاهد كيف يصل إليك بأمان تام
            </p>

            {protectionFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 rounded-xl md:rounded-2xl p-4 md:p-6 border border-amber-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(251, 191, 36, 0.4)" }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-base md:text-lg mb-1 md:mb-2">{feature.title}</h4>
                    <p className="text-emerald-100/70 text-xs md:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modal overlays */}
        <AnimatePresence>
          {isScreenZoomed && !selectedProduct && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScreenZoomed(false)}
            >
              <motion.div
                className="relative bg-gradient-to-br from-[#f5f0e6] via-[#faf8f3] to-[#f5f0e6] rounded-2xl md:rounded-3xl p-4 md:p-6 max-w-md w-full h-[500px] md:h-[600px] overflow-auto no-scrollbar"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
              >
                {/* Header */}
                <div className="flex items-center justify-center mb-4 md:mb-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <Gift className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-emerald-800 font-bold text-sm md:text-base">هدايا طيبة</h3>
                      <p className="text-emerald-600/70 text-xs">اختر لعرض القصة أو 3D</p>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                  {products.map((product, i) => (
                    <motion.button
                      key={product.id}
                      className="relative p-2 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-300 text-center border-emerald-600/30 bg-white/50 hover:border-amber-500/50 hover:bg-white/70 touch-target"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="w-full aspect-square rounded md:rounded-lg mb-1 md:mb-2 flex items-center justify-center">
                        <span className="text-4xl md:text-5xl lg:text-6xl">{product.icon}</span>
                      </div>

                      <h4 className="text-emerald-800 font-medium text-xs md:text-sm">{product.name}</h4>
                    </motion.button>
                  ))}
                </div>

                <button
                  onClick={() => setIsScreenZoomed(false)}
                  className="absolute top-2 md:top-4 left-2 md:left-4 w-8 h-8 md:w-10 md:h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors touch-target"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Product Detail Inside Screen */}
          {selectedProduct && isScreenZoomed && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
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
                className="relative bg-gradient-to-br from-[#f5f0e6] via-[#faf8f3] to-[#f5f0e6] rounded-2xl md:rounded-3xl p-4 md:p-6 max-w-md w-full h-[500px] md:h-[600px] overflow-hidden"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
              >
                {!viewMode ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full px-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl mb-4 flex items-center justify-center">
                      <span className="text-6xl md:text-7xl">{selectedProduct.icon}</span>
                    </div>
                    <h3 className="text-emerald-800 font-bold text-xl md:text-2xl text-center">{selectedProduct.name}</h3>
                    <p className="text-emerald-600/70 mt-3 max-w-sm text-center text-sm">{selectedProduct.story}</p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center w-full max-w-xs">
                      <motion.button
                        onClick={() => setViewMode('story')}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 rounded-xl text-white hover:bg-emerald-600 transition-colors text-sm touch-target"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        شاهد القصة
                      </motion.button>
                      <motion.button
                        onClick={() => setViewMode('3d')}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 rounded-xl text-white hover:bg-emerald-600 transition-colors text-sm touch-target"
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
                    className="flex flex-col items-center justify-center h-full px-4"
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
                        className="w-40 h-48 md:w-52 md:h-64 flex items-center justify-center"
                        style={{
                          rotateX: rotation.x,
                          rotateY: rotation.y,
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <span className="text-[120px] md:text-[160px] drop-shadow-2xl">{selectedProduct.icon}</span>
                      </motion.div>
                    </motion.div>

                    <div className="mt-4 text-center">
                      <h3 className="text-emerald-800 font-bold text-lg md:text-xl">{selectedProduct.name}</h3>
                    </div>

                    <motion.button 
                      onClick={() => setViewMode(null)}
                      className="mt-5 px-5 py-2.5 bg-emerald-700 rounded-xl text-white hover:bg-emerald-600 transition-colors text-sm touch-target"
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
                  className="absolute top-2 md:top-4 left-2 md:left-4 w-8 h-8 md:w-10 md:h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors z-10 touch-target"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Payment Screen Zoom Overlay */}
          {isPaymentScreenZoomed && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentScreenZoomed(false)}
            >
              <motion.div
                className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-2xl md:rounded-3xl p-4 md:p-6 max-w-md w-full h-[450px] md:h-[500px] overflow-auto border-2 border-amber-500/30 no-scrollbar"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                dir="rtl"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-amber-500/20">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base md:text-lg">اطلب الآن</h3>
                      <p className="text-emerald-400/70 text-xs">اختر المنتجات وادفع</p>
                    </div>
                  </div>
                  <div className="bg-emerald-700/50 px-2 md:px-3 py-1 rounded-full border border-amber-500/30">
                    <span className="text-amber-400 font-bold text-sm md:text-base">{cart.length}</span>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                  {products.map((product) => {
                    const inCart = cart.find(item => item.id === product.id);
                    return (
                      <motion.div
                        key={product.id}
                        className="relative p-2 md:p-4 rounded-lg md:rounded-xl border-2 bg-emerald-900/30 border-emerald-700/50"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-full aspect-square rounded md:rounded-lg mb-1 md:mb-2 flex items-center justify-center">
                          <span className="text-4xl md:text-5xl">{product.icon}</span>
                        </div>
                        
                        <h4 className="text-white font-medium text-xs md:text-sm mb-1 truncate">{product.name}</h4>
                        <div className="flex items-center justify-between mb-1 md:mb-2">
                          <span className="text-amber-400 font-bold text-base md:text-lg">{product.price} ر.س</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-400 fill-amber-400" />
                            <span className="text-emerald-300/70 text-xs">{product.rating}</span>
                          </div>
                        </div>

                        {inCart ? (
                          <div className="flex items-center justify-between bg-emerald-700/50 rounded-lg p-1.5 md:p-2">
                            <button
                              onClick={() => setCart(cart.filter(item => item.id !== product.id))}
                              className="w-6 h-6 md:w-7 md:h-7 bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center text-white font-bold transition-colors touch-target"
                            >
                              -
                            </button>
                            <span className="text-white font-bold text-sm md:text-base">{inCart.quantity}</span>
                            <button
                              onClick={() => setCart(cart.map(item => 
                                item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                              ))}
                              className="w-6 h-6 md:w-7 md:h-7 bg-emerald-600 hover:bg-emerald-500 rounded-md flex items-center justify-center text-white font-bold transition-colors touch-target"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCart([...cart, { ...product, quantity: 1 }])}
                            className="w-full py-1.5 md:py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-bold text-sm md:text-base transition-colors touch-target"
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
                    className="bg-emerald-900/50 rounded-xl p-3 md:p-4 border border-amber-500/30"
                  >
                    <h4 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3">ملخص الطلب</h4>
                    <div className="space-y-1.5 md:space-y-2 mb-2 md:mb-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs md:text-sm">
                          <span className="text-emerald-200 truncate">{item.name} × {item.quantity}</span>
                          <span className="text-amber-400 font-bold whitespace-nowrap">{item.price * item.quantity} ر.س</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-amber-500/20 pt-2 md:pt-3 flex justify-between items-center">
                      <span className="text-white font-bold text-base md:text-lg">الإجمالي</span>
                      <span className="text-amber-400 font-bold text-xl md:text-2xl">
                        {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} ر.س
                      </span>
                    </div>
                    <motion.button
                      className="w-full mt-3 md:mt-4 py-2.5 md:py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg touch-target"
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
                      <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                      <span>ادفع الآن</span>
                    </motion.button>
                  </motion.div>
                )}

                <button
                  onClick={() => setIsPaymentScreenZoomed(false)}
                  className="absolute top-2 md:top-4 left-2 md:left-4 w-8 h-8 md:w-10 md:h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors touch-target"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}