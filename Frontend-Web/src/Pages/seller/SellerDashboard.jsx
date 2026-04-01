import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../App';
import {
  Plus, ShoppingBag, TrendingUp, Star, BarChart3,
  AlertCircle, Check, X, Edit, Trash2, Eye, EyeOff,
  IndianRupee, Users, Package, Clock, CheckCircle, Filter,
  Download, Settings, LogOut
} from 'lucide-react';
import SellerLayout from '../../components/layouts/SellerLayout';

// Hardcoded Fallback Data
const FALLBACK_PRODUCTS = [
  { id: 'prod-001', name: 'Physics Textbook', price: 499, stock: 45, category: 'Science', rating: 4.8, sold: 128, image: '📚', status: 'Active' },
  { id: 'prod-002', name: 'Chemistry Advanced', price: 599, stock: 32, category: 'Science', rating: 4.6, sold: 95, image: '⚗️', status: 'Active' },
  { id: 'prod-003', name: 'Mathematics Guide', price: 449, stock: 0, category: 'Math', rating: 4.5, sold: 156, image: '📐', status: 'Out of Stock' },
  { id: 'prod-004', name: 'English Literature', price: 379, stock: 67, category: 'Languages', rating: 4.7, sold: 89, image: '📖', status: 'Active' },
  { id: 'prod-005', name: 'History & Culture', price: 529, stock: 23, category: 'History', rating: 4.9, sold: 112, image: '🏛️', status: 'Active' },
];

const FALLBACK_ORDERS = [
  { id: 'ORD-5001', customer: 'John Doe', product: 'Physics Textbook', amount: 499, status: 'Delivered', date: 'Mar 20, 2026', rating: 4.8 },
  { id: 'ORD-5002', customer: 'Sarah Smith', product: 'Chemistry Advanced', amount: 599, status: 'Shipped', date: 'Mar 21, 2026', rating: 4.6 },
  { id: 'ORD-5003', customer: 'Mike Johnson', product: 'Mathematics Guide', amount: 449, status: 'Processing', date: 'Mar 22, 2026', rating: null },
  { id: 'ORD-5004', customer: 'Emma Wilson', product: 'English Literature', amount: 379, status: 'Pending', date: 'Mar 23, 2026', rating: null },
  { id: 'ORD-5005', customer: 'Alex Brown', product: 'History & Culture', amount: 529, status: 'Delivered', date: 'Mar 18, 2026', rating: 4.9 },
];

