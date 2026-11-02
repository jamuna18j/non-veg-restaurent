import React, { useState } from 'react';
import { Heart, Plus, Minus, Star, Clock, Flame, UtensilsCrossed } from 'lucide-react';

export default function FoodCard({
  dish,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  onMakeItAMeal
}) {
  const [quantity, setQuantity] = useState(1);

  const handleAddDirect = () => {
    onAddToCart(dish, quantity);
  };

  const handleMakeMeal = () => {
    onMakeItAMeal(dish);
  };

  const isGravyOrCurry = 
    dish.category === 'chicken' || 
    dish.category === 'mutton' || 
    dish.category === 'egg' || 
    dish.name.toLowerCase().includes('curry') || 
    dish.name.toLowerCase().includes('masala') || 
    dish.name.toLowerCase().includes('biryani');

  return (
    <div className="royal-glass royal-glass-hover rounded-2xl overflow-hidden flex flex-col justify-between group relative border border-royal-gold/25 transition-all duration-300">
      
      {/* Top Media Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-royal-deep">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Shadow Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B0512] via-transparent to-black/30" />

        {/* Badges: Bestseller / Chef's Special */}
        {dish.badge && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-royal-gold to-[#B8860B] text-royal-deep font-black text-[10px] sm:text-xs px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
            {dish.badge}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={() => onToggleFavorite(dish.id)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
              : 'bg-black/50 text-royal-ivory hover:text-royal-gold hover:bg-black/70'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Spice Level & Prep Time Pill */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-royal-ivory/90">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-royal-gold/20">
            <Flame className="w-3 h-3 text-red-400" />
            <span>{dish.spiceLevel || 'Medium'}</span>
          </div>

          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-royal-gold/20">
            <Clock className="w-3 h-3 text-royal-champagne" />
            <span>{dish.prepTime || '20 mins'}</span>
          </div>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1 text-royal-gold font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-royal-gold" />
              <span>{dish.rating}</span>
              <span className="text-royal-ivory/50 font-normal">({dish.reviewsCount || 100}+)</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-royal-champagne/70">
              {dish.category}
            </span>
          </div>

          {/* Dish Title */}
          <h3 className="font-serif text-lg font-bold text-royal-ivory group-hover:text-gold-gradient transition-colors line-clamp-1">
            {dish.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-royal-ivory/70 line-clamp-2 mt-1 leading-relaxed font-light">
            {dish.description}
          </p>
        </div>

        {/* Pricing, Quantity & Add to Cart Controls */}
        <div className="pt-3 border-t border-royal-wine/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl sm:text-2xl font-black text-gold-gradient">
                ₹{dish.price}
              </span>
              <span className="text-[10px] text-royal-ivory/50 font-medium">per portion</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 bg-royal-wine/50 px-2 py-1 rounded-lg border border-royal-gold/30">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-royal-champagne hover:text-royal-gold p-0.5"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-bold w-4 text-center text-royal-ivory">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-royal-champagne hover:text-royal-gold p-0.5"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddDirect}
              className="flex-1 btn-gold py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            {/* "Make It A Meal" Side Pairing Button */}
            {isGravyOrCurry && (
              <button
                onClick={handleMakeMeal}
                title="Make it a complete royal meal with rice & breads"
                className="p-2 rounded-xl bg-royal-wine/60 border border-royal-gold/40 text-royal-champagne hover:border-royal-gold hover:text-royal-gold hover:bg-royal-burgundy/60 transition-all flex items-center justify-center group/btn"
              >
                <UtensilsCrossed className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
