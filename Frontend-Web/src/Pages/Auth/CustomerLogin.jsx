// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Mail, Lock, LogIn, ShoppingBag } from 'lucide-react';
// import { useAuth } from '../../App';

// // Hardcoded customer credentials - Works without backend!
// const HARDCODED_CUSTOMER = {
//   id: 'cust-001',
//   username: 'john_customer',
//   email: 'customer@example.com',
//   password: 'password123',
//   firstName: 'John',
//   lastName: 'Doe',
//   role: 'customer',
//   phone: '+1-234-567-8900',
//   isVerified: true,
//   isActive: true,
//   address: {
//     city: 'New York',
//     state: 'NY',
//     country: 'USA'
//   }
// };

// const CustomerLogin = () => {
//   const [email, setEmail] = useState('customer@example.com');
//   const [password, setPassword] = useState('password123');
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
//       if (email === HARDCODED_CUSTOMER.email && password === HARDCODED_CUSTOMER.password) {
//         // Successfully login with hardcoded data
//         login(HARDCODED_CUSTOMER, 'customer');
//         navigate('/user/dashboard');
//       } else {
//         setError('Invalid email or password. Use: customer@example.com / password123');
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white rounded-lg shadow-2xl p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
//               <ShoppingBag size={32} className="text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800">Customer Login</h1>
//             <p className="text-gray-600 mt-2">Welcome back to TextBook Store</p>
//           </div>

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
//               ⚠️ {error}
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
//                 placeholder="customer@example.com"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
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
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                 required
//               />
//             </div>

//             {/* Demo Credentials */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
//               <p className="text-blue-900 font-semibold mb-1">📝 Demo Credentials:</p>
//               <p className="text-blue-800"><strong>Email:</strong> customer@example.com</p>
//               <p className="text-blue-800"><strong>Password:</strong> password123</p>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
//             >
//               <LogIn size={18} />
//               {loading ? 'Logging in...' : 'Login as Customer'}
//             </button>
//           </form>

//           {/* Links */}
//           <div className="mt-6 space-y-2 text-center">
//             <p className="text-gray-600">Don't have an account? <a href="/customer/signup" className="text-blue-600 font-semibold hover:underline">Sign up here</a></p>
//             <p className="text-gray-600">Other roles? <a href="/seller/login" className="text-green-600 font-semibold hover:underline">Seller Login</a> • <a href="/admin/login" className="text-purple-600 font-semibold hover:underline">Admin</a></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerLogin;

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