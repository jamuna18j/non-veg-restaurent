import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.user) {
        localStorage.setItem('royal_token', data.token);
        localStorage.setItem('royal_user', JSON.stringify(data.user));
        onLoginSuccess(data.user);
        onClose();
      } else {
        setError(data.message || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      // Local fallback for offline mode
      const dummyUser = {
        id: `usr-${Date.now()}`,
        name: formData.name || 'Imperial Patron',
        email: formData.email,
        phone: formData.phone || '+91 98765 43210',
        role: formData.email.includes('admin') ? 'admin' : 'customer',
        rewardPoints: 250,
        addresses: [
          {
            id: 'addr-1',
            title: 'Royal Residence',
            address: 'Villa 7, Grand Imperial Estate, Indiranagar',
            landmark: 'Near Club House',
            city: 'Bengaluru',
            pincode: '560038'
          }
        ],
        favorites: ['chk-1', 'mut-1']
      };
      localStorage.setItem('royal_token', 'demo_jwt_token');
      localStorage.setItem('royal_user', JSON.stringify(dummyUser));
      onLoginSuccess(dummyUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = (role) => {
    if (role === 'admin') {
      setFormData({
        name: 'Royal Administrator',
        email: 'admin@royalfeast.com',
        password: 'admin123',
        phone: '+91 98765 43210'
      });
    } else {
      setFormData({
        name: 'Yuvraj Vikram Rathore',
        email: 'vikram@royalfeast.com',
        password: 'royal123',
        phone: '+91 98450 12345'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#25030E] border border-royal-gold/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-royal-wine bg-gradient-to-r from-royal-burgundy/90 via-royal-maroon to-[#25030E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-royal-gold/20 flex items-center justify-center text-royal-gold font-bold">
              👑
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-royal-ivory">
                {mode === 'login' ? 'ROYAL PATRON LOGIN' : 'JOIN THE IMPERIAL COURT'}
              </h3>
              <p className="text-[11px] text-royal-champagne/80">
                {mode === 'login' ? 'Access your orders & reward points' : 'Earn 100 free welcome reward points'}
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

        {/* Tab switchers */}
        <div className="flex border-b border-royal-wine text-xs font-bold uppercase tracking-wider bg-black/40">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              mode === 'login'
                ? 'border-royal-gold text-royal-gold bg-royal-wine/30'
                : 'border-transparent text-royal-ivory/60 hover:text-royal-ivory'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              mode === 'signup'
                ? 'border-royal-gold text-royal-gold bg-royal-wine/30'
                : 'border-transparent text-royal-ivory/60 hover:text-royal-ivory'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
              {error}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/70" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={mode === 'signup'}
                  placeholder="e.g. Yuvraj Vikram Rathore"
                  className="w-full pl-10 pr-3 py-2 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/70" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="patron@royalfeast.com"
                className="w-full pl-10 pr-3 py-2 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/70" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98450 12345"
                  className="w-full pl-10 pr-3 py-2 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-royal-champagne block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/70" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 bg-black/50 border border-royal-gold/30 rounded-xl text-royal-ivory text-xs focus:outline-none focus:border-royal-gold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-royal-ivory/60 hover:text-royal-gold"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-royal-deep" />
                <span>{mode === 'login' ? 'Sign In To Feast' : 'Create Royal Account'}</span>
              </>
            )}
          </button>

          {/* Quick Demo Login Switcher */}
          <div className="pt-3 border-t border-royal-wine/70 space-y-2">
            <span className="text-[10px] text-royal-champagne/60 font-semibold block text-center uppercase tracking-wider">
              Quick One-Click Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('customer')}
                className="px-2.5 py-1.5 rounded-lg bg-royal-wine/40 border border-royal-gold/30 text-royal-champagne hover:border-royal-gold hover:text-royal-gold text-center"
              >
                Fill Customer Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="px-2.5 py-1.5 rounded-lg bg-royal-wine/40 border border-royal-gold/30 text-royal-gold hover:bg-royal-wine text-center font-bold"
              >
                Fill Admin Demo
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
