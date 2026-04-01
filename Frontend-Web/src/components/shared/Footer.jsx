import React from 'react'
import { 
  ChevronRight, Laptop, Tablet, Watch, Smartphone, Headphones, 
  MousePointer2, Zap, Shield, Truck, Star, ArrowUpRight, 
  Facebook, Instagram, Twitter, Mail, Play, Sparkles, Filter
} from 'lucide-react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-slate-900 pt-20 pb-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h3 className="text-2xl font-black text-white mb-8 uppercase italic tracking-tighter">
              Swift<span className="text-blue-500">Bazaar</span>
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Leading the e-commerce revolution with premium tech products since 2024. Your trusted partner in digital transformation.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white hover:bg-blue-600 transition-all cursor-pointer"><Facebook size={20}/></div>
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white hover:bg-blue-600 transition-all cursor-pointer"><Instagram size={20}/></div>
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white hover:bg-blue-600 transition-all cursor-pointer"><Twitter size={20}/></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-white uppercase mb-8 tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-all" onClick={() => window.location.href = '/about-us'}>About Our Store</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all">Latest Tech Blogs</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all">Flash Sale Event</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all">Corporate Deals</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase mb-8 tracking-widest text-sm">Customer Care</h4>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li className="hover:text-blue-500 cursor-pointer transition-all">Track Order Status</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all">Return & Refunds</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all">Warranty Claims</li>
              <li className="hover:text-blue-500 cursor-pointer transition-all">Service Centers</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase mb-8 tracking-widest text-sm">Store Location</h4>
            <p className="text-slate-400 text-sm font-bold leading-loose mb-6">
              507-Union Trade Center, USA <br />
              Business District, NY 10001
            </p>
            <div className="flex items-center gap-3 text-blue-500 font-black">
              <Mail size={18} />
              <span>support@swiftbazaar.com</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © 2026 SWIFTBAZAAR. All Rights Reserved. Designed by Gemini.
          </p>
          <div className="flex gap-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
