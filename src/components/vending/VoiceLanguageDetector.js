import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mic, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

/**
 * Floating voice/language widget.
 *
 * Behaviour:
 * 1. Opens as a small globe button (fixed, top-left in LTR / top-right in RTL stays consistent visually).
 * 2. Clicking it expands a panel with:
 *      - language dropdown (manual switch),
 *      - "Recognize by voice" button.
 * 3. Pressing the voice button starts a 5-second mock recording animation,
 *    then automatically switches the whole site language to English.
 *    This is a placeholder for a future AI language-detection model.
 */
export default function VoiceLanguageDetector() {
  const { lang, setLang, t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [showDetected, setShowDetected] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startVoiceRecognition = () => {
    if (isRecording || isProcessing) return;
    setIsRecording(true);
    setRecordingProgress(0);
    setShowDetected(false);

    const totalMs = 5000;
    const stepMs = 50;
    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += stepMs;
      setRecordingProgress(Math.min(100, (elapsed / totalMs) * 100));
      if (elapsed >= totalMs) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        setIsRecording(false);
        setIsProcessing(true);

        // Simulate AI processing for ~700ms then switch language
        timeoutRef.current = setTimeout(() => {
          // Mock model decision: always switch to English (demo)
          setLang('en');
          setIsProcessing(false);
          setShowDetected(true);

          // Hide "detected" badge after a few seconds
          timeoutRef.current = setTimeout(() => {
            setShowDetected(false);
          }, 3500);
        }, 700);
      }
    }, stepMs);
  };

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setDropdownOpen(false);
    setShowDetected(false);
  };

  // Position the widget: fixed on the side opposite to the mobile menu button
  // Mobile menu is top-right in the original site → place widget top-left.
  const positionClass = 'fixed top-4 left-4 z-[60]';

  return (
    <div className={positionClass} dir={dir}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // ---- Collapsed: small globe button ----
          <motion.button
            key="collapsed"
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 bg-emerald-800/90 backdrop-blur-sm rounded-full border border-amber-500/40 flex items-center justify-center shadow-lg hover:shadow-amber-500/20"
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            aria-label={t('voice.title')}
          >
            <Globe className="w-5 h-5 text-amber-400" />
          </motion.button>
        ) : (
          // ---- Expanded panel ----
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="bg-emerald-900/95 backdrop-blur-md rounded-2xl border border-amber-500/30 shadow-2xl p-4 w-[280px] sm:w-[300px]"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-emerald-800/80 border border-amber-500/30 flex items-center justify-center hover:bg-emerald-700 transition-colors"
                aria-label="close"
              >
                <Globe className="w-4 h-4 text-amber-400" />
              </button>

              <div className={`flex-1 ${lang === 'ar' ? 'text-right pr-3' : 'text-left pl-3'}`}>
                <h3 className="text-amber-400 font-bold text-base leading-tight">
                  {t('voice.title')}
                </h3>
                <p className="text-emerald-100/70 text-xs mt-0.5">
                  {t('voice.subtitle')}
                </p>
              </div>
            </div>

            {/* Language dropdown */}
            <div className="relative mb-3">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between bg-emerald-800/60 border border-amber-500/20 rounded-xl px-3 py-2.5 text-white text-sm hover:bg-emerald-800/80 transition"
              >
                <ChevronDown
                  className={`w-4 h-4 text-amber-400 transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
                <span className="font-medium">
                  {lang === 'ar' ? t('voice.lang_ar') : t('voice.lang_en')}
                </span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute left-0 right-0 mt-1 bg-emerald-900/95 border border-amber-500/30 rounded-xl overflow-hidden shadow-xl z-10"
                  >
                    {[
                      { code: 'ar', label: t('voice.lang_ar') },
                      { code: 'en', label: t('voice.lang_en') },
                    ].map((opt) => (
                      <li key={opt.code}>
                        <button
                          onClick={() => handleLangChange(opt.code)}
                          className={`w-full px-3 py-2 text-sm text-white hover:bg-emerald-800/80 transition flex items-center justify-between ${
                            lang === opt.code ? 'bg-emerald-800/60' : ''
                          }`}
                        >
                          {lang === opt.code && (
                            <CheckCircle2 className="w-4 h-4 text-amber-400" />
                          )}
                          <span className={lang === opt.code ? '' : 'mr-auto'}>
                            {opt.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Voice recognition button */}
            <motion.button
              onClick={startVoiceRecognition}
              disabled={isRecording || isProcessing}
              className="relative w-full overflow-hidden rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-90 text-emerald-950 font-bold py-3 px-3 flex items-center justify-center gap-2 shadow-lg transition-colors"
              whileTap={{ scale: isRecording || isProcessing ? 1 : 0.97 }}
            >
              {/* Progress fill while recording */}
              {isRecording && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-amber-300/50"
                  style={{ width: `${recordingProgress}%` }}
                />
              )}

              <span className="relative z-10 flex items-center gap-2">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t('voice.detecting')}</span>
                  </>
                ) : isRecording ? (
                  <>
                    <motion.span
                      className="inline-block w-3 h-3 rounded-full bg-red-600"
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                    <span>{t('voice.listening')}</span>
                    <span className="font-mono text-sm">
                      {Math.ceil(5 - (recordingProgress / 100) * 5)}s
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{t('voice.recognize_btn')}</span>
                    <Mic className="w-4 h-4" />
                  </>
                )}
              </span>
            </motion.button>

            {/* Detected language banner */}
            <AnimatePresence>
              {showDetected && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-3 bg-emerald-800/70 border border-amber-500/30 rounded-xl px-3 py-2 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span className="text-white text-xs font-medium">
                    {t('voice.detected')}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
