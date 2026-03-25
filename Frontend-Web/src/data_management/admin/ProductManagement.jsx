// import React, { useState } from 'react';
// import { useMockProducts } from './mockData';
// import { Trash2, Edit2, Plus, CheckCircle, XCircle } from 'lucide-react';

// const ProductManagement = () => {
//   const { products, addProduct, updateProduct, deleteProduct, toggleStatus } = useMockProducts();
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({ name: '', price: '', stock: '' });

//   // Hardcoded admin data for verification
//   const adminData = {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     role: 'admin',
//     status: 'active'
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       updateProduct(editingId, { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) });
//       setEditingId(null);
//     } else {
//       addProduct({ ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) });
//     }
//     setFormData({ name: '', price: '', stock: '' });
//     setShowForm(false);
//   };

//   const handleEdit = (product) => {
//     setFormData({ name: product.name, price: product.price, stock: product.stock });
//     setEditingId(product.id);
//     setShowForm(true);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
//         <button 
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditingId(null);
//             setFormData({ name: '', price: '', stock: '' });
//           }}
//           className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           <Plus size={20} />
//           Add Product
//         </button>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Product Name</label>
//               <input 
//                 type="text" 
//                 required
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
//                 placeholder="Product name"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 font-bold mb-2">Price ($)</label>
//                 <input 
//                   type="number" 
//                   step="0.01"
//                   required
//                   value={formData.price}
//                   onChange={(e) => setFormData({...formData, price: e.target.value})}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
//                   placeholder="0.00"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-bold mb-2">Stock</label>
//                 <input 
//                   type="number" 
//                   required
//                   value={formData.stock}
//                   onChange={(e) => setFormData({...formData, stock: e.target.value})}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
//                   placeholder="0"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
//                 {editingId ? 'Update' : 'Create'}
//               </button>
//               <button 
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingId(null);
//                   setFormData({ name: '', price: '', stock: '' });
//                 }}
//                 className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Price</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Stock</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="border-b hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 font-medium">{product.name}</td>
//                 <td className="px-6 py-4 text-green-600 font-bold">${product.price.toFixed(2)}</td>
//                 <td className="px-6 py-4">
//                   <span className={`px-3 py-1 rounded-full text-sm font-bold ${
//                     product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                   }`}>
//                     {product.stock} {product.stock === 1 ? 'unit' : 'units'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button 
//                     onClick={() => toggleStatus(product.id)}
//                     className="flex items-center gap-2 hover:opacity-75 transition"
//                   >
//                     {product.status === 'active' ? (
//                       <><CheckCircle size={18} className="text-green-600" /> Active</>
//                     ) : (
//                       <><XCircle size={18} className="text-red-600" /> Inactive</>
//                     )}
//                   </button>
//                 </td>
//                 <td className="px-6 py-4 flex gap-2">
//                   <button 
//                     onClick={() => handleEdit(product)}
//                     className="text-blue-600 hover:text-blue-800 transition"
//                   >
//                     <Edit2 size={18} />
//                   </button>
//                   <button 
//                     onClick={() => deleteProduct(product.id)}
//                     className="text-red-600 hover:text-red-800 transition"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;

import React, { useState } from 'react';
import { useMockProducts } from './mockData';
import { Trash2, Edit2, Plus, CheckCircle, XCircle, Search, Package, DollarSign, Layers, X } from 'lucide-react';

const ProductManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleStatus } = useMockProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });
  const [searchTerm, setSearchTerm] = useState("");

  const darkBlue = "#07477D";
  const lightBlue = "#3ABEF9";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) });
      setEditingId(null);
    } else {
      addProduct({ ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) });
    }
    closeForm();
  };

  const handleEdit = (product) => {
    setFormData({ name: product.name, price: product.price, stock: product.stock });
    setEditingId(product.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', price: '', stock: '' });
  };

  // Filter logic
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-2 md:p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-3xl font-black tracking-tighter uppercase mb-1`} style={{ color: darkBlue }}>
            Inventory <span style={{ color: lightBlue }}>Management</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Manage your shop catalog and stock levels</p>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-[#07477D] text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1"
        >
          <Plus size={18} strokeWidth={3} /> Add New Product
        </button>
      </div>

      {/* 2. STATS & SEARCH BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3ABEF9] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="SEARCH BY PRODUCT NAME..." 
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#3ABEF9] font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-white border-2 border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
           <span className="text-[10px] font-black text-gray-400 uppercase">Total Items</span>
           <span className="text-xl font-black text-[#07477D]">{products.length}</span>
        </div>
      </div>

      {/* 3. PRODUCTS TABLE */}
      <div className="bg-white rounded-[2rem] border-2 border-gray-50 shadow-xl shadow-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pricing</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Inventory</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#07477D] group-hover:bg-[#3ABEF9] group-hover:text-white transition-all">
                        <Package size={20} />
                      </div>
                      <span className="font-black text-sm text-gray-800 uppercase tracking-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-lg font-black text-[#07477D]">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${product.stock > 10 ? 'bg-[#3ABEF9]' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(product.stock, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{product.stock} Units left</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleStatus(product.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${
                        product.status === 'active' 
                        ? 'bg-green-50 text-green-600 border border-green-100' 
                        : 'bg-red-50 text-red-600 border border-red-100'
                      }`}
                    >
                      {product.status === 'active' ? <CheckCircle size={14}/> : <XCircle size={14}/>}
                      {product.status}
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)} className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#3ABEF9] hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={16} /></button>
                      <button onClick={() => deleteProduct(product.id)} className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ADD/EDIT MODAL (Better than inline form) */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#07477D]/40 backdrop-blur-md" onClick={closeForm}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-[#07477D] uppercase tracking-tighter">
                {editingId ? 'Update' : 'Create'} <span className="text-[#3ABEF9]">Product</span>
              </h3>
              <button onClick={closeForm} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Name</label>
                <div className="relative">
                   <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <input 
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-[#3ABEF9] border-2 rounded-2xl outline-none font-bold transition-all"
                    placeholder="Enter product title..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="number" step="0.01" required value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-[#3ABEF9] border-2 rounded-2xl outline-none font-bold transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Stock</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input 
                      type="number" required value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-[#3ABEF9] border-2 rounded-2xl outline-none font-bold transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="submit" className="flex-1 bg-[#07477D] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-blue-900/20 hover:brightness-110 transition-all">
                  {editingId ? 'Save Changes' : 'Confirm & Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;