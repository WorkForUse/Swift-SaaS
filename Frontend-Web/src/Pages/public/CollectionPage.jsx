import React, { useState } from 'react';
import { 
  ChevronRight, Laptop, Tablet, Watch, Smartphone, Headphones, 
  MousePointer2, Zap, Shield, Truck, Star, ArrowUpRight, 
  Facebook, Instagram, Twitter, Mail, Play, Sparkles, Filter
} from 'lucide-react';
import Footer from '../../components/shared/Footer';

// --- MASSIVE HARD-CODED DATA ---
const mainCollections = [
  {
    id: 1,
    name: 'Workstation Laptops',
    description: 'High-performance machines for creators and engineers.',
    count: '142 Products',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    icon: <Laptop className="text-blue-600" size={24} />,
    color: 'bg-blue-50',
    tags: ['MacBook', 'Dell XPS', 'ThinkPad']
  },
  {
    id: 2,
    name: 'Creative Tablets',
    description: 'Sketch, design, and take notes with precision.',
    count: '94 Products',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    icon: <Tablet className="text-purple-600" size={24} />,
    color: 'bg-purple-50',
    tags: ['iPad Pro', 'Surface Pro', 'Tab S9']
  },
  {
    id: 3,
    name: 'Audio Experience',
    description: 'Crystal clear sound with active noise cancellation.',
    count: '210 Products',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    icon: <Headphones className="text-emerald-600" size={24} />,
    color: 'bg-emerald-50',
    tags: ['Sony', 'Bose', 'AirPods']
  },
  {
    id: 4,
    name: 'Wearable Tech',
    description: 'Monitor your health and stay connected on the go.',
    count: '68 Products',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    icon: <Watch className="text-rose-600" size={24} />,
    color: 'bg-rose-50',
    tags: ['Apple Watch', 'Garmin', 'Samsung Gear']
  },
  {
    id: 5,
    name: 'Smartphones',
    description: 'Latest mobile technology at your fingertips.',
    count: '156 Products',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    icon: <Smartphone className="text-amber-600" size={24} />,
    color: 'bg-amber-50',
    tags: ['iPhone', 'Pixel', 'OnePlus']
  },
  {
    id: 6,
    name: 'Gaming Gear',
    description: 'Mechanical keyboards, high-DPI mice, and more.',
    count: '320 Products',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    icon: <MousePointer2 className="text-indigo-600" size={24} />,
    color: 'bg-indigo-50',
    tags: ['Razer', 'Logitech', 'SteelSeries']
  }
];

const subCategories = [
  "Processors", "Graphics Cards", "SSD Storage", "RAM Modules", 
  "Motherboards", "Cooling Fans", "Power Supplies", "PC Cases",
  "Monitors", "Webcams", "Microphones", "Keyboards", 
  "Gaming Chairs", "Desk Lamps", "VR Headsets", "Adapters"
];

const features = [
  { icon: <Truck />, title: "Global Shipping", desc: "Fast delivery to 100+ countries" },
  { icon: <Shield />, title: "Secure Payments", desc: "100% encrypted transactions" },
  { icon: <Zap />, title: "Fast Support", desc: "24/7 dedicated tech assistance" },
  { icon: <Star />, title: "Quality Check", desc: "Original products guaranteed" }
];

const CollectionPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- HERO SECTION WITH GLASSMORPHISM --- */}
      <section className="relative h-[600px] flex items-center justify-center bg-[#07477D] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[100px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-blue-200 text-sm font-bold mb-6 border border-white/20">
            <Sparkles size={16} /> NEW ARRIVALS 2026
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic">
            Swift<span className="text-blue-400">Bazaar</span> <br /> Collections
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10 font-medium">
            Discover the next generation of tech. We've curated the world's most innovative hardware specifically for your professional needs.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-[#07477D] px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all shadow-2xl">
              Explore Now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Watch Trailer <Play className="inline ml-2" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* --- STATS / FEATURES BAR --- */}
      <div className="bg-white border-b border-slate-100 py-10 shadow-sm relative z-20 -mt-12 mx-6 rounded-3xl grid grid-cols-2 lg:grid-cols-4 gap-8 px-12">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              {f.icon}
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{f.title}</h4>
              <p className="text-slate-500 text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- MAIN GRID SECTION --- */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Featured Series</h2>
            <p className="text-slate-500 font-medium">Browse our most popular hardware categories</p>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {['All', 'Premium', 'Pro', 'Gaming'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mainCollections.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative h-[450px] rounded-[40px] overflow-hidden mb-6 shadow-lg border border-slate-100 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />
                
                {/* Floating Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                  {item.icon}
                  <span className="font-black text-xs uppercase tracking-widest text-slate-800">{item.count}</span>
                </div>

                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <h3 className="text-3xl font-black text-white mb-2 uppercase leading-none">
                    {item.name}
                  </h3>
                  <p className="text-slate-300 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-white/70 border border-white/20 px-2 py-1 rounded-md uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    Browse Store <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BROWSE BY CATEGORY SECTION (EXPANDED) --- */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 uppercase mb-4">Deep Dive Components</h2>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">Find specific parts and accessories for your custom setup.</p>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {subCategories.map((cat, i) => (
              <div 
                key={i}
                className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:scale-110 transition-all">
                  <MousePointer2 className="text-slate-400 group-hover:text-blue-600" size={24} />
                </div>
                <span className="font-bold text-xs uppercase tracking-tighter text-slate-700 text-center">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-[#07477D] rounded-[50px] p-12 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase mb-6 leading-tight">
              Don't Miss <span className="text-blue-400">Exclusive</span> <br /> Tech Drop
            </h2>
            <p className="text-blue-100 mb-10 text-lg opacity-80">
              Join 50k+ tech enthusiasts. Get early access to product launches and secret discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 bg-white/10 p-2 rounded-3xl border border-white/20 backdrop-blur-sm">
              <input 
                type="email" 
                placeholder="Enter your professional email"
                className="bg-transparent px-6 py-4 outline-none text-white placeholder:text-blue-200 flex-grow"
              />
              <button className="bg-white text-[#07477D] px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-400 hover:text-white transition-all">
                Subscribe
              </button>
            </div>
          </div>
          
          <div className="relative z-10 hidden lg:block">
             <div className="bg-white p-8 rounded-[40px] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">SB</div>
                  <div>
                    <p className="font-black text-slate-800">SwiftBazaar Official</p>
                    <p className="text-xs text-slate-500">5 mins ago</p>
                  </div>
                </div>
                <div className="h-40 w-64 bg-slate-100 rounded-2xl mb-4 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-bold text-slate-700">The M3 Max Laptops are finally here! 🚀</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- DETAILED FOOTER --- */}
      <Footer/>
    </div>
  );
};

export default CollectionPage;

// import React from 'react';
// import { ChevronRight, Laptop, Tablet, Watch, Smartphone, Headphones, MousePointer2 } from 'lucide-react';

// const collections = [
//   {
//     id: 1,
//     name: 'Premium Laptops',
//     count: '120+ Products',
//     image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
//     icon: <Laptop className="text-blue-600" size={24} />,
//     color: 'bg-blue-50'
//   },
//   {
//     id: 2,
//     name: 'Smart Tablets',
//     count: '85+ Products',
//     image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop',
//     icon: <Tablet className="text-purple-600" size={24} />,
//     color: 'bg-purple-50'
//   },
//   {
//     id: 3,
//     name: 'Accessories',
//     count: '250+ Products',
//     image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop',
//     icon: <Headphones className="text-emerald-600" size={24} />,
//     color: 'bg-emerald-50'
//   },
//   {
//     id: 4,
//     name: 'Smart Watches',
//     count: '45+ Products',
//     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop',
//     icon: <Watch className="text-rose-600" size={24} />,
//     color: 'bg-rose-50'
//   }
// ];

// const CollectionPage = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header Section */}
//       <div className="bg-slate-50 border-b border-slate-200 py-16">
//         <div className="container mx-auto px-6">
//           <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tight">
//             Our <span className="text-blue-600">Collections</span>
//           </h1>
//           <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
//             Explore our diverse range of high-performance tech and gadgets. From professional workstations to essential accessories.
//           </p>
//         </div>
//       </div>

//       <div className="container mx-auto px-6 py-16">
//         {/* Collection Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {collections.map((item) => (
//             <div 
//               key={item.id} 
//               className="group relative overflow-hidden rounded-3xl bg-slate-100 h-[400px] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
//             >
//               {/* Background Image */}
//               <img 
//                 src={item.image} 
//                 alt={item.name}
//                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
              
//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//               {/* Content */}
//               <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
//                 <div>
//                   <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transform -rotate-12 group-hover:rotate-0 transition-transform`}>
//                     {item.icon}
//                   </div>
//                   <h3 className="text-3xl font-bold text-white mb-1 uppercase tracking-wide">
//                     {item.name}
//                   </h3>
//                   <p className="text-slate-300 font-medium">
//                     {item.count}
//                   </p>
//                 </div>

//                 <button className="bg-white text-black p-4 rounded-full hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Categories Quick Links Section */}
//         <div className="mt-20">
//           <h2 className="text-2xl font-bold text-slate-800 mb-8 border-l-4 border-blue-600 pl-4 uppercase">
//             Browse By Category
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//             {['Laptops', 'Tablets', 'Gaming', 'Audio', 'Cameras', 'Storage'].map((cat) => (
//               <button 
//                 key={cat}
//                 className="py-6 px-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 hover:text-blue-600 font-bold transition-all flex flex-col items-center gap-3 shadow-sm hover:shadow-md"
//               >
//                 <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center">
//                    <MousePointer2 size={18} />
//                 </div>
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CollectionPage;