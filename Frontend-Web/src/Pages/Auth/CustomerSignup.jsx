import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Phone, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../App';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCustomer = {
        id: 'cust-' + Date.now(),
        ...formData,
        role: 'customer',
        isVerified: false,
        isActive: true,
      };
      login(newCustomer, 'customer');
      navigate('/user/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-200/50 rounded-full blur-[120px]" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(5,150,105,0.1)] border border-emerald-50 overflow-hidden">
          
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 mb-4">
                  <UserPlus size={28} className="text-white" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
                <p className="text-slate-500 font-medium">Join the SwiftBazaar community today.</p>
              </div>
              <button 
                onClick={() => navigate('/customer/login')}
                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
              >
                Already have an account? <ArrowRight size={16} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-2xl mb-8 text-sm font-bold flex items-center gap-2 animate-shake">
                <CheckCircle2 size={16} className="rotate-180" /> {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-6">
              {/* Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">Username</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                      placeholder="johndoe123"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-5 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                    placeholder="John"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-5 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                    placeholder="Doe"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">Phone Number (Optional)</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black text-slate-700 uppercase tracking-wider ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Complete Registration
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-wrap justify-center gap-6">
            <button onClick={() => navigate('/')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 flex items-center gap-1 transition-colors">
              <ArrowLeft size={12} /> Back to Home
            </button>
            <div className="hidden md:block w-px h-3 bg-slate-200" />
            <button onClick={() => navigate('/admin/login')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-purple-600 transition-colors">
              Admin Gateway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;