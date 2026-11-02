import React from 'react';
import { Star, Clock, Check, Plus, Tag, Flame, Sparkles } from 'lucide-react';

export default function SpecialCombosSection({
  combos = [],
  onAddToCart
}) {
  return (
    <section id="combos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest shadow-gold-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Banquets</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient tracking-tight">
          THE ROYAL COMBO BANQUETS
        </h2>
        <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
          Ten grand combinations designed by our royal culinary khansamas with generous portions, complementary flavors, and unbeatable imperial value.
        </p>
      </div>

      {/* Grid of 10 Combos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="royal-glass royal-glass-hover rounded-3xl overflow-hidden border border-royal-gold/30 flex flex-col justify-between group shadow-royal"
          >
            {/* Top Media */}
            <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-royal-deep">
              <img
                src={combo.image}
                alt={combo.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25030E] via-transparent to-black/30" />

              {/* Discount Tag */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-rose-700 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>SAVE {combo.discountPercent}%</span>
              </div>

              {/* Limited Time Badge */}
              {combo.badge && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-royal-gold to-[#B8860B] text-royal-deep font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {combo.badge}
                </div>
              )}

              {/* Rating & Prep Time */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-royal-ivory">
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-royal-gold/20">
                  <Star className="w-3.5 h-3.5 text-royal-gold fill-royal-gold" />
                  <span>{combo.rating}</span>
                  <span className="text-royal-ivory/50">({combo.reviewsCount}+)</span>
                </div>

                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-royal-gold/20">
                  <Clock className="w-3.5 h-3.5 text-royal-champagne" />
                  <span>{combo.prepTime}</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-royal-ivory group-hover:text-gold-gradient transition-colors">
                  {combo.name}
                </h3>
                <p className="text-xs text-royal-champagne/80 font-light mt-1.5 leading-relaxed">
                  {combo.description}
                </p>

                {/* Items Included Checklist */}
                {combo.itemsIncluded && (
                  <div className="mt-3.5 p-3 rounded-xl bg-royal-wine/30 border border-royal-gold/20 space-y-1.5">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-royal-gold">
                      What's Inside This Royal Combo:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-royal-ivory/80">
                      {combo.itemsIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-royal-gold stroke-[3] flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-royal-wine flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-black text-gold-gradient">
                      ₹{combo.price}
                    </span>
                    {combo.originalPrice && (
                      <span className="text-xs line-through text-royal-ivory/50">
                        ₹{combo.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    Save ₹{(combo.originalPrice || 0) - combo.price} instant savings
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(combo, 1)}
                  className="btn-gold px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Feast</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
