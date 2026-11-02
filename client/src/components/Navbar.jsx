import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu as MenuIcon, 
  X, 
  ChevronDown, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import RoyalLogo from './RoyalLogo';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  user = null,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAuth,
  onLogout,
  onReplayIntro,
  onNavigateAdmin,
  activeSection = 'home'
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Egg Specials', href: '#egg-specials' },
    { name: 'Chicken Specials', href: '#chicken-specials' },
    { name: 'Mutton Specials', href: '#mutton-specials' },
    { name: 'Rice & Breads', href: '#sides-specials' },
    { name: 'Combos', href: '#combos' },
    { name: 'Offers', href: '#offers' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#290511]/95 backdrop-blur-md border-b border-royal-gold/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] py-2.5'
          : 'bg-gradient-to-b from-[#25030E]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center">
            <RoyalLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5 text-xs font-semibold tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="px-2.5 py-1.5 rounded-md text-royal-ivory/85 hover:text-royal-champagne hover:bg-royal-gold/10 transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-royal-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>

          {/* Action Icons: Search, Wishlist, Cart, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3.5">
            
            {/* Replay Intro Button (Quick tooltip) */}
            <button
              onClick={onReplayIntro}
              title="Replay Royal Cinematic Intro"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-royal-champagne/80 hover:text-royal-champagne bg-royal-wine/60 border border-royal-gold/25 hover:border-royal-gold transition-all"
            >
              <RotateCcw className="w-3 h-3 text-royal-gold animate-spin-slow" />
              <span>Intro</span>
            </button>

            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-royal-ivory/85 hover:text-royal-gold hover:bg-royal-wine/60 rounded-full transition-all"
              aria-label="Search Menu"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Button with Badge */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-royal-ivory/85 hover:text-royal-gold hover:bg-royal-wine/60 rounded-full transition-all relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-royal-gold to-[#B8860B] text-royal-deep text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button with Dynamic Live Badge & Bounce */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-royal-burgundy/90 to-royal-maroon border border-royal-gold/50 text-royal-champagne hover:border-royal-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-royal-gold group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs sm:text-sm text-royal-ivory">
                Cart
              </span>
              <span className="bg-royal-gold text-royal-deep text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow">
                {cartCount}
              </span>
            </button>

            {/* User Profile / Login Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-royal-wine/70 border border-royal-gold/30 hover:border-royal-gold transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-royal-gold to-royal-champagne text-royal-deep font-bold text-xs flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden md:inline text-xs font-semibold text-royal-ivory max-w-[85px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-royal-gold" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#2B0513] border border-royal-gold/40 rounded-xl shadow-2xl py-2 z-50 divide-y divide-royal-wine">
                    <div className="px-4 py-2">
                      <p className="text-xs text-royal-champagne font-semibold">{user.name}</p>
                      <p className="text-[11px] text-royal-ivory/60 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-royal-gold font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>{user.rewardPoints || 0} Royal Reward Points</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { setUserDropdownOpen(false); scrollTo('#orders-section'); }}
                        className="w-full text-left px-4 py-2 text-xs text-royal-ivory/90 hover:bg-royal-wine/60 hover:text-royal-gold flex items-center justify-between"
                      >
                        <span>Previous Orders</span>
                      </button>
                      
                      {user.role === 'admin' && (
                        <button
                          onClick={() => { setUserDropdownOpen(false); onNavigateAdmin(); }}
                          className="w-full text-left px-4 py-2 text-xs text-royal-gold hover:bg-royal-wine/80 font-bold flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Admin Dashboard</span>
                        </button>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { setUserDropdownOpen(false); onLogout(); }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-royal-wine/60 flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="btn-gold px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-royal-ivory hover:text-royal-gold rounded-md"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-royal-gold" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#24030E]/98 border-b border-royal-gold/40 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold tracking-wider uppercase pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="px-3 py-2.5 rounded-lg bg-royal-wine/40 border border-royal-gold/20 text-royal-ivory hover:border-royal-gold hover:text-royal-gold"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-royal-wine flex items-center justify-between text-xs">
            <button
              onClick={() => { setMobileMenuOpen(false); onReplayIntro(); }}
              className="flex items-center gap-1.5 text-royal-champagne hover:text-royal-gold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Intro Animation</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onNavigateAdmin(); }}
              className="flex items-center gap-1 text-royal-gold font-bold underline"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
