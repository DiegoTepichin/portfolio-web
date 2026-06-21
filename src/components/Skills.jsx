import { motion } from 'framer-motion';
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiLinux,
  SiGnubash,
  SiGit,
  SiDocker,
  SiFlask,
  SiPostgresql,
  SiOpenai,
} from 'react-icons/si';

// ---------------------------------------------------------------------------
// Data — each skill has its official brand color and react-icons component.
// Colors sourced from https://simpleicons.org/ for accuracy.
// ---------------------------------------------------------------------------

const skills = [
  {
    label: 'Python',
    Icon: SiPython,
    // Python's official blue
    color: '#3776AB',
    // Warm yellow used for accents in Python branding
    bg: 'rgba(55, 118, 171, 0.12)',
  },
  {
    label: 'JavaScript',
    Icon: SiJavascript,
    color: '#F7DF1E',
    bg: 'rgba(247, 223, 30, 0.12)',
  },
  {
    label: 'React',
    Icon: SiReact,
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.10)',
  },
  {
    label: 'Tailwind',
    Icon: SiTailwindcss,
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.10)',
  },
  {
    label: 'Linux',
    Icon: SiLinux,
    // Linux uses black/yellow; cyan works better on both themes
    color: '#FCC624',
    bg: 'rgba(252, 198, 36, 0.10)',
  },
  {
    label: 'Bash',
    Icon: SiGnubash,
    color: '#4EAA25',
    bg: 'rgba(78, 170, 37, 0.10)',
  },
  {
    label: 'Git',
    Icon: SiGit,
    color: '#F05032',
    bg: 'rgba(240, 80, 50, 0.10)',
  },
  {
    label: 'Docker',
    Icon: SiDocker,
    color: '#2496ED',
    bg: 'rgba(36, 150, 237, 0.10)',
  },
  {
    label: 'Flask',
    Icon: SiFlask,
    // Flask is black-on-white; we adapt with a neutral that reads on both modes.
    color: '#94a3b8', // slate-400 — visible on both dark and light
    bg: 'rgba(148, 163, 184, 0.10)',
  },
  {
    label: 'SQL',
    Icon: SiPostgresql,
    color: '#4479A1',
    bg: 'rgba(68, 121, 161, 0.12)',
  },
  {
    label: 'Prompt Eng.',
    Icon: SiOpenai,
    // Violet — stands out as a modern AI/LLM skill, distinct from all other brands.
    color: '#7C3AED',
    bg: 'rgba(124, 58, 237, 0.12)',
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

// Section wrapper: fades in when scrolled into view
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

// Grid container: staggers each card on entry
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

// Each card: slides up + fades in with a slight scale
const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// SkillCard sub-component
// ---------------------------------------------------------------------------

function SkillCard({ skill }) {
  const { label, Icon, color, bg } = skill;

  return (
    <motion.li
      variants={cardVariants}
      // Use flex-basis calculation to mimic 2, 3, and 4-column layouts across breakpoints
      // while allowing justify-center to center any partial rows.
      className="w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] group relative"
    >
      {/* Continuous resting glow */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}40, transparent 60%)`,
          filter: 'blur(8px)',
        }}
        aria-hidden="true"
      />

      <div
        className={[
          'relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl h-full',
          'glass-md transition-all duration-300 ease-out',
          'hover:-translate-y-1.5 hover:shadow-xl',
          'cursor-default select-none',
        ].join(' ')}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${color}30, inset 0 1px 0 rgba(255,255,255,0.08)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        {/* Brand icon — size-8 = 2rem */}
        <Icon
          aria-hidden="true"
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          style={{ color }}
        />

        {/* Label */}
        <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-100 transition-colors duration-300">
          {label}
        </span>
      </div>
    </motion.li>
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

export default function Skills() {
  return (
    <section
      className="relative px-6 py-20 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Glass strip behind the skills content */}
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
        className="w-full max-w-4xl mx-auto space-y-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Section header */}
        <div className="text-center space-y-1">
          <p
            id="skills-heading"
            className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500"
          >
            Stack Tecnológico
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Herramientas con las que{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              trabajo
            </span>
          </h2>
        </div>

        {/* Skills grid */}
        <motion.ul
          className="flex flex-wrap justify-center gap-4"
          role="list"
          aria-label="Stack tecnológico de Diego Tepichin"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skills.map((skill) => (
            <SkillCard key={skill.label} skill={skill} />
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
