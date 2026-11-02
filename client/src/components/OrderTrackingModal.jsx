import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, MapPin, Phone, ChefHat, Bike, PackageCheck, Sparkles, RefreshCw } from 'lucide-react';

const stages = [
  { id: 'Order Placed', label: 'Order Placed', icon: Clock, desc: 'Your royal order has been received at the imperial kitchen.' },
  { id: 'Order Confirmed', label: 'Order Confirmed', icon: CheckCircle2, desc: 'Master Chef has reviewed and scheduled the clay handis.' },
  { id: 'Food Being Prepared', label: 'Food Being Prepared', icon: ChefHat, desc: 'Fresh marinated spices simmering over gentle charcoal.' },
  { id: 'Ready for Dispatch', label: 'Ready for Dispatch', icon: PackageCheck, desc: 'Sealed in insulated gold-foil containers with royal seals.' },
  { id: 'Out for Delivery', label: 'Out for Delivery', icon: Bike, desc: 'Royal delivery valet is en route to your palace gates.' },
  { id: 'Delivered', label: 'Delivered', icon: Sparkles, desc: 'Banquet delivered. Savor your feast like royalty!' }
];

export default function OrderTrackingModal({
  isOpen,
  onClose,
  orderId,
  initialOrder = null
}) {
  if (!isOpen) return null;

  const [order, setOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    if (!orderId && !initialOrder?.id) return;
    const targetId = orderId || initialOrder.id;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${targetId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      }
    } catch (err) {
      console.error('Failed to poll order status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrder) setOrder(initialOrder);
    else fetchOrder();

    // Auto-poll every 6 seconds
    const interval = setInterval(fetchOrder, 6000);
    return () => clearInterval(interval);
  }, [orderId, initialOrder]);

  const currentStatus = order?.status || 'Order Placed';
  const currentStageIndex = stages.findIndex(s => s.id === currentStatus);
  const safeStageIndex = currentStageIndex === -1 ? 0 : currentStageIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#25030E] border border-royal-gold/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-royal-wine bg-gradient-to-r from-royal-burgundy/80 via-royal-maroon to-[#25030E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-gold/20 flex items-center justify-center text-royal-gold font-bold">
              <Bike className="w-5 h-5 animate-bounce-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-royal-ivory">
                  LIVE ROYAL DISPATCH TRACKER
                </h3>
                <span className="font-mono text-xs font-bold text-royal-gold bg-black/40 px-2 py-0.5 rounded-md border border-royal-gold/30">
                  {order?.id || 'TRF-PENDING'}
                </span>
              </div>
              <p className="text-xs text-royal-champagne/80 font-medium">
                Estimated Delivery: <span className="text-royal-gold font-bold">{order?.estimatedDeliveryTime || '30-40 mins'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrder}
              disabled={loading}
              title="Refresh tracking status"
              className="p-2 text-royal-champagne hover:text-royal-gold rounded-full hover:bg-royal-wine transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-royal-ivory/70 hover:text-royal-gold rounded-full hover:bg-royal-wine"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-8">
          
          {/* Stepper Progress Bar */}
          <div className="relative">
            
            {/* Connecting Track Line */}
            <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1 bg-royal-wine -translate-y-1/2 z-0">
              <div
                className="h-full bg-gradient-to-r from-royal-champagne via-royal-gold to-[#B8860B] transition-all duration-700 ease-out"
                style={{ width: `${(safeStageIndex / (stages.length - 1)) * 100}%` }}
              />
            </div>

            {/* Stepper Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative z-10">
              {stages.map((stage, idx) => {
                const IconComponent = stage.icon;
                const isPassed = idx <= safeStageIndex;
                const isCurrent = idx === safeStageIndex;

                return (
                  <div key={stage.id} className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-tr from-royal-gold to-royal-champagne text-royal-deep shadow-gold-glow scale-110'
                          : isPassed
                          ? 'bg-royal-wine text-royal-gold border border-royal-gold/60'
                          : 'bg-black/50 text-royal-ivory/30 border border-royal-wine'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div>
                      <p className={`text-xs font-bold ${isCurrent ? 'text-royal-gold' : isPassed ? 'text-royal-ivory' : 'text-royal-ivory/40'}`}>
                        {stage.label}
                      </p>
                      <span className="text-[10px] text-royal-champagne/60 font-medium block">
                        Step 0{idx + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Current Status Message Box */}
          <div className="p-4 rounded-2xl bg-royal-wine/30 border border-royal-gold/30 flex items-center gap-3 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-royal-gold/20 flex items-center justify-center text-royal-gold flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-royal-gold uppercase tracking-wider">
                Current Status: {currentStatus}
              </h4>
              <p className="text-xs text-royal-ivory/80 font-light mt-0.5">
                {stages[safeStageIndex]?.desc}
              </p>
            </div>
          </div>

          {/* Order Details & Delivery Address Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Delivery Address Details */}
            <div className="p-4 rounded-2xl bg-black/40 border border-royal-gold/20 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-gold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Delivery Destination</span>
              </span>
              <p className="font-serif text-sm font-bold text-royal-ivory">
                {order?.customer?.name || 'Imperial Guest'}
              </p>
              <p className="text-xs text-royal-champagne/80 font-light leading-relaxed">
                {order?.deliveryAddress?.address || 'Palace Address Provided'}<br />
                {order?.deliveryAddress?.city} — {order?.deliveryAddress?.pincode}
              </p>
              <p className="text-xs text-royal-ivory/70 pt-1">
                Contact: <span className="text-royal-champagne font-mono">{order?.customer?.phone}</span>
              </p>
            </div>

            {/* Items Summary */}
            <div className="p-4 rounded-2xl bg-black/40 border border-royal-gold/20 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-gold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Delicacies In This Banquet</span>
              </span>

              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {(order?.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-royal-ivory font-medium truncate max-w-[180px]">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-mono text-royal-gold">
                      ₹{item.totalItemPrice || (item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-royal-wine flex justify-between items-baseline font-bold text-xs">
                <span className="text-royal-champagne">Total Paid ({order?.paymentMethod}):</span>
                <span className="font-serif text-base text-gold-gradient font-black">
                  ₹{order?.totalAmount || 0}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Close */}
        <div className="p-4 border-t border-royal-wine bg-[#1E030C] flex justify-end">
          <button
            onClick={onClose}
            className="btn-gold px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
}
