import React from 'react';

export default function RoyalLogo({ size = 'md', showText = true, layout = 'row' }) {
  // Dimensions
  const dims = {
    sm: { icon: 36, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 48, text: 'text-2xl', sub: 'text-[10px]' },
    lg: { icon: 72, text: 'text-4xl', sub: 'text-xs' },
    xl: { icon: 100, text: 'text-5xl', sub: 'text-sm' }
  }[size] || { icon: 48, text: 'text-2xl', sub: 'text-[10px]' };

  return (
    <div className={`flex ${layout === 'col' ? 'flex-col items-center text-center' : 'items-center gap-3.5'}`}>
      {/* Royal Crest SVG with Crown, 2 Roasted Chickens & Plate */}
      <div className="relative flex-shrink-0 group cursor-pointer">
        <svg
          width={dims.icon}
          height={dims.icon}
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_12px_rgba(212,175,55,0.45)] transition-transform duration-500 group-hover:scale-105"
        >
          {/* Outer Royal Plate Ring */}
          <circle cx="70" cy="70" r="66" stroke="url(#goldGradient)" strokeWidth="3" strokeDasharray="3 3" opacity="0.85" />
          <circle cx="70" cy="70" r="60" stroke="url(#goldGradient)" strokeWidth="1.5" />
          <circle cx="70" cy="70" r="54" fill="#3B0718" stroke="#D4AF37" strokeWidth="0.75" />

          {/* Royal Crown on Top */}
          <g transform="translate(46, 20)">
            {/* Crown Base */}
            <path
              d="M4 22 L8 8 L24 16 L40 8 L44 22 Z"
              fill="url(#goldGradient)"
              stroke="#AA820A"
              strokeWidth="0.8"
            />
            {/* Crown jewels */}
            <circle cx="8" cy="7" r="2.5" fill="#FFF5D0" />
            <circle cx="24" cy="15" r="3" fill="#FFF5D0" />
            <circle cx="40" cy="7" r="2.5" fill="#FFF5D0" />
            <rect x="7" y="20" width="34" height="2.5" rx="1" fill="#AA820A" />
            <circle cx="15" cy="21" r="1.2" fill="#E8C875" />
            <circle cx="24" cy="21" r="1.4" fill="#FFF2E0" />
            <circle cx="33" cy="21" r="1.2" fill="#E8C875" />
          </g>

          {/* Left Roasted Chicken */}
          <g transform="translate(24, 48) scale(0.48)">
            {/* Chicken body */}
            <path
              d="M15 45 C15 20, 45 10, 65 30 C75 40, 75 60, 55 70 C35 78, 15 65, 15 45 Z"
              fill="url(#roastedGold)"
              stroke="#875306"
              strokeWidth="1.5"
            />
            {/* Roasted drumstick leg */}
            <path
              d="M50 55 C65 60, 80 50, 85 40 C88 35, 92 37, 90 44 C84 58, 68 70, 48 66 Z"
              fill="url(#roastedGold)"
              stroke="#875306"
              strokeWidth="1.2"
            />
            {/* Bone cap */}
            <ellipse cx="90" cy="40" rx="3.5" ry="5" fill="#FFF2E0" stroke="#AA820A" strokeWidth="0.8" />
            {/* Herb / glaze flecks */}
            <circle cx="38" cy="38" r="1.5" fill="#4B0F1E" />
            <circle cx="50" cy="44" r="1.8" fill="#4B0F1E" />
            <circle cx="32" cy="52" r="1.2" fill="#4B0F1E" />
          </g>

          {/* Right Roasted Chicken (Mirrored) */}
          <g transform="translate(116, 48) scale(-0.48, 0.48)">
            {/* Chicken body */}
            <path
              d="M15 45 C15 20, 45 10, 65 30 C75 40, 75 60, 55 70 C35 78, 15 65, 15 45 Z"
              fill="url(#roastedGold)"
              stroke="#875306"
              strokeWidth="1.5"
            />
            {/* Roasted drumstick leg */}
            <path
              d="M50 55 C65 60, 80 50, 85 40 C88 35, 92 37, 90 44 C84 58, 68 70, 48 66 Z"
              fill="url(#roastedGold)"
              stroke="#875306"
              strokeWidth="1.2"
            />
            {/* Bone cap */}
            <ellipse cx="90" cy="40" rx="3.5" ry="5" fill="#FFF2E0" stroke="#AA820A" strokeWidth="0.8" />
            {/* Herb / glaze flecks */}
            <circle cx="38" cy="38" r="1.5" fill="#4B0F1E" />
            <circle cx="50" cy="44" r="1.8" fill="#4B0F1E" />
            <circle cx="32" cy="52" r="1.2" fill="#4B0F1E" />
          </g>

          {/* Center Crossed Royal Forks & Laurel */}
          <g transform="translate(54, 76)">
            {/* Left Fork */}
            <line x1="6" y1="4" x2="26" y2="34" stroke="url(#goldGradient)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M4 2 L6 6 L8 2 M6 6 L6 9" stroke="url(#goldGradient)" strokeWidth="1.2" />
            {/* Right Fork */}
            <line x1="26" y1="4" x2="6" y2="34" stroke="url(#goldGradient)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M24 2 L26 6 L28 2 M26 6 L26 9" stroke="url(#goldGradient)" strokeWidth="1.2" />
            {/* Center Royal Ruby Jewel */}
            <polygon points="16,16 20,20 16,24 12,20" fill="#9A1B2F" stroke="#E8C875" strokeWidth="0.8" />
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D1" />
              <stop offset="40%" stopColor="#E8C875" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9C7715" />
            </linearGradient>
            <linearGradient id="roastedGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D788" />
              <stop offset="35%" stopColor="#E09C2E" />
              <stop offset="75%" stopColor="#B36511" />
              <stop offset="100%" stopColor="#733306" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-serif tracking-[0.2em] font-extrabold text-gold-gradient ${dims.text} leading-none`}>
              THE ROYAL FEAST
            </span>
          </div>
          <span className={`font-sans tracking-[0.3em] uppercase text-royal-champagne/80 font-medium ${dims.sub} mt-1`}>
            A ROYAL FEAST FOR EVERY CRAVING
          </span>
        </div>
      )}
    </div>
  );
}
