import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, BarChart3,
  Settings, LogOut, Store, Menu, X
} from 'lucide-react';

const SellerSidebar = ({ seller, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const darkBlue = "#07477D";
  const lightBlue = "#3ABEF9";

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      tab: 'overview',
    },
    {
      label: 'Products',
      icon: Package,
      tab: 'products',
    },
    {
      label: 'Orders',
      icon: ShoppingBag,
      tab: 'orders',
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      tab: 'analytics',
    },
    {
      label: 'Settings',
      icon: Settings,
      tab: 'settings',
    }
  ];

  // Get current tab from URL query parameter
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || 'overview';

  const handleTabClick = (tab) => {
    navigate(`/seller/dashboard?tab=${tab}`);
    setIsMobileOpen(false);
  };

  const isActive = (tab) => currentTab === tab;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 text-white rounded-lg transition-all"
        style={{ backgroundColor: darkBlue }}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 text-white transition-transform duration-300 z-40 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ backgroundColor: darkBlue }}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b" style={{ borderColor: lightBlue }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: lightBlue }}>
              <Store className="w-6 h-6" style={{ color: darkBlue }} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                {seller?.shopName || 'My Shop'}
              </h2>
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: lightBlue }}>
                {seller?.shopCategory || 'Seller'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.tab);

            return (
              <button
                key={item.tab}
                onClick={() => handleTabClick(item.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold uppercase text-[11px] tracking-widest ${
                  active
                    ? 'text-white shadow-lg'
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: active ? lightBlue : 'transparent',
                  color: active ? darkBlue : 'inherit'
                }}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {active && (
                  <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: darkBlue }}></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Seller Info */}
        <div className="absolute bottom-20 left-0 right-0 p-4" style={{ borderTop: `1px solid ${lightBlue}` }}>
          <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(58, 190, 249, 0.15)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: lightBlue }}>
              Seller Account
            </p>
            <p className="text-white font-black text-sm truncate mt-1">
              {seller?.firstName} {seller?.lastName}
            </p>
            <p className="text-gray-300 text-[11px] truncate mt-1">{seller?.email}</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4" style={{ borderTop: `1px solid ${lightBlue}` }}>
          <button
            onClick={() => {
              onLogout();
              setIsMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white rounded-xl transition-all font-black uppercase text-[11px] tracking-widest hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: '#EF4444' }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default SellerSidebar;
