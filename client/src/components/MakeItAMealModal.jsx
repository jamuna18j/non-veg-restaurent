import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles, Utensils } from 'lucide-react';

export default function MakeItAMealModal({
  isOpen,
  onClose,
  mainDish,
  onAddToCartWithSides
}) {
  if (!isOpen || !mainDish) return null;

  // Available side options
  const defaultSides = [
    { id: 'side-garlic-naan', name: 'Garlic Naan (1 pc)', price: 79, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80' },
    { id: 'side-butter-naan', name: 'Butter Naan (1 pc)', price: 69, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80' },
    { id: 'side-parotta', name: 'Malabar Parotta (2 pcs)', price: 65, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=200&q=80' },
    { id: 'side-chapati', name: 'Phulka Chapati (2 pcs)', price: 35, image: 'https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=200&q=80' },
    { id: 'side-kadubu', name: 'Steamed Kadubu (2 pcs)', price: 65, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=200&q=80' },
    { id: 'side-jeera-rice', name: 'Fragrant Jeera Rice', price: 149, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=200&q=80' },
    { id: 'side-gravy', name: 'Extra Rich Royal Gravy Handi', price: 59, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80' },
    { id: 'side-egg', name: 'Extra Spicy Boiled Egg (2 pcs)', price: 49, image: 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?auto=format&fit=crop&w=200&q=80' },
  ];

  const [selectedSides, setSelectedSides] = useState({});
  const [mainQuantity, setMainQuantity] = useState(1);

  const toggleSide = (side) => {
    setSelectedSides(prev => {
      const current = prev[side.id];
      if (current) {
        const copy = { ...prev };
        delete copy[side.id];
        return copy;
      } else {
        return { ...prev, [side.id]: { ...side, quantity: 1 } };
      }
    });
  };

  const updateSideQuantity = (sideId, delta) => {
    setSelectedSides(prev => {
      const item = prev[sideId];
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[sideId];
        return copy;
      }
      return { ...prev, [sideId]: { ...item, quantity: newQty } };
    });
  };

  // Calculations
  const sidesTotal = Object.values(selectedSides).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalMealPrice = (mainDish.price * mainQuantity) + sidesTotal;

  const handleConfirm = () => {
    onAddToCartWithSides(
      mainDish,
      mainQuantity,
      Object.values(selectedSides)
    );
    onClose();
  };

  const handleOnlyDish = () => {
    onAddToCartWithSides(mainDish, mainQuantity, []);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#290512] border border-royal-gold/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-royal-wine bg-gradient-to-r from-royal-burgundy/80 via-royal-maroon to-[#290512] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-gold/20 flex items-center justify-center text-royal-gold">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-royal-ivory">
                MAKE IT A COMPLETE ROYAL MEAL
              </h3>
              <p className="text-xs text-royal-champagne/80 font-medium">
                Pair your royal dish with freshly baked breads, fragrant rice, or extra gravy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-royal-ivory/70 hover:text-royal-gold rounded-full hover:bg-royal-wine/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          
          {/* Main Dish Summary Card */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-royal-wine/40 border border-royal-gold/30">
            <img
              src={mainDish.image}
              alt={mainDish.name}
              className="w-20 h-20 rounded-lg object-cover border border-royal-gold/40 shadow-md"
            />
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-gold">
                Selected Main Course
              </span>
              <h4 className="font-serif text-base font-bold text-royal-ivory">
                {mainDish.name}
              </h4>
              <p className="font-serif text-sm font-extrabold text-royal-champagne">
                ₹{mainDish.price} each
              </p>
            </div>
            
            {/* Quantity Selector for Main Dish */}
            <div className="flex items-center gap-2 bg-royal-maroon px-2 py-1 rounded-lg border border-royal-gold/30">
              <button
                onClick={() => setMainQuantity(Math.max(1, mainQuantity - 1))}
                className="p-1 text-royal-champagne hover:text-royal-gold"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold w-5 text-center text-royal-ivory">
                {mainQuantity}
              </span>
              <button
                onClick={() => setMainQuantity(mainQuantity + 1)}
                className="p-1 text-royal-champagne hover:text-royal-gold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sides Selection Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-royal-champagne mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-royal-gold" />
              <span>Select Royal Sides & Breads (Optional)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {defaultSides.map((side) => {
                const isSelected = Boolean(selectedSides[side.id]);
                const qty = selectedSides[side.id]?.quantity || 0;

                return (
                  <div
                    key={side.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-royal-burgundy/60 border-royal-gold shadow-md'
                        : 'bg-royal-wine/30 border-royal-gold/20 hover:border-royal-gold/40'
                    }`}
                  >
                    <div
                      onClick={() => toggleSide(side)}
                      className="flex items-center gap-2.5 flex-1 cursor-pointer"
                    >
                      <img
                        src={side.image}
                        alt={side.name}
                        className="w-11 h-11 rounded-lg object-cover border border-royal-gold/25"
                      />
                      <div>
                        <p className="text-xs font-bold text-royal-ivory leading-tight">
                          {side.name}
                        </p>
                        <p className="text-xs font-extrabold text-royal-gold mt-0.5">
                          +₹{side.price}
                        </p>
                      </div>
                    </div>

                    {isSelected ? (
                      <div className="flex items-center gap-1.5 bg-royal-maroon px-2 py-1 rounded-md border border-royal-gold/40">
                        <button
                          onClick={() => updateSideQuantity(side.id, -1)}
                          className="p-0.5 text-royal-ivory hover:text-royal-gold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-royal-gold">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateSideQuantity(side.id, 1)}
                          className="p-0.5 text-royal-ivory hover:text-royal-gold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleSide(side)}
                        className="px-2.5 py-1 text-xs font-bold text-royal-champagne border border-royal-gold/40 rounded-md hover:bg-royal-gold hover:text-royal-deep transition-all"
                      >
                        + Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions & Price Calculation */}
        <div className="p-4 sm:p-5 border-t border-royal-wine bg-[#1E030C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-royal-champagne/70 font-semibold block">
              Total Meal Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-black text-gold-gradient">
                ₹{totalMealPrice}
              </span>
              {Object.keys(selectedSides).length > 0 && (
                <span className="text-xs text-royal-ivory/60">
                  (Includes {Object.keys(selectedSides).length} side items)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleOnlyDish}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-full border border-royal-gold/30 text-xs font-bold text-royal-ivory hover:bg-royal-wine transition-all"
            >
              Add Main Dish Only
            </button>

            <button
              onClick={handleConfirm}
              className="flex-1 sm:flex-none btn-gold px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
            >
              <span>Add Complete Meal</span>
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
