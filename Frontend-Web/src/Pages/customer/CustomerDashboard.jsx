import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import { 
  LogOut, ShoppingBag, Heart, Settings, Package, 
  MapPin, CreditCard, ChevronRight, Zap, Clock, CheckCircle, 
  Edit, Trash2, Plus, X, AlertCircle, Truck, Calendar 
} from 'lucide-react';

// Hardcoded fallback data
const FALLBACK_ORDERS = [
  { id: 'ORD-7721', product: 'Physics Textbook', amount: '$49.99', status: 'Delivered', date: 'Mar 15, 2026', seller: 'Books Plus', trackingNumber: 'TRK-2026-001', estimatedDelivery: 'Mar 15, 2026', progress: 100 },
  { id: 'ORD-8832', product: 'Chemistry 101', amount: '$39.99', status: 'In Transit', date: 'Mar 18, 2026', seller: 'Education Hub', trackingNumber: 'TRK-2026-002', estimatedDelivery: 'Mar 25, 2026', progress: 60 },
  { id: 'ORD-9910', product: 'Math Advanced', amount: '$45.50', status: 'Processing', date: 'Mar 22, 2026', seller: 'Science Store', trackingNumber: 'TRK-2026-003', estimatedDelivery: 'Mar 28, 2026', progress: 30 },
  { id: 'ORD-0011', product: 'Programming Basics', amount: '$64.99', status: 'Pending', date: 'Mar 23, 2026', seller: 'Tech Books', trackingNumber: 'TRK-2026-004', estimatedDelivery: 'Apr 02, 2026', progress: 5 }
];

const FALLBACK_WISHLIST = [
  { id: 1, product: 'Biology Advanced', price: '$52.99', seller: 'Books Plus', image: '📚' },
  { id: 2, product: 'English Literature', price: '$32.00', seller: 'Global Edu', image: '📖' },
  { id: 3, product: 'History & Culture', price: '$45.00', seller: 'Knowledge Hub', image: '📕' }
];

const FALLBACK_ADDRESSES = [
  { id: 1, type: 'Home', address: '123 Main Street, New York, NY 10001', phone: '+1-234-567-8900', isDefault: true },
  { id: 2, type: 'Work', address: '456 Business Plaza, Manhattan, NY 10002', phone: '+1-987-654-3210', isDefault: false }
];

const UserDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState(FALLBACK_ORDERS);
  const [wishlist, setWishlist] = useState(FALLBACK_WISHLIST);
  const [addresses, setAddresses] = useState(FALLBACK_ADDRESSES);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: 'Home', address: '', phone: '', isDefault: false });
  const [editingAddress, setEditingAddress] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogout = () => { logout(); navigate('/'); };

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Favorites', value: wishlist.length, icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Total Spent', value: `$${(orders.reduce((sum, o) => sum + parseFloat(o.amount.replace('$', '')), 0)).toFixed(2)}`, icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const addWishlistItem = (item) => {
    setWishlist([...wishlist, { ...item, id: wishlist.length + 1 }]);
    setSuccessMessage('Added to wishlist!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const removeWishlistItem = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    setSuccessMessage('Removed from wishlist!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const addAddress = () => {
    if (newAddress.address && newAddress.phone) {
      setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
      setNewAddress({ type: 'Home', address: '', phone: '', isDefault: false });
      setShowAddressForm(false);
      setSuccessMessage('Address added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const updateAddress = () => {
    if (editingAddress && editingAddress.address && editingAddress.phone) {
      setAddresses(addresses.map(a => a.id === editingAddress.id ? editingAddress : a));
      setEditingAddress(null);
      setSuccessMessage('Address updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
    setSuccessMessage('Address deleted!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-emerald-100 text-emerald-700';
      case 'In Transit': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-amber-100 text-amber-700';
      case 'Pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <CheckCircle size={16} />;
      case 'In Transit': return <Truck size={16} />;
      case 'Processing': return <Clock size={16} />;
      case 'Pending': return <AlertCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* QUICK ACTIONS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Browse Store', desc: 'Find more books', icon: Zap, color: 'bg-amber-400', click: () => navigate('/') },
                { label: 'Track Orders', desc: 'Live status update', icon: Truck, color: 'bg-blue-500', click: () => setActiveTab('orders') },
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

            {/* RECENT ORDERS */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Active Shipments</h3>
                <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black text-blue-600 uppercase hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {orders.filter(o => o.status !== 'Delivered').slice(0, 2).map(order => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl ${getStatusColor(order.status)} flex items-center justify-center shadow-sm`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-gray-800 uppercase">{order.product}</p>
                        <p className="text-[9px] font-bold text-gray-400">Est. Delivery: {order.estimatedDelivery}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-blue-500 transition-all" style={{ width: `${order.progress}%` }}></div>
                      </div>
                      <span className="text-[9px] font-black text-gray-600">{order.progress}%</span>
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
            <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase mb-8">Order <span className="text-blue-600">History</span></h2>
            
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                  {/* Order Header */}
                  <div className="p-6 flex justify-between items-start border-b border-gray-50">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                      <p className="text-lg font-black text-gray-800">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-50">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Product</p>
                      <p className="text-sm font-bold text-gray-800">{order.product}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Amount</p>
                      <p className="text-sm font-black text-blue-600">{order.amount}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Seller</p>
                      <p className="text-sm font-bold text-gray-800">{order.seller}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Order Date</p>
                      <p className="text-sm font-bold text-gray-800">{order.date}</p>
                    </div>
                  </div>

                  {/* Tracking */}
                  <div className="p-6">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Tracking Details</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-blue-500" />
                        <div>
                          <p className="text-[8px] font-bold text-gray-400 uppercase">Tracking #</p>
                          <p className="text-xs font-bold text-gray-800">{order.trackingNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-green-500" />
                        <div>
                          <p className="text-[8px] font-bold text-gray-400 uppercase">Est. Delivery</p>
                          <p className="text-xs font-bold text-gray-800">{order.estimatedDelivery}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[8px] font-black text-gray-400 uppercase">Delivery Progress</span>
                        <span className="text-xs font-bold text-blue-600">{order.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500" style={{ width: `${order.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div className="animate-in slide-in-from-left-4 duration-500">
            <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase mb-8">My <span className="text-rose-600">Wishlist</span></h2>
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 text-center">
                <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 font-bold">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(item => (
                  <div key={item.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-4xl">{item.image}</div>
                      <button onClick={() => removeWishlistItem(item.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                    <h3 className="font-black text-gray-800 uppercase text-sm mb-2 tracking-tight">{item.product}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{item.seller}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-blue-600">{item.price}</span>
                      <button className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase hover:bg-blue-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-black text-gray-800 tracking-tighter uppercase mb-8">Account <span className="text-blue-600">Management</span></h2>
            
            {/* Personal Info */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm mb-8">
              <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-6">Personal Information</h3>
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
              <button className="mt-6 w-full bg-blue-600 text-white py-4 rounded-[1.5rem] font-black uppercase text-[11px] tracking-[0.3em] shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all">
                Update Profile
              </button>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Shipping Addresses</h3>
                <button onClick={() => setShowAddressForm(!showAddressForm)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  {showAddressForm ? <X size={20} className="text-red-500" /> : <Plus size={20} className="text-blue-600" />}
                </button>
              </div>

              {/* Add Address Form */}
              {showAddressForm && (
                <div className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-200">
                  <div className="space-y-4">
                    <select value={newAddress.type} onChange={(e) => setNewAddress({...newAddress, type: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold">
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                    <input type="text" placeholder="Full Address" value={newAddress.address} onChange={(e) => setNewAddress({...newAddress, address: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold" />
                    <input type="tel" placeholder="Phone Number" value={newAddress.phone} onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold" />
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={newAddress.isDefault} onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})} />
                      <span className="text-sm font-bold text-gray-700">Set as default</span>
                    </label>
                    <button onClick={addAddress} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold uppercase text-sm hover:bg-blue-700 transition-all">
                      Save Address
                    </button>
                  </div>
                </div>
              )}

              {/* Address List */}
              <div className="space-y-4">
                {addresses.map(addr => (
                  <div key={addr.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-black text-gray-800 uppercase tracking-tight">{addr.type}{addr.isDefault && ' • Default'}</p>
                        <p className="text-xs font-bold text-gray-600 mt-2">{addr.address}</p>
                        <p className="text-xs font-bold text-gray-600">{addr.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingAddress(addr)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={16} className="text-blue-600" />
                        </button>
                        <button onClick={() => deleteAddress(addr.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] flex flex-col">
      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2 z-50">
          {successMessage}
        </div>
      )}

      {/* SIMPLE HEADER - No Navbar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-black text-gray-800 uppercase tracking-tight">
            <span style={{ color: '#07477D' }}>SWIFT</span>
            <span style={{ color: '#3ABEF9' }}>BAZAAR</span> Wallet
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-sm uppercase hover:shadow-lg transition-all"
            >
              📦 Browse Store
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-sm uppercase hover:bg-red-100 transition-all"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 w-full">
        {/* WELCOME BANNER */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-[2.5rem] p-8 md:p-12 overflow-hidden mb-10 shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 leading-none">
                Welcome, <span className="text-blue-200">{currentUser?.firstName}!</span>
              </h1>
              <p className="text-blue-100 text-xs font-black uppercase tracking-[0.3em] opacity-90">Swift Bazaar Customer Dashboard</p>
            </div>
            
            <div className="flex gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 text-center">
                  <p className="text-[9px] font-black text-blue-100 uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
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
            { id: 'orders', label: 'Orders & Tracking', icon: Package },
            { id: 'wishlist', label: 'Wishlist', icon: Heart },
            { id: 'profile', label: 'Account', icon: Settings }
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