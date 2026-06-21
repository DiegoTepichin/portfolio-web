import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Floating particles — purely decorative, CSS-only performance
// ---------------------------------------------------------------------------

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size:  Math.random() * 2.5 + 0.5,        // 0.5–3px
  x:     Math.random() * 100,               // % horizontal
  delay: Math.random() * 5,                 // stagger
  duration: Math.random() * 8 + 6,          // 6–14s float cycle
  opacity: Math.random() * 0.4 + 0.1,      // 0.1–0.5
}));

function Particles() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            width:  `${p.size}px`,
            height: `${p.size}px`,
            left:   `${p.x}%`,
            bottom: '-4px',
            opacity: p.opacity,
            animation: `particle-rise ${p.duration}s ${p.delay}s ease-in infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animated headline — each word fades + slides up with stagger
// ---------------------------------------------------------------------------

const wordVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const LINE_1 = ['Tu', 'historia', 'construye'];
const LINE_2 = ['nuestra', 'historia.'];

// ---------------------------------------------------------------------------
// Curtain exit — two panels slide UP and DOWN simultaneously
// This is the cinema effect: the screen "opens" to reveal the portfolio.
// ---------------------------------------------------------------------------

const topCurtain = {
  initial:  { y: '0%' },
  exit:     { y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } },
};

const bottomCurtain = {
  initial:  { y: '0%' },
  exit:     { y: '100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } },
};

const contentExit = {
  initial:  { opacity: 1, scale: 1 },
  exit:     {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.35, ease: 'easeIn' },
  },
};

// ---------------------------------------------------------------------------
// EntryOverlay component
// ---------------------------------------------------------------------------

/**
 * EntryOverlay
 * ------------
 * Full-screen cinematic intro screen. Shown once per browser session
 * (sessionStorage key: 'portfolio_entered').
 *
 * Props:
 *   onEnter  — callback fired when the user dismisses the overlay.
 *              Parent should switch `hasEntered` state to trigger unmount.
 *
 * Exit animation:
 *   1. Inner content (text + button) fades + scales down (0.35s).
 *   2. The overlay splits into two curtains that slide off screen (0.85s).
 *   3. AnimatePresence unmounts both curtains after exit.
 */
export default function EntryOverlay({ onEnter }) {
  const [leaving, setLeaving] = useState(false);
  const shouldReduce = useReducedMotion();

  // Pre-load the font to avoid FOUT during the headline reveal
  useEffect(() => {
    document.fonts.ready.then(() => {});
  }, []);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    // Wait for the content fade (350ms) + curtain slide (850ms) + a tiny buffer
    setTimeout(() => {
      onEnter?.();
    }, shouldReduce ? 100 : 1000);
  };

  return (
    <AnimatePresence>
      {!leaving ? (
        // ── NORMAL STATE — full overlay ──
        <motion.div
          key="entry-overlay"
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ backgroundColor: '#080c14' }}
          onClick={handleEnter}
          role="dialog"
          aria-modal="true"
          aria-label="Pantalla de bienvenida. Haz clic para explorar el portafolio."
        >
          {/* Subtle radial glow behind text */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(6,182,212,0.08) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)',
            }}
          />

          {/* Animated grid lines — cinematic depth */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating particles */}
          <Particles />

          {/* ── Center content ── */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 gap-8">

            {/* Eyebrow tag */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ delay: 0.1, duration: 1.1, ease: 'easeOut' }}
              className="text-xs font-medium text-cyan-500 uppercase tracking-[0.25em]"
            >
              Diego Tepichin — Portafolio
            </motion.div>

            {/* Headline — word by word */}
            <div className="text-center leading-tight" aria-label="Tu historia construye nuestra historia">
              {/* Line 1 */}
              <div className="flex flex-wrap justify-center gap-x-[0.35em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                {LINE_1.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Line 2 — gradient words */}
              <div className="flex flex-wrap justify-center gap-x-[0.35em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mt-1">
                {LINE_2.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={LINE_1.length + i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-xs tracking-[0.3em] uppercase text-white/45 text-center"
            >
              Haz clic en cualquier lugar para explorar
            </motion.p>

            {/* Animated Enter button — pulsing ring */}
            <motion.button
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={handleEnter}
              className="relative flex items-center justify-center w-14 h-14 rounded-full border border-cyan-500/60 text-cyan-400 hover:border-cyan-400 transition-colors duration-300 group"
              aria-label="Entrar al portafolio"
            >
              {/* Pulsing outer ring */}
              <span
                className="absolute inset-0 rounded-full border border-cyan-400/30 animate-ping"
                aria-hidden="true"
                style={{ animationDuration: '2.5s' }}
              />
              {/* Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </div>

          {/* Bottom left — subtle timestamp / credits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-6 left-8 text-[10px] text-white/20 font-mono tracking-widest"
            aria-hidden="true"
          >
            MX · 2026
          </motion.div>

          {/* Bottom right — tech stack hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="absolute bottom-6 right-8 text-[10px] text-white/20 font-mono tracking-widest"
            aria-hidden="true"
          >
            React · Vite · Framer
          </motion.div>
        </motion.div>
      ) : (
        // ── LEAVING STATE — curtain reveal ──
        <>
          {/* Content fades first */}
          <motion.div
            key="exit-content"
            className="fixed inset-0 z-[102] flex flex-col items-center justify-center pointer-events-none"
            style={{ backgroundColor: '#080c14' }}
            variants={contentExit}
            initial="initial"
            animate="exit"
          />

          {/* TOP curtain — slides up */}
          <motion.div
            key="curtain-top"
            className="fixed top-0 left-0 right-0 z-[101]"
            style={{
              height: '50%',
              backgroundColor: '#080c14',
              originY: 0,
            }}
            variants={topCurtain}
            initial="initial"
            animate="exit"
          />

          {/* BOTTOM curtain — slides down */}
          <motion.div
            key="curtain-bottom"
            className="fixed bottom-0 left-0 right-0 z-[101]"
            style={{
              height: '50%',
              backgroundColor: '#080c14',
              originY: 1,
            }}
            variants={bottomCurtain}
            initial="initial"
            animate="exit"
          />
        </>
      )}
    </AnimatePresence>
  );
}
