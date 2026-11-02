import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, Check, AlertCircle } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  user = null
}) {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [useRewards, setUseRewards] = useState(false);

  // Compute item subtotal
  const itemsSubtotal = cart.reduce((sum, item) => {
    const mainPrice = item.price * item.quantity;
    const sidesPrice = (item.selectedSides || []).reduce(
      (sSum, s) => sSum + s.price * s.quantity,
      0
    );
    return sum + mainPrice + (sidesPrice * item.quantity);
  }, 0);

  // Free delivery threshold
  const deliveryFee = itemsSubtotal >= 799 || itemsSubtotal === 0 ? 0 : 40;

  // Validate coupon
  const handleApplyCoupon = async () => {
    setCouponError('');
    if (!couponInput.trim()) return;

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput.trim(), subtotal: itemsSubtotal })
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedCoupon(data);
      } else {
        setCouponError(data.message || 'Invalid coupon code');
      }
    } catch (err) {
      // Local fallback for offline/sandbox
      const code = couponInput.trim().toUpperCase();
      if (code === 'ROYAL20') {
        const discount = Math.min(200, Math.round(itemsSubtotal * 0.20));
        setAppliedCoupon({ code, discount, description: '20% OFF' });
      } else if (code === 'FEAST100') {
        if (itemsSubtotal >= 499) {
          setAppliedCoupon({ code, discount: 100, description: 'FLAT ₹100 OFF' });
        } else {
          setCouponError('Minimum order of ₹499 required');
        }
      } else {
        setCouponError('Invalid or expired coupon code');
      }
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  
  // Reward points calculation (1 point = ₹1)
  const maxAvailablePoints = user?.rewardPoints || 0;
  const rewardDiscount = useRewards ? Math.min(maxAvailablePoints, Math.max(0, itemsSubtotal - discountAmount)) : 0;

  // Taxes: 5% GST
  const taxableAmount = Math.max(0, itemsSubtotal - discountAmount - rewardDiscount);
  const taxes = Math.round(taxableAmount * 0.05);

  const grandTotal = taxableAmount + deliveryFee + taxes;

  const handleCheckoutClick = () => {
    onProceedCheckout({
      subtotal: itemsSubtotal,
      discount: discountAmount,
      couponCode: appliedCoupon?.code || null,
      rewardPointsUsed: rewardDiscount,
      deliveryFee,
      tax: taxes,
      totalAmount: grandTotal,
      cart
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#25030E] border-l border-royal-gold/40 shadow-2xl flex flex-col h-full overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-royal-wine bg-gradient-to-r from-royal-burgundy/80 via-royal-maroon to-[#25030E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-royal-ivory">
                YOUR ROYAL CART
              </h3>
              <p className="text-[11px] text-royal-champagne/70">
                {cart.length} delicacies selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-royal-ivory/70 hover:text-royal-gold rounded-full hover:bg-royal-wine"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-royal-wine/30 border border-royal-gold/30 mx-auto flex items-center justify-center text-4xl shadow-inner">
                🍽️
              </div>
              <h4 className="font-serif text-xl font-bold text-royal-ivory">
                Your Royal Feast Is Empty
              </h4>
              <p className="text-xs text-royal-champagne/70 max-w-xs mx-auto font-light leading-relaxed">
                Add our signature Dum Biryanis, Butter Chicken, Rogan Josh, and hot Naans to begin your banquet.
              </p>
              <button
                onClick={onClose}
                className="btn-gold px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, index) => {
                const sidesPrice = (item.selectedSides || []).reduce(
                  (s, side) => s + side.price * side.quantity,
                  0
                );
                const itemTotalPrice = (item.price + sidesPrice) * item.quantity;

                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="royal-glass p-3.5 rounded-2xl border border-royal-gold/25 space-y-2.5 relative group"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-royal-gold/30 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-royal-ivory truncate">
                          {item.name}
                        </h4>
                        <p className="font-serif text-xs font-black text-royal-gold mt-0.5">
                          ₹{item.price} each
                        </p>
                      </div>

                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-royal-ivory/40 hover:text-red-400 p-1"
                        title="Remove dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Selected Sides / Add-ons breakdown */}
                    {item.selectedSides && item.selectedSides.length > 0 && (
                      <div className="p-2 rounded-lg bg-black/40 border border-royal-gold/15 text-[11px] text-royal-champagne/80 space-y-1">
                        <span className="font-bold text-royal-gold uppercase text-[9px] block">
                          Included Sides & Add-ons:
                        </span>
                        {item.selectedSides.map((side, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-center text-[10px]">
                            <span>• {side.name} (x{side.quantity})</span>
                            <span className="font-mono text-royal-champagne">+₹{side.price * side.quantity}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quantity Selector & Item Total */}
                    <div className="flex items-center justify-between pt-1 border-t border-royal-wine/60 text-xs">
                      <div className="flex items-center gap-2 bg-royal-wine/60 px-2 py-0.5 rounded-lg border border-royal-gold/30">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="text-royal-champagne hover:text-royal-gold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold w-4 text-center text-royal-ivory">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="text-royal-champagne hover:text-royal-gold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-black text-gold-gradient">
                          ₹{itemTotalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cart Bottom Summary & Coupon Section */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-royal-wine bg-[#1E030C] space-y-4">
            
            {/* Coupon Code Section */}
            <div className="space-y-1.5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Coupon '{appliedCoupon.code}' applied (-₹{appliedCoupon.discount})</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-emerald-400/80 hover:text-red-400 text-[11px] underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-royal-gold" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter promo coupon code"
                      className="w-full pl-9 pr-3 py-2 bg-black/50 border border-royal-gold/40 rounded-xl text-royal-ivory text-xs placeholder-royal-ivory/40 focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-xl bg-royal-gold text-royal-deep text-xs font-black uppercase tracking-wider hover:brightness-110 transition-all"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{couponError}</span>
                </p>
              )}
            </div>

            {/* Redeem Reward Points Checkbox */}
            {user && (user.rewardPoints || 0) > 0 && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-royal-wine/40 border border-royal-gold/25 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useRewards}
                    onChange={(e) => setUseRewards(e.target.checked)}
                    className="rounded accent-[#D4AF37] w-3.5 h-3.5"
                  />
                  <span className="text-royal-champagne font-semibold">
                    Redeem {user.rewardPoints} Royal Points
                  </span>
                </label>
                <span className="text-royal-gold font-bold font-mono">
                  -₹{Math.min(user.rewardPoints, itemsSubtotal)}
                </span>
              </div>
            )}

            {/* Price Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-royal-ivory/80 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">₹{itemsSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-₹{discountAmount}</span>
                </div>
              )}

              {rewardDiscount > 0 && (
                <div className="flex justify-between text-royal-gold font-bold">
                  <span>Reward Points Discount</span>
                  <span className="font-mono">-₹{rewardDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-mono">₹{taxes}</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-royal-wine font-serif text-sm">
                <span className="font-bold text-royal-ivory">Grand Total</span>
                <span className="text-2xl font-black text-gold-gradient font-serif">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full btn-gold py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-gold-glow flex items-center justify-center gap-2"
            >
              <span>Proceed to Royal Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
