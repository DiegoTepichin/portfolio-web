import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

/**
 * NavLink — glass-style link with animated underline.
 * Dark-mode only: text is zinc-300 / white, active is cyan-400.
 */
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative text-sm sm:text-base font-medium transition-colors duration-200 group py-1 ${
        isActive
          ? 'text-cyan-400'
          : 'text-zinc-400 hover:text-zinc-100'
      }`}
    >
      {children}
      <motion.span
        className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full origin-left ${
          isActive ? 'bg-cyan-400' : 'bg-zinc-300'
        }`}
        initial={{ scaleX: isActive ? 1 : 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        // Full glassmorphism navbar
        background: 'rgba(5, 7, 15, 0.65)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        boxShadow: '0 1px 0 rgba(6, 182, 212, 0.08), 0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: logo mark + nav links */}
        <div className="flex items-center gap-6 sm:gap-8">

          {/* Logo / monogram */}
          <Link
            to="/"
            className="font-bold text-sm tracking-widest uppercase text-zinc-100 hover:text-cyan-400 transition-colors duration-200"
            aria-label="Inicio"
          >
            DT
          </Link>

          <span className="w-px h-4 bg-white/10" aria-hidden="true" />

          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/proyectos">Proyectos</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/DiegoTepichin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-100 transition-colors duration-200 flex items-center"
            aria-label="GitHub de Diego Tepichin"
          >
            <FaGithub className="w-[18px] h-[18px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/diego-duron-tepichin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-[#0A66C2] transition-colors duration-200 flex items-center"
            aria-label="LinkedIn de Diego Tepichin"
          >
            <FaLinkedin className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>
    </nav>
  );
}
