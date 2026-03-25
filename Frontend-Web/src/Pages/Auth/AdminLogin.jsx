import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, LogIn, Key, ArrowRight } from 'lucide-react';
import { useAuth } from '../../App';

const HARDCODED_ADMIN = {
  id: 'admin-001',
  username: 'jane_admin',
  email: 'admin@example.com',
  password: 'adminpass123',
  firstName: 'Jane',
  lastName: 'Smith',
  role: 'admin',
  phone: '+1-987-654-3210',
  isVerified: true,
  isActive: true
};

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('adminpass123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Smooth loading feel

      if (email === HARDCODED_ADMIN.email && password === HARDCODED_ADMIN.password) {
        login(HARDCODED_ADMIN, 'admin');
        navigate('/admin-dashboard');
      } else {
        setError('Unauthorized: Invalid administrator credentials.');
      }
    } catch (err) {
      setError('System Error: Access Denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-lg relative z-10">
        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
          
          {/* Top Security Stripe */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-1.5 w-full" />

          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-3xl rotate-12 mb-6 shadow-xl shadow-purple-500/20">
                <Shield size={38} className="text-white -rotate-12" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Admin <span className="text-purple-400">Portal</span></h1>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Authorized Personnel Only</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl mb-8 text-xs font-bold flex items-center gap-3 animate-shake">
                <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">!</span>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Terminal ID (Email)</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white pl-14 pr-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium placeholder:text-gray-600"
                    placeholder="admin@system.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Access Key</label>
                <div className="relative group">
                  <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white pl-14 pr-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-medium placeholder:text-gray-600"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Demo Credentials Box */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Debug Mode Enabled</span>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                </div>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                  ROOT: <span className="text-gray-300">admin@example.com</span><br />
                  KEY: <span className="text-gray-300">adminpass123</span>
                </p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={18} />
                    Initiate Session
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button 
            onClick={() => navigate('/customer/login')}
            className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            Switch to Customer Terminal <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;