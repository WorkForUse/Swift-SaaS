// import React, { useState } from 'react';
// import { Menu, X, LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../App';

// const SellerDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   // Seller's products (dummy data)
//   const [products, setProducts] = useState([
//     { id: 1, name: 'Advanced Physics', price: 45.99, category: 'Science', stock: 50 },
//     { id: 2, name: 'Calculus For Beginners', price: 38.50, category: 'Math', stock: 30 },
//     { id: 3, name: 'English Literature', price: 32.00, category: 'Literature', stock: 25 }
//   ]);

//   // Seller stats
//   const stats = [
//     { label: 'Total Products', value: products.length, color: 'bg-blue-500' },
//     { label: 'Total Sales', value: '$2,850', color: 'bg-green-500' },
//     { label: 'Active Orders', value: 15, color: 'bg-yellow-500' },
//     { label: 'Rating', value: '4.8⭐', color: 'bg-purple-500' },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter(p => p.id !== id));
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return (
//           <div>
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {stats.map((stat, index) => (
//                 <div key={index} className={`${stat.color} rounded-lg shadow-lg p-6 text-white`}>
//                   <p className="text-sm font-semibold opacity-90">{stat.label}</p>
//                   <p className="text-3xl font-bold mt-2">{stat.value}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Shop Info Card */}
//             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-gray-600 text-sm">Shop Name</p>
//                   <p className="text-lg font-semibold text-gray-800">{currentUser?.shopName}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600 text-sm">Owner</p>
//                   <p className="text-lg font-semibold text-gray-800">{currentUser?.firstName} {currentUser?.lastName}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600 text-sm">Email</p>
//                   <p className="text-lg font-semibold text-gray-800">{currentUser?.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600 text-sm">Phone</p>
//                   <p className="text-lg font-semibold text-gray-800">{currentUser?.phone}</p>
//                 </div>
//               </div>
//               {currentUser?.shopDescription && (
//                 <div className="mt-4">
//                   <p className="text-gray-600 text-sm">Description</p>
//                   <p className="text-gray-700">{currentUser.shopDescription}</p>
//                 </div>
//               )}
//             </div>

//             {/* Recent Orders */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
//               <div className="space-y-3">
//                 {[
//                   { id: 'ORD001', customer: 'John Doe', amount: '$150', status: 'Completed' },
//                   { id: 'ORD002', customer: 'Jane Smith', amount: '$280', status: 'Pending' },
//                   { id: 'ORD003', customer: 'Bob Wilson', amount: '$95', status: 'Completed' }
//                 ].map(order => (
//                   <div key={order.id} className="flex justify-between items-center border-b pb-3">
//                     <div>
//                       <p className="font-semibold text-gray-800">{order.id}</p>
//                       <p className="text-sm text-gray-600">{order.customer}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold text-green-600">{order.amount}</p>
//                       <span className={`text-xs px-2 py-1 rounded ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//                         {order.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 'products':
//         return (
//           <div>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
//               <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex gap-2 items-center">
//                 <Plus size={18} /> Add Product
//               </button>
//             </div>

//             <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//               <table className="w-full">
//                 <thead className="bg-gray-100 border-b">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
//                     <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map(product => (
//                     <tr key={product.id} className="border-b hover:bg-gray-50">
//                       <td className="px-6 py-3 text-gray-800 font-semibold">{product.name}</td>
//                       <td className="px-6 py-3 text-gray-600">{product.category}</td>
//                       <td className="px-6 py-3 text-green-600 font-semibold">${product.price}</td>
//                       <td className="px-6 py-3 text-gray-600">{product.stock} units</td>
//                       <td className="px-6 py-3 flex gap-2">
//                         <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex gap-1 items-center text-sm">
//                           <Edit2 size={14} /> Edit
//                         </button>
//                         <button 
//                           onClick={() => handleDeleteProduct(product.id)}
//                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex gap-1 items-center text-sm">
//                           <Trash2 size={14} /> Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case 'orders':
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="space-y-4">
//                 {[
//                   { id: 'ORD001', customer: 'John Doe', date: '2025-03-20', total: '$150', status: 'Completed', items: 3 },
//                   { id: 'ORD002', customer: 'Jane Smith', date: '2025-03-22', total: '$280', status: 'Pending', items: 2 },
//                   { id: 'ORD003', customer: 'Bob Wilson', date: '2025-03-21', total: '$95', status: 'Completed', items: 1 },
//                   { id: 'ORD004', customer: 'Alice Brown', date: '2025-03-24', total: '$420', status: 'Shipped', items: 4 }
//                 ].map(order => (
//                   <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-bold text-gray-800">{order.id} - {order.customer}</p>
//                         <p className="text-sm text-gray-600">{order.date} | {order.items} items</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold text-green-600">{order.total}</p>
//                         <span className={`text-xs px-3 py-1 rounded inline-block mt-1 ${
//                           order.status === 'Completed' ? 'bg-green-100 text-green-700' :
//                           order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
//                           'bg-blue-100 text-blue-700'
//                         }`}>
//                           {order.status}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );

//       case 'settings':
//         return (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
//             <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Name</label>
//                   <input 
//                     type="text" 
//                     defaultValue={currentUser?.shopName}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
//                   <input 
//                     type="email" 
//                     defaultValue={currentUser?.email}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
//                   <input 
//                     type="tel" 
//                     defaultValue={currentUser?.phone}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Description</label>
//                   <textarea 
//                     defaultValue={currentUser?.shopDescription}
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-24"
//                   />
//                 </div>
//                 <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-semibold">
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative md:translate-x-0 w-64 bg-gradient-to-b from-green-600 to-green-700 text-white h-full z-40 transition-transform duration-300 overflow-y-auto`}>
//         <div className="p-6 border-b border-green-500">
//           <h1 className="text-2xl font-bold">Seller Panel</h1>
//           <p className="text-xs text-green-100 mt-1">{currentUser?.shopName}</p>
//         </div>

//         <nav className="p-4 space-y-2">
//           {[
//             { id: 'overview', label: 'Overview', icon: '📊' },
//             { id: 'products', label: 'My Products', icon: '📦' },
//             { id: 'orders', label: 'Orders', icon: '🛒' },
//             { id: 'settings', label: 'Settings', icon: '⚙️' }
//           ].map(item => (
//             <button
//               key={item.id}
//               onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
//               className={`w-full text-left px-4 py-3 rounded-lg transition ${
//                 activeTab === item.id ? 'bg-green-500 font-bold' : 'hover:bg-green-500'
//               }`}
//             >
//               <span className="mr-2">{item.icon}</span>{item.label}
//             </button>
//           ))}
//         </nav>

//         <div className="p-4 mt-auto border-t border-green-500">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex gap-2 items-center justify-center"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Bar */}
//         <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
//           >
//             {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//           <h1 className="text-2xl font-bold text-gray-800">{['Overview', 'My Products', 'Orders', 'Settings'][['overview', 'products', 'orders', 'settings'].indexOf(activeTab)]}</h1>
//           <div className="flex items-center gap-4">
//             <span className="text-sm text-gray-600">{currentUser?.firstName} {currentUser?.lastName}</span>
//             <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
//               {currentUser?.firstName?.[0]}
//             </div>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 overflow-auto p-6">
//           {renderContent()}
//         </div>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default SellerDashboard;

import React, { useState } from 'react';
import { 
  Menu, X, LogOut, Plus, Edit2, Trash2, 
  LayoutDashboard, ShoppingBag, ClipboardList, Settings,
  TrendingUp, Star, Package, DollarSign, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const sellerGreen = "#10B981"; // Success Green
  const deepGreen = "#064E3B";

  const [products] = useState([
    { id: 1, name: 'Advanced Physics', price: 45.99, category: 'Science', stock: 50 },
    { id: 2, name: 'Calculus For Beginners', price: 38.50, category: 'Math', stock: 30 },
    { id: 3, name: 'English Literature', price: 32.00, category: 'Literature', stock: 25 }
  ]);

  const stats = [
    { label: 'Active Items', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Net Earnings', value: '$2,850', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'New Orders', value: '15', icon: ClipboardList, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Store Rating', value: '4.8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                      <stat.icon size={22} strokeWidth={2.5} />
                    </div>
                    <TrendingUp size={16} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-gray-800 tracking-tighter">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* SHOP PROFILE */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ShoppingBag size={120} />
                </div>
                <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-6">Store Identity</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">{currentUser?.shopName}</h3>
                    <p className="text-sm font-bold text-gray-400">Merchant: {currentUser?.firstName} {currentUser?.lastName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Public Email</p>
                      <p className="text-xs font-bold text-gray-700">{currentUser?.email}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Phone Link</p>
                      <p className="text-xs font-bold text-gray-700">{currentUser?.phone}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed italic bg-gray-50 p-4 rounded-2xl border-l-4 border-emerald-500">
                    "{currentUser?.shopDescription || "No description provided for this store."}"
                  </p>
                </div>
              </div>

              {/* RECENT ORDERS LIST */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-6">Pipeline Activity</h2>
                <div className="space-y-3">
                  {[{ id: 'ORD-99', cust: 'John Doe', amt: '$150', st: 'Delivered' },
                    { id: 'ORD-84', cust: 'Jane Smith', amt: '$280', st: 'Pending' }].map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 hover:bg-emerald-50/50 rounded-2xl transition-colors border border-transparent hover:border-emerald-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-[10px] text-gray-500 uppercase">{order.id.split('-')[1]}</div>
                        <div>
                          <p className="text-xs font-black text-gray-800 uppercase">{order.cust}</p>
                          <p className="text-[9px] font-bold text-gray-400">{order.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-emerald-600">{order.amt}</p>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${order.st === 'Delivered' ? 'text-emerald-400' : 'text-orange-400'}`}>{order.st}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase">Inventory <span className="text-emerald-500">Stock</span></h2>
              <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2">
                <Plus size={16} strokeWidth={3} /> Launch Product
              </button>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-50">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Name</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Valuation</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Level</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p.id} className="group hover:bg-emerald-50/20 transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{p.name}</p>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{p.category}</p>
                      </td>
                      <td className="px-8 py-6 font-black text-sm text-gray-700">${p.price}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 rounded-full" style={{width: `${(p.stock/60)*100}%`}}></div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-400">{p.stock} Units</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"><Edit2 size={16} /></button>
                          <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD] overflow-hidden">
      {/* SIDEBAR - Modern Minimalist */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed md:relative md:translate-x-0 w-72 bg-white border-r border-gray-100 h-full z-50 transition-all duration-300 ease-in-out`}>
        <div className="p-8">
          <div className="bg-emerald-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-200">
            <ShoppingBag size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Vendor <span className="text-emerald-500">Hub</span></h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Merchant Portal</p>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Inventory', icon: Package },
            { id: 'orders', label: 'Shipments', icon: ClipboardList },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === item.id 
                ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-200 translate-x-2' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} strokeWidth={activeTab === item.id ? 3 : 2} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-6">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 bg-red-50 text-red-500 p-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all shadow-sm">
            <LogOut size={16} /> Disconnect
          </button>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="px-8 py-6 flex items-center justify-between border-b border-gray-50 bg-white/50 backdrop-blur-md">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"><Menu size={24} /></button>
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">
            Current Node: <span className="text-gray-800 italic">{activeTab}</span>
          </h2>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-gray-800 uppercase tracking-tight">{currentUser?.firstName} {currentUser?.lastName}</p>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Active Vendor</p>
             </div>
             <div className="w-10 h-10 bg-emerald-50 border-2 border-white shadow-sm rounded-xl flex items-center justify-center text-emerald-500 font-black text-sm">
               {currentUser?.firstName?.[0]}
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#FDFDFD]">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-emerald-900/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default SellerDashboard;