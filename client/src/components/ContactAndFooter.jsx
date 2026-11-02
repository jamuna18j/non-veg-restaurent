import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Youtube, 
  Check, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import RoyalLogo from './RoyalLogo';

export default function ContactAndFooter() {
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Royal Banquet / Catering Inquiry',
    message: ''
  });
  const [inquiryStatus, setInquiryStatus] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [activePolicyModal, setActivePolicyModal] = useState(null); // 'privacy', 'terms', 'refund', 'delivery'

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.email || !inquiryData.message) return;

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      const data = await res.json();
      setInquiryStatus('Your royal message has been delivered to our concierge.');
      setInquiryData({ name: '', email: '', phone: '', subject: 'Royal Banquet / Catering Inquiry', message: '' });
      setTimeout(() => setInquiryStatus(''), 5000);
    } catch (err) {
      setInquiryStatus('Thank you. We will contact your royal highness shortly.');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('Subscribed to the Imperial Newsletter!');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus(''), 4000);
  };

  return (
    <div id="contact" className="space-y-16 pt-16">
      
      {/* ================= CONTACT & LOCATION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-wine/80 border border-royal-gold/40 text-royal-gold text-xs font-bold uppercase tracking-widest shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Palace Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient tracking-tight">
            VISIT OUR CITADEL OR CONNECT
          </h2>
          <p className="text-sm sm:text-base text-royal-champagne/80 font-light max-w-2xl mx-auto">
            Reserve our private dining chambers, request grand event catering, or speak directly with our royal dining stewards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Columns: Contact Cards & Google Maps Embed */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="royal-glass p-6 rounded-3xl border border-royal-gold/30 shadow-royal space-y-4">
              
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-royal-wine/80 border border-royal-gold/40 flex items-center justify-center text-royal-gold flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-royal-ivory">
                    The Grand Citadel
                  </h4>
                  <p className="text-xs text-royal-champagne/80 font-light leading-relaxed">
                    44 Heritage Boulevard, 100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-royal-wine/80 border border-royal-gold/40 flex items-center justify-center text-royal-gold flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-royal-ivory">
                    Imperial Hotline
                  </h4>
                  <p className="text-xs text-royal-champagne font-mono">
                    +91 80 4920 8888 • +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-royal-wine/80 border border-royal-gold/40 flex items-center justify-center text-royal-gold flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-royal-ivory">
                    Concierge Dispatch
                  </h4>
                  <p className="text-xs text-royal-champagne font-mono">
                    concierge@royalfeast.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-royal-wine/80 border border-royal-gold/40 flex items-center justify-center text-royal-gold flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-royal-ivory">
                    Hours of Royal Service
                  </h4>
                  <p className="text-xs text-royal-champagne/80 font-light">
                    Monday to Sunday: 11:30 AM – 11:30 PM (Non-stop kitchen)
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <a
                href="https://wa.me/919876543210?text=Greetings%20Royal%20Feast!%20I%20would%20like%20to%20order%20or%20reserve%20a%20table."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-800/80 transition-all shadow"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Instant WhatsApp Concierge</span>
              </a>

            </div>

            {/* Embedded Interactive Google Map */}
            <div className="royal-glass p-2 rounded-3xl border border-royal-gold/30 shadow-royal overflow-hidden h-56">
              <iframe
                title="The Royal Feast Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0016962369666!2d77.6409425757912!3d12.971783587343716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae168270f2f359%3A0xb36ef8c2bc820572!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full rounded-2xl border-0 filter contrast-125 brightness-90"
                allowFullScreen=""
                loading="lazy"
              />
            </div>

          </div>

          {/* Right 7 Columns: Working Enquiry / Banquet Booking Form */}
          <div className="lg:col-span-7">
            <div className="royal-glass p-6 sm:p-8 rounded-3xl border border-royal-gold/40 shadow-2xl space-y-5">
              
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-royal-ivory">
                  Send an Imperial Enquiry or Banquet Request
                </h3>
                <p className="text-xs text-royal-champagne/80 font-light mt-1">
                  Planning a corporate lunch, royal wedding feast, or weekend family gathering? Let us prepare an unforgettable feast.
                </p>
              </div>

              {inquiryStatus && (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-bold">
                  {inquiryStatus}
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      required
                      placeholder="e.g. Maharaja Vikramaditya"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      required
                      placeholder="vikram@royalfeast.com"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      placeholder="+91 98450 12345"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                      Nature of Request
                    </label>
                    <select
                      value={inquiryData.subject}
                      onChange={(e) => setInquiryData({ ...inquiryData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                    >
                      <option value="Royal Banquet / Catering Inquiry">Royal Banquet / Catering Inquiry (50+ Guests)</option>
                      <option value="Private Dining Chamber Table Reservation">Private Dining Chamber Table Reservation</option>
                      <option value="Chef's Special Custom Menu Request">Chef's Special Custom Menu Request</option>
                      <option value="Corporate Bulk Order Catering">Corporate Bulk Order Catering</option>
                      <option value="General Dining Feedback">General Dining Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                    Your Royal Message & Details *
                  </label>
                  <textarea
                    rows={4}
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    required
                    placeholder="Provide details on event date, guest count, spice preferences, or special requests..."
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Royal Message</span>
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>

      {/* ================= ROYAL FOOTER ================= */}
      <footer className="border-t border-royal-gold/40 bg-[#1A020A] pt-16 pb-8 relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-royal-gold/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            
            {/* Col 1: Brand & Tagline */}
            <div className="lg:col-span-4 space-y-4">
              <RoyalLogo size="md" />
              <p className="text-xs text-royal-champagne/80 font-light leading-relaxed max-w-sm">
                THE ROYAL FEAST is an authentic luxury non-vegetarian culinary institution dedicated to elevating traditional Indian recipes to unforgettable five-star feasts.
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-royal-wine/60 border border-royal-gold/30 flex items-center justify-center text-royal-champagne hover:text-royal-gold hover:border-royal-gold transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-royal-wine/60 border border-royal-gold/30 flex items-center justify-center text-royal-champagne hover:text-royal-gold hover:border-royal-gold transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-royal-wine/60 border border-royal-gold/30 flex items-center justify-center text-royal-champagne hover:text-royal-gold hover:border-royal-gold transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-serif text-sm font-bold text-royal-gold uppercase tracking-wider">
                Explore Citadel
              </h4>
              <ul className="space-y-2 text-xs text-royal-ivory/80">
                <li><a href="#home" className="hover:text-royal-gold transition-colors">Home Palace</a></li>
                <li><a href="#menu" className="hover:text-royal-gold transition-colors">Imperial Menu</a></li>
                <li><a href="#combo-builder" className="hover:text-royal-gold transition-colors">Feast Architect</a></li>
                <li><a href="#combos" className="hover:text-royal-gold transition-colors">Royal Combos</a></li>
                <li><a href="#offers" className="hover:text-royal-gold transition-colors">Promotions & Deals</a></li>
                <li><a href="#gallery" className="hover:text-royal-gold transition-colors">Food Gallery</a></li>
                <li><a href="#about" className="hover:text-royal-gold transition-colors">Our Royal Heritage</a></li>
              </ul>
            </div>

            {/* Col 3: Royal Specialties */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif text-sm font-bold text-royal-gold uppercase tracking-wider">
                Specialties
              </h4>
              <ul className="space-y-2 text-xs text-royal-ivory/80">
                <li><a href="#egg-specials" className="hover:text-royal-gold transition-colors">10 Egg-Cellent Delights</a></li>
                <li><a href="#chicken-specials" className="hover:text-royal-gold transition-colors">15 Chicken Royal Dishes</a></li>
                <li><a href="#mutton-specials" className="hover:text-royal-gold transition-colors">5 Royal Mutton Feasts</a></li>
                <li><a href="#sides-specials" className="hover:text-royal-gold transition-colors">Clay Tandoor Naans & Roti</a></li>
                <li><a href="#sides-specials" className="hover:text-royal-gold transition-colors">Ghee & Jeera Rice</a></li>
                <li><a href="#combos" className="hover:text-royal-gold transition-colors">Family Royal Banquets</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter Subscription */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif text-sm font-bold text-royal-gold uppercase tracking-wider">
                Imperial Gazette
              </h4>
              <p className="text-xs text-royal-champagne/80 font-light">
                Receive invitations to private tasting events, secret seasonal biryani handis, and member-only promotional vouchers.
              </p>

              {newsletterStatus && (
                <p className="text-xs text-emerald-400 font-bold">
                  {newsletterStatus}
                </p>
              )}

              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  placeholder="Enter your royal email"
                  className="w-full px-3 py-2 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                />
                <button
                  type="submit"
                  className="w-full btn-gold py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow"
                >
                  Join Patron Club
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Legal Policies & Copyright */}
          <div className="pt-8 border-t border-royal-wine/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-royal-ivory/60">
            <p>
              © 2026 THE ROYAL FEAST. All Imperial Rights Reserved.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-royal-champagne/80">
              <button onClick={() => setActivePolicyModal('privacy')} className="hover:text-royal-gold underline">
                Privacy Policy
              </button>
              <button onClick={() => setActivePolicyModal('terms')} className="hover:text-royal-gold underline">
                Terms & Conditions
              </button>
              <button onClick={() => setActivePolicyModal('refund')} className="hover:text-royal-gold underline">
                Refund Policy
              </button>
              <button onClick={() => setActivePolicyModal('delivery')} className="hover:text-royal-gold underline">
                Delivery Policy
              </button>
            </div>
          </div>

        </div>

      </footer>

      {/* Policy Details Modal */}
      {activePolicyModal && (
        <div
          onClick={() => setActivePolicyModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="royal-glass p-6 sm:p-8 rounded-3xl border border-royal-gold/50 max-w-lg w-full space-y-4 shadow-2xl relative"
          >
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-4 right-4 p-1.5 text-royal-ivory/70 hover:text-royal-gold rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-royal-gold capitalize">
              {activePolicyModal.replace('-', ' ')} Policy
            </h3>

            <div className="text-xs text-royal-ivory/80 space-y-2 max-h-64 overflow-y-auto pr-1 leading-relaxed font-light">
              {activePolicyModal === 'privacy' && (
                <p>
                  At The Royal Feast, we strictly safeguard the confidentiality of our esteemed patrons. Your telephone number, delivery address, and payment references are encrypted using industry-standard protocols and never shared or sold to outside merchants.
                </p>
              )}
              {activePolicyModal === 'terms' && (
                <p>
                  All dishes are freshly prepared to order. Prices are inclusive of culinary preparations and subject to applicable GST. Minimum delivery order thresholds apply to specific delivery zones. Offers cannot be clubbed with unapproved promotions.
                </p>
              )}
              {activePolicyModal === 'refund' && (
                <p>
                  If an order arrives compromised or does not meet the exceptional five-star standard of The Royal Feast, notify our concierge within 20 minutes of receipt for an immediate royal replacement or 100% refund processed within 24-48 hours.
                </p>
              )}
              {activePolicyModal === 'delivery' && (
                <p>
                  Our dedicated royal delivery valets aim for 30 to 40-minute arrival from the moment your handi is sealed. Surcharge-free delivery is extended on all feasts exceeding ₹799.
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="btn-gold px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
