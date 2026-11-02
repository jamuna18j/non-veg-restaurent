import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock, Sparkles, Tag, Gift, Award, Percent } from 'lucide-react';

export default function OffersAndCoupons({ onApplyCouponToCart }) {
  // Live Countdown Timer (e.g. 5 hours 42 mins 19 secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18
  });

  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const coupons = [
    {
      code: 'ROYAL20',
      badge: 'First Order',
      title: 'FLAT 20% OFF',
      desc: 'Applicable on first order above ₹399. Maximum discount up to ₹200.',
      terms: 'Valid once per customer. Cannot be clubbed with BOGO.',
      expires: 'Valid until Midnight',
      color: 'from-amber-600/30 to-amber-900/30'
    },
    {
      code: 'FEAST100',
      badge: 'Royal Dinner',
      title: 'FLAT ₹100 OFF',
      desc: 'Enjoy direct ₹100 off on all banquets & family orders above ₹499.',
      terms: 'Valid on both delivery and takeaway orders.',
      expires: 'Limited Time Deal',
      color: 'from-rose-600/30 to-rose-900/30'
    },
    {
      code: 'CHICKEN15',
      badge: 'Poultry Special',
      title: '15% OFF CHICKEN',
      desc: 'Exclusive discount on all Chicken Biryanis, Butter Chicken, and starters above ₹349.',
      terms: 'Valid on entire Chicken Collection category.',
      expires: 'Valid Daily 12 PM - 11 PM',
      color: 'from-orange-600/30 to-orange-900/30'
    },
    {
      code: 'FAMILY25',
      badge: 'Weekend Feast',
      title: '25% OFF FAMILY FEAST',
      desc: 'Save 25% up to ₹350 on grand party orders & family combos above ₹999.',
      terms: 'Valid on all combos and large handi orders.',
      expires: 'Weekend Rush Exclusive',
      color: 'from-yellow-600/30 to-yellow-900/30'
    }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header with Live Countdown */}
      <div className="royal-glass border border-royal-gold/50 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 rounded-full bg-royal-gold/15 blur-2xl" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center lg:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-gold/20 text-royal-gold text-xs font-black uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" />
              <span>Royal Festivities Live</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-gold-gradient">
              LIMITED TIME ROYAL OFFERS & PROMOTIONS
            </h2>
            <p className="text-xs sm:text-sm text-royal-champagne/80 font-light">
              Claim authentic discounts, verified promo vouchers, and earn royal loyalty points.
            </p>
          </div>

          {/* Live Flash Timer */}
          <div className="flex items-center gap-3 bg-black/60 border border-royal-gold/40 px-5 py-3 rounded-2xl shadow-royal backdrop-blur-md">
            <div className="flex items-center gap-2 text-royal-gold text-xs font-bold uppercase tracking-wider mr-2">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Ends In:</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-center">
              <div className="w-11 h-12 rounded-lg bg-royal-maroon border border-royal-gold/30 flex flex-col justify-center">
                <span className="font-serif text-lg font-black text-royal-gold leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase text-royal-ivory/60 font-semibold">Hours</span>
              </div>
              <span className="text-royal-gold font-bold">:</span>
              <div className="w-11 h-12 rounded-lg bg-royal-maroon border border-royal-gold/30 flex flex-col justify-center">
                <span className="font-serif text-lg font-black text-royal-gold leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase text-royal-ivory/60 font-semibold">Mins</span>
              </div>
              <span className="text-royal-gold font-bold">:</span>
              <div className="w-11 h-12 rounded-lg bg-royal-maroon border border-royal-gold/30 flex flex-col justify-center">
                <span className="font-serif text-lg font-black text-royal-gold leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[8px] uppercase text-royal-ivory/60 font-semibold">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coupons.map((c) => (
          <div
            key={c.code}
            className={`royal-glass rounded-2xl p-5 border border-royal-gold/30 relative flex flex-col justify-between hover:border-royal-gold transition-all duration-300 group shadow-royal bg-gradient-to-b ${c.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-royal-deep/80 border border-royal-gold/30 text-royal-gold text-[10px] font-extrabold uppercase tracking-wider">
                  {c.badge}
                </span>
                <span className="text-[10px] text-royal-champagne/70 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-royal-gold" />
                  {c.expires}
                </span>
              </div>

              <h3 className="font-serif text-xl font-black text-gold-gradient">
                {c.title}
              </h3>
              <p className="text-xs text-royal-ivory/80 font-light mt-1.5 leading-relaxed">
                {c.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-royal-wine/60 space-y-3">
              {/* Promo Code Box */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-black/50 border border-dashed border-royal-gold/60">
                <span className="font-mono text-sm font-black text-royal-gold tracking-widest pl-1">
                  {c.code}
                </span>
                <button
                  onClick={() => handleCopy(c.code)}
                  className="px-2.5 py-1 rounded-lg bg-royal-gold text-royal-deep text-[11px] font-black uppercase tracking-wider flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow"
                >
                  {copiedCode === c.code ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[9px] text-royal-ivory/50 font-light">
                * {c.terms}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Royal Rewards Points Tier Banner */}
      <div className="royal-glass border border-royal-gold/40 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-royal-burgundy/90 via-royal-maroon to-[#28040F] shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-2 text-royal-gold font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Imperial Patron Loyalty Club</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-royal-ivory">
              Dine Like Royalty, Earn Royal Sovereign Points
            </h3>
            <p className="text-xs sm:text-sm text-royal-champagne/80 font-light leading-relaxed max-w-xl">
              Every ₹50 spent earns 1 Royal Reward Point. Redeem points for direct cash discounts on your checkout bill, complimentary Garlic Naans, or free royal desserts!
            </p>
          </div>

          <div className="md:col-span-4 flex items-center justify-center md:justify-end">
            <div className="p-4 rounded-2xl bg-black/50 border border-royal-gold/40 text-center shadow-lg w-full max-w-xs">
              <span className="text-[10px] uppercase font-bold text-royal-gold tracking-widest">
                Patron Currency
              </span>
              <p className="font-serif text-3xl font-black text-gold-gradient my-1">
                1 Point = ₹1.00
              </p>
              <span className="text-[10px] text-royal-ivory/70">
                100 Free Welcome Points on New Signup
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
