import { motion } from 'framer-motion';
import { FiMapPin, FiCode, FiFolder, FiTrendingUp, FiArrowDown } from 'react-icons/fi';
import { fadeUp, staggerFast, staggerSlow, viewportOnce } from '../hooks/useScrollAnimation';

// ---------------------------------------------------------------------------
// Dashboard metrics data
// Each metric maps to a recruiter-relevant data point.
// ---------------------------------------------------------------------------

const METRICS = [
  {
    id: 'availability',
    label: 'DISPONIBILIDAD',
    value: 'Remoto',
    sub: 'Open to worldwide',
    Icon: FiMapPin,
    color: '#4ade80', // green-400 — accent primary
    glow: 'rgba(74, 222, 128, 0.15)',
    border: 'rgba(74, 222, 128, 0.25)',
  },
  {
    id: 'stack',
    label: 'STACK PRINCIPAL',
    value: 'Python / React',
    sub: 'Backend & Frontend',
    Icon: FiCode,
    color: '#60a5fa', // blue-400 — accent secondary
    glow: 'rgba(96, 165, 250, 0.15)',
    border: 'rgba(96, 165, 250, 0.25)',
  },
  {
    id: 'projects',
    label: 'PROYECTOS',
    value: '3+',
    sub: 'Casos reales documentados',
    Icon: FiFolder,
    color: '#a78bfa', // violet-400
    glow: 'rgba(167, 139, 250, 0.15)',
    border: 'rgba(167, 139, 250, 0.25)',
  },
  {
    id: 'experience',
    label: 'EXPERIENCIA',
    value: 'En formación',
    sub: 'Proyectos propios',
    Icon: FiTrendingUp,
    color: '#f472b6', // pink-400
    glow: 'rgba(244, 114, 182, 0.15)',
    border: 'rgba(244, 114, 182, 0.25)',
  },
];

// ---------------------------------------------------------------------------
// MetricCard sub-component
// Glass card with colored icon, metric value, and subtle hover glow
// ---------------------------------------------------------------------------

function MetricCard({ metric, index }) {
  const { label, value, sub, Icon, color, glow, border } = metric;

  return (
    <motion.div
      variants={fadeUp}
      // Inline style hover glow is handled via onMouseEnter/Leave
      className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col gap-3 cursor-default"
      whileHover={{ scale: 1.02 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = border;
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${glow}, inset 0 1px 0 rgba(255,255,255,0.07)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Top row: label + icon */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-bold tracking-[0.22em] uppercase"
          style={{ color: 'rgba(139, 155, 181, 0.9)' }}
        >
          {label}
        </span>
        {/* Icon container with a tinted background circle */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: glow, border: `1px solid ${border}` }}
        >
          <Icon className="w-4 h-4" style={{ color }} aria-hidden="true" />
        </div>
      </div>

      {/* Metric value — the headline number/word */}
      <div>
        <p
          className="text-2xl sm:text-3xl font-bold tracking-tight leading-none counter-pop"
          style={{ color }}
        >
          {value}
        </p>
        {/* Sub-label */}
        <p className="text-xs mt-1.5" style={{ color: 'rgba(139, 155, 181, 0.7)' }}>
          {sub}
        </p>
      </div>

      {/* Decorative shimmer line at the bottom */}
      <div className="h-px w-full shimmer-line mt-auto" aria-hidden="true" />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ScrollCTA — animated down-arrow button that scrolls to hero section
// ---------------------------------------------------------------------------

function ScrollCTA() {
  const handleScroll = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.button
      variants={fadeUp}
      onClick={handleScroll}
      aria-label="Explorar portafolio"
      className="group inline-flex flex-col items-center gap-2 cursor-pointer select-none mt-4"
      whileHover={{ y: 3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span
        className="text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200"
        style={{ color: 'rgba(74, 222, 128, 0.7)' }}
      >
        Explorar
      </span>
      <div
        className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
        style={{
          background: 'rgba(74, 222, 128, 0.08)',
          borderColor: 'rgba(74, 222, 128, 0.3)',
        }}
        aria-hidden="true"
      >
        <FiArrowDown className="w-4 h-4 text-green-400 transition-transform duration-300 group-hover:translate-y-0.5" />
      </div>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Dashboard — main exported component
// Full-screen entry section with name, subtitle, and metrics grid.
// ---------------------------------------------------------------------------

export default function Dashboard() {
  return (
    <section
      id="dashboard"
      className="section-anchor relative flex flex-col items-center justify-center min-h-[100dvh] px-6 py-20 overflow-hidden"
      aria-labelledby="dashboard-name"
    >
      {/* Dot-grid background texture — subtle, sits over AnimatedBackground */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none opacity-30"
        aria-hidden="true"
      />

      {/* Vertical separator lines — decorative DataBricks-style grid guides */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(74,222,128,0.03) 50%, transparent 100%)',
        }}
      />

      {/* Main content wrapper */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-10 sm:gap-12"
        variants={staggerSlow}
        initial="hidden"
        animate="visible"
      >
        {/* ── Header block: name + badge + subtitle ── */}
        <div className="text-center space-y-4">
          {/* Status badge */}
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                background: 'rgba(74, 222, 128, 0.08)',
                borderColor: 'rgba(74, 222, 128, 0.25)',
                color: '#4ade80',
              }}
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              Disponible para oportunidades remotas
            </span>
          </motion.div>

          {/* Name — large, gradient accent on surname */}
          <motion.h1
            id="dashboard-name"
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-zinc-50"
          >
            Diego{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #4ade80 0%, #22d3ee 45%, #60a5fa 100%)',
              }}
            >
              Tepichin
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg font-medium tracking-wide"
            style={{ color: '#8b9bb5' }}
          >
            Ingeniero de Sistemas
            <span className="mx-3 opacity-30">·</span>
            Automatización &amp; Infraestructura
          </motion.p>
        </div>

        {/* ── Divider line with shimmer ── */}
        <motion.div
          variants={fadeUp}
          className="w-full max-w-lg h-px shimmer-line"
          aria-hidden="true"
        />

        {/* ── Metrics grid: 2×2 on mobile, 4 cols on lg ── */}
        <motion.div
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {METRICS.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <ScrollCTA />
      </motion.div>
    </section>
  );
}
