import React, { useState, useEffect } from 'react';
import OpeningAnimation from './components/OpeningAnimation';
import ContinuousBackground from './components/ContinuousBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSections from './components/MenuSections';
import MakeItAMealModal from './components/MakeItAMealModal';
import ComboBuilder from './components/ComboBuilder';
import SpecialCombosSection from './components/SpecialCombosSection';
import OffersAndCoupons from './components/OffersAndCoupons';
import ReviewsSection from './components/ReviewsSection';
import AboutAndWhyUs from './components/AboutAndWhyUs';
import FoodGallery from './components/FoodGallery';
import ContactAndFooter from './components/ContactAndFooter';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import SearchFilterModal from './components/SearchFilterModal';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import { Sparkles, Check, Heart } from 'lucide-react';

export default function App() {
  // Opening animation sequence
  const [showIntro, setShowIntro] = useState(true);

  // App Data State
  const [menuItems, setMenuItems] = useState([]);
  const [combos, setCombos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('royal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('royal_favorites');
      return saved ? JSON.parse(saved) : ['chk-1', 'mut-1', 'chk-5'];
    } catch {
      return ['chk-1', 'mut-1'];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('royal_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [mealModalDish, setMealModalDish] = useState(null);
  const [checkoutPayload, setCheckoutPayload] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, icon = 'check') => {
    setToast({ message, icon });
    setTimeout(() => setToast(null), 3000);
  };

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('royal_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync favorites to local storage
  useEffect(() => {
    localStorage.setItem('royal_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch initial data
  const loadInitialData = async () => {
    try {
      const [menuRes, reviewsRes] = await Promise.all([
        fetch('/api/menu').catch(() => null),
        fetch('/api/reviews').catch(() => null)
      ]);

      if (menuRes && menuRes.ok) {
        const data = await menuRes.json();
        setMenuItems(data.filter(d => d.category !== 'combos'));
        setCombos(data.filter(d => d.category === 'combos'));
      }

      if (reviewsRes && reviewsRes.ok) {
        setReviews(await reviewsRes.json());
      }
    } catch (err) {
      console.error('Error fetching initial data:', err);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Cart Handlers
  const handleAddToCart = (dish, quantity = 1, selectedSides = []) => {
    setCart(prev => {
      // Check if already in cart with same sides configuration
      const existingIdx = prev.findIndex(item => 
        item.id === dish.id && 
        JSON.stringify(item.selectedSides || []) === JSON.stringify(selectedSides)
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      } else {
        return [...prev, { ...dish, quantity, selectedSides }];
      }
    });

    showToast(`Added ${quantity}x ${dish.name} to your Royal Cart!`);
  };

  const handleUpdateCartQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCart(prev => {
        const copy = [...prev];
        copy[index].quantity = newQty;
        return copy;
      });
    }
  };

  const handleRemoveCartItem = (index) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
    showToast('Delicacy removed from cart');
  };

  // Wishlist toggle
  const handleToggleFavorite = (dishId) => {
    setFavorites(prev => {
      const exists = prev.includes(dishId);
      if (exists) {
        showToast('Removed from royal wishlist');
        return prev.filter(id => id !== dishId);
      } else {
        showToast('Added to your royal wishlist', 'heart');
        return [...prev, dishId];
      }
    });
  };

  // Proceed from Cart to Checkout
  const handleProceedCheckout = (payload) => {
    setCheckoutPayload(payload);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order Success Handler
  const handleOrderSuccess = (placedOrder) => {
    setCart([]);
    setActiveTrackingOrder(placedOrder);
    setIsTrackingOpen(true);
    showToast(`Royal Order ${placedOrder.id} confirmed!`);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('royal_token');
    localStorage.removeItem('royal_user');
    setUser(null);
    showToast('Logged out of imperial court');
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen text-royal-ivory bg-[#23040E] relative selection:bg-royal-gold selection:text-royal-deep">
      
      {/* 1. Cinematic Opening Animation */}
      {showIntro && (
        <OpeningAnimation onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. Continuous Flowing Silk Maroon Animated Background */}
      <ContinuousBackground />

      {/* 3. Sticky Navigation Bar */}
      <Navbar
        cartCount={cartTotalItems}
        wishlistCount={favorites.length}
        user={user}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsSearchOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onReplayIntro={() => setShowIntro(true)}
        onNavigateAdmin={() => setIsAdminOpen(true)}
      />

      {/* 4. Homepage Hero Section */}
      <Hero
        onOrderNow={() => {
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreMenu={() => {
          const el = document.getElementById('menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 5. Main Food Categories & Dishes (Egg, Chicken, Mutton, Rice & Breads) */}
      <MenuSections
        menuItems={menuItems}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onMakeItAMeal={(dish) => setMealModalDish(dish)}
      />

      {/* 6. "BUILD YOUR OWN ROYAL FEAST" Interactive Combo Builder */}
      <ComboBuilder onAddComboToCart={handleAddToCart} />

      {/* 7. Special Combos Section (10 Curated Banquets) */}
      <SpecialCombosSection
        combos={combos}
        onAddToCart={handleAddToCart}
      />

      {/* 8. Limited Time Offers & Coupons Section */}
      <OffersAndCoupons
        onApplyCouponToCart={(coupon) => {
          setIsCartOpen(true);
        }}
      />

      {/* 9. Testimonials & Verified Reviews */}
      <ReviewsSection
        reviews={reviews}
        onAddReview={(newRev) => setReviews(prev => [newRev, ...prev])}
        user={user}
      />

      {/* 10. About Us & Why Choose Us (8 Features) */}
      <AboutAndWhyUs />

      {/* 11. Visual Culinary Food Gallery with Lightbox */}
      <FoodGallery />

      {/* 12. Contact, Location & Footer */}
      <ContactAndFooter />

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Make It A Meal Side Dish Modal */}
      <MakeItAMealModal
        isOpen={Boolean(mealModalDish)}
        onClose={() => setMealModalDish(null)}
        mainDish={mealModalDish}
        onAddToCartWithSides={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onProceedCheckout={handleProceedCheckout}
        user={user}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutData={checkoutPayload}
        user={user}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Live Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrder={activeTrackingOrder}
      />

      {/* Search & Filter Modal */}
      <SearchFilterModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        menuItems={[...menuItems, ...combos]}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
      />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          showToast(`Welcome to the Imperial Court, ${loggedInUser.name}!`);
        }}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onMenuUpdated={loadInitialData}
      />

      {/* Live Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-gradient-to-r from-royal-burgundy via-royal-maroon to-[#26030F] border border-royal-gold/60 text-royal-ivory text-xs font-bold shadow-gold-glow flex items-center gap-2 animate-bounce-slow">
          {toast.icon === 'heart' ? (
            <Heart className="w-4 h-4 text-red-400 fill-current" />
          ) : (
            <Check className="w-4 h-4 text-royal-gold stroke-[3]" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}
