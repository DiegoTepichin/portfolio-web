import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Three.js particle field — rotating nebula of stars
// ---------------------------------------------------------------------------

function NebulaStars() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Very slow, almost imperceptible rotation — cinematic drift
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.012;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.007) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* Outer field — dense, small, far away */}
      <Stars
        radius={120}
        depth={60}
        count={3000}
        factor={3}
        saturation={0.6}
        fade
        speed={0.4}
      />
      {/* Inner field — sparser, larger, closer */}
      <Stars
        radius={40}
        depth={30}
        count={600}
        factor={6}
        saturation={1}
        fade
        speed={0.2}
      />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Floating orbs — CSS-based blobs positioned in the viewport
// These create the main colored "light sources" that everything reflects.
// ---------------------------------------------------------------------------

const ORB_CONFIG = [
  {
    // Top-left — cyan anchor
    style: {
      top: '-5%',
      left: '-8%',
      width: '55vw',
      height: '55vw',
      background: 'radial-gradient(ellipse, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
      animation: 'float-slow 18s ease-in-out infinite',
      filter: 'blur(60px)',
    },
  },
  {
    // Bottom-right — indigo/purple
    style: {
      bottom: '-10%',
      right: '-10%',
      width: '60vw',
      height: '60vw',
      background: 'radial-gradient(ellipse, rgba(99,102,241,0.20) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
      animation: 'float-slow-reverse 22s ease-in-out infinite',
      filter: 'blur(70px)',
    },
  },
  {
    // Center-right — subtle rose accent
    style: {
      top: '30%',
      right: '5%',
      width: '35vw',
      height: '35vw',
      background: 'radial-gradient(ellipse, rgba(244,63,94,0.10) 0%, transparent 70%)',
      animation: 'float-slow 26s ease-in-out infinite reverse',
      filter: 'blur(50px)',
    },
  },
  {
    // Bottom-left — teal
    style: {
      bottom: '10%',
      left: '0%',
      width: '30vw',
      height: '30vw',
      background: 'radial-gradient(ellipse, rgba(20,184,166,0.12) 0%, transparent 70%)',
      animation: 'float-slow-reverse 20s ease-in-out infinite 3s',
      filter: 'blur(45px)',
    },
  },
];

// ---------------------------------------------------------------------------
// AnimatedBackground — fixed full-screen layer, z-index -10
// Always present in the DOM, renders behind all content.
// ---------------------------------------------------------------------------

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -10 }}
    >
      {/* Base gradient — very dark blue-black */}
      <div
        className="absolute inset-0 animated-bg"
        style={{ backgroundColor: '#07090f' }}
      />

      {/* Color orbs — the "light sources" */}
      {ORB_CONFIG.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={orb.style}
        />
      ))}

      {/* Three.js stars — rendered inside a canvas */}
      <div className="absolute inset-0" style={{ opacity: 0.65 }}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 1], fov: 75 }}
            gl={{
              antialias: false,        // saves GPU
              powerPreference: 'low-power',
              alpha: true,
            }}
            style={{ background: 'transparent' }}
          >
            <NebulaStars />
          </Canvas>
        </Suspense>
      </div>

      {/* Vignette overlay — darkens corners to give depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 30%, rgba(5,7,14,0.6) 75%, rgba(5,7,14,0.9) 100%)',
        }}
      />
    </div>
  );
}
