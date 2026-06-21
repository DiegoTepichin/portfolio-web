import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import {
  SiPython,
  SiGnubash,
  SiLinux,
  SiFlask,
  SiGithubactions,
  SiDocker,
  SiYaml,
  SiTerraform,
  SiGooglecloud,
  SiScikitlearn,
  SiOpenai,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import ProjectCard, { cardVariants } from '../components/ProjectCard';

// ---------------------------------------------------------------------------
// Project data
// Each tech entry is { label, Icon, color } — same brand colors as Skills.jsx.
// HeroIcon  : large icon shown in the gradient header of the card.
// gradient  : Tailwind gradient classes for the visual header.
// accent    : drives border/glow/button tint (see accentMap in ProjectCard.jsx).
// ---------------------------------------------------------------------------

const projects = [
  {
    id: 1,
    name: 'sys-monitor',
    description:
      'Sistema de monitoreo y automatización para servidores Linux. Scripts en Python y Bash que alertan sobre uso de CPU, memoria y disco en tiempo real.',
    tech: [
      { label: 'Python', Icon: SiPython,  color: '#3776AB' },
      { label: 'Bash',   Icon: SiGnubash, color: '#4EAA25' },
      { label: 'Linux',  Icon: SiLinux,   color: '#FCC624' },
      { label: 'Flask',  Icon: SiFlask,   color: '#94a3b8' },
    ],
    // HeroIcon: the large icon rendered inside the gradient header
    HeroIcon: SiLinux,
    gradient: 'from-cyan-500 to-blue-600',
    link: 'https://github.com/DiegoTepichin/sys-monitor',
    featured: false,
    accent: 'cyan',
  },
  {
    id: 2,
    name: 'cicd-pipeline',
    description:
      'Pipeline CI/CD con GitHub Actions y Docker. Automatiza pruebas, construcción de imágenes y despliegue continuo con rollback automático.',
    tech: [
      { label: 'GitHub Actions', Icon: SiGithubactions, color: '#2088FF' },
      { label: 'Docker',         Icon: SiDocker,        color: '#2496ED' },
      { label: 'YAML',           Icon: SiYaml,          color: '#CB171E' },
    ],
    HeroIcon: SiDocker,
    gradient: 'from-green-500 to-teal-600',
    link: 'https://github.com/DiegoTepichin/cicd-pipeline',
    featured: false,
    accent: 'green',
  },
  {
    id: 3,
    name: 'iac-terraform',
    description:
      'Infraestructura como código con Terraform. Aprovisionamiento automatizado de máquinas virtuales y redes en la nube con estado remoto.',
    tech: [
      { label: 'Terraform',   Icon: SiTerraform,   color: '#7B42BC' },
      { label: 'AWS',         Icon: FaAws,          color: '#FF9900' },
      { label: 'GCP',         Icon: SiGooglecloud,  color: '#4285F4' },
    ],
    HeroIcon: SiTerraform,
    gradient: 'from-orange-500 to-red-600',
    link: 'https://github.com/DiegoTepichin/iac-terraform',
    featured: false,
    accent: 'orange',
  },
    {
      id: 4,
      name: 'CAFE-Dynamic-Pricing',
      description:
        'Motor de pricing dinámico (Causal Adaptive Fusion Engine v2.2). Proyecto avanzado de optimización de precios con ML e inferencia causal. Caso de estudio privado.',
      tech: [
        { label: 'Python',      Icon: SiPython,      color: '#3776AB' },
        { label: 'Scikit-learn',Icon: SiScikitlearn, color: '#F7931E' },
        { label: 'Prompt Eng.', Icon: SiOpenai,      color: '#7C3AED' },
      ],
      HeroIcon: SiOpenai,
      gradient: 'from-purple-500 to-pink-600',
      link: 'https://cafe-pricing.netlify.app/?lang=en#pricing',
      featured: true,
      accent: 'purple',
    },
  ];

  // ---------------------------------------------------------------------------
  // Animation variants
  // ---------------------------------------------------------------------------

  const headerVariants = {
    hidden:  { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  // Grid container staggers child cards
  const gridVariants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  // ---------------------------------------------------------------------------
  // Page component
  // ---------------------------------------------------------------------------

  export default function Projects() {
    // Separate featured project from regular projects
    const featuredProject = projects.find((p) => p.featured);
    const regularProjects = projects.filter((p) => !p.featured);

    return (
      <PageTransition>
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-16">

        {/* ===== PAGE HEADER ===== */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Portafolio
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Mis{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
              Proyectos
            </span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg text-sm sm:text-base leading-relaxed">
            Proyectos de automatización, infraestructura y software que construí
            por curiosidad, aprendizaje y resolución de problemas reales.
          </p>
        </motion.div>

        {/* ===== PROJECT LAYOUT ===== */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Featured Project (Caso de Estudio) - Full Width */}
          {featuredProject && (
            <div className="w-full">
              <ProjectCard project={featuredProject} />
            </div>
          )}

          {/* Regular Projects Grid - 3 Columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>

      {/* ===== CALL TO ACTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5, ease: 'easeOut' }}
        className="text-center pt-4"
      >
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          ¿Más proyectos en camino?{' '}
          <a
            href="https://github.com/DiegoTepichin"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline underline-offset-4 transition-colors"
          >
            Sígueme en GitHub →
          </a>
        </p>
      </motion.div>
    </div>
    </PageTransition>
  );
}
