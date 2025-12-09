import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Animated Character SVG Component
const AnimatedCharacter = ({ action, color = "#8B4513" }) => {
  const characterVariants = {
    picking: {
      // شخص يقطف الورد
      body: (
        <g>
          {/* Head */}
          <motion.circle cx="50" cy="25" r="12" fill="#FDBF6F" stroke="#E8A84C" strokeWidth="1" />
          {/* Ghutrah (head cover) */}
          <motion.path d="M38 20 Q50 10 62 20 L60 28 Q50 22 40 28 Z" fill="white" stroke="#ccc" strokeWidth="0.5" />
          <motion.path d="M42 25 Q50 30 58 25" fill="none" stroke="#222" strokeWidth="0.5" />
          {/* Body - Thobe */}
          <motion.path d="M40 35 L35 80 L65 80 L60 35 Q50 40 40 35" fill="white" stroke="#ddd" strokeWidth="1" />
          {/* Arm picking */}
          <motion.path 
            d="M60 45 Q75 35 80 25" 
            fill="none" 
            stroke="#FDBF6F" 
            strokeWidth="6" 
            strokeLinecap="round"
            animate={{ d: ["M60 45 Q75 35 80 25", "M60 45 Q75 30 85 20", "M60 45 Q75 35 80 25"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Hand */}
          <motion.circle 
            cx="80" cy="25" r="5" fill="#FDBF6F"
            animate={{ cx: [80, 85, 80], cy: [25, 20, 25] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Rose being picked */}
          <motion.g
            animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <circle cx="85" cy="15" r="6" fill="#FF6B8A" />
            <circle cx="82" cy="12" r="4" fill="#FF8FAB" />
            <circle cx="88" cy="12" r="4" fill="#FF8FAB" />
            <circle cx="85" cy="10" r="3" fill="#FFB6C8" />
          </motion.g>
          {/* Rose bush */}
          <path d="M70 80 Q75 60 90 50 Q95 45 100 50 Q105 55 100 60" fill="#2D5A27" />
          <circle cx="95" cy="48" r="5" fill="#FF6B8A" />
          <circle cx="100" cy="55" r="4" fill="#FF8FAB" />
        </g>
      )
    },
    grinding: {
      // شخص يطحن الورد
      body: (
        <g>
          {/* Head */}
          <motion.circle cx="50" cy="30" r="12" fill="#FDBF6F" stroke="#E8A84C" strokeWidth="1" />
          {/* Ghutrah */}
          <motion.path d="M38 25 Q50 15 62 25 L60 33 Q50 27 40 33 Z" fill="white" stroke="#ccc" strokeWidth="0.5" />
          {/* Body sitting */}
          <motion.path d="M35 40 L30 75 L70 75 L65 40 Q50 45 35 40" fill="white" stroke="#ddd" strokeWidth="1" />
          {/* Arms grinding */}
          <motion.path 
            d="M35 50 L25 60" 
            fill="none" 
            stroke="#FDBF6F" 
            strokeWidth="6" 
            strokeLinecap="round"
            animate={{ rotate: [0, -15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "35px", originY: "50px" }}
          />
          <motion.path 
            d="M65 50 L75 60" 
            fill="none" 
            stroke="#FDBF6F" 
            strokeWidth="6" 
            strokeLinecap="round"
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "65px", originY: "50px" }}
          />
          {/* Mortar and pestle */}
          <motion.ellipse cx="50" cy="70" rx="20" ry="8" fill="#8B4513" />
          <motion.path d="M30 70 Q30 55 50 55 Q70 55 70 70" fill="#A0522D" stroke="#8B4513" strokeWidth="2" />
          {/* Pestle */}
          <motion.rect 
            x="47" y="45" width="6" height="25" rx="2" fill="#6B3E0A"
            animate={{ rotate: [-10, 10, -10], y: [0, 3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ originX: "50px", originY: "70px" }}
          />
          {/* Rose petals inside */}
          <circle cx="45" cy="62" r="3" fill="#FF6B8A" opacity="0.8" />
          <circle cx="55" cy="63" r="2" fill="#FF8FAB" opacity="0.8" />
          <circle cx="50" cy="60" r="2" fill="#FFB6C8" opacity="0.8" />
        </g>
      )
    },
    shaping: {
      // شخص يشكل الخرز
      body: (
        <g>
          {/* Head */}
          <motion.circle cx="50" cy="30" r="12" fill="#FDBF6F" stroke="#E8A84C" strokeWidth="1" />
          {/* Ghutrah */}
          <motion.path d="M38 25 Q50 15 62 25 L60 33 Q50 27 40 33 Z" fill="white" stroke="#ccc" strokeWidth="0.5" />
          {/* Body */}
          <motion.path d="M35 40 L32 80 L68 80 L65 40 Q50 45 35 40" fill="white" stroke="#ddd" strokeWidth="1" />
          {/* Arms working */}
          <motion.path 
            d="M40 50 Q45 60 50 65" 
            fill="none" 
            stroke="#FDBF6F" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
          <motion.path 
            d="M60 50 Q55 60 50 65" 
            fill="none" 
            stroke="#FDBF6F" 
            strokeWidth="6" 
            strokeLinecap="round"
          />
          {/* Hands rolling */}
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50px", originY: "68px" }}
          >
            <circle cx="47" cy="68" r="4" fill="#FDBF6F" />
            <circle cx="53" cy="68" r="4" fill="#FDBF6F" />
          </motion.g>
          {/* Bead being formed */}
          <motion.circle 
            cx="50" cy="68" r="5" 
            fill="#C97B63"
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          {/* Work table */}
          <rect x="25" y="75" width="50" height="5" fill="#8B4513" rx="1" />
          {/* Finished beads */}
          <circle cx="30" cy="73" r="3" fill="#C97B63" />
          <circle cx="38" cy="73" r="3" fill="#C97B63" />
          <circle cx="62" cy="73" r="3" fill="#C97B63" />
          <circle cx="70" cy="73" r="3" fill="#C97B63" />
        </g>
      )
    },
    stringing: {
      // شخص ينظم الخرز
      body: (
        <g>
          {/* Head */}
          <motion.circle cx="50" cy="30" r="12" fill="#FDBF6F" stroke="#E8A84C" strokeWidth="1" />
          {/* Ghutrah */}
          <motion.path d="M38 25 Q50 15 62 25 L60 33 Q50 27 40 33 Z" fill="white" stroke="#ccc" strokeWidth="0.5" />
          {/* Body */}
          <motion.path d="M35 40 L32 80 L68 80 L65 40 Q50 45 35 40" fill="white" stroke="#ddd" strokeWidth="1" />
          {/* Arms holding string */}
          <motion.path d="M35 50 L20 55" fill="none" stroke="#FDBF6F" strokeWidth="6" strokeLinecap="round" />
          <motion.path d="M65 50 L80 55" fill="none" stroke="#FDBF6F" strokeWidth="6" strokeLinecap="round" />
          {/* String with beads */}
          <motion.path 
            d="M20 55 Q50 70 80 55" 
            fill="none" 
            stroke="#4A3728" 
            strokeWidth="1"
          />
          {/* Beads on string */}
          {[25, 35, 45, 55, 65, 75].map((x, i) => (
            <motion.circle 
              key={i}
              cx={x} 
              cy={60 + Math.sin((x - 20) * 0.05) * 8} 
              r="4" 
              fill="#C97B63"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          {/* New bead being added */}
          <motion.circle 
            cx="50" cy="50" r="4" fill="#C97B63"
            animate={{ y: [0, 15], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </g>
      )
    },
    finished: {
      // السبحة الجاهزة
      body: (
        <g>
          {/* Glowing background */}
          <motion.circle 
            cx="50" cy="50" r="35" 
            fill="url(#goldGlow)"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Sibha - Prayer beads */}
          <motion.g
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ originX: "50px", originY: "50px" }}
          >
            {/* Main loop of beads */}
            {[...Array(20)].map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const x = 50 + Math.cos(angle) * 25;
              const y = 50 + Math.sin(angle) * 25;
              return (
                <motion.circle 
                  key={i}
                  cx={x} 
                  cy={y} 
                  r="4" 
                  fill="#C97B63"
                  stroke="#A65D4E"
                  strokeWidth="0.5"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                />
              );
            })}
            {/* Imama (tassel connector) */}
            <ellipse cx="50" cy="20" rx="5" ry="8" fill="#8B4513" stroke="#6B3E0A" strokeWidth="1" />
            {/* Tassel */}
            <motion.g
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ originX: "50px", originY: "12px" }}
            >
              <rect x="48" y="5" width="4" height="10" fill="#2D5A27" />
              <path d="M46 5 Q50 0 54 5" fill="#2D5A27" />
            </motion.g>
          </motion.g>
          {/* Sparkles */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={30 + i * 10}
              cy={25 + (i % 2) * 50}
              r="2"
              fill="#FFD700"
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          <defs>
            <radialGradient id="goldGlow">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
          </defs>
        </g>
      )
    }
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {characterVariants[action]?.body}
    </svg>
  );
};

const productStories = {
  1: { // سبحة كريستال
    name: "سبحة ورد طيبة",
    scenes: [
      { animation: "picking", text: "في بساتين المدينة المنورة... يُقطف الورد بعناية", bg: "from-emerald-700 to-emerald-800" },
      { animation: "grinding", text: "يُجفف ويُطحن بحرفية عالية", bg: "from-amber-800 to-amber-900" },
      { animation: "shaping", text: "يُعجن ويُشكّل خرزات صغيرة", bg: "from-rose-800 to-rose-900" },
      { animation: "stringing", text: "تُنظم الخرزات بخيط متين", bg: "from-slate-700 to-slate-800" },
      { animation: "finished", text: "سبحة برائحة ورد المدينة", bg: "from-amber-700 to-amber-800" },
    ]
  },
  2: { // عطر العود
    name: "عطر العود",
    scenes: [
      { icon: "🌳", text: "في غابات آسيا الاستوائية...", bg: "from-green-900 to-green-950" },
      { icon: "🪓", text: "يُقطع خشب العود المعتق", bg: "from-amber-900 to-amber-950" },
      { icon: "🚢", text: "يُنقل إلى ورش المدينة", bg: "from-blue-900 to-blue-950" },
      { icon: "🔥", text: "يُوضع في القدور النحاسية", bg: "from-orange-800 to-red-900" },
      { icon: "💨", text: "يُقطر ببطء لساعات طويلة", bg: "from-slate-700 to-slate-800" },
      { icon: "🧪", text: "يُمزج بالمسك والعنبر", bg: "from-purple-800 to-purple-900" },
      { icon: "✨", text: "يُعبأ في قوارير كريستالية", bg: "from-amber-600 to-amber-700" },
      { icon: "🌸", text: "عطر ملكي من طيبة", bg: "from-rose-700 to-rose-800" },
    ]
  },
  3: { // تمر عجوة
    name: "تمر عجوة",
    scenes: [
      { icon: "🌴", text: "في مزارع المدينة المباركة...", bg: "from-emerald-900 to-emerald-950" },
      { icon: "☀️", text: "تحت أشعة الشمس الدافئة", bg: "from-amber-600 to-orange-700" },
      { icon: "👨‍🌾", text: "يتسلق المزارعون النخيل", bg: "from-amber-800 to-amber-900" },
      { icon: "✂️", text: "يُقطف التمر بحذر شديد", bg: "from-amber-700 to-amber-800" },
      { icon: "🧺", text: "يُفرز ويُنقى بعناية", bg: "from-amber-900 to-amber-950" },
      { icon: "📦", text: "يُعبأ طازجاً في علب فاخرة", bg: "from-slate-700 to-slate-800" },
      { icon: "🤲", text: "تمر مبارك من أرض الرسول ﷺ", bg: "from-emerald-700 to-emerald-800" },
    ]
  },
  4: { // مصحف فاخر
    name: "مصحف فاخر",
    scenes: [
      { icon: "🌲", text: "من أجود أنواع الورق...", bg: "from-emerald-900 to-emerald-950" },
      { icon: "📄", text: "يُصنع ورق شامواه فاخر", bg: "from-amber-100 to-amber-200" },
      { icon: "✒️", text: "يكتب الخطاطون بخط النسخ", bg: "from-slate-800 to-slate-900" },
      { icon: "🎨", text: "تُرسم الزخارف الذهبية", bg: "from-amber-600 to-amber-700" },
      { icon: "🐄", text: "يُدبغ الجلد الطبيعي", bg: "from-amber-800 to-amber-900" },
      { icon: "📖", text: "يُغلف بحرفية عالية", bg: "from-emerald-800 to-emerald-900" },
      { icon: "💚", text: "مصحف يبقى ذكرى للأبد", bg: "from-emerald-700 to-emerald-800" },
    ]
  },
  5: { // بخور فاخر
    name: "بخور فاخر",
    scenes: [
      { icon: "🌳", text: "من أشجار العود المعمرة...", bg: "from-green-900 to-green-950" },
      { icon: "🪵", text: "يُقطع الخشب العتيق", bg: "from-amber-800 to-amber-900" },
      { icon: "⚖️", text: "يُطحن ويُوزن بدقة", bg: "from-slate-700 to-slate-800" },
      { icon: "🍯", text: "يُمزج بالعسل والعنبر", bg: "from-amber-600 to-amber-700" },
      { icon: "👐", text: "يُعجن بالطريقة التقليدية", bg: "from-amber-700 to-amber-800" },
      { icon: "🔲", text: "يُشكّل قطعاً متساوية", bg: "from-slate-600 to-slate-700" },
      { icon: "📦", text: "يُعبأ في علب خشبية أنيقة", bg: "from-amber-800 to-amber-900" },
      { icon: "💨", text: "بخور برائحة روحانية ساحرة", bg: "from-purple-800 to-purple-900" },
    ]
  },
  6: { // سجادة صلاة
    name: "سجادة صلاة",
    scenes: [
      { icon: "🏭", text: "في مصانع تركيا العريقة...", bg: "from-blue-900 to-blue-950" },
      { icon: "🧶", text: "يُغزل القطن المصري الفاخر", bg: "from-amber-100 to-amber-200" },
      { icon: "🎨", text: "تُصمم نقوش المسجد النبوي", bg: "from-emerald-800 to-emerald-900" },
      { icon: "🧵", text: "يُلون الخيط بألوان ثابتة", bg: "from-teal-700 to-teal-800" },
      { icon: "🔲", text: "تُنسج على الأنوال التقليدية", bg: "from-amber-700 to-amber-800" },
      { icon: "✂️", text: "تُقص وتُشذب بدقة", bg: "from-slate-700 to-slate-800" },
      { icon: "🧎", text: "سجادة تُريح قلبك في كل صلاة", bg: "from-emerald-700 to-emerald-800" },
    ]
  },
};

export default function ProductStory({ product, onClose }) {
  const [currentScene, setCurrentScene] = useState(0);
  const story = productStories[product.id];
  
  useEffect(() => {
    if (!story) return;
    
    const interval = setInterval(() => {
      setCurrentScene(prev => {
        if (prev >= story.scenes.length - 1) {
          return 0; // Loop back
        }
        return prev + 1;
      });
    }, 3500); // Longer duration for animated scenes
    
    return () => clearInterval(interval);
  }, [story]);

  if (!story) return null;

  const scene = story.scenes[currentScene];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-xl m-0 p-0" style={{ margin: 0, padding: 0 }}>
      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-3 left-3 z-30 w-8 h-8 bg-black/50 hover:bg-red-500/80 rounded-full flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4 text-white" />
      </motion.button>

      {/* Background transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          className={`absolute inset-0 bg-gradient-to-br ${scene.bg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Ambient particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Scene content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          className="relative z-10 text-center px-6 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Character or Icon */}
          <div className="w-48 h-48 md:w-64 md:h-64 mb-6">
            {scene.animation ? (
              <AnimatedCharacter action={scene.animation} />
            ) : (
              <motion.div
                className="text-8xl md:text-9xl h-full flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {scene.icon}
              </motion.div>
            )}
          </div>
          
          {/* Text */}
          <motion.p
            className="text-white text-xl md:text-2xl font-bold max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {scene.text}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-4 flex gap-2">
        {story.scenes.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentScene ? 'bg-white w-6' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Product name */}
      <div className="absolute top-3 right-3 px-3 py-1 bg-black/30 rounded-full">
        <span className="text-white/80 text-sm">{story.name}</span>
      </div>
    </div>
  );
}