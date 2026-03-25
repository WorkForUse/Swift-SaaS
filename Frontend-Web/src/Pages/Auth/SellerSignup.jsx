// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, Store, Phone } from 'lucide-react';
// import { useAuth } from '../../App';

// const SellerSignup = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     shopName: '',
//     shopDescription: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     // Validation
//     if (!formData.firstName || !formData.email || !formData.password) {
//       setError('First name, email, and password are required');
//       setLoading(false);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       setLoading(false);
//       return;
//     }

//     if (!formData.shopName) {
//       setError('Shop name is required');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Simulate a small delay for UX
//       await new Promise(resolve => setTimeout(resolve, 500));

//       // Create seller object
//       const newSeller = {
//         id: 'seller-' + Date.now(),
//         username: formData.email.split('@')[0],
//         email: formData.email,
//         password: formData.password,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         role: 'seller',
//         phone: formData.phone || '',
//         shopName: formData.shopName,
//         shopDescription: formData.shopDescription || '',
//         isVerified: false,
//         isActive: true
//       };

//       // Login the new seller
//       login(newSeller, 'seller');
//       setSuccess('Account created successfully!');
      
//       // Redirect to seller dashboard
//       setTimeout(() => {
//         navigate('/seller/dashboard');
//       }, 1000);
//     } catch (err) {
//       setError(err.message || 'An error occurred during signup');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 py-10">
//       <div className="w-full max-w-2xl">
//         {/* Card */}
//         <div className="bg-white rounded-lg shadow-xl p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
//               <Store size={32} className="text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800">Seller Signup</h1>
//             <p className="text-gray-600 mt-2">Start your online shop today</p>
//           </div>

//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
//               {error}
//             </div>
//           )}

//           {/* Success Alert */}
//           {success && (
//             <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
//               {success}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSignup} className="space-y-6">
//             {/* Name Row */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <User className="inline mr-2" size={16} />
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   placeholder="First name"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   placeholder="Last name"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//                 />
//               </div>
//             </div>

//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Mail className="inline mr-2" size={16} />
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="your-email@example.com"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//                 required
//               />
//             </div>

//             {/* Phone Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Phone className="inline mr-2" size={16} />
//                 Phone Number (Optional)
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="+1-234-567-8900"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//               />
//             </div>

//             {/* Shop Name Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <Store className="inline mr-2" size={16} />
//                 Shop Name
//               </label>
//               <input
//                 type="text"
//                 name="shopName"
//                 value={formData.shopName}
//                 onChange={handleChange}
//                 placeholder="Your shop name"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//                 required
//               />
//             </div>

//             {/* Shop Description Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Shop Description (Optional)
//               </label>
//               <textarea
//                 name="shopDescription"
//                 value={formData.shopDescription}
//                 onChange={handleChange}
//                 placeholder="Brief description of your shop"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition h-20"
//               />
//             </div>

//             {/* Password Row */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <Lock className="inline mr-2" size={16} />
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm password"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition duration-200 disabled:opacity-50"
//             >
//               {loading ? 'Creating Account...' : 'Create Seller Account'}
//             </button>
//           </form>

//           {/* Links */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">Already have an account? <a href="/seller/login" className="text-green-600 font-semibold hover:underline">Login here</a></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerSignup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Store, Phone, ArrowRight, CheckCircle, PencilLine, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../App';

const SellerSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    shopName: '',
    shopDescription: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const newSeller = {
        id: 'seller-' + Date.now(),
        ...formData,
        role: 'seller',
        isVerified: false,
        isActive: true
      };

      login(newSeller, 'seller');
      setSuccess('Merchant account created! Redirecting...');
      setTimeout(() => navigate('/seller/dashboard'), 1500);
    } catch (err) {
      setError('Signup failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center p-6 py-12 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-[100px] -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[100px] -ml-20 -mb-20" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center gap-5 mb-10 border-b border-slate-50 pb-8">
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0">
                <Store className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Become a Seller</h1>
                <p className="text-slate-500 text-sm font-medium">Setup your digital storefront in minutes</p>
              </div>
            </div>

            {/* Notifications */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-5 py-3 rounded-2xl mb-8 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <div className="w-1.5 h-1.5 bg-rose-600 rounded-full" /> {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-5 py-3 rounded-2xl mb-8 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <CheckCircle size={16} /> {success}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-8">
              
              {/* Section 1: Merchant Identity */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <User size={14} className="text-emerald-600" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Personal Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-slate-50/50 border border-slate-200 px-5 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-slate-50/50 border border-slate-200 px-5 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input
                      name="email"
                      type="email"
                      placeholder="Work Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50/50 border border-slate-200 pl-11 pr-5 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Business Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50/50 border border-slate-200 pl-11 pr-5 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Shop Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Store size={14} className="text-emerald-600" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Shop Configuration</h2>
                </div>
                <div className="space-y-4">
                  <div className="relative group">
                    <PencilLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input
                      name="shopName"
                      type="text"
                      placeholder="Official Shop Name"
                      value={formData.shopName}
                      onChange={handleChange}
                      className="w-full bg-slate-50/50 border border-slate-200 pl-11 pr-5 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                  <textarea
                    name="shopDescription"
                    placeholder="Describe what you sell..."
                    value={formData.shopDescription}
                    onChange={handleChange}
                    className="w-full bg-slate-50/50 border border-slate-200 px-5 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-sm font-medium h-24 resize-none"
                  />
                </div>
              </div>

              {/* Section 3: Security */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Security</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-slate-50/50 border border-slate-200 px-5 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-sm font-medium"
                    required
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-slate-50/50 border border-slate-200 px-5 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all text-sm font-medium"
                    required
                  />
                </div>
              </div>

              {/* Submit Area */}
              <div className="pt-4 border-t border-slate-50">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-[0.99] shadow-xl shadow-slate-100 disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Launch Your Shop</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="text-center mt-6 text-slate-400 text-sm font-medium">
                  Already a partner? <a href="/seller/login" className="text-emerald-600 font-bold hover:underline">Login here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;