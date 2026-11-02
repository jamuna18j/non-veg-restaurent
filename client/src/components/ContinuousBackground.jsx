import React, { useMemo } from 'react';

export default function ContinuousBackground() {
  // Generate a fixed set of floating golden dust particles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.2 + (i % 3) * 7) % 98}%`,
      top: `${(i * 7.3 + (i % 5) * 11) % 96}%`,
      size: (i % 3) * 1.5 + 2,
      delay: (i * 0.7) % 8,
      duration: 10 + (i % 7) * 2,
      opacity: 0.15 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Base Dark Maroon Foundation */}
      <div className="absolute inset-0 bg-[#24030E]" />

      {/* Layer 1: Flowing Burgundy Silk Gradient (Slow Wave 1) */}
      <div
        className="absolute -inset-[30%] opacity-60 animate-silk-1"
        style={{
          background: 'radial-gradient(circle at 25% 35%, #5B1028 0%, #3B0718 45%, transparent 75%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Layer 2: Flowing Wine & Deep Crimson Layer (Slow Wave 2) */}
      <div
        className="absolute -inset-[30%] opacity-50 animate-silk-2"
        style={{
          background: 'radial-gradient(circle at 75% 65%, #6E1231 0%, #481021 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Layer 3: Flowing Gold Light Streak */}
      <div
        className="absolute top-1/4 -left-1/4 w-[150%] h-[400px] opacity-25 animate-streak"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.22) 0%, rgba(232,200,117,0.08) 45%, transparent 70%)',
          filter: 'blur(75px)',
          transform: 'rotate(-18deg)',
        }}
      />

      {/* Layer 4: Floating Golden Silk Waves (SVG Curvature) */}
      <svg
        className="absolute w-full h-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path
          d="M0,320 C320,180, 420,440, 720,260 C1020,80, 1120,400, 1440,240 L1440,900 L0,900 Z"
          fill="url(#silkGradient1)"
          className="animate-silk-1"
        />
        <path
          d="M0,520 C280,380, 600,680, 960,420 C1200,240, 1340,580, 1440,480 L1440,900 L0,900 Z"
          fill="url(#silkGradient2)"
          className="animate-silk-2"
        />
        <defs>
          <linearGradient id="silkGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B1028" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#3B0718" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#24030E" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="silkGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#481021" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1C020A" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layer 5: Royal Damask / Mandala Geometric Subtle Mesh */}
      <div className="absolute inset-0 bg-royal-pattern opacity-35" />

      {/* Layer 6: Floating Golden Dust Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-tr from-royal-gold to-royal-champagne shadow-[0_0_8px_#D4AF37]"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `floatSlow ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette Edge Shading for Regal Ambiance */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15,1,6,0.75) 100%)',
        }}
      />
    </div>
  );
}
