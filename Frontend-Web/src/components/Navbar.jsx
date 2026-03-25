// import React, { useState } from "react";
// import { MapPin, Phone, Search, User, ShoppingBag, Menu, X, Plus, Minus } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../App";
// import logo from '../assets/swift-logo.PNG';

// const Navbar = () => {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Auth context access with safety check
//   const { currentUser, userRole, logout, isAuthenticated } = useAuth() || {}; 
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleNav = (path) => {
//     navigate(path);
//     setIsMenuOpen(false);
//     setIsCartOpen(false);
//   };

//   // Theme Colors
//   const lightBlue = "#3ABEF9";
//   const darkBlue = "#07477D";

//   // Cart state
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "Advanced Mathematics Textbook",
//       price: 49.99,
//       qty: 2,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmgUO_p-wcofAwijjTMxsw2xtLfG_u7rBk3g&s",
//     },
//     {
//       id: 2,
//       name: "Physics Fundamentals",
//       price: 59.99,
//       qty: 1,
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTccW0Cnh5VB6KO0nTOuadhxdsf24r1GwX3mA&s",
//     }
//   ]);

//   const updateQty = (id, delta) => {
//     setCartItems((items) =>
//       items.map((item) =>
//         item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
//       ).filter((item) => item.qty > 0)
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems((items) => items.filter((item) => item.id !== id));
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const tax = subtotal * 0.1;
//   const total = subtotal + tax;
//   const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
//   const isEmpty = cartItems.length === 0;

//   return (
//     <>
//       {/* 1. TOP BAR */}
//       <div className="text-white py-2 px-10 hidden md:flex justify-between items-center text-[13px]" style={{ backgroundColor: lightBlue }}>
//         <div className="flex gap-6 justify-center items-center">
//           <span className="flex items-center gap-2">
//             <MapPin size={16} /> 507-Union Trade Center, USA
//           </span>
//           <span className="flex items-center gap-2">
//             <Phone size={14} /> (+91) 9876-543-210
//           </span>
//         </div>
//         <div className="flex gap-5 uppercase font-medium">
//           <span className="cursor-pointer hover:opacity-80">Track Order</span>
//           <span className="cursor-pointer hover:opacity-80">Help Center</span>
//         </div>
//       </div>

//       {/* 2. MAIN NAVBAR */}
//       <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
//           {/* Logo Section */}
//           <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('/')}>
//             <div className="w-9 h-9 rounded flex items-center justify-center overflow-hidden" style={{ backgroundColor: lightBlue }}> 
//                 <img src={logo} alt="Logo" className="w-full h-full object-cover" /> 
//             </div>
//             <h1 className="text-2xl font-black tracking-tighter">
//               <span style={{ color: darkBlue }}>SWIFT</span>
//               <span style={{ color: lightBlue }}>BAZAAR</span>
//             </h1>
//           </div>

//           {/* Desktop Links */}
//           <nav className="hidden lg:flex items-center gap-8 font-bold text-gray-800 uppercase text-[13px] tracking-widest list-none">
//             <li className="cursor-pointer text-[#3ABEF9]" onClick={() => handleNav('/')}>Home</li>
//             <li className="cursor-pointer hover:text-[#3ABEF9]" onClick={() => handleNav('/products')}>Shop</li>
//             <li className="cursor-pointer hover:text-[#3ABEF9]" onClick={() => handleNav('/categories')}>Collections</li>
//             <li className="cursor-pointer hover:text-[#3ABEF9]" onClick={() => handleNav('/about')}>About Us</li>
//             <li className="cursor-pointer hover:text-[#3ABEF9]" onClick={() => handleNav('/contact')}>Contact</li>
//           </nav>

//           {/* Icons */}
//           <div className="flex items-center gap-5 text-gray-700">
//             <Search className="cursor-pointer hover:text-[#3ABEF9] w-6 h-6" onClick={() => setIsSearchOpen(true)} />
            
//             {/* User Dropdown with Logic */}
//             <div className="hidden md:block relative group">
//               <User className="cursor-pointer hover:text-[#3ABEF9] w-6 h-6" />
//               {isAuthenticated && currentUser ? (
//                 <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                   <div className="px-4 py-3 border-b border-gray-100">
//                     <span className="font-bold text-sm block">{currentUser.firstName || currentUser.username}</span>
//                     <span className="text-xs text-gray-500">{currentUser.email}</span>
//                     <span className="font-bold text-xs block mt-1">Role: <span className="capitalize text-blue-600">{userRole}</span></span>
//                   </div>
//                   {userRole === 'admin' ? (
//                     <>
//                       <button onClick={() => handleNav('/admin-dashboard')} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium">📊 Dashboard</button>
//                       <button onClick={() => handleNav('/admin-dashboard/products')} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium">📦 Products</button>
//                       <button onClick={() => handleNav('/admin-dashboard/users')} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium">👥 Users</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => handleNav('/user/dashboard')} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium">👤 My Account</button>
//                       <button onClick={() => handleNav('/user/dashboard')} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium">📦 Orders</button>
//                       <button onClick={() => handleNav('/user/dashboard')} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium">❤️ Wishlist</button>
//                     </>
//                   )}
//                   <div className="border-t border-gray-100">
//                     <button onClick={() => { logout(); handleNav('/'); }} className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm font-medium text-red-600">🚪 Logout</button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-3 z-50 space-y-2">
//                    <p className="text-xs font-bold text-gray-600 px-2">CUSTOMER</p>
//                    <button onClick={() => handleNav('/customer/login')} className="w-full text-center py-2 bg-blue-500 text-white rounded font-bold text-xs uppercase hover:bg-blue-600">Customer Login</button>
//                    <button onClick={() => handleNav('/customer/signup')} className="w-full text-center py-2 bg-blue-100 text-blue-600 rounded font-bold text-xs uppercase hover:bg-blue-200">Customer Sign Up</button>
                   
//                    <p className="text-xs font-bold text-gray-600 px-2 mt-3">SELLER</p>
//                    <button onClick={() => handleNav('/seller/login')} className="w-full text-center py-2 bg-green-500 text-white rounded font-bold text-xs uppercase hover:bg-green-600">Seller Login</button>
//                    <button onClick={() => handleNav('/seller/signup')} className="w-full text-center py-2 bg-green-100 text-green-600 rounded font-bold text-xs uppercase hover:bg-green-200">Seller Sign Up</button>
                   
//                    <p className="text-xs font-bold text-gray-600 px-2 mt-3">ADMIN</p>
//                    <button onClick={() => handleNav('/admin/login')} className="w-full text-center py-2 bg-purple-600 text-white rounded font-bold text-xs uppercase hover:bg-purple-700">Admin Login</button>
//                    <button onClick={() => handleNav('/admin/signup')} className="w-full text-center py-2 bg-purple-100 text-purple-600 rounded font-bold text-xs uppercase hover:bg-purple-200">Admin Sign Up</button>
//                 </div>
//               )}
//             </div>

//             <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
//               <ShoppingBag className="hover:text-[#3ABEF9] w-6 h-6" />
//               <span className="absolute -top-2 -right-2 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold" style={{ backgroundColor: lightBlue }}>{itemCount}</span>
//             </div>
            
//             <div className="lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(true)}>
//               <Menu className="w-6 h-6" />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* 3. MOBILE SIDE NAV */}
//       <div className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)}></div>
//       <div className={`fixed left-0 top-0 h-full w-3/4 max-w-[300px] bg-white z-[110] shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-10">
//             <h1 className="text-xl font-black tracking-tighter">
//               <span style={{ color: darkBlue }}>SWIFT</span>
//               <span style={{ color: lightBlue }}>BAZAAR</span>
//             </h1>
//             <X className="cursor-pointer w-6 h-6" onClick={() => setIsMenuOpen(false)} />
//           </div>
//           <ul className="flex flex-col space-y-6 font-bold uppercase text-[14px] tracking-[0.2em] text-gray-800 list-none">
//             <li className="cursor-pointer text-[#3ABEF9]" onClick={() => handleNav('/')}>Home</li>
//             <li className="cursor-pointer" onClick={() => handleNav('/products')}>Shop</li>
//             <li className="cursor-pointer" onClick={() => handleNav('/about')}>About Us</li>
//             <li className="cursor-pointer" onClick={() => handleNav('/contact')}>Contact</li>
            
//             {currentUser && isAuthenticated && (
//               <div className="pt-6 border-t border-gray-200">
//                 <p className="text-[10px] mb-4 text-gray-400">ACCOUNT AREA</p>
//                 <li className="py-2 text-blue-600 cursor-pointer font-bold" onClick={() => handleNav(userRole === 'admin' ? '/admin-dashboard' : userRole === 'seller' ? '/seller/dashboard' : '/user/dashboard')}>
//                   {userRole === 'admin' ? "📊 Admin Panel" : userRole === 'seller' ? "🏪 Seller Panel" : "👤 My Dashboard"}
//                 </li>
//                 <li className="py-2 text-red-600 cursor-pointer" onClick={() => { logout(); handleNav('/'); }}>
//                   🚪 Logout
//                 </li>
//               </div>
//             )}
            
//             {!isAuthenticated && (
//               <div className="pt-6 border-t border-gray-200">
//                 <p className="text-[10px] mb-4 text-gray-400">LOGIN OPTIONS</p>
//                 <li className="py-2 text-blue-600 cursor-pointer font-bold" onClick={() => handleNav('/customer/login')}>👤 Customer Login</li>
//                 <li className="py-2 text-blue-500 cursor-pointer text-sm" onClick={() => handleNav('/customer/signup')}>Create Customer Account</li>
//                 <li className="py-2 text-green-600 cursor-pointer font-bold mt-2" onClick={() => handleNav('/seller/login')}>🏪 Seller Login</li>
//                 <li className="py-2 text-green-500 cursor-pointer text-sm" onClick={() => handleNav('/seller/signup')}>Create Seller Account</li>
//                 <li className="py-2 text-purple-600 cursor-pointer font-bold mt-2" onClick={() => handleNav('/admin/login')}>🛡️ Admin Login</li>
//               </div>
//             )}
//           </ul>
//         </div>
//       </div>

//       {/* 4. CART SIDEBAR */}
//       <div className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsCartOpen(false)}></div>
//       <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl transition-transform duration-500 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
//         <div className="p-6 border-b flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
//           <X className="cursor-pointer text-gray-500 w-6 h-6" onClick={() => setIsCartOpen(false)} />
//         </div>

//         <div className="flex-1 overflow-y-auto p-6">
//           {isEmpty ? (
//             <div className="h-full flex flex-col items-center justify-center text-center">
//               <ShoppingBag className="w-20 h-20 text-gray-200 mb-4" />
//               <h3 className="text-xl font-bold text-gray-800">Your cart is empty</h3>
//               <div className="flex flex-col gap-3 w-full mt-8">
//                 <button onClick={() => { setIsCartOpen(false); handleNav('/customer/login'); }} style={{ backgroundColor: lightBlue }} className="text-white py-3 rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg">Login to your account</button>
//                 <button onClick={() => setIsCartOpen(false)} className="text-[#3ABEF9] font-bold text-sm mt-4">Continue Shopping</button>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
//                   <img src={item.image} alt={item.name} className="h-24 w-20 object-cover rounded-xl border" />
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div className="flex justify-between">
//                       <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{item.name}</h4>
//                       <X className="w-4 h-4 text-gray-400 cursor-pointer" onClick={() => removeItem(item.id)} />
//                     </div>
//                     <div className="flex justify-between items-center mt-2">
//                       <div className="flex items-center border rounded-lg overflow-hidden">
//                         <button onClick={() => updateQty(item.id, -1)} className="p-1 px-2 hover:bg-gray-50"><Minus size={12}/></button>
//                         <span className="px-3 text-xs font-bold">{item.qty}</span>
//                         <button onClick={() => updateQty(item.id, 1)} className="p-1 px-2 hover:bg-gray-50"><Plus size={12}/></button>
//                       </div>
//                       <p className="font-bold text-gray-900 text-sm">${(item.price * item.qty).toFixed(2)}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {!isEmpty && (
//           <div className="p-6 bg-gray-50 border-t">
//             <div className="flex justify-between text-lg font-black text-gray-900 mb-4">
//               <span>Total:</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//             <button style={{ backgroundColor: darkBlue }} className="w-full text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl">Checkout</button>
//           </div>
//         )}
//       </div>

//       {/* 5. SEARCH OVERLAY */}
//       {isSearchOpen && (
//         <div className="fixed inset-0 z-[120] bg-white flex flex-col animate-fadeIn">
//           <div className="flex justify-end p-10">
//             <X className="w-8 h-8 cursor-pointer text-gray-400" onClick={() => setIsSearchOpen(false)} />
//           </div>
//           <div className="flex flex-col items-center justify-center px-6">
//             <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter">Search</h2>
//             <div className="w-full max-w-3xl relative border-b-2">
//               <input type="text" placeholder="Search textbooks..." className="w-full py-4 text-xl outline-none" autoFocus />
//               <Search className="absolute right-0 top-4 w-6 h-6 text-gray-400" />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { MapPin, Phone, Search, User, ShoppingBag, Menu, X, Plus, Minus, LayoutDashboard, LogOut, Package } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../App";
import logo from '../assets/swift-logo.PNG';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { currentUser, userRole, logout, isAuthenticated } = useAuth() || {}; 
  const navigate = useNavigate();
  const location = useLocation();

  const lightBlue = "#3ABEF9";
  const darkBlue = "#07477D";

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
            {['Home', 'Shop', 'Collections', 'About Us', 'Contact'].map((item) => (
              <li key={item} 
                  onClick={() => handleNav(item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`)}
                  className="cursor-pointer hover:text-[#07477D] transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3ABEF9] transition-all group-hover:w-full"></span>
              </li>
            ))}
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
                       <button onClick={() => handleNav('/admin-dashboard')} className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-bold flex items-center gap-3"><LayoutDashboard size={16}/> Dashboard</button>
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
             {['Home', 'Shop', 'Collections', 'About Us', 'Contact'].map(item => (
               <li key={item} className="font-black text-sm uppercase tracking-[0.2em] text-gray-800 hover:text-[#3ABEF9] cursor-pointer" onClick={() => handleNav(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}>{item}</li>
             ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;