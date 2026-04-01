import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../shared/SellerSidebar';
import { LogOut } from 'lucide-react';

const SellerLayout = ({ children, seller, onLogout }) => {
  const navigate = useNavigate();
  const darkBlue = "#07477D";
  const lightBlue = "#3ABEF9";

  const handleLogout = () => {
    localStorage.removeItem('seller');
    localStorage.removeItem('user');
    onLogout?.();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC' }} className="min-h-screen">
      {/* Sidebar */}
      <SellerSidebar seller={seller} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="md:ml-64 transition-all duration-300">
        {/* Top Header Bar */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-30" style={{ borderColor: '#E5E7EB' }}>
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tighter" style={{ color: darkBlue }}>
                {seller?.shopName || 'Seller Dashboard'}
              </h1>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest" style={{ color: lightBlue }}>
                Manage Your Store
              </p>
            </div>

            {/* Right Side Info */}
            <div className="flex items-center gap-4">
              {/* Data Source Indicator */}
              <div
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  backgroundColor: localStorage.getItem('dataSource') === 'hardcoded' ? '#FEF3C7' : '#D1FAE5',
                  color: localStorage.getItem('dataSource') === 'hardcoded' ? '#92400E' : '#065F46'
                }}
              >
                {localStorage.getItem('dataSource') === 'hardcoded' ? '📦 Demo Mode' : '✓ Live Data'}
              </div>

              {/* Seller Info */}
              <div className="hidden md:block text-right">
                <p className="text-sm font-black" style={{ color: darkBlue }}>
                  {seller?.firstName} {seller?.lastName}
                </p>
                <p className="text-xs text-gray-500">{seller?.email}</p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-white rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#EF4444' }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 min-h-[calc(100vh-130px)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SellerLayout;
