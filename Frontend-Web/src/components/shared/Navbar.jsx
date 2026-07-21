import React, { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Search, User, ShoppingBag, Menu, X, Plus, Minus, LayoutDashboard, LogOut, Package } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../App";
import logo from '../../assets/swift-logo.PNG';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasRedirected = useRef(false);

  const { currentUser, userRole, logout, isAuthenticated } = useAuth() || {}; 
  const navigate = useNavigate();
  const location = useLocation();

  const lightBlue = "#3ABEF9";
  const darkBlue = "#07477D";

  // Redirect authenticated users to their dashboard (only once)
  useEffect(() => {
    if (isAuthenticated && currentUser && !hasRedirected.current) {
      const dashboardPath = 
        userRole === 'admin' ? '/admin-dashboard' :
        userRole === 'seller' ? '/seller/dashboard' :
        userRole === 'customer' ? '/customer/dashboard' : null;

      // Only redirect if not already on a dashboard page
      if (dashboardPath && !location.pathname.includes('/dashboard') && !location.pathname.includes('admin-dashboard')) {
        hasRedirected.current = true;
        navigate(dashboardPath);
      }
    } else if (!isAuthenticated) {
      hasRedirected.current = false;
    }
  }, [isAuthenticated, userRole, currentUser]);

  // --- Cart Logic (Original Fixed) ---
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Advanced Mathematics", price: 49.99, qty: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmgUO_p-wcofAwijjTMxsw2xtLfG_u7rBk3g&s" },
  ]);

  const updateQty = (id, delta) => {
    setCartItems(items => items.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(i => i.qty > 0));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0) * 1.1; // Including tax
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleNav = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };

  const paths = {
    'Home': '/',
    'Shop': '/products',
    'Categories': '/categories',
    'Services': '/services',
    'Collections': '/collections',
    'About Us': '/about-us',
    'Contact': '/contact',
    'Partners': '/partners'
  };

  const navItems = ['Home', 'Shop', 'Categories', 'Services', 'Collections', 'About Us', 'Contact', 'Partners'];

  return (
    <>
      {/* 1. TOP BAR */}
      <div className="hidden md:flex justify-between items-center px-10 py-2 text-[11px] font-bold tracking-widest text-white uppercase" style={{ backgroundColor: darkBlue }}>
        <div className="flex gap-8 opacity-90">
          <span className="flex items-center gap-2"><MapPin size={14} className="text-[#3ABEF9]" /> 507-Union Trade Center, USA</span>
          <span className="flex items-center gap-2"><Phone size={14} className="text-[#3ABEF9]" /> (+91) 9876-543-210</span>
        </div>
        <div className="flex gap-6 uppercase">
          <span className="cursor-pointer hover:text-[#3ABEF9]">Track Order</span>
          <span className="cursor-pointer hover:text-[#3ABEF9]">Help Center</span>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('/')}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-[#3ABEF9] shadow-sm"> 
                <img src={logo} alt="Logo" className="w-full h-full object-cover" /> 
            </div>
            <h1 className="text-2xl font-black tracking-tighter">
              <span style={{ color: darkBlue }}>SWIFT</span>
              <span style={{ color: lightBlue }}>BAZAAR</span>
            </h1>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-10 font-black text-gray-500 uppercase text-[12px] tracking-widest list-none">
{navItems.map((item) => {
                const path = paths[item];
                const isActive = location.pathname === path;
                return (
                  <li key={item} 
                      onClick={() => handleNav(path)}
                      className={`cursor-pointer transition-colors relative group font-black text-[12px] tracking-widest uppercase ${isActive 
                        ? 'text-[#07477D] scale-[1.05] underline decoration-2 underline-offset-4 decoration-[#3ABEF9]' 
                        : 'text-gray-500 hover:text-[#07477D]'}`}>
                    {item}
                    {!isActive && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3ABEF9] transition-all group-hover:w-full"></span>}
                  </li>
                );
              })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6 text-gray-700">
            <Search className="cursor-pointer hover:text-[#3ABEF9] w-5 h-5" onClick={() => setIsSearchOpen(true)} />
            
            <div className="relative group hidden md:block">
              <User className="cursor-pointer hover:text-[#3ABEF9] w-5 h-5" />
              <div className="absolute right-0 top-full pt-4 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-50 p-3">
                  {isAuthenticated ? (
                    <div className="space-y-1">
                       <p className="px-3 py-2 text-[10px] font-black text-blue-500 uppercase">{userRole} Panel</p>
                       <button onClick={() => {
                         const dashboardPath = userRole === 'admin' ? '/admin-dashboard' : userRole === 'seller' ? '/seller/dashboard' : '/customer/dashboard';
                         handleNav(dashboardPath);
                       }} className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-bold flex items-center gap-3"><LayoutDashboard size={16}/> Dashboard</button>
                       <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 rounded-lg text-sm font-bold flex items-center gap-3"><LogOut size={16}/> Logout</button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                       <button onClick={() => handleNav('/customer/login')} className="w-full py-2.5 bg-[#07477D] text-white rounded-xl font-bold text-[11px] uppercase tracking-wider shadow-md">Customer Login</button>
                       <button onClick={() => handleNav('/seller/login')} className="w-full py-2.5 border-2 border-[#3ABEF9] text-[#3ABEF9] rounded-xl font-bold text-[11px] uppercase tracking-wider">Seller Portal</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative cursor-pointer group" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="group-hover:text-[#3ABEF9] w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#3ABEF9] text-white text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-black ring-2 ring-white">{itemCount}</span>
            </div>
            
            <Menu className="lg:hidden cursor-pointer w-6 h-6" onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>
      </header>

      {/* 3. SEARCH OVERLAY - Fully Functional */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center animate-in fade-in duration-300">
          <button className="absolute top-10 right-10 p-4 hover:rotate-90 transition-transform" onClick={() => setIsSearchOpen(false)}>
            <X size={32} className="text-gray-400" />
          </button>
          <h2 className="text-4xl font-black text-[#07477D] uppercase tracking-tighter mb-10">Search Products</h2>
          <div className="w-full max-w-2xl px-6 relative">
            <input type="text" placeholder="Type to search..." className="w-full text-3xl font-bold border-b-4 border-gray-100 py-4 outline-none focus:border-[#3ABEF9] transition-colors" autoFocus />
            <Search className="absolute right-6 top-8 text-gray-300" size={30} />
          </div>
        </div>
      )}

      {/* 4. CART SIDEBAR - Fixed Stability */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[120] shadow-2xl transition-transform duration-500 ease-out transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="p-8 border-b flex justify-between items-center">
          <h2 className="text-2xl font-black text-[#07477D] uppercase tracking-tight">Your Cart</h2>
          <X className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors" onClick={() => setIsCartOpen(false)} />
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300">
              <ShoppingBag size={80} strokeWidth={1} className="mb-4" />
              <p className="font-bold uppercase tracking-widest text-sm text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <img src={item.image} alt={item.name} className="h-24 w-20 object-cover rounded-2xl shadow-sm group-hover:scale-105 transition-transform" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-black text-gray-800 uppercase leading-tight">{item.name}</h4>
                        <X className="w-4 h-4 text-gray-300 cursor-pointer hover:text-red-500" onClick={() => updateQty(item.id, -item.qty)} />
                      </div>
                      <p className="text-[#3ABEF9] font-black mt-1">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded-xl bg-gray-50 px-2 py-1">
                        <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-[#3ABEF9]"><Minus size={14}/></button>
                        <span className="px-4 text-xs font-black">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-[#3ABEF9]"><Plus size={14}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-8 bg-gray-50/80 border-t">
            <div className="flex justify-between text-lg font-black text-[#07477D] mb-6">
              <span className="uppercase tracking-widest text-xs text-gray-400">Total (Incl. Tax):</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#07477D] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:shadow-[#07477D]/20 transition-all hover:-translate-y-1">Checkout Now</button>
          </div>
        )}
      </div>

      {/* 5. MOBILE MENU */}
      <div className={`fixed inset-0 bg-[#07477D]/60 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)}></div>
      <div className={`fixed left-0 top-0 h-full w-[300px] bg-white z-[120] shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-10">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-xl font-black tracking-tighter"><span style={{ color: darkBlue }}>SWIFT</span><span style={{ color: lightBlue }}>BAZAAR</span></h1>
            <X size={24} className="cursor-pointer text-gray-400" onClick={() => setIsMenuOpen(false)} />
          </div>
          <ul className="space-y-8 list-none p-0">
             {navItems.map(item => {
               const path = paths[item];
               const isActive = location.pathname === path;
               return (
                 <li key={item} className={`font-black text-sm uppercase tracking-[0.2em] cursor-pointer transition-colors ${isActive 
                   ? 'text-[#07477D] border-r-4 border-[#3ABEF9] pr-4' 
                   : 'text-gray-800 hover:text-[#3ABEF9]'}`} onClick={() => handleNav(path)}>
                   {item}
                 </li>
               );
             })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

