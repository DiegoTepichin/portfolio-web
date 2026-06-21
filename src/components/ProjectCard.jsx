import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

// ---------------------------------------------------------------------------
// Animation variant — used by the parent grid's staggerChildren
// ---------------------------------------------------------------------------

export const cardVariants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Accent color map — controls border, glow and button tints per-project
// ---------------------------------------------------------------------------

const accentMap = {
  cyan: {
    border:  'hover:border-cyan-400/60 dark:hover:border-cyan-500/50',
    glow:    'hover:shadow-cyan-500/20',
    btn:     'border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent',
    spotlight: 'rgba(6, 182, 212, 0.12)',
  },
  green: {
    border:  'hover:border-green-400/60 dark:hover:border-green-500/50',
    glow:    'hover:shadow-green-500/20',
    btn:     'border-green-500 text-green-600 dark:text-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-600 hover:text-white hover:border-transparent',
    spotlight: 'rgba(34, 197, 94, 0.12)',
  },
  orange: {
    border:  'hover:border-orange-400/60 dark:hover:border-orange-500/50',
    glow:    'hover:shadow-orange-500/20',
    btn:     'border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white hover:border-transparent',
    spotlight: 'rgba(249, 115, 22, 0.12)',
  },
  purple: {
    border:  'border-purple-400/70 dark:border-purple-500/60',
    glow:    'hover:shadow-purple-500/25',
    btn:     'border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 hover:text-white hover:border-transparent',
    spotlight: 'rgba(168, 85, 247, 0.14)',
  },
};

// ---------------------------------------------------------------------------
// useCardTilt hook
// Tracks mouse position relative to the card and computes rotateX/rotateY
// using Framer Motion's spring for smooth, physics-based response.
// ---------------------------------------------------------------------------

function useCardTilt(spotlightColor) {
  const cardRef = useRef(null);

  // Raw mouse position (0-1 normalized)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spotlight position in CSS percentage units
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  // Spring config: low stiffness = smooth, responsive feel
  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [6, -6]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-6, 6]),
    springConfig
  );

  // Build the spotlight gradient string as a live MotionValue using useMotionTemplate.
  // We interpolate spotX and spotY (numeric 0-100) directly into the gradient string.
  // spotlightColor is a plain string — we pass it as a parameter since hooks can't
  // close over component variables defined after the hook call.
  const spotlightBg = useMotionTemplate`radial-gradient(300px circle at ${spotX}% ${spotY}%, ${spotlightColor}, transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
    spotX.set(x * 100);
    spotY.set(y * 100);
  };

  const handleMouseLeave = () => {
    // Smoothly snap back to flat (center position)
    mouseX.set(0.5);
    mouseY.set(0.5);
    spotX.set(50);
    spotY.set(50);
  };

  return { cardRef, rotateX, rotateY, spotlightBg, handleMouseMove, handleMouseLeave };
}

// ---------------------------------------------------------------------------
// ProjectCard component
// ---------------------------------------------------------------------------

export default function ProjectCard({ project }) {
  const { accent = 'cyan', featured } = project;
  const colors = accentMap[accent] ?? accentMap.cyan;

  const { cardRef, rotateX, rotateY, spotlightBg, handleMouseMove, handleMouseLeave } =
    useCardTilt(colors.spotlight);

  const isGitHub = project.link.includes('github.com');

  return (
    /**
     * OUTER wrapper: handles the 3D perspective. We keep perspective on the
     * wrapper (not the card itself) so the z-depth is correct.
     * perspective-1000 is set inline because Tailwind v4 doesn't expose it
     * as a utility out of the box.
     */
    <div style={{ perspective: '1000px' }} className="group">
      <motion.article
        ref={cardRef}
        variants={cardVariants}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          animation: `pulse-glow-${accent} 4s infinite ease-in-out`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={[
          // Base
          'relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300',
          // Lift on hover
          'hover:-translate-y-3',
          // Featured vs normal background
          featured
            ? [
                'glass-md border-purple-500/30',
                'bg-gradient-to-br from-purple-900/20 to-pink-900/10',
              ].join(' ')
            : [
                'glass',
                colors.border,
              ].join(' '),
        ].join(' ')}
        aria-label={`Proyecto: ${project.name}`}
      >
        {/* ================================================================
            SPOTLIGHT OVERLAY
            A radial gradient that follows the mouse position within the card.
            Creates the illusion of a light source tracking the cursor.
            opacity-0 by default, transitions to opacity-100 on hover via CSS.
        ================================================================ */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBg }}
          aria-hidden="true"
        />

        {/* ================================================================
            GRADIENT HEADER — visual placeholder with project icon
        ================================================================ */}
        <div
          className={[
            'relative h-44 flex items-center justify-center flex-shrink-0',
            'bg-gradient-to-br mix-blend-soft-light opacity-90',
            project.gradient,
          ].join(' ')}
          aria-hidden="true"
        >
          {/* Dot-grid texture overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />

          {/* Project hero icon — scale and float on group hover */}
          <project.HeroIcon
            className="w-16 h-16 text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
          />

          {/* Featured ribbon */}
          {featured && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-sm tracking-wide">
              ⭐ Caso de Estudio
            </span>
          )}
        </div>

        {/* ================================================================
            CARD BODY
        ================================================================ */}
        <div className="relative flex flex-col gap-4 p-5 flex-grow">

          {/* Title */}
          <h2 className="font-mono font-bold text-base sm:text-lg tracking-tight text-zinc-50 leading-snug">
            {project.name}
          </h2>

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Tech chips with react-icons */}
          <ul
            className="flex flex-wrap gap-2"
            role="list"
            aria-label={`Tecnologías: ${project.tech.map((t) => t.label).join(', ')}`}
          >
            {project.tech.map(({ label, Icon, color }) => (
              <li key={label}>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 text-zinc-300 transition-colors duration-200"
                  style={{ boxShadow: `inset 0 0 0 1px ${color}22` }}
                >
                  <Icon
                    aria-hidden="true"
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color }}
                  />
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isGitHub ? `Ver repositorio de ${project.name} en GitHub` : `Visitar demostración de ${project.name}`}
            className={[
              'btn-ripple mt-1 inline-flex items-center justify-center gap-2',
              'w-full py-2.5 px-4 rounded-xl text-sm font-semibold',
              'border-2',
              'transition-all duration-250',
              colors.btn,
            ].join(' ')}
          >
            {isGitHub ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            )}
            {isGitHub ? 'Ver repositorio' : 'Visitar demostración'}
            <span aria-hidden="true" className="ml-auto transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </motion.article>
    </div>
  );
}
