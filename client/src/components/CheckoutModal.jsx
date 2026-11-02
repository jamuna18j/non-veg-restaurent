import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, QrCode, Banknote, ArrowRight, CheckCircle2, Sparkles, MapPin, Phone, User, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  checkoutData,
  user,
  onOrderSuccess
}) {
  if (!isOpen || !checkoutData) return null;

  const defaultAddr = user?.addresses?.[0] || {};

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: defaultAddr.address || '',
    landmark: defaultAddr.landmark || '',
    city: defaultAddr.city || 'Bengaluru',
    pincode: defaultAddr.pincode || '560038',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'CARD', 'COD', 'RAZORPAY'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      setError('Please fill in all required delivery fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        deliveryAddress: {
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          pincode: formData.pincode,
          instructions: formData.instructions
        },
        items: checkoutData.cart,
        subtotal: checkoutData.subtotal,
        discount: checkoutData.discount,
        couponCode: checkoutData.couponCode,
        rewardPointsUsed: checkoutData.rewardPointsUsed,
        deliveryFee: checkoutData.deliveryFee,
        tax: checkoutData.tax,
        totalAmount: checkoutData.totalAmount,
        paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid'
      };

      const token = localStorage.getItem('royal_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Confetti celebration
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#FFF5D0', '#E8C875', '#5B1028']
        });

        onOrderSuccess(data.order);
        onClose();
      } else {
        setError(data.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      // Offline fallback order generator
      const fallbackOrder = {
        id: `TRF-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: { name: formData.name, email: formData.email, phone: formData.phone },
        deliveryAddress: { ...formData },
        items: checkoutData.cart,
        subtotal: checkoutData.subtotal,
        discount: checkoutData.discount,
        couponCode: checkoutData.couponCode,
        deliveryFee: checkoutData.deliveryFee,
        tax: checkoutData.tax,
        totalAmount: checkoutData.totalAmount,
        paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        status: 'Order Placed',
        statusHistory: [{ status: 'Order Placed', time: new Date().toISOString() }],
        estimatedDeliveryTime: '30-40 mins',
        createdAt: new Date().toISOString()
      };

      confetti({ particleCount: 80, spread: 70 });
      onOrderSuccess(fallbackOrder);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#26030F] border border-royal-gold/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-royal-wine bg-gradient-to-r from-royal-burgundy/80 via-royal-maroon to-[#26030F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-gold/20 flex items-center justify-center text-royal-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-royal-ivory">
                ROYAL DISPATCH CHECKOUT
              </h3>
              <p className="text-xs text-royal-champagne/80 font-medium">
                Encrypted Imperial Gateway • Authentic Indian Non-Veg Cuisine
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

        {/* Modal Form Content */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
              {error}
            </div>
          )}

          {/* Section 1: Customer & Delivery Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-royal-gold flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>1. Customer & Delivery Address</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Vikramaditya Rathore"
                  className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="vikram@royalfeast.com"
                  className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                  Complete Street Address / House / Flat No. *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Flat 402, Royal Horizon Palms, 80 Feet Road"
                  className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Near Palace Grounds"
                    className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bengaluru"
                    className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="560038"
                    className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="Ring doorbell, leave with front security, etc."
                  className="w-full px-3 py-2 bg-black/40 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="space-y-4 pt-4 border-t border-royal-wine">
            <h4 className="text-xs font-bold uppercase tracking-widest text-royal-gold flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>2. Select Payment Method</span>
            </h4>

            {/* Payment Options Radio Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'UPI', label: 'Instant UPI', sub: 'GPay / PhonePe / QR', icon: QrCode },
                { id: 'CARD', label: 'Credit / Debit', sub: 'Visa, Master, RuPay', icon: CreditCard },
                { id: 'COD', label: 'Cash on Delivery', sub: 'Pay upon arrival', icon: Banknote },
                { id: 'RAZORPAY', label: 'Razorpay Sandbox', sub: 'Test Gateway', icon: ShieldCheck },
              ].map((m) => {
                const IconComponent = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-3 rounded-2xl border cursor-pointer text-center transition-all ${
                      isSelected
                        ? 'bg-royal-burgundy border-royal-gold shadow-gold-glow'
                        : 'bg-black/40 border-royal-gold/20 hover:border-royal-gold/50'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 mx-auto mb-1.5 ${isSelected ? 'text-royal-gold' : 'text-royal-champagne/70'}`} />
                    <p className="text-xs font-bold text-royal-ivory">{m.label}</p>
                    <p className="text-[9px] text-royal-champagne/60 mt-0.5">{m.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* UPI Payment Flow */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-black/50 border border-royal-gold/30 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Dynamic QR Code Canvas Simulation */}
                  <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect width="100" height="100" fill="#fff" />
                      {/* Stylized QR points */}
                      <rect x="10" y="10" width="25" height="25" fill="#3B0718" />
                      <rect x="15" y="15" width="15" height="15" fill="#fff" />
                      <rect x="18" y="18" width="9" height="9" fill="#3B0718" />

                      <rect x="65" y="10" width="25" height="25" fill="#3B0718" />
                      <rect x="70" y="15" width="15" height="15" fill="#fff" />
                      <rect x="73" y="18" width="9" height="9" fill="#3B0718" />

                      <rect x="10" y="65" width="25" height="25" fill="#3B0718" />
                      <rect x="15" y="70" width="15" height="15" fill="#fff" />
                      <rect x="18" y="73" width="9" height="9" fill="#3B0718" />

                      <rect x="42" y="15" width="8" height="8" fill="#3B0718" />
                      <rect x="45" y="45" width="12" height="12" fill="#D4AF37" />
                      <rect x="65" y="65" width="15" height="8" fill="#3B0718" />
                      <rect x="65" y="78" width="20" height="12" fill="#3B0718" />
                    </svg>
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left flex-1">
                    <p className="text-xs font-bold text-royal-champagne">
                      Scan QR Code via PhonePe, Google Pay, or Paytm
                    </p>
                    <p className="text-[11px] text-royal-ivory/60 font-light">
                      Or enter your Virtual Payment Address (UPI ID) below for direct approval:
                    </p>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@okhdfcbank"
                      className="w-full px-3 py-1.5 bg-black/60 border border-royal-gold/40 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Credit Card Flow */}
            {paymentMethod === 'CARD' && (
              <div className="p-4 rounded-2xl bg-black/50 border border-royal-gold/30 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                      16-Digit Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 9821"
                      maxLength={19}
                      className="w-full px-3 py-2 bg-black/60 border border-royal-gold/40 rounded-xl text-royal-ivory text-xs font-mono focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="08/28"
                      maxLength={5}
                      className="w-full px-3 py-2 bg-black/60 border border-royal-gold/40 rounded-xl text-royal-ivory text-xs font-mono focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full px-3 py-2 bg-black/60 border border-royal-gold/40 rounded-xl text-royal-ivory text-xs font-mono focus:outline-none focus:border-royal-gold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cash on Delivery Flow */}
            {paymentMethod === 'COD' && (
              <div className="p-4 rounded-2xl bg-black/50 border border-royal-gold/30 text-xs text-royal-champagne/80 space-y-1">
                <p className="font-bold text-royal-ivory">Cash on Delivery Selected</p>
                <p className="font-light">
                  Please keep exact change of <span className="font-bold text-royal-gold">₹{checkoutData.totalAmount}</span> ready for our royal delivery valet.
                </p>
              </div>
            )}

            {/* Razorpay Sandbox Flow */}
            {paymentMethod === 'RAZORPAY' && (
              <div className="p-4 rounded-2xl bg-black/50 border border-royal-gold/30 text-xs text-royal-champagne/80 space-y-1">
                <p className="font-bold text-royal-gold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Razorpay Test Sandbox Enabled</span>
                </p>
                <p className="font-light">
                  Key: <span className="font-mono text-royal-ivory">rzp_test_ROYALFEAST999</span>. Test transactions will automatically be marked verified.
                </p>
              </div>
            )}

          </div>

          {/* Section 3: Final Order Summary & Submit Button */}
          <div className="p-4 rounded-2xl bg-[#1C020A] border border-royal-gold/30 space-y-3">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[10px] uppercase font-bold text-royal-champagne/70 block">
                  Final Payable Amount
                </span>
                <span className="font-serif text-3xl font-black text-gold-gradient">
                  ₹{checkoutData.totalAmount}
                </span>
              </div>

              <div className="text-right text-[11px] text-royal-ivory/60">
                <p>Estimated Delivery: <span className="text-royal-gold font-bold">30-40 Mins</span></p>
                <p>Includes all GST & Packaging</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold py-3.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-gold-glow flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Placing Your Royal Order...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-royal-deep" />
                  <span>CONFIRM & PLACE ROYAL ORDER (₹{checkoutData.totalAmount})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
