import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Flame, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const heroDishes = [
  {
    title: "Imperial Chicken Dum Biryani",
    category: "Royal Chef's Signature",
    desc: "Aged long-grain basmati infused with pure saffron, marinated tender spring chicken, and Awadhi aromatics sealed in clay handis.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
    price: "₹349",
    rating: "5.0 ★"
  },
  {
    title: "Royal Kashmiri Mutton Rogan Josh",
    category: "Heritage Special",
    desc: "Prime goat cuts slow-simmered in rich Kashmiri cockscomb & ratanjot infused gravy with crushed green cardamom.",
    image: "https://images.unsplash.com/photo-1545247181-516773ca838b?auto=format&fit=crop&w=1000&q=80",
    price: "₹449",
    rating: "4.9 ★"
  },
  {
    title: "Charcoal Smoked Tandoori Chicken",
    category: "Tandoor Legend",
    desc: "Whole spring chicken bathed in hung yogurt, mustard oil, and fiery Mathania red chilies, roasted over clay coals.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80",
    price: "₹389",
    rating: "4.9 ★"
  },
  {
    title: "Velvety Shahi Butter Chicken",
    category: "Crowd Favorite",
    desc: "Tender shredded tandoori chicken immersed in satin-smooth butter-infused tomato gravy with fenugreek aroma.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=80",
    price: "₹369",
    rating: "5.0 ★"
  },
  {
    title: "Royal Egg Masala & Garlic Naan",
    category: "Egg Special",
    desc: "Golden fried farm eggs nestled in roasted spice gravy, served beside blistered garlic-infused tandoor naan.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80",
    price: "₹229",
    rating: "4.8 ★"
  }
];

export default function Hero({ onOrderNow, onExploreMenu }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroDishes.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % heroDishes.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + heroDishes.length) % heroDishes.length);

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(91,16,40,0.5)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Promotional Offer Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-royal-burgundy/90 via-royal-wine/80 to-royal-maroon border border-royal-gold/60 shadow-gold-glow backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-royal-gold animate-spin-slow" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wider text-gold-gradient uppercase">
                FIRST ORDER: FLAT 20% OFF — CODE: ROYAL20
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-black text-royal-ivory tracking-tight leading-[1.1]">
                HUNGER DESERVES <br className="hidden sm:inline" />
                <span className="text-gold-gradient drop-shadow-[0_4px_25px_rgba(212,175,55,0.4)]">
                  ROYAL TREATMENT.
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-xl text-royal-champagne/90 font-light max-w-xl mx-auto lg:mx-0 tracking-wide"
            >
              Freshly prepared. Perfectly spiced. Unforgettable taste.
            </motion.p>

            {/* Feature Highlights Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-semibold text-royal-ivory/80 pt-1"
            >
              <div className="flex items-center gap-1.5 bg-royal-wine/60 px-3 py-1.5 rounded-full border border-royal-gold/20">
                <Flame className="w-3.5 h-3.5 text-royal-gold" />
                <span>Slow Dum-Cooked Handis</span>
              </div>
              <div className="flex items-center gap-1.5 bg-royal-wine/60 px-3 py-1.5 rounded-full border border-royal-gold/20">
                <Clock className="w-3.5 h-3.5 text-royal-gold" />
                <span>30-Min Fast Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-royal-wine/60 px-3 py-1.5 rounded-full border border-royal-gold/20">
                <Star className="w-3.5 h-3.5 text-royal-gold fill-royal-gold" />
                <span>4.9 / 5.0 Royal Rated</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto btn-gold px-8 py-3.5 rounded-full text-sm font-extrabold tracking-widest uppercase shadow-gold-glow flex items-center justify-center gap-2 group"
              >
                <span>ORDER NOW</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto btn-royal-outline px-8 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <span>EXPLORE OUR MENU</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column: Animated Interactive Food Carousel & Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Outer Golden Halo Frame */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] rounded-full p-2.5 bg-gradient-to-tr from-royal-gold via-royal-champagne/40 to-transparent shadow-gold-glow-lg">
              
              {/* Rotating Circular Border */}
              <div className="absolute inset-0 rounded-full border border-dashed border-royal-gold/60 animate-spin-slow pointer-events-none" />

              {/* Dish Carousel Container */}
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-2xl bg-royal-maroon">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={heroDishes[currentIndex].image}
                      alt={heroDishes[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E020A] via-transparent to-black/20" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating Floating Price & Info Pill */}
              <motion.div
                key={`badge-${currentIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-11/12 sm:w-80 royal-glass border border-royal-gold/60 rounded-2xl p-3 text-center shadow-royal z-20 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-royal-champagne">
                    {heroDishes[currentIndex].category}
                  </span>
                  <span className="text-xs font-black text-royal-gold">
                    {heroDishes[currentIndex].rating}
                  </span>
                </div>
                <h4 className="font-serif text-sm sm:text-base font-bold text-royal-ivory truncate">
                  {heroDishes[currentIndex].title}
                </h4>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="font-serif text-lg font-black text-gold-gradient">
                    {heroDishes[currentIndex].price}
                  </span>
                  <span className="text-[10px] text-royal-champagne/70 font-semibold">• Fresh Clay Pot Dum</span>
                </div>
              </motion.div>

              {/* Carousel Next / Prev Controls */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 -left-3 sm:-left-5 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#3B0718]/90 border border-royal-gold/60 text-royal-gold flex items-center justify-center hover:bg-royal-gold hover:text-royal-deep transition-all shadow-lg z-20"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 -right-3 sm:-right-5 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#3B0718]/90 border border-royal-gold/60 text-royal-gold flex items-center justify-center hover:bg-royal-gold hover:text-royal-deep transition-all shadow-lg z-20"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Floating Floating Dum Pot Badge */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -top-4 right-0 bg-royal-wine/90 border border-royal-gold/50 rounded-2xl p-2.5 shadow-royal backdrop-blur-md items-center gap-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-royal-gold/20 flex items-center justify-center text-royal-gold font-bold">
                🍗
              </div>
              <div>
                <p className="text-[11px] font-bold text-royal-champagne">Awadhi Royal Recipe</p>
                <p className="text-[9px] text-royal-ivory/60">Simmered over slow coal</p>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Animated Scroll Down Indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#menu"
            className="flex flex-col items-center text-royal-champagne/70 hover:text-royal-gold transition-colors group cursor-pointer"
          >
            <span className="text-[10px] tracking-widest uppercase font-semibold mb-1 group-hover:tracking-wider transition-all">
              Scroll To Feasts
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="w-6 h-10 rounded-full border border-royal-gold/40 flex items-start justify-center p-1.5"
            >
              <div className="w-1.5 h-2.5 bg-royal-gold rounded-full" />
            </motion.div>
          </a>
        </div>

      </div>
    </section>
  );
}
