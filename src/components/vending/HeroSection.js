'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Gift, MapPin, Sparkles,BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeroSection({ scrollProgress }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/80 via-emerald-800/70 to-emerald-900/90" />



      {/* Floating Golden Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-20 gap-8 lg:gap-16">
        
        {/* Left Side - Text Content */}
        <motion.div 
          className="flex-1 text-center lg:text-right order-2 lg:order-1 max-w-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          dir="rtl"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">المدينة المنورة</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            هدية تُقدم
            <span className="block text-amber-400 mt-2">وروح تُهدى</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-emerald-100/80 mb-8 leading-relaxed">
            آلة بيع ذكية توفر لك أجمل الهدايا والتذكارات من المدينة المنورة
            <br />
            <span className="text-amber-300">بلمسة واحدة</span>
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
            {[
              { icon: Gift, text: 'هدايا فريدة' },
              { icon: Sparkles, text: 'جودة عالية' },
              { icon: MapPin, text: 'من قلب المدينة' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <item.icon className="w-5 h-5 text-amber-400" />
                <span className="text-white text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>


        </motion.div>

        {/* Right Side - Vending Machine */}
        <motion.div 
          className="flex-1 flex justify-center order-1 lg:order-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ opacity: 1 - scrollProgress * 0.8 }}
        >
          {/* Enhanced Glow Effects */}
          <motion.div 
            className="absolute w-96 h-96 bg-amber-500/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          
          {/* Floating Sparkles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* Vending Machine - Islamic Design with 3D Perspective */}
          <motion.div 
            className="relative cursor-pointer" 
            style={{ perspective: '1200px' }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToNextSection}
          >
            <motion.svg 
              viewBox="0 0 580 550" 
              className="w-80 md:w-96 lg:w-[550px] drop-shadow-2xl" 
              style={{ transform: 'rotateY(-12deg)', transformStyle: 'preserve-3d' }}
              animate={{ 
                rotateY: [-12, -10, -12],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <defs>
                <linearGradient id="sideGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#143d32" />
                  <stop offset="100%" stopColor="#0f2e26" />
                </linearGradient>
                <linearGradient id="sidePatternGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#143d32" />
                  <stop offset="100%" stopColor="#0a1f1a" />
                </linearGradient>
                <linearGradient id="machineBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a4d3e" />
                  <stop offset="50%" stopColor="#1e5a47" />
                  <stop offset="100%" stopColor="#1a4d3e" />
                </linearGradient>
                <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a67c3d" />
                  <stop offset="50%" stopColor="#c9a227" />
                  <stop offset="100%" stopColor="#a67c3d" />
                </linearGradient>
                <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f5f5f5" />
                  <stop offset="100%" stopColor="#e8e8e8" />
                </linearGradient>
                <linearGradient id="shelfLight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fff8e7" />
                  <stop offset="100%" stopColor="#f5e6c8" />
                </linearGradient>
                <linearGradient id="shelfGlow1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ffa500" stopOpacity="0.1" />
                </linearGradient>
                <pattern id="islamicPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#1a4d3e" />
                  <circle cx="10" cy="10" r="8" fill="none" stroke="#c9a227" strokeWidth="0.5" opacity="0.4" />
                  <path d="M10 2 L10 18 M2 10 L18 10" stroke="#c9a227" strokeWidth="0.3" opacity="0.3" />
                  <path d="M4 4 L16 16 M16 4 L4 16" stroke="#c9a227" strokeWidth="0.3" opacity="0.2" />
                </pattern>
              </defs>

              {/* Shadow */}
              <ellipse cx="290" cy="545" rx="220" ry="12" fill="#000" opacity="0.3" />

              {/* Right Side Panel (3D effect) */}
              <path d="M470 120 L550 90 L550 490 L470 520" fill="url(#sideGradient)" stroke="url(#goldAccent)" strokeWidth="2" />

              {/* Side panel pattern stripes */}
              <path d="M470 120 L550 90 L550 110 L470 140" fill="url(#sidePatternGradient)" stroke="url(#goldAccent)" strokeWidth="1" opacity="0.8" />
              <path d="M470 180 L550 150 L550 170 L470 200" fill="url(#sidePatternGradient)" opacity="0.5" />
              <path d="M470 240 L550 210 L550 230 L470 260" fill="url(#sidePatternGradient)" opacity="0.5" />
              <path d="M470 300 L550 270 L550 290 L470 320" fill="url(#sidePatternGradient)" opacity="0.5" />
              <path d="M470 360 L550 330 L550 350 L470 380" fill="url(#sidePatternGradient)" opacity="0.5" />
              <path d="M470 420 L550 390 L550 410 L470 440" fill="url(#sidePatternGradient)" opacity="0.5" />
              <path d="M470 480 L550 450 L550 490 L470 520" fill="url(#sidePatternGradient)" stroke="url(#goldAccent)" strokeWidth="1" opacity="0.8" />

              {/* Right side top arch extension */}
              <path d="M470 75 Q470 60 485 52 Q500 46 515 40 Q530 50 545 55 L550 90 L470 120 L470 75" fill="url(#sidePatternGradient)" stroke="url(#goldAccent)" strokeWidth="2" />
              <circle cx="515" cy="43" r="3" fill="url(#goldAccent)" />

              {/* Islamic Top with Side Pointed Arches */}
              {/* Left side pointed arch - smaller */}
              <path d="M30 120 L30 75 Q30 60 55 52 Q70 46 85 40 Q100 46 115 52 Q140 60 140 75 L140 120" fill="url(#islamicPattern)" stroke="url(#goldAccent)" strokeWidth="3" />
              <circle cx="85" cy="43" r="3" fill="url(#goldAccent)" />

              {/* Right side pointed arch - smaller */}
              <path d="M360 120 L360 75 Q360 60 385 52 Q400 46 415 40 Q430 46 445 52 Q470 60 470 75 L470 120" fill="url(#islamicPattern)" stroke="url(#goldAccent)" strokeWidth="3" />
              <circle cx="415" cy="43" r="3" fill="url(#goldAccent)" />

              {/* Center pointed arch (Mihrab style) - taller with pattern */}
              <path d="M140 120 L140 60 Q140 40 195 25 Q225 15 250 0 Q275 15 305 25 Q360 40 360 60 L360 120" fill="url(#islamicPattern)" stroke="url(#goldAccent)" strokeWidth="3" />

              {/* Inner arch decoration */}
              <path d="M155 120 L155 65 Q155 45 200 32 Q225 22 250 10 Q275 22 300 32 Q345 45 345 65 L345 120" fill="#1a4d3e" stroke="url(#goldAccent)" strokeWidth="2" />

              {/* Peak ornament */}
              <circle cx="250" cy="3" r="5" fill="url(#goldAccent)" />

              {/* Main Body */}
              <rect x="30" y="120" width="440" height="400" fill="#1e5a47" />
              <rect x="30" y="120" width="440" height="400" fill="none" stroke="url(#goldAccent)" strokeWidth="3" />

              {/* Islamic Pattern Borders - Left */}
              <rect x="30" y="120" width="35" height="400" fill="url(#islamicPattern)" />
              <rect x="30" y="120" width="35" height="400" fill="none" stroke="url(#goldAccent)" strokeWidth="1" />

              {/* Islamic Pattern Borders - Right */}
              <rect x="435" y="120" width="35" height="400" fill="url(#islamicPattern)" />
              <rect x="435" y="120" width="35" height="400" fill="none" stroke="url(#goldAccent)" strokeWidth="1" />

              {/* Top Logo Area */}
              <image href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692dcb8fc91935112f972891/26de27144____1447-06-12__201912_64739d25-removebg-preview.png" x="150" y="60" width="200" height="50" preserveAspectRatio="xMidYMid meet" />

              {/* Left Section - Touch Screen (Display Only) */}
              <g>
                <rect x="70" y="130" width="160" height="320" rx="8" fill="#163d32" />
                <rect x="70" y="130" width="160" height="320" rx="8" fill="none" stroke="url(#goldAccent)" strokeWidth="2" />

                {/* Screen */}
                <rect x="80" y="140" width="140" height="250" rx="4" fill="url(#screenGlow)" />
                
                {/* Screen Glow Animation */}
                <rect x="80" y="140" width="140" height="250" rx="4" fill="#ffffff" opacity="0.05">
                  <animate attributeName="opacity" values="0.05;0.15;0.05" dur="2s" repeatCount="indefinite" />
                </rect>

                {/* Logo on screen */}
                <image href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692dcb8fc91935112f972891/26de27144____1447-06-12__201912_64739d25-removebg-preview.png" x="100" y="200" width="100" height="50" preserveAspectRatio="xMidYMid meet" />

{/* Book Open Icon on Screen */}
<g transform="translate(125, 285)">
  <foreignObject width="50" height="50">
    <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '30px', height: '30px' }}>
      <BookOpen 
        className="text-amber-400" 
        style={{ 
          width: '50px', 
          height: '50px',
          color: '#b5994cff'
        }} 
      />
    </div>
  </foreignObject>
</g>

                {/* Screen Buttons */}
                <rect x="80" y="400" width="60" height="40" rx="4" fill="#163d32" stroke="url(#goldAccent)" strokeWidth="1" />
                <text x="110" y="425" textAnchor="middle" fill="#c9a227" fontSize="10">Buy</text>

                <rect x="150" y="400" width="60" height="40" rx="4" fill="#163d32" stroke="url(#goldAccent)" strokeWidth="1" />
                <text x="180" y="425" textAnchor="middle" fill="#c9a227" fontSize="10">Stories</text>
              </g>

              {/* Right Section - Glass Display */}
              <rect x="245" y="130" width="180" height="320" rx="4" fill="#1a1a1a" />
              <rect x="250" y="135" width="170" height="310" rx="2" fill="url(#shelfLight)" />
              <rect x="245" y="130" width="180" height="320" rx="4" fill="none" stroke="url(#goldAccent)" strokeWidth="2" />

              {/* Shelf 1 - Premium Dates with Animation */}
              <g>
                {/* Shelf Light Animation */}
                <rect x="250" y="140" width="170" height="65" rx="2" fill="url(#shelfGlow1)" opacity="0">
                  <animate attributeName="opacity" values="0;0.15;0" dur="3s" repeatCount="indefinite" />
                </rect>
                
                {/* Date Box 1 - Ajwa */}
                <rect x="255" y="145" width="50" height="55" rx="4" fill="#2a1810" />
                <rect x="258" y="148" width="44" height="35" rx="2" fill="#3d2317" />
                <ellipse cx="280" cy="165" rx="15" ry="10" fill="#1a0f0a" />
                <circle cx="275" cy="163" r="4" fill="#2d1a12" />
                <circle cx="285" cy="167" r="3" fill="#2d1a12" />
                <circle cx="280" cy="162" r="3" fill="#3d2317" />
                <text x="280" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">عجوة</text>
                
                {/* Date Box 2 - Sukkari */}
                <rect x="310" y="145" width="50" height="55" rx="4" fill="#4a3520" />
                <rect x="313" y="148" width="44" height="35" rx="2" fill="#5c4428" />
                <ellipse cx="335" cy="165" rx="15" ry="10" fill="#3d2a15" />
                <circle cx="330" cy="163" r="4" fill="#4a3520" />
                <circle cx="340" cy="167" r="3" fill="#4a3520" />
                <text x="335" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">سكري</text>
                
                {/* Date Box 3 - Amber */}
                <rect x="365" y="145" width="50" height="55" rx="4" fill="#5c3d1e" />
                <rect x="368" y="148" width="44" height="35" rx="2" fill="#6b4a25" />
                <ellipse cx="390" cy="165" rx="15" ry="10" fill="#4a3215" />
                <circle cx="385" cy="163" r="4" fill="#5c3d1e" />
                <circle cx="395" cy="167" r="3" fill="#5c3d1e" />
                <text x="390" y="195" textAnchor="middle" fill="#c9a227" fontSize="6" fontWeight="bold">عنبر</text>
                
                <rect x="250" y="202" width="170" height="3" fill="url(#goldAccent)" opacity="0.9" />
              </g>

              {/* Shelf 2 - Luxury Perfumes */}
              <g>
                {/* Shelf Light Animation */}
                <rect x="250" y="205" width="170" height="65" rx="2" fill="url(#shelfGlow1)" opacity="0">
                  <animate attributeName="opacity" values="0;0.15;0" dur="3s" begin="1s" repeatCount="indefinite" />
                </rect>
                
                {/* Perfume 1 - Oud */}
                <rect x="258" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" />
                <rect x="270" y="235" width="16" height="28" rx="3" fill="#8B5A2B" />
                <rect x="268" y="232" width="20" height="6" rx="1" fill="#c9a227" />
                <rect x="274" y="220" width="8" height="12" rx="1" fill="#c9a227" />
                <circle cx="278" cy="216" r="4" fill="#ffd700" opacity="0.8" />
                
                {/* Perfume 2 - Musk */}
                <rect x="303" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" />
                <path d="M315 263 L315 240 Q315 232 323 232 Q331 232 331 240 L331 263" fill="#f5f5f5" />
                <rect x="313" y="228" width="20" height="6" rx="1" fill="#c9a227" />
                <circle cx="323" cy="222" r="5" fill="#e8e8e8" />
                
                {/* Perfume 3 - Rose */}
                <rect x="348" y="210" width="40" height="55" rx="3" fill="#1a1a1a" opacity="0.3" />
                <rect x="360" y="238" width="16" height="25" rx="2" fill="#d4a5a5" />
                <rect x="358" y="233" width="20" height="7" rx="1" fill="#c9a227" />
                <path d="M368 225 L364 233 L372 233 Z" fill="#c9a227" />
                
                {/* Perfume 4 - Amber */}
                <rect x="393" y="210" width="22" height="55" rx="3" fill="#1a1a1a" opacity="0.3" />
                <rect x="398" y="235" width="12" height="28" rx="2" fill="#ffd700" opacity="0.7" />
                <rect x="396" y="230" width="16" height="6" rx="1" fill="#c9a227" />
                
                <rect x="250" y="267" width="170" height="3" fill="url(#goldAccent)" opacity="0.9" />
              </g>

              {/* Shelf 3 - Prayer Beads (Sibha) */}
              <g>
                {/* Shelf Light Animation */}
                <rect x="250" y="270" width="170" height="60" rx="2" fill="url(#shelfGlow1)" opacity="0">
                  <animate attributeName="opacity" values="0;0.15;0" dur="3s" begin="2s" repeatCount="indefinite" />
                </rect>
                
                {/* Sibha 1 - Rose beads */}
                <rect x="255" y="275" width="50" height="52" rx="4" fill="#1e3a2f" />
                <ellipse cx="280" cy="298" rx="14" ry="18" fill="none" stroke="#c97b63" strokeWidth="4" />
                <circle cx="280" cy="316" r="5" fill="#c97b63" />
                <path d="M280 280 L280 275" stroke="#c97b63" strokeWidth="2" />
                <text x="280" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">ورد</text>
                
                {/* Sibha 2 - Crystal */}
                <rect x="310" y="275" width="50" height="52" rx="4" fill="#1a2f3d" />
                <ellipse cx="335" cy="298" rx="14" ry="18" fill="none" stroke="#87CEEB" strokeWidth="4" />
                <circle cx="335" cy="316" r="5" fill="#87CEEB" />
                <path d="M335 280 L335 275" stroke="#87CEEB" strokeWidth="2" />
                <text x="335" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">كريستال</text>
                
                {/* Sibha 3 - Oud */}
                <rect x="365" y="275" width="50" height="52" rx="4" fill="#2d1f1a" />
                <ellipse cx="390" cy="298" rx="14" ry="18" fill="none" stroke="#8B4513" strokeWidth="4" />
                <circle cx="390" cy="316" r="5" fill="#8B4513" />
                <path d="M390 280 L390 275" stroke="#8B4513" strokeWidth="2" />
                <text x="390" y="322" textAnchor="middle" fill="#c9a227" fontSize="5">عود</text>
                
                <rect x="250" y="329" width="170" height="3" fill="url(#goldAccent)" opacity="0.9" />
              </g>

              {/* Shelf 4 - Books & Qurans */}
              <g>
                {/* Quran 1 */}
                <rect x="255" y="337" width="35" height="48" rx="2" fill="#1e5a47" />
                <rect x="258" y="340" width="29" height="42" rx="1" fill="#2d7a5f" />
                <rect x="262" y="355" width="21" height="3" fill="#c9a227" />
                <rect x="265" y="362" width="15" height="2" fill="#c9a227" opacity="0.6" />
                <path d="M273 348 L268 352 L278 352 Z" fill="#c9a227" />
                
                {/* Quran 2 */}
                <rect x="295" y="337" width="35" height="48" rx="2" fill="#4a1e1e" />
                <rect x="298" y="340" width="29" height="42" rx="1" fill="#6b2d2d" />
                <rect x="302" y="355" width="21" height="3" fill="#c9a227" />
                <rect x="305" y="362" width="15" height="2" fill="#c9a227" opacity="0.6" />
                
                {/* Islamic Book */}
                <rect x="335" y="337" width="35" height="48" rx="2" fill="#1a3d5c" />
                <rect x="338" y="340" width="29" height="42" rx="1" fill="#2a5a7a" />
                <circle cx="352" cy="355" r="8" fill="none" stroke="#c9a227" strokeWidth="1" />
                <path d="M352 349 L352 361 M346 355 L358 355" stroke="#c9a227" strokeWidth="1" />
                
                {/* Prayer Mat rolled */}
                <rect x="375" y="345" width="35" height="40" rx="3" fill="#2d5a4a" />
                <ellipse cx="392" cy="365" rx="12" ry="15" fill="#1e4a3a" />
                <path d="M385 355 Q392 350 399 355" stroke="#c9a227" strokeWidth="1" fill="none" />
                <path d="M385 365 Q392 360 399 365" stroke="#c9a227" strokeWidth="1" fill="none" />
                <path d="M385 375 Q392 370 399 375" stroke="#c9a227" strokeWidth="1" fill="none" />
                
                <rect x="250" y="387" width="170" height="3" fill="url(#goldAccent)" opacity="0.9" />
              </g>

              {/* Shelf 5 - Incense & Misc */}
              <g>
                {/* Bakhoor Box 1 */}
                <rect x="255" y="395" width="45" height="40" rx="3" fill="#3d2a1a" />
                <rect x="260" y="400" width="35" height="25" rx="2" fill="#5c4020" />
                <path d="M277 408 Q277 400 285 408 Q277 416 277 408" fill="#c9a227" opacity="0.6" />
                <text x="277" y="432" textAnchor="middle" fill="#c9a227" fontSize="5">بخور</text>
                
                {/* Bakhoor Box 2 */}
                <rect x="305" y="395" width="45" height="40" rx="3" fill="#2a3d1a" />
                <rect x="310" y="400" width="35" height="25" rx="2" fill="#3d5c20" />
                <circle cx="327" cy="412" r="6" fill="none" stroke="#c9a227" strokeWidth="1" />
                <text x="327" y="432" textAnchor="middle" fill="#c9a227" fontSize="5">عنبر</text>
                
                {/* Miswak Bundle */}
                <rect x="355" y="395" width="25" height="40" rx="2" fill="#4a3d2a" />
                <line x1="362" y1="400" x2="362" y2="430" stroke="#8B7355" strokeWidth="3" />
                <line x1="368" y1="400" x2="368" y2="430" stroke="#9C8465" strokeWidth="3" />
                <line x1="374" y1="402" x2="374" y2="428" stroke="#8B7355" strokeWidth="3" />
                
                {/* Zamzam Water */}
                <rect x="385" y="395" width="28" height="40" rx="3" fill="#e8f4f8" />
                <rect x="390" y="405" width="18" height="25" rx="2" fill="#b8d4e8" />
                <text x="399" y="422" textAnchor="middle" fill="#1e5a47" fontSize="4" fontWeight="bold">زمزم</text>
                <rect x="392" y="400" width="14" height="6" fill="#c9a227" />
              </g>
              
              {/* Pickup Slot */}
              <rect x="70" y="455" width="355" height="50" rx="6" fill="#163d32" />
              <rect x="70" y="455" width="355" height="50" rx="6" fill="none" stroke="url(#goldAccent)" strokeWidth="2" />
              <text x="240" y="485" textAnchor="middle" fill="#c9a227" fontSize="11" fontWeight="bold">استلم هديتك ▼</text>

              {/* Decorative corner pieces */}
              <rect x="65" y="125" width="15" height="15" fill="url(#goldAccent)" opacity="0.6" />
              <rect x="420" y="125" width="15" height="15" fill="url(#goldAccent)" opacity="0.6" />
              <rect x="65" y="445" width="15" height="15" fill="url(#goldAccent)" opacity="0.6" />
              <rect x="420" y="445" width="15" height="15" fill="url(#goldAccent)" opacity="0.6" />
            </motion.svg>

            {/* Floating Info Cards */}
            <motion.div
              className="absolute -right-4 top-10 px-3 py-2 bg-emerald-800/90 backdrop-blur-sm rounded-lg border border-amber-500/30 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-white">متاح 24/7</span>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>

      {/* Brand Logo - Bottom Left */}
      <motion.div 
        className="absolute bottom-6 left-6 md:left-12 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692dcb8fc91935112f972891/26de27144____1447-06-12__201912_64739d25-removebg-preview.png" 
          alt="Taibah" 
          className="h-16 md:h-20 object-contain"
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-emerald-300/60 text-xs">اكتشف المزيد</span>
        <ChevronDown className="w-5 h-5 text-amber-400" />
      </motion.div>
    </section>
  );
}