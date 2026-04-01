import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Package, LogOut, ChevronDown, 
  Settings, ShieldCheck, X, PlusCircle, List, ChevronLeft, ChevronRight 
} from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const darkBlue = "#07477D";
  const lightBlue = "#3ABEF9";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const adminUser = {
    name: 'Hamza Shahid',
    role: 'Senior Admin',
    avatar: 'HS'
  };

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin-dashboard' },
    { 
      label: 'Users', 
      icon: Users, 
      submenu: [
        { label: 'All Users', path: '/admin-dashboard/users', icon: List },
        { label: 'Add User', path: '/admin-dashboard/users/add', icon: PlusCircle },
      ] 
    },
    { 
      label: 'Products', 
      icon: Package, 
      submenu: [
        { label: 'All Products', path: '/admin-dashboard/products', icon: List },
        { label: 'Add Product', path: '/admin-dashboard/products/add', icon: PlusCircle },
      ] 
    },
    { label: 'Settings', icon: Settings, path: '/admin-dashboard/settings' },
  ];

  const handleMenuClick = (item) => {
    // If collapsed and has submenu, expand instead of navigate
    if (isCollapsed && item.submenu) {
      setIsCollapsed(false);
      setExpandedMenu(item.label);
      return;
    }
    
    // Toggle submenu if has submenu
    if (item.submenu) {
      setExpandedMenu(expandedMenu === item.label ? null : item.label);
    } else {
      // If setActiveTab is available (admin dashboard), use it for tab switching
      if (setActiveTab && item.label === 'Dashboard') {
        setActiveTab('overview');
      } else if (setActiveTab && item.label === 'Users') {
        setActiveTab('users');
      } else if (setActiveTab && item.label === 'Products') {
        setActiveTab('products');
      } else {
        navigate(item.path);
      }
      setExpandedMenu(null);
      // Close mobile menu after navigation
      if (isMobile && isOpen) onClose();
    }
  };

  const handleSubMenuClick = (path, label) => {
    // If setActiveTab is available (admin dashboard), use it for tab switching
    if (setActiveTab) {
      if (label.includes('User')) {
        setActiveTab('users');
      } else if (label.includes('Product')) {
        setActiveTab('products');
      }
    } else {
      navigate(path);
    }
    setExpandedMenu(null);
    if (isMobile && isOpen) onClose();
  };

  const isPathActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside
        style={{ backgroundColor: darkBlue }}
        className={`fixed md:sticky top-0 left-0 h-screen text-white shadow-2xl z-[70] flex flex-col transition-all duration-300 ease-out ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        
        {/* Toggle Button (Desktop Only) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-10 w-6 h-6 bg-[#3ABEF9] text-[#07477D] rounded-full items-center justify-center shadow-lg border-2 border-[#07477D] hover:scale-110 transition-transform z-[80]"
        >
          {isCollapsed ? <ChevronRight size={14} strokeWidth={3} /> : <ChevronLeft size={14} strokeWidth={3} />}
        </button>

        {/* Header Section */}
        <div className={`p-6 border-b border-white/10 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3ABEF9] rounded-xl flex items-center justify-center font-black text-sm text-[#07477D] shrink-0 shadow-inner">
              SB
            </div>
            {!isCollapsed && (
              <div className="animate-in fade-in duration-300">
                <h1 className="text-lg font-black tracking-tight leading-none uppercase">Swift</h1>
                <p className="text-[10px] text-[#3ABEF9] font-bold tracking-[0.2em] uppercase">Admin Suite</p>
              </div>
            )}
          </div>
          {isOpen && isMobile && (
            <button className="md:hidden ml-auto hover:opacity-80 transition-opacity" onClick={onClose}>
              <X size={22} />
            </button>
          )}
        </div>

        {/* User Profile */}
        <div className={`px-4 py-6 border-b border-white/10 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center transition-all ${isCollapsed ? 'w-12 h-12 justify-center p-0' : 'gap-4 w-full'}`}>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-bold text-[#3ABEF9] border border-white/10 shrink-0">
              {adminUser.avatar}
            </div>
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden animate-in fade-in duration-300 min-w-0">
                <p className="font-bold text-xs truncate">{adminUser.name}</p>
                <div className="flex items-center gap-1.5 opacity-60">
                  <ShieldCheck size={10} className="text-[#3ABEF9]" />
                  <p className="text-[9px] font-black uppercase tracking-widest text-truncate">{adminUser.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = item.path && isPathActive(item.path);
            const isOpenSub = expandedMenu === item.label && !isCollapsed;

            return (
              <div key={item.label}>
                <button
                  onClick={() => handleMenuClick(item)}
                  title={isCollapsed ? item.label : ""}
                  className={`w-full flex items-center rounded-xl transition-all duration-200 ${
                    isCollapsed ? 'justify-center py-3 px-0' : 'justify-between px-4 py-3.5'
                  } ${
                    isSelected || isOpenSub 
                    ? 'bg-[#3ABEF9] text-[#07477D] shadow-lg shadow-[#3ABEF9]/20' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon size={20} strokeWidth={2} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-xs font-black uppercase tracking-wider truncate">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.submenu && (
                    <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-300 ${isOpenSub ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* Submenu */}
                {item.submenu && isOpenSub && !isCollapsed && (
                  <div className="mt-2 ml-4 pl-4 border-l-2 border-white/10 space-y-1 animate-in slide-in-from-left-2 duration-200">
                    {item.submenu.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = isPathActive(sub.path);
                      return (
                        <button
                          key={sub.path}
                          onClick={() => handleSubMenuClick(sub.path, sub.label)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-colors ${
                            isSubActive ? 'text-[#3ABEF9] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <SubIcon size={14} className="flex-shrink-0" />
                          <span className="truncate">{sub.label}</span>
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
        <div className={`p-4 border-t border-white/10 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <button
            onClick={() => {
              navigate('/');
              if (isMobile && isOpen) onClose();
            }}
            className={`flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-2xl font-black transition-all duration-300 ${
              isCollapsed ? 'w-10 h-10 p-0' : 'w-full py-4 text-[10px] uppercase tracking-[0.2em]'
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut size={16} className="flex-shrink-0" />
            {!isCollapsed && "Sign Out"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;