import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ChevronRight, RotateCcw, Utensils, Flame, Plus, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ComboBuilder({ onAddComboToCart }) {
  // Step 1: Main Course Options
  const mains = [
    { id: 'm-chk-biryani', name: 'Chicken Dum Biryani', category: 'Chicken', price: 349, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80' },
    { id: 'm-butter-chk', name: 'Shahi Butter Chicken', category: 'Chicken', price: 369, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80' },
    { id: 'm-mut-rogan', name: 'Mutton Rogan Josh', category: 'Mutton', price: 449, image: 'https://images.unsplash.com/photo-1545247181-516773ca838b?auto=format&fit=crop&w=300&q=80' },
    { id: 'm-mut-curry', name: 'Spicy Royal Mutton Curry', category: 'Mutton', price: 439, image: 'https://images.unsplash.com/photo-1545247181-516773ca838b?auto=format&fit=crop&w=300&q=80' },
    { id: 'm-egg-curry', name: 'Royal Egg Curry Handi', category: 'Egg', price: 229, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80' },
    { id: 'm-egg-biryani', name: 'Aromatic Egg Dum Biryani', category: 'Egg', price: 269, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80' },
  ];

  // Step 2: Rice or Bread Options
  const grains = [
    { id: 'g-garlic-naan', name: 'Garlic Naan (2 pcs)', type: 'Bread', price: 158, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-butter-naan', name: 'Butter Naan (2 pcs)', type: 'Bread', price: 138, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-plain-naan', name: 'Plain Naan (2 pcs)', type: 'Bread', price: 118, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-parotta', name: 'Malabar Parotta (2 pcs)', type: 'Bread', price: 130, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-kadubu', name: 'Steamed Kadubu (2 pcs)', type: 'Bread', price: 130, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-chapati', name: 'Phulka Chapati (3 pcs)', type: 'Bread', price: 105, image: 'https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-puri', name: 'Crispy Puri (3 pcs)', type: 'Bread', price: 110, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-jeera-rice', name: 'Ghee Jeera Rice', type: 'Rice', price: 149, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-ghee-rice', name: 'Royal Ghee Rice', type: 'Rice', price: 179, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80' },
    { id: 'g-steamed-rice', name: 'Steamed Basmati Rice', type: 'Rice', price: 99, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=300&q=80' }
  ];

  // Step 3: Starter Options
  const starters = [
    { id: 's-chk-65', name: 'Chicken 65 (Crispy)', price: 289, image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=300&q=80' },
    { id: 's-chk-lollipop', name: 'Chicken Lollipop (4 pcs)', price: 299, image: 'https://images.unsplash.com/photo-1527477378392-1ca007450055?auto=format&fit=crop&w=300&q=80' },
    { id: 's-chk-tikka', name: 'Charcoal Chicken Tikka', price: 319, image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80' },
    { id: 's-egg-fry', name: 'Masala Egg Fry (2 eggs)', price: 169, image: 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?auto=format&fit=crop&w=300&q=80' },
    { id: 's-mut-pepper', name: 'Mutton Pepper Fry', price: 429, image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=300&q=80' },
  ];

  // Step 4: Beverage Options
  const beverages = [
    { id: 'b-mango-lassi', name: 'Royal Mango Lassi', price: 129, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=300&q=80' },
    { id: 'b-chaas', name: 'Masala Chaas', price: 89, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=300&q=80' },
    { id: 'b-sharbat', name: 'Rooh Afza Royal Sharbat', price: 99, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },
    { id: 'b-lime-soda', name: 'Fresh Lime Soda', price: 89, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },
    { id: 'b-mojito', name: 'Royal Mint Mojito', price: 119, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80' }
  ];

  // Step 5: Extras Options
  const extrasList = [
    { id: 'e-gravy', name: 'Extra Makhani Gravy Handi', price: 59 },
    { id: 'e-boiled-egg', name: 'Extra Boiled Egg (2 pcs)', price: 49 },
    { id: 'e-bread', name: 'Additional Butter Naan', price: 69 },
    { id: 'e-rice', name: 'Additional Ghee Rice Portion', price: 89 },
  ];

  // Selected State
  const [selectedMain, setSelectedMain] = useState(mains[0]);
  const [selectedGrain, setSelectedGrain] = useState(grains[0]);
  const [selectedStarter, setSelectedStarter] = useState(starters[0]);
  const [selectedBeverage, setSelectedBeverage] = useState(beverages[0]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  // Toggle extras
  const toggleExtra = (extra) => {
    setSelectedExtras(prev => {
      const exists = prev.find(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  // Pricing calculations
  const rawTotal = 
    (selectedMain?.price || 0) +
    (selectedGrain?.price || 0) +
    (selectedStarter?.price || 0) +
    (selectedBeverage?.price || 0) +
    selectedExtras.reduce((sum, e) => sum + e.price, 0);

  // 20% Royal Combo Builder Discount
  const discountAmount = Math.round(rawTotal * 0.20);
  const finalPrice = rawTotal - discountAmount;

  const handleAddFeastToCart = () => {
    // Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF5D0', '#E8C875', '#5B1028']
    });

    const comboItem = {
      id: `custom-feast-${Date.now()}`,
      name: `Custom Royal Feast: ${selectedMain.name}`,
      category: 'combos',
      price: finalPrice,
      originalPrice: rawTotal,
      rating: 5.0,
      badge: 'Custom Feast',
      image: selectedMain.image,
      isAvailable: true,
      description: `Includes ${selectedMain.name}, ${selectedGrain.name}, ${selectedStarter.name}, ${selectedBeverage.name}${selectedExtras.length ? `, plus ${selectedExtras.map(e => e.name).join(', ')}` : ''}.`,
      itemsIncluded: [
        selectedMain.name,
        selectedGrain.name,
        selectedStarter.name,
        selectedBeverage.name,
        ...selectedExtras.map(e => e.name)
      ]
    };

    onAddComboToCart(comboItem, 1);
  };

  return (
    <section id="combo-builder" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Title */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest shadow-gold-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Feast Architect</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient tracking-tight">
          BUILD YOUR OWN ROYAL FEAST
        </h2>
        <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
          Tailor your ultimate imperial thali step-by-step: pick your main course, bread or rice, starter, chilled beverage, and extras. Enjoy a built-in <span className="text-royal-gold font-bold">20% combo discount</span>!
        </p>
      </div>

      {/* Main Grid: Steps on Left, Live Thali Platter on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Step Tabs & Item Chooser */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step Navigation Tabs */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-1.5 bg-royal-deep/80 rounded-2xl border border-royal-gold/30">
            {[
              { num: 1, label: 'Main' },
              { num: 2, label: 'Sides' },
              { num: 3, label: 'Starter' },
              { num: 4, label: 'Drinks' },
              { num: 5, label: 'Extras' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`py-2 px-1 sm:px-2 rounded-xl text-center transition-all ${
                  currentStep === step.num
                    ? 'bg-gradient-to-r from-royal-gold to-[#B8860B] text-royal-deep font-extrabold shadow-md'
                    : 'text-royal-champagne/70 hover:text-royal-ivory hover:bg-royal-wine/40 font-semibold'
                }`}
              >
                <span className="block text-[10px] uppercase font-bold">Step 0{step.num}</span>
                <span className="text-xs sm:text-sm truncate block">{step.label}</span>
              </button>
            ))}
          </div>

          {/* Step 1: Main Course */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-royal-ivory">
                  Step 1: Choose Your Royal Main Course
                </h3>
                <span className="text-xs text-royal-champagne/70">Select 1 main course</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mains.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMain(item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedMain?.id === item.id
                        ? 'bg-royal-burgundy/80 border-royal-gold shadow-gold-glow'
                        : 'royal-glass border-royal-gold/20 hover:border-royal-gold/50'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-royal-gold/30"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-royal-gold uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-royal-ivory truncate">
                        {item.name}
                      </h4>
                      <p className="font-serif text-sm font-black text-royal-champagne mt-0.5">
                        ₹{item.price}
                      </p>
                    </div>
                    {selectedMain?.id === item.id && (
                      <div className="w-6 h-6 rounded-full bg-royal-gold text-royal-deep flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Next: Choose Sides</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Rice or Breads */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-royal-ivory">
                  Step 2: Choose Rice or Indian Bread
                </h3>
                <span className="text-xs text-royal-champagne/70">Select 1 option</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {grains.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedGrain(item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedGrain?.id === item.id
                        ? 'bg-royal-burgundy/80 border-royal-gold shadow-gold-glow'
                        : 'royal-glass border-royal-gold/20 hover:border-royal-gold/50'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border border-royal-gold/30"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-royal-gold uppercase tracking-wider">
                        {item.type}
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-royal-ivory truncate">
                        {item.name}
                      </h4>
                      <p className="font-serif text-xs font-black text-royal-champagne mt-0.5">
                        ₹{item.price}
                      </p>
                    </div>
                    {selectedGrain?.id === item.id && (
                      <div className="w-6 h-6 rounded-full bg-royal-gold text-royal-deep flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-royal-ivory/80 hover:bg-royal-wine"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Next: Choose Starter</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Starter */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-royal-ivory">
                  Step 3: Choose Your Royal Starter
                </h3>
                <span className="text-xs text-royal-champagne/70">Select 1 appetizer</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {starters.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedStarter(item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedStarter?.id === item.id
                        ? 'bg-royal-burgundy/80 border-royal-gold shadow-gold-glow'
                        : 'royal-glass border-royal-gold/20 hover:border-royal-gold/50'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-royal-gold/30"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-royal-gold uppercase tracking-wider">
                        Appetizer
                      </span>
                      <h4 className="font-serif text-sm font-bold text-royal-ivory truncate">
                        {item.name}
                      </h4>
                      <p className="font-serif text-sm font-black text-royal-champagne mt-0.5">
                        ₹{item.price}
                      </p>
                    </div>
                    {selectedStarter?.id === item.id && (
                      <div className="w-6 h-6 rounded-full bg-royal-gold text-royal-deep flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-royal-ivory/80 hover:bg-royal-wine"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Next: Choose Beverage</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Beverage */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-royal-ivory">
                  Step 4: Choose Your Royal Beverage
                </h3>
                <span className="text-xs text-royal-champagne/70">Select 1 drink</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {beverages.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedBeverage(item)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedBeverage?.id === item.id
                        ? 'bg-royal-burgundy/80 border-royal-gold shadow-gold-glow'
                        : 'royal-glass border-royal-gold/20 hover:border-royal-gold/50'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-royal-gold/30"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-royal-gold uppercase tracking-wider">
                        Chilled Drink
                      </span>
                      <h4 className="font-serif text-sm font-bold text-royal-ivory truncate">
                        {item.name}
                      </h4>
                      <p className="font-serif text-sm font-black text-royal-champagne mt-0.5">
                        ₹{item.price}
                      </p>
                    </div>
                    {selectedBeverage?.id === item.id && (
                      <div className="w-6 h-6 rounded-full bg-royal-gold text-royal-deep flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-royal-ivory/80 hover:bg-royal-wine"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Next: Choose Extras</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Extras */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-royal-ivory">
                  Step 5: Add Royal Extras (Optional)
                </h3>
                <span className="text-xs text-royal-champagne/70">Pick multiple extras</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extrasList.map((item) => {
                  const isChecked = selectedExtras.some(e => e.id === item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleExtra(item)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-royal-burgundy/80 border-royal-gold shadow-gold-glow'
                          : 'royal-glass border-royal-gold/20 hover:border-royal-gold/50'
                      }`}
                    >
                      <div>
                        <h4 className="font-serif text-sm font-bold text-royal-ivory">
                          {item.name}
                        </h4>
                        <p className="font-serif text-xs font-black text-royal-gold mt-0.5">
                          +₹{item.price}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isChecked ? 'bg-royal-gold border-royal-gold text-royal-deep' : 'border-royal-gold/40'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-royal-ivory/80 hover:bg-royal-wine"
                >
                  ← Back to Drinks
                </button>
              </div>
            </motion.div>
          )}

        </div>

        {/* Right 5 Columns: The Royal Platter Tray Visual Preview & Price Card */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="royal-glass border border-royal-gold/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            
            {/* Top Crest */}
            <div className="flex items-center justify-between border-b border-royal-wine pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-royal-gold to-royal-champagne flex items-center justify-center text-royal-deep font-black text-xs shadow-md">
                  👑
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-royal-ivory">
                    YOUR ROYAL THALI TRAY
                  </h4>
                  <p className="text-[10px] text-royal-champagne/70 uppercase tracking-wider font-semibold">
                    Visual Platter Composition
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-royal-gold/20 border border-royal-gold/40 text-royal-gold text-[10px] font-extrabold uppercase">
                20% OFF
              </span>
            </div>

            {/* Platter Visual Grid */}
            <div className="relative p-4 rounded-2xl bg-[#1C020A]/80 border border-royal-gold/30 mb-5">
              <div className="grid grid-cols-2 gap-3">
                
                {/* Main dish pill */}
                <div className="p-2 rounded-xl bg-royal-wine/50 border border-royal-gold/20 flex items-center gap-2">
                  <img
                    src={selectedMain.image}
                    alt={selectedMain.name}
                    className="w-10 h-10 rounded-lg object-cover border border-royal-gold/30"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[9px] uppercase tracking-wider text-royal-gold font-bold block">
                      Main
                    </span>
                    <p className="text-xs font-bold text-royal-ivory truncate">
                      {selectedMain.name}
                    </p>
                  </div>
                </div>

                {/* Grain / Bread pill */}
                <div className="p-2 rounded-xl bg-royal-wine/50 border border-royal-gold/20 flex items-center gap-2">
                  <img
                    src={selectedGrain.image}
                    alt={selectedGrain.name}
                    className="w-10 h-10 rounded-lg object-cover border border-royal-gold/30"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[9px] uppercase tracking-wider text-royal-gold font-bold block">
                      Bread / Rice
                    </span>
                    <p className="text-xs font-bold text-royal-ivory truncate">
                      {selectedGrain.name}
                    </p>
                  </div>
                </div>

                {/* Starter pill */}
                <div className="p-2 rounded-xl bg-royal-wine/50 border border-royal-gold/20 flex items-center gap-2">
                  <img
                    src={selectedStarter.image}
                    alt={selectedStarter.name}
                    className="w-10 h-10 rounded-lg object-cover border border-royal-gold/30"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[9px] uppercase tracking-wider text-royal-gold font-bold block">
                      Starter
                    </span>
                    <p className="text-xs font-bold text-royal-ivory truncate">
                      {selectedStarter.name}
                    </p>
                  </div>
                </div>

                {/* Drink pill */}
                <div className="p-2 rounded-xl bg-royal-wine/50 border border-royal-gold/20 flex items-center gap-2">
                  <img
                    src={selectedBeverage.image}
                    alt={selectedBeverage.name}
                    className="w-10 h-10 rounded-lg object-cover border border-royal-gold/30"
                  />
                  <div className="overflow-hidden">
                    <span className="text-[9px] uppercase tracking-wider text-royal-gold font-bold block">
                      Drink
                    </span>
                    <p className="text-xs font-bold text-royal-ivory truncate">
                      {selectedBeverage.name}
                    </p>
                  </div>
                </div>

              </div>

              {/* Extras pill if any */}
              {selectedExtras.length > 0 && (
                <div className="mt-3 pt-2 border-t border-royal-wine/60 text-[11px] text-royal-champagne/80 flex items-center gap-1.5">
                  <span className="font-bold text-royal-gold">+ Extras:</span>
                  <span className="truncate">{selectedExtras.map(e => e.name).join(', ')}</span>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 border-t border-royal-wine pt-4 text-xs">
              <div className="flex justify-between text-royal-ivory/70">
                <span>Items Subtotal</span>
                <span>₹{rawTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Royal Bundle Savings (20%)</span>
                <span>-₹{discountAmount}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-royal-wine">
                <span className="font-serif text-sm font-bold text-royal-ivory">
                  Final Combo Feast Price
                </span>
                <div className="text-right">
                  <span className="text-xs line-through text-royal-ivory/50 mr-2">
                    ₹{rawTotal}
                  </span>
                  <span className="font-serif text-2xl font-black text-gold-gradient">
                    ₹{finalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Big Royal Animated Button */}
            <button
              onClick={handleAddFeastToCart}
              className="mt-6 w-full btn-gold py-3.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-gold-glow-lg flex items-center justify-center gap-2 group transition-all"
            >
              <Sparkles className="w-4 h-4 text-royal-deep group-hover:rotate-45 transition-transform" />
              <span>ADD MY ROYAL FEAST TO CART</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

          </div>
        </div>

      </div>

    </section>
  );
}
