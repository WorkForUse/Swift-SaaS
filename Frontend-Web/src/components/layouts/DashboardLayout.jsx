import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import AdminSidebar from '../shared/AdminSidebar'; // Reuse and customize
import { 
  LogOut, Bell, Search, ChevronDown, BarChart3,PlusCircle, ShoppingBag, Users, Settings, LayoutDashboard 
} from 'lucide-react';

const DashboardLayout = ({ role = 'admin', user, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sellerMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/seller/dashboard' },
    { 
      label: 'Products', 
      icon: ShoppingBag, 
      submenu: [
        { label: 'All Products', path: '/seller/dashboard/products', icon: ShoppingBag },
        { label: 'Add Product', path: '/seller/dashboard/products/add', icon: PlusCircle },
      ] 
    },
    { label: 'Orders', icon: Users, path: '/seller/dashboard/orders' },
    { label: 'Analytics', icon: BarChart3, path: '/seller/dashboard/analytics' },
    { label: 'Settings', icon: Settings, path: '/seller/dashboard/settings' },
  ];

  const adminMenuItems = [
    // Original admin menu from sidebar
  ]; // Placeholder, extend as needed

  const menuItems = role === 'seller' ? sellerMenuItems : adminMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        menuItems={menuItems} // Pass custom menu
        user={user || currentUser}
        role={role}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{role} Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications & Search */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-64 p-2 bg-gray-100 rounded-lg hidden md:flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0] || ''}
              </div>
              <div className="hidden md:flex flex-col text-right text-sm">
                <span className="font-semibold text-gray-900">{user?.firstName || 'User'}</span>
                <span className="text-xs text-gray-500 capitalize">{role}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform" />
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

