import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../App';

const HARDCODED_CUSTOMER = {
  id: 'cust-001',
  username: 'john_customer',
  email: 'customer@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  role: 'customer',
  phone: '+1-234-567-8900',
  isVerified: true,
  isActive: true
};

const CustomerLogin = () => {
  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      if (email === HARDCODED_CUSTOMER.email && password === HARDCODED_CUSTOMER.password) {
        login(HARDCODED_CUSTOMER, 'customer');
        navigate('/user/dashboard');
      } else {
        setError('Oops! Credentials don’t match our records.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] -ml-40 -mb-40" />

      <div className="w-full max-w-[440px] relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.07)] border border-gray-100 overflow-hidden">
          
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-6 transform hover:rotate-6 transition-transform">
                <ShoppingBag size={30} className="text-white" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back!</h1>
              <p className="text-slate-500 mt-2 font-medium">Ready to continue your learning journey?</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-2xl mb-6 text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <div className="w-1.5 h-1.5 bg-rose-600 rounded-full" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div className="group">
                <label className="block text-[13px] font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="text-[13px] font-bold text-slate-700">Password</label>
                  <a href="#" className="text-[12px] font-bold text-blue-600 hover:text-blue-700">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Demo Hint */}
              <div className="flex items-center gap-2 px-4 py-3 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <Sparkles size={14} className="text-blue-500" />
                <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider">
                  Demo: <span className="text-blue-900">customer@example.com / password123</span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-[15px] shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm font-medium">
                New here? <a href="/customer/signup" className="text-blue-600 font-bold hover:underline">Create an account</a>
              </p>
            </div>
          </div>
          
          {/* Bottom Switcher Area */}
          <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-center gap-6">
            <a href="/seller/login" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Seller Portal</a>
            <div className="w-px h-3 bg-slate-200" />
            <a href="/admin/login" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-purple-600 transition-colors">Admin Access</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;