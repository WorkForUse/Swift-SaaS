// import React, { useState } from 'react';
// import { useMockUsers } from './mockData';
// import { Trash2, Edit2, Plus, CheckCircle, XCircle } from 'lucide-react';

// const UserManagement = () => {
//   const { users, addUser, updateUser, deleteUser, toggleStatus } = useMockUsers();
//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });

//   // Hardcoded admin data for verification
//   const adminData = {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     role: 'admin',
//     status: 'active',
//     deleted: false,
//     createdAt: '2024-01-10'
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       updateUser(editingId, formData);
//       setEditingId(null);
//     } else {
//       addUser(formData);
//     }
//     setFormData({ name: '', email: '', role: 'user' });
//     setShowForm(false);
//   };

//   const handleEdit = (user) => {
//     setFormData({ name: user.name, email: user.email, role: user.role });
//     setEditingId(user.id);
//     setShowForm(true);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
//         <button 
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditingId(null);
//             setFormData({ name: '', email: '', role: 'user' });
//           }}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           <Plus size={20} />
//           Add User
//         </button>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-bold mb-4">{editingId ? 'Edit User' : 'Add New User'}</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Name</label>
//               <input 
//                 type="text" 
//                 required
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="Full name"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Email</label>
//               <input 
//                 type="email" 
//                 required
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 placeholder="email@example.com"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Role</label>
//               <select 
//                 value={formData.role}
//                 onChange={(e) => setFormData({...formData, role: e.target.value})}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
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
//                   setFormData({ name: '', email: '', role: 'user' });
//                 }}
//                 className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Role</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Created</th>
//               <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id} className="border-b hover:bg-gray-50 transition">
//                 <td className="px-6 py-4">{user.name}</td>
//                 <td className="px-6 py-4">{user.email}</td>
//                 <td className="px-6 py-4">
//                   <span className={`px-3 py-1 rounded-full text-sm font-bold ${
//                     user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
//                   }`}>
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button 
//                     onClick={() => toggleStatus(user.id)}
//                     className="flex items-center gap-2 hover:opacity-75 transition"
//                   >
//                     {user.status === 'active' ? (
//                       <><CheckCircle size={18} className="text-green-600" /> Active</>
//                     ) : (
//                       <><XCircle size={18} className="text-red-600" /> Inactive</>
//                     )}
//                   </button>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>
//                 <td className="px-6 py-4 flex gap-2">
//                   <button 
//                     onClick={() => handleEdit(user)}
//                     className="text-blue-600 hover:text-blue-800 transition"
//                   >
//                     <Edit2 size={18} />
//                   </button>
//                   <button 
//                     onClick={() => deleteUser(user.id)}
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

// export default UserManagement;

import React, { useState } from 'react';
import { useMockUsers } from './mockData';
import { 
  Trash2, Edit2, Plus, CheckCircle, XCircle, 
  Search, Mail, Shield, Calendar, UserPlus, X, User 
} from 'lucide-react';

const UserManagement = () => {
  const { users, addUser, updateUser, deleteUser, toggleStatus } = useMockUsers();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'user' });
  const [searchTerm, setSearchTerm] = useState("");

  const darkBlue = "#07477D";
  const lightBlue = "#3ABEF9";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateUser(editingId, formData);
      setEditingId(null);
    } else {
      addUser(formData);
    }
    closeForm();
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', email: '', role: 'user' });
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2 md:p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase mb-1" style={{ color: darkBlue }}>
            User <span style={{ color: lightBlue }}>Directory</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Manage system access and member roles</p>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-[#07477D] text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-xl hover:shadow-blue-900/20 transition-all hover:-translate-y-1"
        >
          <UserPlus size={18} strokeWidth={3} /> Add New Member
        </button>
      </div>

      {/* 2. SEARCH & FILTERS */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3ABEF9] transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="SEARCH BY NAME OR EMAIL..." 
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#3ABEF9] font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 3. USERS TABLE */}
      <div className="bg-white rounded-[2rem] border-2 border-gray-50 shadow-xl shadow-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">User Info</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Access Role</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Joined Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Account Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#07477D] font-bold border-2 border-white shadow-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-sm text-gray-800 uppercase tracking-tight">{user.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      user.role === 'admin' 
                      ? 'bg-purple-50 text-purple-600 border-purple-100' 
                      : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar size={14} />
                      <span className="text-xs font-bold">{user.createdAt}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${
                        user.status === 'active' 
                        ? 'bg-green-50 text-green-600 border border-green-100' 
                        : 'bg-red-50 text-red-600 border border-red-100'
                      }`}
                    >
                      {user.status === 'active' ? <CheckCircle size={14}/> : <XCircle size={14}/>}
                      {user.status}
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(user)} className="p-2.5 bg-gray-50 text-gray-400 hover:text-[#3ABEF9] hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={16} /></button>
                      <button onClick={() => deleteUser(user.id)} className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#07477D]/40 backdrop-blur-md" onClick={closeForm}></div>
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-[#07477D] uppercase tracking-tighter">
                {editingId ? 'Edit' : 'Add'} <span className="text-[#3ABEF9]">Member</span>
              </h3>
              <button onClick={closeForm} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <input 
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-[#3ABEF9] border-2 rounded-2xl outline-none font-bold transition-all text-sm"
                    placeholder="e.g. Hamza Tech"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <input 
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-[#3ABEF9] border-2 rounded-2xl outline-none font-bold transition-all text-sm"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assign Role</label>
                <div className="relative">
                   <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-[#3ABEF9] border-2 rounded-2xl outline-none font-black text-[11px] uppercase tracking-widest transition-all appearance-none cursor-pointer"
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">System Admin</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="submit" className="flex-1 bg-[#07477D] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-blue-900/20 hover:brightness-110 transition-all">
                  {editingId ? 'Update Member' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;