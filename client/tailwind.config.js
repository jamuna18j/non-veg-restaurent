/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          maroon: "#3B0718",
          burgundy: "#5B1028",
          wine: "#481021",
          gold: "#D4AF37",
          champagne: "#E8C875",
          ivory: "#FFF2E0",
          deep: "#26030F",
          darker: "#1A020A",
          mutedGold: "#A28325"
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E0A3 0%, #D4AF37 50%, #AA820A 100%)',
        'gold-metallic': 'linear-gradient(90deg, #D4AF37, #FFF5D0, #D4AF37, #AA820A)',
        'maroon-silk': 'radial-gradient(ellipse at top, #5B1028 0%, #3B0718 60%, #1A020A 100%)',
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px 0 rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'gold-glow-lg': '0 0 45px rgba(212, 175, 55, 0.55)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-flow': 'waveFlow 16s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        waveFlow: {
          '0%': { transform: 'scale(1) translateY(0px) rotate(0deg)' },
          '50%': { transform: 'scale(1.05) translateY(-15px) rotate(1deg)' },
          '100%': { transform: 'scale(1.02) translateY(10px) rotate(-1deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
