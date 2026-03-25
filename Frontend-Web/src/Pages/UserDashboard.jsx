// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../App';
// import { LogOut, ShoppingBag, Heart, Settings, Package, MapPin } from 'lucide-react';

// const UserDashboard = () => {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('overview');

//   // Dummy customer data
//   const [orders, setOrders] = useState([
//     { id: 'ORD001', product: 'Physics Textbook', amount: '$49.99', status: 'Delivered', date: '2025-03-15' },
//     { id: 'ORD002', product: 'Chemistry 101', amount: '$39.99', status: 'Shipped', date: '2025-03-18' },
//     { id: 'ORD003', product: 'Math Advanced', amount: '$45.50', status: 'Processing', date: '2025-03-22' }
//   ]);

//   const [wishlist] = useState([
//     { id: 1, product: 'Biology Advanced', price: '$52.99', seller: 'Books Plus' },
//     { id: 2, product: 'English Literature', price: '$32.00', seller: 'Books Plus' }
//   ]);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const stats = [
//     { label: 'Total Orders', value: orders.length, icon: '🛒', color: 'bg-blue-50 border-blue-200' },
//     { label: 'Wishlist Items', value: wishlist.length, icon: '❤️', color: 'bg-red-50 border-red-200' },
//     { label: 'Total Spent', value: '$135.48', icon: '💰', color: 'bg-green-50 border-green-200' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {currentUser?.firstName}! 👋</h1>
//               <p className="text-blue-100">Here's your personal dashboard</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {stats.map((stat, index) => (
//             <div key={index} className={`border rounded-lg shadow p-6 ${stat.color}`}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
//                   <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
//                 </div>
//                 <span className="text-3xl">{stat.icon}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex gap-2 mb-6 border-b border-gray-300 bg-white rounded-t-lg">
//           <button
//             onClick={() => setActiveTab('overview')}
//             className={`px-6 py-3 font-semibold transition ${
//               activeTab === 'overview'
//                 ? 'border-b-2 border-blue-600 text-blue-600'
//                 : 'text-gray-600 hover:text-blue-600'
//             }`}
//           >
//             📊 Overview
//           </button>
//           <button
//             onClick={() => setActiveTab('orders')}
//             className={`px-6 py-3 font-semibold transition ${
//               activeTab === 'orders'
//                 ? 'border-b-2 border-blue-600 text-blue-600'
//                 : 'text-gray-600 hover:text-blue-600'
//             }`}
//           >
//             📦 My Orders
//           </button>
//           <button
//             onClick={() => setActiveTab('wishlist')}
//             className={`px-6 py-3 font-semibold transition ${
//               activeTab === 'wishlist'
//                 ? 'border-b-2 border-blue-600 text-blue-600'
//                 : 'text-gray-600 hover:text-blue-600'
//             }`}
//           >
//             ❤️ Wishlist
//           </button>
//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`px-6 py-3 font-semibold transition ${
//               activeTab === 'profile'
//                 ? 'border-b-2 border-blue-600 text-blue-600'
//                 : 'text-gray-600 hover:text-blue-600'
//             }`}
//           >
//             ⚙️ Profile
//           </button>
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-b-lg shadow-lg p-6">
//           {activeTab === 'overview' && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h2>
//               <div className="space-y-6">
//                 {/* Quick Actions */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <button 
//                     onClick={() => navigate('/')}
//                     className="bg-blue-50 border border-blue-200 hover:bg-blue-100 p-6 rounded-lg transition text-left"
//                   >
//                     <ShoppingBag size={32} className="text-blue-600 mb-2" />
//                     <p className="font-semibold text-gray-800">Browse Products</p>
//                     <p className="text-sm text-gray-600">Continue shopping for textbooks</p>
//                   </button>
//                   <button 
//                     onClick={() => setActiveTab('orders')}
//                     className="bg-green-50 border border-green-200 hover:bg-green-100 p-6 rounded-lg transition text-left"
//                   >
//                     <Package size={32} className="text-green-600 mb-2" />
//                     <p className="font-semibold text-gray-800">Track Orders</p>
//                     <p className="text-sm text-gray-600">Check your order status</p>
//                   </button>
//                   <button 
//                     onClick={() => setActiveTab('wishlist')}
//                     className="bg-red-50 border border-red-200 hover:bg-red-100 p-6 rounded-lg transition text-left"
//                   >
//                     <Heart size={32} className="text-red-600 mb-2" />
//                     <p className="font-semibold text-gray-800">Saved Items</p>
//                     <p className="text-sm text-gray-600">View your wishlist</p>
//                   </button>
//                 </div>

