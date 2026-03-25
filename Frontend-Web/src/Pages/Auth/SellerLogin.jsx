// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Mail, Lock, LogIn, Store } from 'lucide-react';
// import { useAuth } from '../../App';

// // Hardcoded seller credentials - Works without backend!
// const HARDCODED_SELLER = {
//   id: 'seller-001',
//   username: 'mike_seller',
//   email: 'seller@example.com',
//   password: 'sellerpass123',
//   firstName: 'Mike',
//   lastName: 'Johnson',
//   role: 'seller',
//   phone: '+1-555-123-4567',
//   shopName: 'Books Plus',
//   shopDescription: 'Premium textbooks and educational materials',
//   isVerified: true,
//   isActive: true
// };

// const SellerLogin = () => {
//   const [email, setEmail] = useState('seller@example.com');
//   const [password, setPassword] = useState('sellerpass123');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Simulate a small delay for UX
//       await new Promise(resolve => setTimeout(resolve, 500));

//       // Check hardcoded credentials
//       if (email === HARDCODED_SELLER.email && password === HARDCODED_SELLER.password) {
//         // Successfully login with hardcoded data
//         login(HARDCODED_SELLER, 'seller');
//         navigate('/seller/dashboard');
//       } else {
//         setError('Invalid email or password. Use: seller@example.com / sellerpass123');
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white rounded-lg shadow-xl p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
//               <Store size={32} className="text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800">Seller Login</h1>
//             <p className="text-gray-600 mt-2">Manage your shop and products</p>
//           </div>

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleLogin} className="space-y-6">
//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Mail className="inline mr-2" size={16} />
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="seller@example.com"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//                 required
//               />
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Lock className="inline mr-2" size={16} />
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               <LogIn size={18} />
//               {loading ? 'Logging in...' : 'Login as Seller'}
//             </button>
//           </form>

//           {/* Demo Login Info */}
//           <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-gray-700">
//             <p className="font-semibold mb-2">Demo Credentials:</p>
//             <p><strong>Email:</strong> seller@example.com</p>
//             <p><strong>Password:</strong> sellerpass123</p>
//           </div>

//           {/* Links */}
//           <div className="mt-6 text-center space-y-2">
//             <p className="text-gray-600">Don't have an account? <a href="/seller/signup" className="text-green-600 font-semibold hover:underline">Sign up here</a></p>
//             <p className="text-gray-600">Other roles? <a href="/auth" className="text-gray-600 font-semibold hover:underline">Choose role</a></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Store, ArrowRight, Briefcase, Zap } from 'lucide-react';
import { useAuth } from '../../App';

const HARDCODED_SELLER = {
  id: 'seller-001',
  username: 'mike_seller',
  email: 'seller@example.com',
  password: 'sellerpass123',
  firstName: 'Mike',
  lastName: 'Johnson',
  role: 'seller',
  phone: '+1-555-123-4567',
  shopName: 'Books Plus',
  shopDescription: 'Premium textbooks and educational materials',
  isVerified: true,
  isActive: true
};

const SellerLogin = () => {
  const [email, setEmail] = useState('seller@example.com');
  const [password, setPassword] = useState('sellerpass123');
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

      if (email === HARDCODED_SELLER.email && password === HARDCODED_SELLER.password) {
        login(HARDCODED_SELLER, 'seller');
        navigate('/seller/dashboard');
      } else {
        setError('Merchant Access Denied: Invalid credentials.');
      }
    } catch (err) {
      setError('Connection Error: Unable to reach merchant server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Soft Merchant Gradients */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-emerald-100/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-teal-100/40 rounded-full blur-[120px]" />

      <div className="w-full max-w-[450px] relative z-10">
        <div className="bg-white rounded-[3rem] shadow-[0_30px_70px_rgba(5,150,105,0.08)] border border-emerald-50/50 overflow-hidden">
          
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[1.5rem] shadow-xl shadow-emerald-200 mb-6 rotate-3">
                <Store size={30} className="text-white -rotate-3" />
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Merchant Portal</h1>
              <p className="text-slate-500 mt-2 font-medium">Grow your business with SwiftBazaar</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-2xl mb-8 text-xs font-bold flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Business Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-14 pr-6 py-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300"
                    placeholder="merchant@store.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">Secure Key</label>
                  <button type="button" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase">Recovery</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 pl-14 pr-6 py-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Demo Stats Hint */}
              <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50 flex items-start gap-3">
                <Zap size={16} className="text-emerald-500 mt-0.5" />
                <div>
                   <p className="text-[10px] text-emerald-800 font-black uppercase tracking-wider mb-0.5">Quick Access</p>
                   <p className="text-[11px] text-emerald-700/80 leading-tight font-medium">Use: seller@example.com / sellerpass123</p>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-[0.98] shadow-xl shadow-slate-200 hover:shadow-emerald-200 disabled:opacity-70 flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Dashboard</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center pt-2">
              <p className="text-slate-400 text-sm font-medium">
                Want to sell with us? <a href="/seller/signup" className="text-emerald-600 font-bold hover:underline">Start your shop</a>
              </p>
            </div>
          </div>
          
          {/* Secondary Footer */}
          <div className="bg-slate-50/80 p-6 flex justify-center gap-8 border-t border-slate-100">
            <button onClick={() => navigate('/customer/login')} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors">
              <Briefcase size={12} /> Customer Terminal
            </button>
            <div className="w-px h-3 bg-slate-200 self-center" />
            <button onClick={() => navigate('/admin/login')} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-purple-600 transition-colors">
              Admin Gateway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;