// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Menu, X, LayoutDashboard, Users, Package, LogOut, ChevronDown } from 'lucide-react';

// const AdminSidebar = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const [expandedMenu, setExpandedMenu] = useState(null);

//   // Hardcoded admin user data
//   const adminUser = {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//     role: 'admin',
//     avatar: '👩‍💼'
//   };

//   const menuItems = [
//     { label: 'Dashboard', icon: LayoutDashboard, path: '/admin-dashboard' },
//     { 
//       label: 'User Management', 
//       icon: Users, 
//       submenu: [
//         { label: 'All Users', path: '/admin-dashboard/users' },
//         { label: 'Add User', path: '/admin-dashboard/users/add' },
//       ] 
//     },
//     { 
//       label: 'Product Management', 
//       icon: Package, 
//       submenu: [
//         { label: 'All Products', path: '/admin-dashboard/products' },
//         { label: 'Add Product', path: '/admin-dashboard/products/add' },
//       ] 
//     },
//   ];

//   const toggleMenu = (label) => {
//     setExpandedMenu(expandedMenu === label ? null : label);
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     onClose();
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg z-40 overflow-y-auto transition-transform duration-300 ${
//           isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//         }`}
//       >
//         {/* Header */}
//         <div className="p-6 border-b border-blue-700 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Admin Panel</h1>
//           <button 
//             className="md:hidden hover:bg-blue-700 p-2 rounded-lg transition-colors"
//             onClick={onClose}
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* User Info */}
//         <div className="p-4 bg-blue-700 m-4 rounded-lg">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-lg">
//               {adminUser.avatar}
//             </div>
//             <div>
//               <p className="font-semibold">{adminUser.name}</p>
//               <p className="text-xs text-blue-200">{adminUser.role.toUpperCase()}</p>
//             </div>
//           </div>
//         </div>

//         {/* Menu Items */}
//         <nav className="px-4 py-6 space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <div key={item.label}>
//                 <button
//                   onClick={() => {
//                     if (item.submenu) {
//                       toggleMenu(item.label);
//                     } else {
//                       handleNavigation(item.path);
//                     }
//                   }}
//                   className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Icon size={20} />
//                     <span>{item.label}</span>
//                   </div>
//                   {item.submenu && (
//                     <ChevronDown 
//                       size={18} 
//                       className={`transition-transform ${expandedMenu === item.label ? 'rotate-180' : ''}`}
//                     />
//                   )}
//                 </button>

//                 {/* Submenu */}
//                 {item.submenu && expandedMenu === item.label && (
//                   <div className="ml-6 mt-1 space-y-1">
//                     {item.submenu.map((subitem) => (
//                       <button
//                         key={subitem.path}
//                         onClick={() => handleNavigation(subitem.path)}
//                         className="w-full text-left px-4 py-2 text-sm text-blue-100 hover:text-white hover:bg-blue-700 rounded-lg transition-colors"
//                       >
//                         • {subitem.label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700 bg-blue-900">
//           <button
//             onClick={() => {
//               navigate('/');
//               onClose();
//             }}
//             className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors bg-red-500"
//           >
//             <LogOut size={18} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AdminSidebar;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  LogOut, 
  ChevronDown, 
  Settings, 
  ShieldCheck,
  X,
  PlusCircle,
  List
} from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Track expanded menus separately for stability
  const [expandedMenu, setExpandedMenu] = useState(null);

  const darkBlue = "#07477D";
  const lightBlue = "#3ABEF9";

  const adminUser = {
    name: 'Hamza Tech',
    role: 'Senior Admin',
    avatar: 'HT'
  };

  const menuItems = [
    { 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/admin-dashboard' 
    },
    { 
      label: 'User Management', 
      icon: Users, 
      submenu: [
        { label: 'All Users', path: '/admin-dashboard/users', icon: List },
        { label: 'Add User', path: '/admin-dashboard/users/add', icon: PlusCircle },
      ] 
    },
    { 
      label: 'Product Management', 
      icon: Package, 
      submenu: [
        { label: 'All Products', path: '/admin-dashboard/products', icon: List },
        { label: 'Add Product', path: '/admin-dashboard/products/add', icon: PlusCircle },
      ] 
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      path: '/admin-dashboard/settings' 
    },
  ];

  const handleMenuClick = (item) => {
    if (item.submenu) {
      // Toggle submenu
      setExpandedMenu(expandedMenu === item.label ? null : item.label);
    } else {
      // Direct navigation
      navigate(item.path);
      setExpandedMenu(null);
      if (window.innerWidth < 768) onClose(); // Auto-close on mobile
    }
  };

  const handleSubNav = (path) => {
    navigate(path);
    if (window.innerWidth < 768) onClose(); // Auto-close on mobile
  };

  return (
    <>
      {/* 1. Mobile Overlay (Fixed Backdrop) */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* 2. Sidebar Main Container */}
      <aside
        style={{ backgroundColor: darkBlue }}
        className={`fixed md:sticky top-0 left-0 h-screen w-72 text-white shadow-2xl z-[70] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header Section */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3ABEF9] rounded-xl flex items-center justify-center font-black text-sm text-[#07477D] shadow-inner">
              SB
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none uppercase">Swift</h1>
              <p className="text-[10px] text-[#3ABEF9] font-bold tracking-[0.2em] uppercase">Admin Suite</p>
            </div>
          </div>
          <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="px-4 py-6">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold text-[#3ABEF9] border border-white/10 shadow-lg">
              {adminUser.avatar}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-sm truncate">{adminUser.name}</p>
              <div className="flex items-center gap-1.5 opacity-60">
                <ShieldCheck size={12} className="text-[#3ABEF9]" />
                <p className="text-[10px] font-black uppercase tracking-widest">{adminUser.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = location.pathname === item.path;
            const isOpenSub = expandedMenu === item.label;

            return (
              <div key={item.label} className="group">
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isSelected || isOpenSub 
                    ? 'bg-[#3ABEF9] text-[#07477D] shadow-lg shadow-[#3ABEF9]/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isSelected || isOpenSub ? 'stroke-[2.5px]' : 'opacity-70'} />
                    <span className="text-xs font-black uppercase tracking-wider">{item.label}</span>
                  </div>
                  {item.submenu && (
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isOpenSub ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Submenu rendering */}
                {item.submenu && isOpenSub && (
                  <div className="mt-2 ml-4 pl-4 border-l-2 border-white/10 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {item.submenu.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = location.pathname === sub.path;
                      return (
                        <button
                          key={sub.path}
                          onClick={() => handleSubNav(sub.path)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-colors ${
                            isSubActive ? 'text-[#3ABEF9] bg-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <SubIcon size={14} />
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Footer */}
        <div className="p-4 bg-[#05355D] border-t border-white/5">
          <button
            onClick={() => { navigate('/'); if (onClose) onClose(); }}
            className="w-full flex items-center justify-center gap-3 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-sm"
          >
            <LogOut size={16} />
            Sign Out System
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;