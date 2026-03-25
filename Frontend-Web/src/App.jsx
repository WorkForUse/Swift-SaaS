// import React, { createContext, useContext, useState, lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import CartPage from './Pages/CartPage';
// import Homepage from './Pages/Homepage';

// // Lazy load admin/user pages
// const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'));
// const UserDashboard = lazy(() => import('./Pages/UserDashboard'));
// const SellerDashboard = lazy(() => import('./Pages/SellerDashboard'));
// const CustomerLogin = lazy(() => import('./Pages/Auth/CustomerLogin'));
// const CustomerSignup = lazy(() => import('./Pages/Auth/CustomerSignup'));
// const AdminLogin = lazy(() => import('./Pages/Auth/AdminLogin'));
// const AdminSignup = lazy(() => import('./Pages/Auth/AdminSignup'));
// const SellerLogin = lazy(() => import('./Pages/Auth/SellerLogin'));
// const SellerSignup = lazy(() => import('./Pages/Auth/SellerSignup'));

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };

// // Hardcoded fallback users for demo
// const FALLBACK_USERS = {
//   customer: {
//     id: 'cust-001',
//     username: 'john_customer',
//     email: 'customer@example.com',
//     firstName: 'John',
//     lastName: 'Doe',
//     role: 'customer',
//     phone: '+1-234-567-8900',
//     isVerified: true,
//     isActive: true
//   },
//   admin: {
//     id: 'admin-001',
//     username: 'jane_admin',
//     email: 'admin@example.com',
//     firstName: 'Jane',
//     lastName: 'Smith',
//     role: 'admin',
//     phone: '+1-987-654-3210',
//     isVerified: true,
//     isActive: true
//   },
//   seller: {
//     id: 'seller-001',
//     username: 'mike_seller',
//     email: 'seller@example.com',
//     firstName: 'Mike',
//     lastName: 'Johnson',
//     role: 'seller',
//     phone: '+1-555-123-4567',
//     shopName: 'Books Plus',
//     shopDescription: 'Premium textbooks and educational materials',
//     isVerified: true,
//     isActive: true
//   }
// };

// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   const login = (userData, role) => {
//     setCurrentUser(userData);
//     setUserRole(role);
//     setIsAuthenticated(true);
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('userRole', role);
//     localStorage.setItem('token', `${role}-token-${userData.id}`);
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     setUserRole(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('user');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('token');
//   };

//   const switchRole = (role) => {
//     if (role === 'admin') {
//       login(FALLBACK_USERS.admin, 'admin');
//     } else if (role === 'seller') {
//       login(FALLBACK_USERS.seller, 'seller');
//     } else {
//       login(FALLBACK_USERS.customer, 'customer');
//     }
//   };

//   const value = {
//     currentUser,
//     isAuthenticated,
//     userRole,
//     login,
//     logout,
//     switchRole,
//     fallbackUsers: FALLBACK_USERS
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const MainContent = () => {
//   const location = useLocation();
//   const isAdminOrSellerPage = location.pathname.includes('/admin-dashboard') || location.pathname.includes('/seller/dashboard');
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {!isAdminOrSellerPage && <Navbar />}
//       <main>
//         <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
//           <Routes>
//             <Route path="/" element={<Homepage />} />
//             <Route path="/cart" element={<CartPage />} />
            
//             {/* Customer Authentication Routes */}
//             <Route path="/customer/login" element={<CustomerLogin />} />
//             <Route path="/customer/signup" element={<CustomerSignup />} />
            
//             {/* Seller Authentication Routes */}
//             <Route path="/seller/login" element={<SellerLogin />} />
//             <Route path="/seller/signup" element={<SellerSignup />} />
            
//             {/* Admin Authentication Routes */}
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route path="/admin/signup" element={<AdminSignup />} />
            
//             {/* User Routes */}
//             <Route path="/user/dashboard" element={<UserDashboard />} />
            
//             {/* Seller Routes */}
//             <Route path="/seller/dashboard" element={<SellerDashboard />} />
//             <Route path="/seller/dashboard/*" element={<SellerDashboard />} />
            
//             {/* Admin Routes */}
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//             <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
            
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </Suspense>
//         {/* Role Switcher Demo */}
//         <RoleSwitcher />
//       </main>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <MainContent />
//       </Router>
//     </AuthProvider>
//   );
// };

// // Role Switcher Component using context
// const RoleSwitcher = () => {
//   const { switchRole, userRole, logout } = useAuth();
//   return (
//     <div className="fixed bottom-4 right-4 flex flex-col gap-2 bg-white p-4 rounded-lg shadow-xl border z-50">
//       <div className="text-xs font-bold text-gray-600">
//         {userRole ? `Current: ${userRole.toUpperCase()}` : 'Not logged in'}
//       </div>
//       <div className="flex gap-2 flex-wrap">
//         <button 
//           onClick={() => switchRole('customer')}
//           className="px-3 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 text-xs"
//         >
//           Customer Demo
//         </button>
//         <button 
//           onClick={() => switchRole('seller')}
//           className="px-3 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 text-xs"
//         >
//           Seller Demo
//         </button>
//         <button 
//           onClick={() => switchRole('admin')}
//           className="px-3 py-2 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 text-xs"
//         >
//           Admin Demo
//         </button>
//         {userRole && (
//           <button 
//             onClick={logout}
//             className="px-3 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 text-xs"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { createContext, useContext, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartPage from './Pages/CartPage';
import Homepage from './Pages/Homepage';

// Lazy load admin/user pages
const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'));
const UserDashboard = lazy(() => import('./Pages/UserDashboard'));
const SellerDashboard = lazy(() => import('./Pages/SellerDashboard'));
const CustomerLogin = lazy(() => import('./Pages/Auth/CustomerLogin'));
const CustomerSignup = lazy(() => import('./Pages/Auth/CustomerSignup'));
const AdminLogin = lazy(() => import('./Pages/Auth/AdminLogin'));
const AdminSignup = lazy(() => import('./Pages/Auth/AdminSignup'));
const SellerLogin = lazy(() => import('./Pages/Auth/SellerLogin'));
const SellerSignup = lazy(() => import('./Pages/Auth/SellerSignup'));

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Hardcoded fallback users for demo
const FALLBACK_USERS = {
  customer: {
    id: 'cust-001',
    username: 'john_customer',
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    phone: '+1-234-567-8900',
    isVerified: true,
    isActive: true
  },
  admin: {
    id: 'admin-001',
    username: 'jane_admin',
    email: 'admin@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'admin',
    phone: '+1-987-654-3210',
    isVerified: true,
    isActive: true
  },
  seller: {
    id: 'seller-001',
    username: 'mike_seller',
    email: 'seller@example.com',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'seller',
    phone: '+1-555-123-4567',
    shopName: 'Books Plus',
    shopDescription: 'Premium textbooks and educational materials',
    isVerified: true,
    isActive: true
  }
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const login = (userData, role) => {
    setCurrentUser(userData);
    setUserRole(role);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', role);
    localStorage.setItem('token', `${role}-token-${userData.id}`);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
  };

  const switchRole = (role) => {
    if (role === 'admin') {
      login(FALLBACK_USERS.admin, 'admin');
    } else if (role === 'seller') {
      login(FALLBACK_USERS.seller, 'seller');
    } else {
      login(FALLBACK_USERS.customer, 'customer');
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    userRole,
    login,
    logout,
    switchRole,
    fallbackUsers: FALLBACK_USERS
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const MainContent = () => {
  const location = useLocation();
  const isAdminOrSellerPage = location.pathname.includes('/admin-dashboard') || location.pathname.includes('/seller/dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdminOrSellerPage && <Navbar />}
      <main>
        <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<CartPage />} />
            
            {/* Customer Authentication Routes */}
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/customer/signup" element={<CustomerSignup />} />
            
            {/* Seller Authentication Routes */}
            <Route path="/seller/login" element={<SellerLogin />} />
            <Route path="/seller/signup" element={<SellerSignup />} />
            
            {/* Admin Authentication Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            
            {/* User Routes */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            
            {/* Seller Routes */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/dashboard/*" element={<SellerDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
};

export default App;