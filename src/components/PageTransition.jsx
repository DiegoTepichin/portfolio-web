import { motion } from 'framer-motion';

/**
 * PageTransition
 * -------------
 * Wraps a page's root element with a smooth fade + slide animation.
 * Uses Framer Motion's `AnimatePresence` (configured in App.jsx) for exit
 * animations to work correctly — AnimatePresence needs to be the parent.
 *
 * Animation design:
 *   enter: slides up from y=16 + fades in (duration 350ms, smooth decelerate)
 *   exit:  slides up to y=-16 + fades out (duration 250ms, smooth accelerate)
 *
 * The 'key' prop must be set on the component INSIDE AnimatePresence
 * (handled by App.jsx passing location.key).
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1], // custom smooth decelerate
      }}
      // Ensure the wrapper doesn't break flex layouts from the parent
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
