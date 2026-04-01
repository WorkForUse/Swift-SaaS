import React, { useState } from 'react';
import { 
  Menu, X, LogOut, BarChart3, Users, Package, 
  ArrowUpRight, TrendingUp, UserCheck, Clock, Shield 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import AdminSidebar from '../../components/shared/AdminSidebar';
import UserManagement from '../admin/UserManagement';
import ProductManagement from '../admin/ProductManagement';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const darkBlue = "#07477D";
  const lightBlue = "#3ABEF9";

  const stats = [
    { label: 'Total Users', value: '1,284', change: '+12%', color: '#3ABEF9', icon: Users },
    { label: 'Total Products', value: '452', change: '+5%', color: '#818CF8', icon: Package },
    { label: 'Active Orders', value: '86', change: '+18%', color: '#34D399', icon: TrendingUp },
    { label: 'Total Revenue', value: '$12,450', change: '+24%', color: '#F472B6', icon: BarChart3 },
  ];

  const recentActivities = [
    { id: 1, action: 'New member joined', target: 'Charlie Wilson', time: '2 mins ago', type: 'user' },
    { id: 2, action: 'Stock Updated', target: 'Gaming Mouse G5', time: '45 mins ago', type: 'product' },
    { id: 3, action: 'Payment Verified', target: 'Order #9921', time: '2 hours ago', type: 'order' },
    { id: 4, action: 'System Alert', target: 'Server Cache Cleared', time: '5 hours ago', type: 'system' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP NAV - Modern Glassmorphism */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h1 className="text-xl font-black text-[#07477D] tracking-tighter uppercase hidden sm:block">
              Swift <span className="text-[#3ABEF9]">Admin</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-sm font-black text-[#07477D] uppercase tracking-tight">{currentUser?.firstName} {currentUser?.lastName}</span>
              <span className="text-[10px] font-bold text-[#3ABEF9] uppercase tracking-widest leading-none">Super Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-sm"
            >
              <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Terminate</span>
            </button>
          </div>
        </header>

        {/* MAIN CONTENT SCROLL AREA */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
            
            {/* TAB NAVIGATION - Chip Style */}
            <div className="flex p-1.5 bg-gray-200/50 rounded-2xl w-fit mb-4">
              {['overview', 'users', 'products'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab 
                    ? 'bg-white text-[#07477D] shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* 1. STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-white p-6 rounded-[2rem] border-2 border-gray-50 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div 
                            className="p-3 rounded-2xl text-white shadow-lg"
                            style={{ backgroundColor: stat.color }}
                          >
                            <Icon size={20} />
                          </div>
                          <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                            {stat.change}
                          </span>
                        </div>
                        <h3 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{stat.label}</h3>
                        <p className="text-2xl font-black text-[#07477D] tracking-tighter">{stat.value}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* 2. RECENT ACTIVITY TABLE */}
                  <div className="lg:col-span-2 bg-white rounded-[2.5rem] border-2 border-gray-50 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                      <h2 className="text-lg font-black text-[#07477D] uppercase tracking-tighter flex items-center gap-2">
                        <Clock className="text-[#3ABEF9]" size={20} /> Recent Log
                      </h2>
                      <button className="text-[10px] font-black text-[#3ABEF9] uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="p-4 space-y-2">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#3ABEF9] group-hover:scale-110 transition-transform">
                              {activity.type === 'user' ? <Users size={18}/> : <Package size={18}/>}
                            </div>
                            <div>
                              <p className="text-sm font-black text-gray-800 uppercase tracking-tight leading-tight">{activity.action}</p>
                              <p className="text-[10px] font-bold text-gray-400">{activity.target}</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. ADMIN INFO - Card Style */}
                  <div className="bg-[#07477D] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/40">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Shield size={120} />
                    </div>
                    <div className="relative z-10">
                      <h2 className="text-xs font-black text-[#3ABEF9] uppercase tracking-[0.3em] mb-8">System Profile</h2>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 font-black text-xl text-[#3ABEF9]">
                            {currentUser?.firstName?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-lg font-black leading-none uppercase tracking-tighter">{currentUser?.firstName} {currentUser?.lastName}</p>
                            <p className="text-[10px] font-bold text-[#3ABEF9]/80 uppercase mt-1 tracking-widest">Master Control</p>
                          </div>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-white/10">
                           <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Internal ID</span>
                             <span className="text-xs font-bold text-white/90">#AD-99120</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Network Status</span>
                             <span className="flex items-center gap-1.5 text-xs font-bold text-green-400">
                               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> Encrypted
                             </span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'users' ? (
              <UserManagement />
            ) : (
              <ProductManagement />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;