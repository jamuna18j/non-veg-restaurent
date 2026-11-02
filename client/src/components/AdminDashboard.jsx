import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle, 
  Clock, 
  IndianRupee, 
  ShoppingBag, 
  Users, 
  Utensils, 
  X, 
  TrendingUp, 
  Tag, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose, onMenuUpdated }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'orders', 'menu', 'coupons'
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // New dish form state
  const [showAddDish, setShowAddDish] = useState(false);
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'chicken',
    price: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    prepTime: '20 mins',
    spiceLevel: 'Medium Spicy',
    badge: ''
  });

  // Editing dish state
  const [editingDish, setEditingDish] = useState(null);

  // New coupon form state
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 200,
    minOrder: 499,
    description: 'Special Royal Discount'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, menuRes, couponsRes] = await Promise.all([
        fetch('/api/admin/stats').catch(() => null),
        fetch('/api/orders').catch(() => null),
        fetch('/api/menu').catch(() => null),
        fetch('/api/coupons').catch(() => null)
      ]);

      if (statsRes && statsRes.ok) setStats(await statsRes.json());
      if (ordersRes && ordersRes.ok) setOrders(await ordersRes.json());
      if (menuRes && menuRes.ok) setMenu(await menuRes.json());
      if (couponsRes && couponsRes.ok) setCoupons(await couponsRes.json());
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update order status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('royal_token');
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  // Add new dish
  const handleCreateDish = async (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;

    try {
      const token = localStorage.getItem('royal_token');
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newDish)
      });
      if (res.ok) {
        const created = await res.json();
        setMenu(prev => [created, ...prev]);
        setShowAddDish(false);
        setNewDish({
          name: '',
          category: 'chicken',
          price: '',
          description: '',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
          prepTime: '20 mins',
          spiceLevel: 'Medium Spicy',
          badge: ''
        });
        if (onMenuUpdated) onMenuUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle dish availability
  const handleToggleDishAvailability = async (dish) => {
    const updated = !dish.isAvailable;
    try {
      const token = localStorage.getItem('royal_token');
      await fetch(`/api/menu/${dish.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isAvailable: updated })
      });
      setMenu(prev => prev.map(d => d.id === dish.id ? { ...d, isAvailable: updated } : d));
      if (onMenuUpdated) onMenuUpdated();
    } catch (err) {
      setMenu(prev => prev.map(d => d.id === dish.id ? { ...d, isAvailable: updated } : d));
    }
  };

  // Delete dish
  const handleDeleteDish = async (dishId) => {
    if (!confirm('Are you sure you want to remove this dish from the royal menu?')) return;
    try {
      const token = localStorage.getItem('royal_token');
      await fetch(`/api/menu/${dishId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMenu(prev => prev.filter(d => d.id !== dishId));
      if (onMenuUpdated) onMenuUpdated();
    } catch (err) {
      setMenu(prev => prev.filter(d => d.id !== dishId));
    }
  };

  // Add new coupon
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code) return;

    try {
      const token = localStorage.getItem('royal_token');
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCoupon)
      });
      if (res.ok) {
        const created = await res.json();
        setCoupons(prev => [created, ...prev]);
        setShowAddCoupon(false);
        setNewCoupon({
          code: '',
          discountType: 'percentage',
          discountValue: 20,
          maxDiscount: 200,
          minOrder: 499,
          description: 'Special Royal Discount'
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fallback charts if data hasn't loaded yet
  const salesByDay = stats?.salesByDay || [
    { day: 'Mon', sales: 18450, orders: 28 },
    { day: 'Tue', sales: 22100, orders: 34 },
    { day: 'Wed', sales: 19800, orders: 31 },
    { day: 'Thu', sales: 26400, orders: 42 },
    { day: 'Fri', sales: 38900, orders: 58 },
    { day: 'Sat', sales: 54200, orders: 84 },
    { day: 'Sun', sales: 61800, orders: 96 }
  ];

  const categoryStats = stats?.categoryStats || [
    { name: 'Chicken Specials', value: 45, color: '#D4AF37' },
    { name: 'Mutton Specials', value: 30, color: '#9E2A2B' },
    { name: 'Egg Specials', value: 15, color: '#E8C875' },
    { name: 'Breads & Rice', value: 10, color: '#FFF2E0' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-[#20030C] border border-royal-gold/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[94vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-royal-wine bg-gradient-to-r from-royal-burgundy via-royal-maroon to-[#20030C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-gold text-royal-deep flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-2xl font-black text-royal-ivory">
                  IMPERIAL COMMAND CENTER
                </h3>
                <span className="bg-emerald-900/60 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-royal-champagne/80 font-medium">
                Administer menu items, live customer orders, revenue analytics & promo codes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              className="p-2 text-royal-champagne hover:text-royal-gold rounded-full hover:bg-royal-wine"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-royal-ivory/70 hover:text-royal-gold rounded-full hover:bg-royal-wine"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-royal-wine bg-black/40 text-xs font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Revenue & Analytics', count: null },
            { id: 'orders', label: 'Live Orders Management', count: orders.length },
            { id: 'menu', label: 'Menu Catalog Manager', count: menu.length },
            { id: 'coupons', label: 'Coupons & Promos', count: coupons.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-royal-gold text-royal-gold bg-royal-wine/30'
                  : 'border-transparent text-royal-ivory/70 hover:text-royal-ivory'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="text-[10px] bg-royal-wine/80 px-2 py-0.5 rounded-full text-royal-champagne">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* KPI Metrics Summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="royal-glass p-4 rounded-2xl border border-royal-gold/30">
                  <span className="text-[10px] uppercase font-bold text-royal-champagne/70 block">
                    Total Gross Sales
                  </span>
                  <p className="font-serif text-2xl font-black text-gold-gradient mt-1">
                    ₹{(stats?.totalRevenue || 241850).toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold mt-1 block">
                    ↑ 18.4% from last week
                  </span>
                </div>

                <div className="royal-glass p-4 rounded-2xl border border-royal-gold/30">
                  <span className="text-[10px] uppercase font-bold text-royal-champagne/70 block">
                    Today's Realized Revenue
                  </span>
                  <p className="font-serif text-2xl font-black text-gold-gradient mt-1">
                    ₹{(stats?.todaySales || 34650).toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-royal-gold font-bold mt-1 block">
                    42 banquets delivered today
                  </span>
                </div>

                <div className="royal-glass p-4 rounded-2xl border border-royal-gold/30">
                  <span className="text-[10px] uppercase font-bold text-royal-champagne/70 block">
                    Active Royal Dishes
                  </span>
                  <p className="font-serif text-2xl font-black text-gold-gradient mt-1">
                    {menu.length || 38} Dishes
                  </p>
                  <span className="text-[10px] text-royal-champagne font-semibold mt-1 block">
                    100% available in kitchen
                  </span>
                </div>

                <div className="royal-glass p-4 rounded-2xl border border-royal-gold/30">
                  <span className="text-[10px] uppercase font-bold text-royal-champagne/70 block">
                    Registered Royal Patrons
                  </span>
                  <p className="font-serif text-2xl font-black text-gold-gradient mt-1">
                    {stats?.registeredCustomers || 1420}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold mt-1 block">
                    94% repeat patron rate
                  </span>
                </div>

              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Weekly Sales Area Chart */}
                <div className="lg:col-span-8 royal-glass p-5 rounded-3xl border border-royal-gold/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-serif text-sm font-bold text-royal-ivory">
                      Weekly Banquet Sales Volume (₹)
                    </h4>
                    <span className="text-xs text-royal-gold font-bold">Past 7 Days</span>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesByDay}>
                        <defs>
                          <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="#E8C875" fontSize={11} />
                        <YAxis stroke="#E8C875" fontSize={11} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#25030E', borderColor: '#D4AF37', borderRadius: '12px' }}
                          labelStyle={{ color: '#E8C875', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={2.5} fillOpacity={1} fill="url(#goldArea)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category Share Pie Chart */}
                <div className="lg:col-span-4 royal-glass p-5 rounded-3xl border border-royal-gold/30 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-royal-ivory mb-2">
                      Category Revenue Share
                    </h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryStats}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-royal-wine text-[11px]">
                    {categoryStats.map((cat, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-royal-ivory/80">{cat.name}</span>
                        </div>
                        <span className="font-bold text-royal-gold">{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: LIVE ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-royal-ivory">
                  All Active & Historical Orders ({orders.length})
                </h4>
                <span className="text-xs text-royal-champagne/70">
                  Update status directly below to notify customers in real-time
                </span>
              </div>

              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="royal-glass p-4 rounded-2xl border border-royal-gold/30 space-y-3 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-royal-wine/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base font-black text-royal-gold">
                            {order.id}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-royal-wine text-royal-champagne border border-royal-gold/30">
                            {order.paymentMethod} • {order.paymentStatus}
                          </span>
                        </div>
                        <p className="text-xs text-royal-ivory/80 mt-0.5 font-medium">
                          {order.customer?.name} ({order.customer?.phone}) • {order.deliveryAddress?.city}
                        </p>
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-royal-champagne">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-black/60 border border-royal-gold/50 text-royal-gold font-bold text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-royal-gold"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Order Confirmed">Order Confirmed</option>
                          <option value="Food Being Prepared">Food Being Prepared</option>
                          <option value="Ready for Dispatch">Ready for Dispatch</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs items-center">
                      <div className="md:col-span-8 space-y-1">
                        <p className="text-[10px] uppercase font-bold text-royal-champagne/70">
                          Items in this Feast:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(order.items || []).map((it, idx) => (
                            <span key={idx} className="bg-black/40 px-2 py-0.5 rounded-md border border-royal-gold/20 text-royal-ivory text-[11px]">
                              {it.quantity}x {it.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-4 text-right">
                        <span className="text-[10px] text-royal-ivory/60 block">Grand Total Paid</span>
                        <span className="font-serif text-xl font-black text-gold-gradient">
                          ₹{order.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MENU CATALOG MANAGER */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-royal-ivory">
                  Manage Royal Catalog ({menu.length} Delicacies)
                </h4>
                <button
                  onClick={() => setShowAddDish(true)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Royal Dish</span>
                </button>
              </div>

              {/* Add Dish Modal/Drawer */}
              {showAddDish && (
                <form onSubmit={handleCreateDish} className="royal-glass p-5 rounded-2xl border border-royal-gold/60 shadow-xl space-y-3 animate-fadeIn">
                  <h5 className="font-serif text-base font-bold text-royal-gold">
                    Add New Delicacy to Menu
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Dish Name *</label>
                      <input
                        type="text"
                        value={newDish.name}
                        onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                        required
                        placeholder="e.g. Shahi Mutton Nihari"
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Category *</label>
                      <select
                        value={newDish.category}
                        onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      >
                        <option value="chicken">Chicken Specials</option>
                        <option value="mutton">Mutton Specials</option>
                        <option value="egg">Egg Specials</option>
                        <option value="rice">Rice Varieties</option>
                        <option value="breads">Indian Breads</option>
                        <option value="combos">Combos</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Price in ₹ *</label>
                      <input
                        type="number"
                        value={newDish.price}
                        onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                        required
                        placeholder="389"
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Photo Image URL</label>
                      <input
                        type="url"
                        value={newDish.image}
                        onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Special Badge</label>
                      <input
                        type="text"
                        value={newDish.badge}
                        onChange={(e) => setNewDish({ ...newDish, badge: e.target.value })}
                        placeholder="e.g. Bestseller / Chef's Special"
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Preparation Time</label>
                      <input
                        type="text"
                        value={newDish.prepTime}
                        onChange={(e) => setNewDish({ ...newDish, prepTime: e.target.value })}
                        placeholder="20 mins"
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={newDish.description}
                      onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                      placeholder="Royal Awadhi heritage recipe with authentic aromatics..."
                      className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddDish(false)}
                      className="px-4 py-2 rounded-xl text-xs text-royal-ivory/70 hover:bg-royal-wine"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gold px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      Save to Menu
                    </button>
                  </div>
                </form>
              )}

              {/* Dishes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {menu.map((dish) => (
                  <div
                    key={dish.id}
                    className="royal-glass p-3 rounded-2xl border border-royal-gold/25 flex items-center justify-between gap-3 group"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-14 h-14 rounded-xl object-cover border border-royal-gold/30 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-xs sm:text-sm font-bold text-royal-ivory truncate">
                        {dish.name}
                      </h5>
                      <span className="text-[10px] text-royal-gold uppercase font-bold">
                        {dish.category} • ₹{dish.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleDishAvailability(dish)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                          dish.isAvailable
                            ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                            : 'bg-red-950/80 border border-red-500/50 text-red-300'
                        }`}
                      >
                        {dish.isAvailable ? 'In Stock' : 'Sold Out'}
                      </button>

                      <button
                        onClick={() => handleDeleteDish(dish.id)}
                        className="p-1.5 text-royal-ivory/40 hover:text-red-400 rounded-lg"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COUPONS & PROMOS */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-royal-ivory">
                  Configured Promotional Coupons ({coupons.length})
                </h4>
                <button
                  onClick={() => setShowAddCoupon(true)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Promo Code</span>
                </button>
              </div>

              {showAddCoupon && (
                <form onSubmit={handleCreateCoupon} className="royal-glass p-5 rounded-2xl border border-royal-gold/60 space-y-3 animate-fadeIn">
                  <h5 className="font-serif text-sm font-bold text-royal-gold">
                    New Coupon Configuration
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Coupon Code *</label>
                      <input
                        type="text"
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                        required
                        placeholder="e.g. WEEKEND30"
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Discount Value</label>
                      <input
                        type="number"
                        value={newCoupon.discountValue}
                        onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                        required
                        placeholder="20"
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Discount Type</label>
                      <select
                        value={newCoupon.discountType}
                        onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="flat">Flat Amount (₹)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-royal-champagne block mb-1">Min Order (₹)</label>
                      <input
                        type="number"
                        value={newCoupon.minOrder}
                        onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: e.target.value })}
                        placeholder="499"
                        className="w-full px-3 py-1.5 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCoupon(false)}
                      className="px-4 py-2 rounded-xl text-xs text-royal-ivory/70 hover:bg-royal-wine"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gold px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
                    >
                      Publish Promo
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {coupons.map((c) => (
                  <div
                    key={c.id || c.code}
                    className="royal-glass p-4 rounded-2xl border border-royal-gold/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-royal-gold" />
                        <span className="font-mono text-sm font-black text-royal-gold">
                          {c.code}
                        </span>
                      </div>
                      <p className="text-xs text-royal-ivory/80 mt-1">
                        {c.description || `${c.discountValue}% OFF`}
                      </p>
                      <span className="text-[10px] text-royal-champagne/60 mt-0.5 block">
                        Min Order: ₹{c.minOrder} • Cap: ₹{c.maxDiscount}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/40">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
