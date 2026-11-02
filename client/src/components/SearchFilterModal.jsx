import React, { useState, useMemo } from 'react';
import { Search, X, Star, Flame, Clock, Plus, Filter, RotateCcw } from 'lucide-react';

export default function SearchFilterModal({
  isOpen,
  onClose,
  menuItems = [],
  onAddToCart,
  onToggleFavorite,
  favorites = []
}) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'rating'
  const [onlySpecials, setOnlySpecials] = useState(false);
  const [selectedSpice, setSelectedSpice] = useState('all');

  const filteredItems = useMemo(() => {
    let result = [...menuItems];

    // Search query
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Chef's special / Bestseller
    if (onlySpecials) {
      result = result.filter(item => Boolean(item.badge));
    }

    // Spice level
    if (selectedSpice !== 'all') {
      result = result.filter(item => item.spiceLevel?.toLowerCase().includes(selectedSpice.toLowerCase()));
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return result;
  }, [menuItems, query, selectedCategory, sortBy, onlySpecials, selectedSpice]);

  const handleReset = () => {
    setQuery('');
    setSelectedCategory('all');
    setSortBy('popular');
    setOnlySpecials(false);
    setSelectedSpice('all');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#25030E] border border-royal-gold/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Search Header */}
        <div className="p-4 sm:p-6 border-b border-royal-wine bg-gradient-to-r from-royal-burgundy/80 via-royal-maroon to-[#25030E] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-royal-gold" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-royal-ivory">
                SEARCH THE ROYAL BANQUET
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-royal-ivory/70 hover:text-royal-gold rounded-full hover:bg-royal-wine"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by dish name (e.g. Chicken Biryani, Butter Chicken, Rogan Josh, Naan...)"
              className="w-full pl-11 pr-10 py-3 bg-black/50 border border-royal-gold/40 rounded-xl text-royal-ivory placeholder-royal-ivory/40 text-sm focus:outline-none focus:border-royal-gold shadow-inner"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-royal-ivory/60 hover:text-royal-gold"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters & Sorting Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Dishes' },
                { id: 'egg', label: 'Egg' },
                { id: 'chicken', label: 'Chicken' },
                { id: 'mutton', label: 'Mutton' },
                { id: 'rice', label: 'Rice' },
                { id: 'breads', label: 'Breads' },
                { id: 'combos', label: 'Combos' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === c.id
                      ? 'bg-royal-gold text-royal-deep font-bold shadow-md'
                      : 'bg-royal-wine/50 text-royal-champagne border border-royal-gold/25 hover:border-royal-gold'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Sort & Specials */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/60 border border-royal-gold/30 text-royal-ivory text-xs px-2.5 py-1 rounded-lg focus:outline-none focus:border-royal-gold"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated (★)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button
                onClick={() => setOnlySpecials(!onlySpecials)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
                  onlySpecials
                    ? 'bg-royal-gold/20 border-royal-gold text-royal-gold font-bold'
                    : 'bg-black/40 border-royal-gold/30 text-royal-ivory/70 hover:text-royal-ivory'
                }`}
              >
                <Star className="w-3 h-3 fill-royal-gold text-royal-gold" />
                <span>Specials Only</span>
              </button>

              <button
                onClick={handleReset}
                title="Reset Filters"
                className="p-1 text-royal-champagne/70 hover:text-royal-gold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-royal-champagne/70 font-medium">
            <span>Showing {filteredItems.length} delicacies found</span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-royal-wine/40 border border-royal-gold/30 mx-auto flex items-center justify-center text-3xl">
                🍗
              </div>
              <h4 className="font-serif text-xl font-bold text-royal-ivory">
                No Royal Delicacies Match Your Search
              </h4>
              <p className="text-xs text-royal-champagne/70 max-w-sm mx-auto font-light">
                Try searching for 'Biryani', 'Rogan Josh', 'Naan', or browse our categories.
              </p>
              <button
                onClick={handleReset}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                View Full Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((dish) => (
                <div
                  key={dish.id}
                  className="royal-glass p-3 rounded-2xl border border-royal-gold/25 flex gap-3 items-center justify-between group hover:border-royal-gold/60 transition-all"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-16 h-16 rounded-xl object-cover border border-royal-gold/30"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[10px] text-royal-gold font-bold">
                      <Star className="w-3 h-3 fill-royal-gold" />
                      <span>{dish.rating}</span>
                      <span className="text-royal-ivory/50 capitalize">• {dish.category}</span>
                    </div>
                    <h5 className="font-serif text-xs sm:text-sm font-bold text-royal-ivory truncate">
                      {dish.name}
                    </h5>
                    <p className="font-serif text-sm font-black text-royal-champagne mt-0.5">
                      ₹{dish.price}
                    </p>
                  </div>
                  <button
                    onClick={() => { onAddToCart(dish, 1); }}
                    className="w-8 h-8 rounded-full bg-royal-gold text-royal-deep flex items-center justify-center font-bold hover:scale-105 active:scale-95 transition-all shadow"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
