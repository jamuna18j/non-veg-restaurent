import React from 'react';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ChefHat, 
  Clock, 
  HeartHandshake, 
  Award, 
  Truck,
  Leaf
} from 'lucide-react';

export default function AboutAndWhyUs() {
  const whyUsFeatures = [
    {
      icon: Leaf,
      title: "Fresh Farm Ingredients",
      desc: "Grade-A antibiotic-free farm poultry, pasture-raised eggs, and young tender goat sourced daily at dawn."
    },
    {
      icon: ChefHat,
      title: "Master Royal Chefs",
      desc: "Culinary descendants of imperial Awadhi & Hyderabadi royal khansamas with 20+ years of tandoori mastery."
    },
    {
      icon: Flame,
      title: "Stone-Ground Authentic Spices",
      desc: "Whole spices hand-pounded in stone silbattas: Tellicherry pepper, Mathania chilies, and royal saffron."
    },
    {
      icon: ShieldCheck,
      title: "5-Star Hygienic Preparation",
      desc: "ISO-certified, sanitized culinary suites with thermal contactless packaging and tamper-evident gold seals."
    },
    {
      icon: Award,
      title: "Award-Winning Recipes",
      desc: "Recognized as South India's premier luxury non-vegetarian kitchen, boasting over 15,000+ five-star reviews."
    },
    {
      icon: Truck,
      title: "30-Min Fast Home Delivery",
      desc: "Dedicated royal fleet equipped with thermal-heated insulated carriers so food arrives sizzling hot."
    },
    {
      icon: Sparkles,
      title: "Imperial Quality Assurance",
      desc: "Never re-heated. Every single clay handi biryani and tandoori kebab is prepared fresh to order."
    },
    {
      icon: HeartHandshake,
      title: "Royal Concierge Service",
      desc: "Personalized hospitality, custom banquet arrangements, and bespoke spice tailoring for every craving."
    }
  ];

  return (
    <div id="about" className="space-y-24 py-16">
      
      {/* ================= ABOUT US SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
                  alt="Charcoal Tandoori Grill in Imperial Kitchen"
                  className="rounded-3xl object-cover h-64 sm:h-72 w-full border border-royal-gold/40 shadow-royal"
                />
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
                  alt="Simmering Royal Handi"
                  className="rounded-3xl object-cover h-44 sm:h-48 w-full border border-royal-gold/40 shadow-royal"
                />
              </div>

              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                  alt="Luxurious Royal Dining Room"
                  className="rounded-3xl object-cover h-48 sm:h-52 w-full border border-royal-gold/40 shadow-royal"
                />
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
                  alt="Handi Dum Biryani"
                  className="rounded-3xl object-cover h-64 sm:h-68 w-full border border-royal-gold/40 shadow-royal"
                />
              </div>
            </div>

            {/* Golden Heritage Stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-tr from-royal-gold via-royal-champagne to-[#9C7715] p-1 shadow-gold-glow-lg z-20 flex items-center justify-center text-center">
              <div className="w-full h-full rounded-full bg-royal-deep flex flex-col items-center justify-center p-2">
                <span className="font-serif text-lg font-black text-royal-gold leading-none">ESTD</span>
                <span className="font-serif text-xl font-black text-royal-ivory my-0.5">2012</span>
                <span className="text-[8px] uppercase font-bold text-royal-champagne">Royal Heritage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest shadow-gold-glow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Imperial Culinary Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black text-royal-ivory tracking-tight leading-tight">
              MORE THAN FOOD, <br />
              <span className="text-gold-gradient">IT'S A ROYAL EXPERIENCE.</span>
            </h2>

            <p className="text-sm sm:text-base text-royal-champagne/90 font-light leading-relaxed">
              Founded on the philosophy that dining is an art form fit for kings, <strong className="text-royal-gold font-semibold">THE ROYAL FEAST</strong> brings together authentic 400-year-old culinary secrets from Mughal, Awadhi, and Nizam courts.
            </p>

            <p className="text-sm sm:text-base text-royal-ivory/80 font-light leading-relaxed">
              We never compromise on authenticity: from whole country chickens and tender goat shanks slow-simmered in sealed copper handis over hickory wood coals, to stone-ground Tellicherry black pepper and aged saffron strands. Each dish is an unforgettable symphony of aroma, spice, and opulent hospitality.
            </p>

            {/* Metrics Counter */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-royal-wine">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-black text-gold-gradient">
                  30+
                </p>
                <p className="text-[11px] text-royal-ivory/70 uppercase tracking-wider font-semibold">
                  Royal Recipes
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl sm:text-3xl font-black text-gold-gradient">
                  15,000+
                </p>
                <p className="text-[11px] text-royal-ivory/70 uppercase tracking-wider font-semibold">
                  Happy Patrons
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl sm:text-3xl font-black text-gold-gradient">
                  4.9 ★
                </p>
                <p className="text-[11px] text-royal-ivory/70 uppercase tracking-wider font-semibold">
                  Average Rating
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US (8 FEATURE CARDS) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest shadow-gold-glow">
            <Award className="w-3.5 h-3.5" />
            <span>The Royal Distinction</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient tracking-tight">
            WHY DINE AT THE ROYAL FEAST
          </h2>
          <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
            Discover the hallmarks of excellence that elevate our kitchen above all ordinary dining.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUsFeatures.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={index}
                className="royal-glass royal-glass-hover p-6 rounded-3xl border border-royal-gold/25 flex flex-col justify-between group shadow-royal"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-royal-wine/60 border border-royal-gold/40 flex items-center justify-center text-royal-gold group-hover:scale-110 group-hover:bg-royal-gold group-hover:text-royal-deep transition-all duration-300 shadow-md mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-royal-ivory group-hover:text-royal-gold transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-royal-champagne/80 font-light mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-royal-wine/50 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-royal-gold">
                  <span>Royal Standard</span>
                  <span>• 0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}