//                 {/* Recent Orders Preview */}
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h3>
//                   <div className="space-y-3">
//                     {orders.slice(0, 2).map(order => (
//                       <div key={order.id} className="flex justify-between items-center p-3 bg-white rounded border border-blue-100">
//                         <div>
//                           <p className="font-semibold text-gray-800">{order.product}</p>
//                           <p className="text-xs text-gray-600">{order.date}</p>
//                         </div>
//                         <span className={`text-xs px-3 py-1 rounded font-semibold ${
//                           order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
//                           order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
//                           'bg-yellow-100 text-yellow-700'
//                         }`}>
//                           {order.status}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'orders' && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-100 border-b">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
//                       <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
//                       <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
//                       <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
//                       <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map(order => (
//                       <tr key={order.id} className="border-b hover:bg-gray-50 transition">
//                         <td className="px-6 py-4 font-semibold text-gray-800">{order.id}</td>
//                         <td className="px-6 py-4 text-gray-800">{order.product}</td>
//                         <td className="px-6 py-4 text-green-600 font-semibold">{order.amount}</td>
//                         <td className="px-6 py-4 text-gray-600">{order.date}</td>
//                         <td className="px-6 py-4">
//                           <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
//                             order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
//                             order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
//                             'bg-yellow-100 text-yellow-700'
//                           }`}>
//                             {order.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {activeTab === 'wishlist' && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {wishlist.map(item => (
//                   <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
//                     <h3 className="font-semibold text-gray-800 mb-2">{item.product}</h3>
//                     <div className="flex justify-between items-end">
//                       <div>
//                         <p className="text-green-600 font-bold">{item.price}</p>
//                         <p className="text-xs text-gray-600">by {item.seller}</p>
//                       </div>
//                       <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm font-semibold">
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'profile' && (
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
//               <div className="max-w-2xl space-y-6">
//                 {/* Personal Info */}
//                 <div className="border border-gray-200 rounded-lg p-6">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
//                       <input type="text" defaultValue={currentUser?.firstName} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
//                       <input type="text" defaultValue={currentUser?.lastName} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
//                       <input type="email" defaultValue={currentUser?.email} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
//                       <input type="tel" defaultValue={currentUser?.phone} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Shipping Address */}
//                 <div className="border border-gray-200 rounded-lg p-6">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4 flex gap-2 items-center">
//                     <MapPin size={20} /> Shipping Address
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">Street Address</label>
//                       <input type="text" placeholder="Enter street address" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
//                         <input type="text" placeholder="City" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-1">ZIP Code</label>
//                         <input type="text" placeholder="ZIP Code" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold transition">
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { 
  LogOut, ShoppingBag, Heart, Settings, Package, 
  MapPin, CreditCard, ChevronRight, Zap, Clock, CheckCircle 
} from 'lucide-react';

const UserDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [orders] = useState([
    { id: 'ORD-7721', product: 'Physics Textbook', amount: '$49.99', status: 'Delivered', date: 'Mar 15, 2026' },
    { id: 'ORD-8832', product: 'Chemistry 101', amount: '$39.99', status: 'Shipped', date: 'Mar 18, 2026' },
    { id: 'ORD-9910', product: 'Math Advanced', amount: '$45.50', status: 'Processing', date: 'Mar 22, 2026' }
  ]);

  const [wishlist] = useState([
    { id: 1, product: 'Biology Advanced', price: '$52.99', seller: 'Books Plus' },
    { id: 2, product: 'English Literature', price: '$32.00', seller: 'Global Edu' }
  ]);

  const handleLogout = () => { logout(); navigate('/'); };

  const stats = [
    { label: 'Purchases', value: orders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Favorites', value: wishlist.length, icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Invested', value: '$135.48', icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* QUICK ACTIONS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Marketplace', desc: 'Find more books', icon: Zap, color: 'bg-amber-400', click: () => navigate('/') },
                { label: 'Track Order', desc: 'Live status update', icon: MapPin, color: 'bg-blue-500', click: () => setActiveTab('orders') },
                { label: 'My Wishlist', desc: 'Saved for later', icon: Heart, color: 'bg-rose-500', click: () => setActiveTab('wishlist') }
              ].map((action, i) => (
                <button key={i} onClick={action.click} className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left relative overflow-hidden">
                  <div className={`absolute -right-2 -top-2 w-24 h-24 ${action.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform`} />
                  <div className={`w-12 h-12 rounded-2xl ${action.color} text-white flex items-center justify-center mb-4 shadow-lg`}>
                    <action.icon size={20} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">{action.label}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{action.desc}</p>
                </button>
              ))}
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Latest Shipments</h3>
                <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black text-blue-600 uppercase hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {orders.slice(0, 2).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-blue-500">
                        <Package size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-800 uppercase">{order.product}</p>
                        <p className="text-[9px] font-bold text-gray-400">{order.date} • {order.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                      }`}>{order.status}</span>
                      <ChevronRight size={14} className="text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase mb-8">Purchase <span className="text-blue-600">History</span></h2>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-blue-50/20 transition-colors group">
                      <td className="px-8 py-6 text-xs font-bold text-gray-400">{order.id}</td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{order.product}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{order.date}</p>
                      </td>
                      <td className="px-8 py-6 font-black text-sm text-gray-700">{order.amount}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-gray-50 border border-gray-100 group-hover:border-blue-100 transition-all">
                           {order.status === 'Delivered' ? <CheckCircle size={12} className="text-emerald-500" /> : <Clock size={12} className="text-blue-500" />}
                           <span className="text-[9px] font-black uppercase text-gray-600 tracking-tighter">{order.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="animate-in slide-in-from-right-4 duration-500 max-w-2xl">
            <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase mb-8">Account <span className="text-blue-600">Security</span></h2>
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                  <input type="text" defaultValue={currentUser?.firstName} className="w-full mt-2 px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input type="text" defaultValue={currentUser?.lastName} className="w-full mt-2 px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Shipping Destination</label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-6 top-4 text-gray-400" size={18} />
                  <input type="text" placeholder="123 Street Name, City" className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all">
                Synchronize Profile
              </button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col">
      {/* TOP NAVIGATION BAR */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <ShoppingBag size={20} strokeWidth={2.5} />
            </div>
            <span className="font-black text-lg tracking-tighter uppercase">Edu<span className="text-blue-600">Dash</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] font-black text-gray-800 uppercase tracking-tight leading-none">{currentUser?.firstName}</span>
              <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.2em]">Member</span>
            </div>
            <button onClick={handleLogout} className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
        {/* WELCOME BANNER */}
        <div className="relative bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 overflow-hidden mb-10 shadow-2xl shadow-indigo-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 leading-none">
                Hello, <span className="text-indigo-300">{currentUser?.firstName}!</span>
              </h1>
              <p className="text-indigo-200 text-xs font-black uppercase tracking-[0.3em] opacity-80">Track your learning investments</p>
            </div>
            
            <div className="flex gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 text-center">
                  <p className="text-[9px] font-black text-indigo-200 uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
                  <p className="text-xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { id: 'overview', label: 'Overview', icon: Zap },
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
            { id: 'profile', label: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 -translate-y-1' 
                : 'bg-white text-gray-400 hover:bg-gray-50 shadow-sm border border-gray-100'
              }`}
            >
              <tab.icon size={14} strokeWidth={3} /> {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;