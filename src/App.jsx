import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import EntryOverlay from './components/EntryOverlay';
import AnimatedBackground from './components/AnimatedBackground';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const [hasEntered, setHasEntered] = useState(() => {
    return sessionStorage.getItem('portfolio_entered') === 'true';
  });

  const handleEnter = () => {
    sessionStorage.setItem('portfolio_entered', 'true');
    setHasEntered(true);
  };

  return (
    // Root: transparent so AnimatedBackground shows through everything
    <div className="min-h-screen flex flex-col bg-transparent text-zinc-50">

      {/* ── Fixed animated background — sits behind everything ── */}
      <AnimatedBackground />

      {/* ── Entry overlay ── */}
      {!hasEntered && <EntryOverlay onEnter={handleEnter} />}

      {/* ── Main app content ── */}
      <motion.div
        className="flex flex-col min-h-screen"
        initial={false}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
      >
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}
