import React, { createContext, useContext, useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import CartPage from './Pages/customer/CartPage';
import Homepage from './Pages/public/Homepage';
const Products = lazy(() => import('./Pages/public/Products'));

const CollectionPage = lazy(() => import('./Pages/public/CollectionPage'));

// Lazy load admin/user pages
const AdminDashboard = lazy(() => import('./Pages/admin/AdminDashboard'));
const UserDashboard = lazy(() => import('./Pages/customer/CustomerDashboard'));
const SellerDashboard = lazy(() => import('./Pages/seller/SellerDashboard'));
const CustomerLogin = lazy(() => import('./Pages/auth/CustomerLogin'));
const CustomerSignup = lazy(() => import('./Pages/auth/CustomerSignup'));
const AdminLogin = lazy(() => import('./Pages/auth/AdminLogin'));
const AdminSignup = lazy(() => import('./Pages/auth/AdminSignup'));
const SellerLogin = lazy(() => import('./Pages/auth/SellerLogin'));
const SellerSignup = lazy(() => import('./Pages/auth/SellerSignupOnboarding'));

const AboutPage = lazy(() => import('./Pages/public/AboutPage'));
const ContactPage = lazy(() => import('./Pages/public/ContactPage'));

const PartnerDocs = lazy(() => import('./Pages/public/PartnerDocs'));

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

  // Restore auth state from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('userRole');
      const storedIsAuth = localStorage.getItem('isAuthenticated');

      if (storedUser && storedRole && storedIsAuth === 'true') {
        setCurrentUser(JSON.parse(storedUser));
        setUserRole(storedRole);
        setIsAuthenticated(true);
        console.log(`✅ Auth restored: ${storedRole} user`, JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isAuthenticated');
    }
  }, []);

  const login = (userData, role) => {
    setCurrentUser(userData);
    setUserRole(role);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userRole', role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', `${role}-token-${userData.id}`);
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
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
  // Hide navbar from all dashboards (admin, seller, customer)
  const isDashboardPage = location.pathname.includes('/admin-dashboard') || 
                          location.pathname.includes('/seller/dashboard') || 
                          location.pathname.includes('/customer/dashboard') ||
                          location.pathname.includes('/user/dashboard');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isDashboardPage && <Navbar />}
      <main>
        <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shop" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/collections" element={<CollectionPage />} />

            
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
            <Route path="/customer/dashboard" element={<UserDashboard />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            
            {/* Seller Routes */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/dashboard/*" element={<SellerDashboard />} />
            
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partners" element={<PartnerDocs />} />
            
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
