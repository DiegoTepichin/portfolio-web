import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  SiPython,
  SiGnubash,
  SiLinux,
  SiFlask,
  SiDocker,
  SiGithubactions,
  SiTerraform,
  SiGooglecloud,
  SiScikitlearn,
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiPostgresql,
  SiOpenai,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

import diegoAvatar from '../assets/diego.jpg';
import PageTransition from '../components/PageTransition';

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const SKILLS = [
  { label: 'Python', Icon: SiPython, color: '#3776AB' },
  { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { label: 'React', Icon: SiReact, color: '#61DAFB' },
  { label: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
  { label: 'Linux', Icon: SiLinux, color: '#FCC624' },
  { label: 'Bash', Icon: SiGnubash, color: '#4EAA25' },
  { label: 'Git', Icon: SiGit, color: '#F05032' },
  { label: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { label: 'Flask', Icon: SiFlask, color: '#94a3b8' },
  { label: 'SQL', Icon: SiPostgresql, color: '#4479A1' },
  { label: 'Terraform', Icon: SiTerraform, color: '#7B42BC' },
  { label: 'AWS', Icon: FaAws, color: '#FF9900' },
  { label: 'GCP', Icon: SiGooglecloud, color: '#4285F4' },
  { label: 'CI/CD', Icon: SiGithubactions, color: '#2088FF' },
  { label: 'Sklearn', Icon: SiScikitlearn, color: '#F7931E' },
  { label: 'Prompt Eng.', Icon: SiOpenai, color: '#7C3AED' },
];

const FEATURED_PROJECT = {
  name: 'CAFE Dynamic Pricing',
  tag: 'ML · Pricing',
  description:
    'Motor de pricing dinámico con ML e inferencia causal. Causal Adaptive Fusion Engine v2.2 — optimización de precios en tiempo real.',
  tech: ['Python', 'Scikit-learn', 'Prompt Eng.'],
  link: 'https://cafe-pricing.com/?lang=en#pricing',
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const skillItem = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-24">
        <title>Diego Tepichin — Systems Engineer · Automation & Infrastructure</title>

        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════ */}
        <section className="space-y-8">
          {/* Availability badge */}
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
            <span
              className="badge-glow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(232, 93, 38, 0.1)',
                border: '1px solid rgba(232, 93, 38, 0.3)',
                color: '#e85d26',
              }}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="dot-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
              </span>
              <FiMapPin className="w-3 h-3" aria-hidden="true" />
              Disponible · Remoto
            </span>
          </motion.div>

          {/* Name + Role */}
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
            {/* Avatar */}
            <motion.div
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              animate="visible"
              className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0"
            >
              {/* Ember ring */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #e85d26, #f59e0b, #c2410c, #e85d26)',
                  opacity: 0.5,
                  filter: 'blur(3px)',
                }}
                aria-hidden="true"
              />
              <img
                src={diegoAvatar}
                alt="Diego Tepichin"
                className="relative w-full h-full rounded-full object-cover"
                style={{ border: '3px solid #0c0a09' }}
              />
            </motion.div>

            {/* Text */}
            <div className="space-y-3">
              <motion.h1
                variants={fadeUp}
                custom={0.15}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-display)', color: '#faf7f2' }}
              >
                Diego{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #e85d26 0%, #f59e0b 60%, #c2410c 100%)',
                  }}
                >
                  Tepichin
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.25}
                initial="hidden"
                animate="visible"
                className="text-base sm:text-lg font-medium"
                style={{ color: '#78716c' }}
              >
                Ingeniero de Sistemas — Automatización & Infraestructura
              </motion.p>

              {/* Social links */}
              <motion.div
                variants={fadeUp}
                custom={0.35}
                initial="hidden"
                animate="visible"
                className="flex gap-3 pt-1"
              >
                <a
                  href="https://github.com/DiegoTepichin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(250, 247, 242, 0.04)',
                    border: '1px solid rgba(250, 247, 242, 0.08)',
                    color: '#a8a29e',
                  }}
                  aria-label="GitHub"
                >
                  <FaGithub className="w-3.5 h-3.5" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/diego-duron-tepichin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(232, 93, 38, 0.08)',
                    border: '1px solid rgba(232, 93, 38, 0.2)',
                    color: '#e85d26',
                  }}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </motion.div>
            </div>
          </div>

          {/* About */}
          <motion.p
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            animate="visible"
            className="text-sm sm:text-base leading-relaxed max-w-2xl"
            style={{ color: '#78716c' }}
          >
            Estudiante de Ingeniería en Sistemas con enfoque en automatización, infraestructura
            cloud y desarrollo web. Construyo herramientas que resuelven problemas reales con
            Python, Docker y CI/CD. Busco oportunidades remotas donde pueda crecer como ingeniero y
            aportar desde el día uno.
          </motion.p>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SKILLS SECTION
        ═══════════════════════════════════════════════════════════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} custom={0}>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: '#e85d26' }}
            >
              Stack Tecnológico
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mt-1"
              style={{ fontFamily: 'var(--font-display)', color: '#faf7f2' }}
            >
              Herramientas con las que trabajo
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap gap-3"
          >
            {SKILLS.map(({ label, Icon, color }) => (
              <motion.div
                key={label}
                variants={skillItem}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium cursor-default transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: '#1c1917',
                  border: '1px solid rgba(250, 247, 242, 0.06)',
                  color: '#a8a29e',
                }}
                whileHover={{
                  borderColor: `${color}40`,
                  boxShadow: `0 4px 16px ${color}15`,
                }}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color }} aria-hidden="true" />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════
            FEATURED PROJECT
        ═══════════════════════════════════════════════════════════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} custom={0}>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: '#e85d26' }}
            >
              Proyecto Destacado
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1"
            style={{
              background:
                'linear-gradient(135deg, rgba(232,93,38,0.08) 0%, rgba(194,65,12,0.04) 100%)',
              border: '1px solid rgba(232, 93, 38, 0.2)',
              boxShadow: '0 4px 24px rgba(232, 93, 38, 0.06)',
            }}
          >
            <div className="space-y-4">
              {/* Tag */}
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider"
                style={{
                  background: 'rgba(232, 93, 38, 0.15)',
                  color: '#e85d26',
                }}
              >
                {FEATURED_PROJECT.tag}
              </span>

              {/* Name */}
              <h3
                className="text-xl sm:text-2xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: '#faf7f2' }}
              >
                {FEATURED_PROJECT.name}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: '#78716c' }}>
                {FEATURED_PROJECT.description}
              </p>

              {/* Tech + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {FEATURED_PROJECT.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg"
                      style={{
                        background: 'rgba(250, 247, 242, 0.04)',
                        border: '1px solid rgba(250, 247, 242, 0.08)',
                        color: '#a8a29e',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={FEATURED_PROJECT.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #e85d26, #c2410c)',
                    boxShadow: '0 4px 16px rgba(232, 93, 38, 0.3)',
                  }}
                >
                  <FiExternalLink className="w-4 h-4" aria-hidden="true" />
                  Ver Proyecto
                </a>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════
            CTA — Contact
        ═══════════════════════════════════════════════════════════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center space-y-5 py-12"
          style={{ borderTop: '1px solid rgba(250, 247, 242, 0.06)' }}
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: '#faf7f2' }}
          >
            ¿Trabajamos juntos?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.1}
            className="text-sm max-w-md mx-auto"
            style={{ color: '#78716c' }}
          >
            Estoy buscando oportunidades remotas en ingeniería de sistemas, automatización e
            infraestructura. Hablemos.
          </motion.p>

          <motion.div variants={fadeUp} custom={0.2} className="flex justify-center gap-3 pt-2">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #e85d26, #c2410c)',
                boxShadow: '0 4px 16px rgba(232, 93, 38, 0.3)',
              }}
            >
              Contáctame
              <FiArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(250, 247, 242, 0.04)',
                border: '1px solid rgba(250, 247, 242, 0.08)',
                color: '#a8a29e',
              }}
            >
              Ver Proyectos
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </PageTransition>
  );
}
