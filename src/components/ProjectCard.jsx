import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// Animation variant — used by the parent grid's staggerChildren
// ─────────────────────────────────────────────────────────────────────────────

export const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Accent color map — ember system
// ─────────────────────────────────────────────────────────────────────────────

const accentMap = {
  cyan: {
    headerBg: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
    hoverShadow: '0 8px 32px rgba(8, 145, 178, 0.2)',
  },
  green: {
    headerBg: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    hoverShadow: '0 8px 32px rgba(5, 150, 105, 0.2)',
  },
  orange: {
    headerBg: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    hoverShadow: '0 8px 32px rgba(234, 88, 12, 0.2)',
  },
  purple: {
    headerBg: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    hoverShadow: '0 8px 32px rgba(124, 58, 237, 0.25)',
  },
  ember: {
    headerBg: 'linear-gradient(135deg, #e85d26 0%, #c2410c 100%)',
    hoverShadow: '0 8px 32px rgba(232, 93, 38, 0.25)',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ProjectCard component
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectCard({ project }) {
  const { accent = 'ember', featured } = project;
  const colors = accentMap[accent] ?? accentMap.ember;
  const isGitHub = project.link.includes('github.com');

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: '#1c1917',
        border: '1px solid rgba(250, 247, 242, 0.06)',
      }}
      whileHover={{
        boxShadow: colors.hoverShadow,
      }}
      aria-label={`Proyecto: ${project.name}`}
    >
      {/* ── GRADIENT HEADER ── */}
      <div
        className="relative h-40 flex items-center justify-center flex-shrink-0"
        style={{ background: colors.headerBg }}
        aria-hidden="true"
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(250,247,242,0.8) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Project hero icon */}
        <project.HeroIcon className="w-14 h-14 text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110" />

        {/* Featured ribbon */}
        {featured && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
            style={{
              background: 'rgba(250, 247, 242, 0.15)',
              color: '#faf7f2',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(250, 247, 242, 0.2)',
            }}
          >
            ⭐ Caso de Estudio
          </span>
        )}
      </div>

      {/* ── CARD BODY ── */}
      <div className="relative flex flex-col gap-4 p-5 flex-grow">
        {/* Title */}
        <h2
          className="font-bold text-base tracking-tight text-ivory leading-snug"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {project.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-ash leading-relaxed flex-grow">{project.description}</p>

        {/* Tech chips */}
        <ul
          className="flex flex-wrap gap-2"
          role="list"
          aria-label={`Tecnologías: ${project.tech.map((t) => t.label).join(', ')}`}
        >
          {project.tech.map(({ label, Icon, color }) => (
            <li key={label}>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: 'rgba(250, 247, 242, 0.04)',
                  border: '1px solid rgba(250, 247, 242, 0.08)',
                  color: '#a8a29e',
                }}
              >
                <Icon aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
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
          aria-label={
            isGitHub ? `Ver repositorio de ${project.name}` : `Visitar demo de ${project.name}`
          }
          className="mt-1 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
          style={{
            background: 'rgba(232, 93, 38, 0.1)',
            border: '1px solid rgba(232, 93, 38, 0.25)',
            color: '#e85d26',
          }}
        >
          {isGitHub ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          )}
          {isGitHub ? 'Ver repositorio' : 'Visitar demo'}
          <span
            aria-hidden="true"
            className="ml-auto transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
      </div>
    </motion.article>
  );
}
