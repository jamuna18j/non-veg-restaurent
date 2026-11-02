import React, { useState } from 'react';
import { X, ZoomIn, Sparkles, Filter } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Imperial Chicken Dum Biryani', category: 'biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 2, title: 'Charcoal Tandoori Chicken', category: 'chicken', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 3, title: 'Mutton Rogan Josh Handi', category: 'mutton', image: 'https://images.unsplash.com/photo-1545247181-516773ca838b?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 4, title: 'Clay Tandoor Blistered Garlic Naan', category: 'breads', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 5, title: 'Spicy Egg Curry with Roasted Herbs', category: 'egg', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 6, title: 'Royal Court Dining Interior', category: 'ambiance', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80', span: 'col-span-1 md:col-span-2 row-span-1' },
  { id: 7, title: 'Crisp Chicken 65 with Curry Leaves', category: 'chicken', image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 8, title: 'Malabar Flaky Layered Parotta', category: 'breads', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 9, title: 'Authentic Mutton Dum Biryani', category: 'mutton', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 10, title: 'Open Coal Kitchen Live Grill', category: 'ambiance', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 11, title: 'Steamed Soft Rice Kadubu', category: 'breads', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
  { id: 12, title: 'Pepper Masala Egg Fry', category: 'egg', image: 'https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?auto=format&fit=crop&w=800&q=80', span: 'col-span-1 row-span-1' },
];

export default function FoodGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Title */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest shadow-gold-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Visual Feasts</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient tracking-tight">
          THE ROYAL CULINARY GALLERY
        </h2>
        <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
          Immerse your senses in the vibrant colors, smoky textures, and majestic aromas of authentic royal non-vegetarian gastronomy.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'chicken', label: 'Chicken' },
            { id: 'mutton', label: 'Mutton' },
            { id: 'egg', label: 'Egg Specials' },
            { id: 'breads', label: 'Naan & Breads' },
            { id: 'ambiance', label: 'Kitchen & Court' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-royal-gold to-[#B8860B] text-royal-deep shadow-gold-glow'
                  : 'bg-royal-wine/50 border border-royal-gold/30 text-royal-champagne hover:border-royal-gold'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className={`relative rounded-3xl overflow-hidden cursor-pointer group border border-royal-gold/30 shadow-royal ${
              activeFilter === 'all' ? item.span : 'col-span-1 row-span-1'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C020A] via-transparent to-black/20 opacity-70 group-hover:opacity-40 transition-opacity" />

            {/* Hover details badge */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] uppercase font-bold tracking-wider text-royal-gold block mb-1">
                {item.category}
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-royal-ivory line-clamp-1 drop-shadow">
                {item.title}
              </h4>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-royal-champagne">
                <ZoomIn className="w-4 h-4 text-royal-gold" />
                <span>View Full Imperial View</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] royal-glass border border-royal-gold/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-royal-gold flex items-center justify-center border border-royal-gold/40 hover:bg-royal-gold hover:text-royal-deep transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-hidden max-h-[75vh]">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain bg-black"
              />
            </div>

            <div className="p-4 sm:p-5 bg-gradient-to-r from-royal-burgundy via-royal-maroon to-[#24030E] border-t border-royal-gold/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-royal-gold">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-royal-ivory">
                  {selectedPhoto.title}
                </h3>
              </div>
              <span className="text-xs text-royal-champagne/80 font-semibold">
                THE ROYAL FEAST
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
