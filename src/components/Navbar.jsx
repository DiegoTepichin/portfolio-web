import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative text-sm font-medium transition-colors duration-200 group py-1 ${
        isActive ? 'text-ember' : 'text-ash hover:text-ivory'
      }`}
    >
      {children}
      <motion.span
        className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full origin-left ${
          isActive ? 'bg-ember' : 'bg-ivory/40'
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
        background: 'rgba(12, 10, 9, 0.8)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: '1px solid rgba(250, 247, 242, 0.06)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            to="/"
            className="font-bold text-sm tracking-widest uppercase text-ivory hover:text-ember transition-colors duration-200"
            style={{ fontFamily: 'var(--font-display)' }}
            aria-label="Inicio"
          >
            DT
          </Link>

          <span className="w-px h-4 bg-ivory/10" aria-hidden="true" />

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
            className="text-ash hover:text-ivory transition-colors duration-200 flex items-center"
            aria-label="GitHub de Diego Tepichin"
          >
            <FaGithub className="w-[18px] h-[18px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/diego-duron-tepichin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ash hover:text-ember transition-colors duration-200 flex items-center"
            aria-label="LinkedIn de Diego Tepichin"
          >
            <FaLinkedin className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>
    </nav>
  );
}
