import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Sparkles, Send } from 'lucide-react';

export default function ReviewsSection({ reviews = [], onAddReview, user }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [rating, setRating] = useState(5);
  const [dish, setDish] = useState('Chicken Biryani & Butter Chicken');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    setSubmitting(true);
    const newRev = {
      userName: name,
      rating: Number(rating),
      dish: dish || 'Royal Feast Special',
      comment,
      isVerified: Boolean(user)
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRev)
      });
      const data = await res.json();
      onAddReview(data);
      setSuccessMsg('Thank you, royal patron! Your review has been recorded.');
      setComment('');
      setShowForm(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      onAddReview({ ...newRev, id: 'rev-' + Date.now(), date: new Date().toISOString().split('T')[0] });
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Testimonials of Royalty</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-gold-gradient tracking-tight">
            PRAISE FROM OUR IMPERIAL PATRONS
          </h2>
          <p className="text-xs sm:text-sm text-royal-champagne/80 font-light">
            Read what food critics, dignitaries, and biryani connoisseurs have to say.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-gold px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold-glow"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Royal Review</span>
        </button>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-bold">
          {successMsg}
        </div>
      )}

      {/* Review Submission Form Modal */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 royal-glass p-6 rounded-3xl border border-royal-gold/50 shadow-2xl space-y-4 animate-fadeIn">
          <h3 className="font-serif text-lg font-bold text-royal-ivory">
            Share Your Royal Dining Experience
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Aishwarya Rao"
                className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Dish Enjoyed</label>
              <input
                type="text"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                placeholder="e.g. Chicken Dum Biryani"
                className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Imperial Excellence)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars - Very Good)</option>
                <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Written Review</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Describe the tenderness of the meat, depth of spices, or delivery experience..."
              className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-royal-ivory/70 hover:bg-royal-wine"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="royal-glass p-5 rounded-3xl border border-royal-gold/25 flex flex-col justify-between shadow-royal hover:border-royal-gold/60 transition-all group"
          >
            <div className="space-y-3">
              {/* Star Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-royal-gold">
                  {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-royal-gold" />
                  ))}
                </div>
                <span className="text-[10px] text-royal-ivory/50 font-mono">
                  {rev.date || 'Recent'}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-xs text-royal-ivory/80 font-light leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 mt-4 border-t border-royal-wine/50 flex items-center gap-3">
              <img
                src={rev.userAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(rev.userName)}`}
                alt={rev.userName}
                className="w-10 h-10 rounded-full object-cover border border-royal-gold/40 shadow-sm"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="font-serif text-xs font-bold text-royal-ivory truncate">
                    {rev.userName}
                  </h4>
                  {rev.isVerified && (
                    <CheckCircle className="w-3 h-3 text-royal-gold fill-royal-gold flex-shrink-0" />
                  )}
                </div>
                <p className="text-[10px] text-royal-champagne/70 truncate">
                  Ordered: {rev.dish}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
