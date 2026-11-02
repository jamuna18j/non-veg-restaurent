import React from 'react';
import FoodCard from './FoodCard';
import { Sparkles, Crown, Flame, ChevronRight } from 'lucide-react';

export default function MenuSections({
  menuItems = [],
  favorites = [],
  onToggleFavorite,
  onAddToCart,
  onMakeItAMeal
}) {
  // Filter subsets
  const eggItems = menuItems.filter(item => item.category === 'egg');
  const chickenItems = menuItems.filter(item => item.category === 'chicken');
  const muttonItems = menuItems.filter(item => item.category === 'mutton');
  const riceItems = menuItems.filter(item => item.category === 'rice');
  const breadItems = menuItems.filter(item => item.category === 'breads');

  return (
    <div id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      
      {/* Category Section Nav Quick Jump */}
      <div className="sticky top-20 z-30 py-3 -mx-4 px-4 bg-[#23040E]/90 backdrop-blur-md border-y border-royal-gold/25 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-4 min-w-max">
          <a
            href="#egg-specials"
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-wine/60 border border-royal-gold/30 text-royal-champagne hover:border-royal-gold hover:text-royal-gold transition-all"
          >
            Egg Delights ({eggItems.length})
          </a>
          <a
            href="#chicken-specials"
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-wine/60 border border-royal-gold/30 text-royal-champagne hover:border-royal-gold hover:text-royal-gold transition-all"
          >
            Chicken Collection ({chickenItems.length})
          </a>
          <a
            href="#mutton-specials"
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-wine/60 border border-royal-gold/30 text-royal-champagne hover:border-royal-gold hover:text-royal-gold transition-all"
          >
            Royal Mutton ({muttonItems.length})
          </a>
          <a
            href="#sides-specials"
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-wine/60 border border-royal-gold/30 text-royal-champagne hover:border-royal-gold hover:text-royal-gold transition-all"
          >
            Rice & Breads ({riceItems.length + breadItems.length})
          </a>
          <a
            href="#combos"
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-royal-gold to-[#B8860B] text-royal-deep font-extrabold shadow-sm transition-all"
          >
            Royal Combos (10)
          </a>
        </div>
      </div>

      {/* ================= SECTION A: EGG SPECIALS (EXACTLY 10 DISHES) ================= */}
      <section id="egg-specials" className="scroll-mt-32">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category 01 • Pure Farm Eggs</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-tight">
            EGG-CELLENT ROYAL DELIGHTS
          </h2>
          <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
            From creamy masala omelettes and hand-pounded pepper fries to slow-simmered egg curries and dum biryanis, explore all 10 imperial egg creations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eggItems.map((dish) => (
            <FoodCard
              key={dish.id}
              dish={dish}
              isFavorite={favorites.includes(dish.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onMakeItAMeal={onMakeItAMeal}
            />
          ))}
        </div>
      </section>

      {/* ================= SECTION B: CHICKEN SPECIALS (EXACTLY 15 DISHES) ================= */}
      <section id="chicken-specials" className="scroll-mt-32">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5" />
            <span>Category 02 • Master Chef Tandoor & Curries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-tight">
            THE CHICKEN ROYAL COLLECTION
          </h2>
          <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
            Fifteen majestic chicken recipes crafted with freshly butchered poultry, 24-hour spice marinades, and charcoal tandoor fires.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {chickenItems.map((dish) => (
            <FoodCard
              key={dish.id}
              dish={dish}
              isFavorite={favorites.includes(dish.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onMakeItAMeal={onMakeItAMeal}
            />
          ))}
        </div>
      </section>

      {/* ================= SECTION C: MUTTON SPECIALS (EXACTLY 5 DISHES) ================= */}
      <section id="mutton-specials" className="scroll-mt-32">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" />
            <span>Category 03 • Rich Goat Meat Delicacies</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-tight">
            THE ROYAL MUTTON FEAST
          </h2>
          <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
            Melt-in-the-mouth goat meat slow-cooked in copper handis with Kashmiri chilies, green cardamom, and royal marrow stock.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {muttonItems.map((dish) => (
            <FoodCard
              key={dish.id}
              dish={dish}
              isFavorite={favorites.includes(dish.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onMakeItAMeal={onMakeItAMeal}
            />
          ))}
        </div>
      </section>

      {/* ================= SECTION D: RICE & INDIAN BREADS ================= */}
      <section id="sides-specials" className="scroll-mt-32">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Category 04 • Breads & Grains</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-tight">
            THE PERFECT ROYAL SIDES
          </h2>
          <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
            Independently orderable clay-oven blistered naans, fluffy Malabar parottas, steamed kadubus, and aged basmati rice preparations.
          </p>
        </div>

        {/* Sub-Section 1: Fragrant Rice Varieties */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center gap-3 border-b border-royal-gold/30 pb-3">
            <h3 className="font-serif text-2xl font-bold text-royal-ivory">
              Imperial Rice Varieties
            </h3>
            <span className="text-xs bg-royal-gold text-royal-deep font-black px-2 py-0.5 rounded-full">
              8 Varieties
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {riceItems.map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                isFavorite={favorites.includes(dish.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
                onMakeItAMeal={onMakeItAMeal}
              />
            ))}
          </div>
        </div>

        {/* Sub-Section 2: Authentic Indian Breads */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-royal-gold/30 pb-3">
            <h3 className="font-serif text-2xl font-bold text-royal-ivory">
              Clay Tandoor & Tawa Breads
            </h3>
            <span className="text-xs bg-royal-gold text-royal-deep font-black px-2 py-0.5 rounded-full">
              8 Breads
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {breadItems.map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                isFavorite={favorites.includes(dish.id)}
                onToggleFavorite={onToggleFavorite}
                onAddToCart={onAddToCart}
                onMakeItAMeal={onMakeItAMeal}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
