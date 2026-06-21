import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import diegoAvatar from '../assets/diego.jpg';
import Skills from '../components/Skills';
import PageTransition from '../components/PageTransition';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.15, staggerChildren: 0.18 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const aboutContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.14 },
  },
};

const aboutItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Stats bar — shows 3 quick metrics
// ---------------------------------------------------------------------------

const STATS = [
  { value: '3+', label: 'Proyectos' },
  { value: 'Python', label: 'Lenguaje principal' },
  { value: 'Remoto', label: 'Disponibilidad' },
];

function StatsBar() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center items-center sm:divide-x sm:divide-white/10 mt-2"
    >
      {STATS.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center sm:px-8 first:pl-0 last:pr-0">
          <span className="text-2xl font-bold text-cyan-400 tracking-tight leading-none">
            {value}
          </span>
          <span className="text-[11px] text-zinc-500 uppercase tracking-widest mt-1">
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ScrollIndicator
// ---------------------------------------------------------------------------

function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [1, 0]);
  const y = useTransform(scrollY, [0, 80], [0, 12]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
      aria-hidden="true"
    >
      <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-zinc-600">
        Scroll
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-zinc-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        style={{ animation: 'scroll-bounce 1.6s ease-in-out infinite' }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Home() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, shouldReduceMotion ? 0 : -35]);

  return (
    <PageTransition>
      <div className="space-y-0">

        {/* ==============================================================
            HERO SECTION — glass panel over the animated background
        ============================================================== */}
        <section
          ref={heroRef}
          className="relative flex items-center justify-center min-h-[90vh] px-6 py-24 overflow-hidden"
        >
          {/* Subtle dot-grid texture at low opacity */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Hero content — parallax wrapper */}
          <motion.div
            className="relative z-10 w-full max-w-3xl mx-auto text-center"
            style={{ y: heroY }}
          >
            {/* Glass panel behind the text */}
            <div
              className="rounded-3xl px-8 py-12 sm:px-12 sm:py-16"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <motion.div
                variants={heroContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Availability badge */}
                <motion.div variants={fadeUp}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border"
                    style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      borderColor: 'rgba(16, 185, 129, 0.25)',
                      color: '#34d399',
                    }}
                  >
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    Disponible para oportunidades
                  </span>
                </motion.div>

                {/* h1 */}
                <motion.h1
                  variants={fadeUp}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-50 leading-[1.05]"
                >
                  Diego{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #a78bfa 100%)',
                    }}
                  >
                    Tepichin
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={fadeUp}
                  className="text-base sm:text-lg font-semibold text-cyan-400/80 tracking-wide"
                >
                  Ingeniero de Sistemas en formación
                  <span className="mx-2 opacity-30">·</span>
                  Automatización &amp; Infraestructura
                </motion.p>

                {/* Bio */}
                <motion.p
                  variants={fadeUp}
                  className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto leading-relaxed"
                >
                  Estudiante avanzado de Ingeniería en Sistemas con enfoque en backend y
                  automatización. Me apasionan Python, Linux y construir soluciones robustas
                  que resuelvan problemas reales.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                >
                  <Link
                    to="/proyectos"
                    className="btn-ripple group inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
                      boxShadow: '0 0 20px rgba(6,182,212,0.25), 0 4px 16px rgba(0,0,0,0.4)',
                    }}
                  >
                    Ver Proyectos
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    to="/contacto"
                    className="btn-ripple inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm text-zinc-300 transition-all duration-200 hover:text-zinc-100 hover:scale-[1.04] active:scale-[0.97]"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    Contactar
                  </Link>
                </motion.div>

                {/* Stats bar */}
                <StatsBar />
              </motion.div>
            </div>
          </motion.div>

          <ScrollIndicator />
        </section>

        {/* ==============================================================
            SKILLS SECTION
        ============================================================== */}
        <Skills />

        {/* ==============================================================
            ABOUT SECTION
        ============================================================== */}
        <section
          className="relative px-6 py-24 overflow-hidden"
          aria-labelledby="about-heading"
        >
          {/* Glass strip behind the about content */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(255,255,255,0.015)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
            aria-hidden="true"
          />

          <motion.div
            className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={aboutContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Text column */}
            <div className="space-y-6 text-center md:text-left">
              <motion.div variants={aboutItem} className="space-y-2">
                <p id="about-heading" className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-500">
                  Sobre Mí
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-zinc-50 leading-tight">
                  Construyendo sistemas{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #22d3ee, #818cf8)' }}
                  >
                    que escalan
                  </span>
                </h2>
              </motion.div>

              <motion.div
                variants={aboutItem}
                className="text-sm sm:text-base text-zinc-500 space-y-4 leading-relaxed"
              >
                <p>
                  Soy Diego Tepichin, apasionado por la tecnología y la ingeniería de sistemas. Mi enfoque principal es la <strong className="text-zinc-300 font-semibold">automatización</strong>, la infraestructura y el desarrollo backend.
                </p>
                <p>
                  Disfruto creando soluciones eficientes que eliminen tareas repetitivas y optimicen procesos. Me gusta profundizar en cómo funcionan las cosas bajo el capó: Linux, Docker, Python.
                </p>
                <p>
                  Mi objetivo es unirme a un equipo innovador en un entorno <strong className="text-zinc-300 font-semibold">remoto</strong>, aportar valor y desarrollar software de nivel de producción.
                </p>
              </motion.div>

              <motion.div variants={aboutItem} className="pt-2 flex justify-center md:justify-start">
                <a
                  href="https://www.linkedin.com/in/diego-duron-tepichin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ripple inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-zinc-200 hover:text-white transition-colors duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                  Conectar en LinkedIn
                </a>
              </motion.div>
            </div>

            {/* Avatar column — pulsing glow ring */}
            <motion.div variants={aboutItem} className="flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                {/* Outer pulsing glow ring — continuous animation */}
                <motion.div
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'conic-gradient(from 0deg, #06b6d4, #6366f1, #a855f7, #06b6d4)',
                    filter: 'blur(16px)',
                  }}
                  aria-hidden="true"
                />

                {/* Static colored ring */}
                <div
                  className="absolute -inset-1.5 rounded-full pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, #06b6d4, #6366f1, #a855f7, #06b6d4)',
                    animation: shouldReduceMotion ? 'none' : 'aurora-shift 8s linear infinite',
                    opacity: 0.6,
                  }}
                  aria-hidden="true"
                />

                {/* Avatar */}
                <div
                  className="relative w-full h-full rounded-full p-1"
                  style={{ background: '#07090f' }}
                >
                  <img
                    src={diegoAvatar}
                    alt="Diego Tepichin"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
}
