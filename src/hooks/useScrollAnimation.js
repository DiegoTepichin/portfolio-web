/**
 * useScrollAnimation.js
 * ---------------------
 * Centralizes Framer Motion animation variant presets used across
 * the portfolio home page sections. Import what you need per-component.
 */

// ---------------------------------------------------------------------------
// Fade-up: element slides up from 24px below and fades in.
// Designed to be used as a child variant inside a stagger container.
// ---------------------------------------------------------------------------
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// FadeIn: pure opacity, no translation — used for overlays / backgrounds.
// ---------------------------------------------------------------------------
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ---------------------------------------------------------------------------
// ScaleIn: enters with a subtle scale from 92% → 100% + fade.
// ---------------------------------------------------------------------------
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Stagger containers: use as parent variants. Children define their own variant.
// delayChildren: seconds before first child animates
// staggerChildren: seconds between each subsequent child
// ---------------------------------------------------------------------------

/** Fast stagger — for small grids (e.g., metric cards) */
export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Slow stagger — for larger sections with more breathing room */
export const staggerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

// ---------------------------------------------------------------------------
// Viewport config preset — used in whileInView to trigger once per element
// margin: "-80px" means animation fires 80px before element reaches viewport
// ---------------------------------------------------------------------------
export const viewportOnce = { once: true, margin: '-80px' };
