import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      {/* Root container: noise texture overlay + obsidian background */}
      <div
        className="noise-bg min-h-screen flex flex-col relative"
        style={{ background: '#0c0a09' }}
      >
        {/* Ambient glow — ember radial from top center */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232,93,38,0.07) 0%, transparent 70%)',
            zIndex: 0,
          }}
          aria-hidden="true"
        />

        {/* Content — above noise and glow */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