const SellerDashboard = () => {
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [orders, setOrders] = useState(FALLBACK_ORDERS);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', stock: '', category: '', image: '📚', status: 'Active'
  });

  const darkBlue = "#07477D";
  const lightBlue = "#3ABEF9";

  // Check authorization on mount
  useEffect(() => {
    if (!currentUser || userRole !== 'seller') {
      navigate('/');
    }
  }, [currentUser, userRole, navigate]);

  // Sync activeTab with URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab') || 'overview';
    setActiveTab(tabParam);
  }, [searchParams]);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const product = {
        id: `prod-${Date.now()}`,
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        rating: 0,
        sold: 0
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', price: '', stock: '', category: '', image: '📚', status: 'Active' });
      setShowProductForm(false);
      setSuccess('Product added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleUpdateProduct = () => {
    if (editingProduct && editingProduct.name && editingProduct.price && editingProduct.stock) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, price: parseFloat(editingProduct.price), stock: parseInt(editingProduct.stock) } : p));
      setEditingProduct(null);
      setSuccess('Product updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setSuccess('Product deleted!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, style: { backgroundColor: lightBlue } },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, style: { backgroundColor: '#10B981' } },
    { label: 'Total Revenue', value: `₹${orders.reduce((sum, o) => sum + o.amount, 0)}`, icon: IndianRupee, style: { backgroundColor: '#F59E0B' } },
    { label: 'Avg Rating', value: (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1), icon: Star, style: { backgroundColor: '#EAB308' } },
  ];

  const filteredProducts = products.filter(p => {
    const statusMatch = filterStatus === 'All' || p.status === filterStatus;
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 mb-4">Please create a seller account first</p>
          <button
            onClick={() => navigate('/seller/signup')}
            className="text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
            style={{ backgroundColor: lightBlue, color: darkBlue }}
          >
            Create Account
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="rounded-[2rem] p-6 text-white shadow-lg hover:shadow-xl transition-all" style={stat.style}>
                    <Icon size={24} className="mb-3" />
                    <p className="text-sm font-bold uppercase opacity-90">{stat.label}</p>
                    <p className="text-3xl font-black mt-2">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSearchParams({ tab: 'products' })}
                className="text-white py-4 px-6 rounded-2xl font-bold uppercase text-sm hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                style={{ backgroundColor: lightBlue, color: darkBlue }}
              >
                <Plus size={18} /> Manage Products
              </button>
              <button
                onClick={() => setSearchParams({ tab: 'orders' })}
                className="text-white py-4 px-6 rounded-2xl font-bold uppercase text-sm hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                style={{ backgroundColor: '#10B981' }}
              >
                <ShoppingBag size={18} /> View Orders
              </button>
              <button
                onClick={() => setSearchParams({ tab: 'analytics' })}
                className="text-white py-4 px-6 rounded-2xl font-bold uppercase text-sm hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                style={{ backgroundColor: darkBlue }}
              >
                <TrendingUp size={18} /> Analytics
              </button>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Recent Orders</h3>
                <button onClick={() => setSearchParams({ tab: 'orders' })} className="font-bold text-sm hover:underline" style={{ color: lightBlue }}>View All</button>
              </div>
              <div className="divide-y">
                {orders.slice(0, 5).map(order => (
                  <div key={order.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{order.product}</p>
                      <p className="text-sm text-gray-600">{order.customer} • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black" style={{ color: lightBlue }}>₹{order.amount}</p>
                      <span 
                        className="inline-block text-xs font-bold px-3 py-1 rounded-full mt-1"
                        style={{
                          backgroundColor: order.status === 'Delivered' ? '#D1FAE5' :
                                         order.status === 'Shipped' ? 'rgba(58, 190, 249, 0.2)' :
                                         '#FEF3C7',
                          color: order.status === 'Delivered' ? '#047857' :
                                order.status === 'Shipped' ? '#07477D' :
                                '#B45309'
                        }}
                      >{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
              <h2 className="text-2xl font-black text-gray-800 uppercase">Product <span style={{ color: lightBlue }}>Management</span></h2>
              <button
                onClick={() => setShowProductForm(!showProductForm)}
                className="text-white px-6 py-3 rounded-xl font-bold uppercase text-sm hover:shadow-lg transition-all flex items-center gap-2"
                style={{ backgroundColor: lightBlue, color: darkBlue }}
              >
                {showProductForm ? <X size={18} /> : <Plus size={18} />} {showProductForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {/* Add/Edit Product Form */}
            {(showProductForm || editingProduct) && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-[2rem] border-2 border-blue-200 p-8 animate-in slide-in-from-top-4">
                <h3 className="text-lg font-black text-gray-800 mb-6 uppercase">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, name: e.target.value}) : setNewProduct({...newProduct, name: e.target.value})}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, price: e.target.value}) : setNewProduct({...newProduct, price: e.target.value})}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={editingProduct ? editingProduct.stock : newProduct.stock}
                    onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, stock: e.target.value}) : setNewProduct({...newProduct, stock: e.target.value})}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold"
                  />
                  <select
                    value={editingProduct ? editingProduct.category : newProduct.category}
                    onChange={(e) => editingProduct ? setEditingProduct({...editingProduct, category: e.target.value}) : setNewProduct({...newProduct, category: e.target.value})}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold"
                  >
                    <option value="">Select Category</option>
                    <option value="Science">Science</option>
                    <option value="Math">Mathematics</option>
                    <option value="Languages">Languages</option>
                    <option value="History">History</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                  className="mt-6 w-full text-white py-3 rounded-xl font-bold uppercase hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                  style={{ backgroundColor: lightBlue, color: darkBlue }}
                >
                  <Check size={18} /> {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold flex-1"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Out of Stock</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-gray-800 uppercase text-sm tracking-tight flex-1">{product.name}</h4>
                      <span className={`text-[8px] font-black px-2 py-1 rounded-full ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase mb-4">{product.category}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-600">Price</span>
                        <span className="font-black" style={{ color: lightBlue }}>₹{product.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-600">Stock</span>
                        <span className="font-black text-gray-800">{product.stock} units</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-600">Sold</span>
                        <span className="font-black text-green-600">{product.sold}</span>
                      </div>
                      {product.rating > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-600">Rating</span>
                          <span className="font-black text-yellow-600">⭐ {product.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="flex-1 px-3 py-2 rounded-lg font-bold text-sm hover:shadow-md transition-colors flex items-center justify-center gap-1"
                        style={{ backgroundColor: 'rgba(58, 190, 249, 0.2)', color: lightBlue }}
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg font-bold text-sm hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-[2rem] p-12 text-center">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 font-bold">No products found</p>
              </div>
            )}
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-gray-800 uppercase">Order <span className="text-green-600">Management</span></h2>
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                        <td className="px-6 py-4 font-bold text-gray-800">{order.product}</td>
                        <td className="px-6 py-4 font-black" style={{ color: lightBlue }}>₹{order.amount}</td>
                        <td className="px-6 py-4">
                          <span 
                            className="inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: order.status === 'Delivered' ? '#D1FAE5' :
                                             order.status === 'Shipped' ? 'rgba(58, 190, 249, 0.2)' :
                                             '#FEF3C7',
                              color: order.status === 'Delivered' ? '#047857' :
                                    order.status === 'Shipped' ? darkBlue :
                                    '#B45309'
                            }}
                          >
                            {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-gray-800 uppercase">Analytics &amp; <span style={{ color: lightBlue }}>Reports</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sales Summary */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                <h3 className="font-black text-gray-800 uppercase mb-6">Sales Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-bold text-gray-700">Total Revenue</span>
                    <span className="text-2xl font-black text-green-600">₹{orders.reduce((sum, o) => sum + o.amount, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: 'rgba(58, 190, 249, 0.1)' }}>
                    <span className="font-bold text-gray-700">Total Orders</span>
                    <span className="text-2xl font-black" style={{ color: lightBlue }}>{orders.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-bold text-gray-700">Total Units Sold</span>
                    <span className="text-2xl font-black text-purple-600">{products.reduce((sum, p) => sum + p.sold, 0)}</span>
                  </div>
                </div>
              </div>

              {/* Product Performance */}
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                <h3 className="font-black text-gray-800 uppercase mb-6">Top Performing Products</h3>
                <div className="space-y-2">
                  {products.sort((a, b) => b.sold - a.sold).slice(0, 5).map((p, i) => (
                    <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-bold text-gray-700">{i + 1}. {p.name}</span>
                      <span className="font-black" style={{ color: lightBlue }}>{p.sold} sold</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-gray-800 uppercase">Shop <span style={{ color: lightBlue }}>Settings</span></h2>
            
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
              <h3 className="font-black text-lg text-gray-800 mb-6 uppercase">Shop Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Shop Name</label>
                  <input 
                    type="text" 
                    value={currentUser?.shopName || 'My Shop'} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-800"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={currentUser?.email || ''} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-800"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                  <input 
                    type="text" 
                    value={currentUser?.phone || ''} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-800"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-800">
                    <option>Educational Books</option>
                    <option>Reference Materials</option>
                    <option>Multiple Categories</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
              <h3 className="font-black text-lg text-gray-800 mb-6 uppercase">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Account Status</label>
                  <p className="inline-block px-4 py-2 rounded-full font-bold text-sm" style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>✓ Verified & Active</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-4">Data Source</label>
                  <p className="text-sm text-gray-600 mb-3">Currently using: <strong>{localStorage.getItem('dataSource') === 'hardcoded' ? 'Demo Mode (Hardcoded Data)' : 'Live Data'}</strong></p>
                  <div className="space-y-2">
                    <button 
                      onClick={() => { localStorage.setItem('dataSource', 'hardcoded'); window.location.reload(); }}
                      className="w-full px-4 py-2 rounded-lg font-bold text-sm transition-all"
                      style={{ backgroundColor: localStorage.getItem('dataSource') === 'hardcoded' ? lightBlue : '#F3F4F6', color: localStorage.getItem('dataSource') === 'hardcoded' ? darkBlue : '#6B7280' }}
                    >
                      Use Demo Data (Fallback)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <SellerLayout seller={currentUser} onLogout={handleLogout}>
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-in fade-in z-50">
          {success}
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-in fade-in z-50">
          {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'products', label: 'Products', icon: Package },
          { id: 'orders', label: 'Orders', icon: ShoppingBag },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSearchParams({ tab: tab.id })}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${
              activeTab === tab.id
                ? 'text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
            style={activeTab === tab.id ? { backgroundColor: lightBlue, color: darkBlue } : {}}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </SellerLayout>
  );
};

export default SellerDashboard;
