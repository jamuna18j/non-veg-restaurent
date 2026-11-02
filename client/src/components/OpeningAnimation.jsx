import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import RoyalLogo from './RoyalLogo';

export default function OpeningAnimation({ onComplete }) {
  const [stage, setStage] = useState(0); 
  // stage 0: initial maroon fade in
  // stage 1: chickens emerge on left & right
  // stage 2: chickens glide towards center & cross each other
  // stage 3: explosion of golden light & particles
  // stage 4: crown & logo reveal + typography
  // stage 5: fade out into main app

  const canvasRef = useRef(null);

  useEffect(() => {
    // Timeline sequence
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 1200);
    const t3 = setTimeout(() => {
      setStage(3);
      triggerGoldBurst();
    }, 2800);
    const t4 = setTimeout(() => setStage(4), 3600);
    const t5 = setTimeout(() => {
      setStage(5);
      setTimeout(() => {
        onComplete();
      }, 900);
    }, 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const triggerGoldBurst = () => {
    // Custom golden particle shower
    const count = 60;
    const defaults = {
      origin: { y: 0.5, x: 0.5 },
      colors: ['#D4AF37', '#FFF5D0', '#E8C875', '#AA820A', '#FFFFFF'],
      disableForReducedMotion: true
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 40 });
    fire(0.2, { spread: 60, startVelocity: 30 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      {stage < 5 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#28040F] overflow-hidden select-none"
        >
          {/* Flowing Maroon & Gold Ambient Light Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#5B1028_0%,_#3B0718_50%,_#1C020A_100%)] opacity-95" />

          {/* Golden Ambient Particle Dust */}
          <div className="absolute inset-0 bg-royal-pattern opacity-30 pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-30 px-5 py-2 text-xs font-semibold tracking-widest text-royal-champagne uppercase border border-royal-gold/40 rounded-full hover:bg-royal-gold hover:text-royal-deep transition-all duration-300 backdrop-blur-md"
          >
            Skip Intro →
          </button>

          {/* STAGE 1 & 2: The Two Roasted Chickens Crossing Each Other */}
          <div className="relative w-full max-w-5xl h-96 flex items-center justify-center pointer-events-none">
            
            {/* Left Roasted Chicken */}
            {(stage === 1 || stage === 2) && (
              <motion.div
                initial={{ x: '-60vw', y: 0, scale: 0.85, opacity: 0, rotate: -8 }}
                animate={
                  stage === 2
                    ? {
                        x: ['-60vw', '10vw', '45vw'],
                        y: [0, -25, 10],
                        scale: [0.85, 1.15, 0.8],
                        opacity: [0, 1, 0.2],
                        rotate: [-8, 4, -4]
                      }
                    : { x: '-22vw', y: 0, scale: 1, opacity: 1, rotate: -5 }
                }
                transition={
                  stage === 2
                    ? { duration: 1.8, ease: [0.25, 1, 0.5, 1] }
                    : { duration: 0.9, ease: 'easeOut' }
                }
                className="absolute z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              >
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=80"
                    alt="Royal Whole Roasted Chicken"
                    className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full border-2 border-royal-gold/70 shadow-2xl p-1 bg-royal-wine/40"
                    style={{ clipPath: 'circle(48% at 50% 50%)' }}
                  />
                  {/* Golden Flame / Aura Trail */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-royal-gold/40 to-transparent blur-xl -z-10 animate-pulse" />
                </div>
              </motion.div>
            )}

            {/* Right Roasted Chicken */}
            {(stage === 1 || stage === 2) && (
              <motion.div
                initial={{ x: '60vw', y: 0, scale: 0.85, opacity: 0, rotate: 8 }}
                animate={
                  stage === 2
                    ? {
                        x: ['60vw', '-10vw', '-45vw'],
                        y: [0, 25, -10],
                        scale: [0.85, 1.15, 0.8],
                        opacity: [0, 1, 0.2],
                        rotate: [8, -4, 4]
                      }
                    : { x: '22vw', y: 0, scale: 1, opacity: 1, rotate: 5 }
                }
                transition={
                  stage === 2
                    ? { duration: 1.8, ease: [0.25, 1, 0.5, 1] }
                    : { duration: 0.9, ease: 'easeOut' }
                }
                className="absolute z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              >
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1527477378392-1ca007450055?auto=format&fit=crop&w=600&q=80"
                    alt="Royal Tandoori Roasted Chicken"
                    className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full border-2 border-royal-gold/70 shadow-2xl p-1 bg-royal-wine/40 transform -scale-x-100"
                    style={{ clipPath: 'circle(48% at 50% 50%)' }}
                  />
                  {/* Golden Flame / Aura Trail */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-l from-royal-gold/40 to-transparent blur-xl -z-10 animate-pulse" />
                </div>
              </motion.div>
            )}

            {/* Golden Particle Flash at Center on Impact */}
            {stage === 3 && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 2.5, 3.5], opacity: [1, 0.9, 0] }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute w-64 h-64 rounded-full bg-[radial-gradient(circle,_#FFF7D6_0%,_#E8C875_40%,_#D4AF37_70%,_transparent_100%)] blur-md z-20 pointer-events-none"
              />
            )}

            {/* STAGE 4: Grand Crown Logo & Typography Reveal */}
            {stage >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center z-20 px-4"
              >
                {/* Golden Crown & Emblem */}
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-4"
                >
                  <RoyalLogo size="xl" showText={false} layout="col" />
                </motion.div>

                {/* Restaurant Name */}
                <motion.h1
                  initial={{ letterSpacing: '0.1em', opacity: 0 }}
                  animate={{ letterSpacing: '0.25em', opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1.1 }}
                  className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-gold-gradient tracking-[0.25em] drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)]"
                >
                  THE ROYAL FEAST
                </motion.h1>

                {/* Golden Ornamental Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.9 }}
                  className="flex items-center gap-3 my-4 w-64 sm:w-80"
                >
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent" />
                  <div className="w-2.5 h-2.5 rotate-45 bg-royal-gold shadow-[0_0_8px_#D4AF37]" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-royal-gold to-transparent" />
                </motion.div>

                {/* Tagline */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="font-sans text-xs sm:text-base md:text-lg tracking-[0.35em] uppercase text-royal-champagne/90 font-semibold"
                >
                  A ROYAL FEAST FOR EVERY CRAVING.
                </motion.p>
              </motion.div>
            )}

          </div>

          {/* Bottom Loading Progress Bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-royal-wine/50 rounded-full overflow-hidden border border-royal-gold/20">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5.8, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-royal-champagne via-royal-gold to-[#9C7715]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
