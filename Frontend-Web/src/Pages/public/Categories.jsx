import React from 'react';
import { BookOpen, Filter, ArrowRight, Search,Zap, Star, Grid, ChevronRight, Book, Microscope, Calculator, Globe, Palette } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
// import { HARDCODED_PRODUCTS } from '../../../services/hardcodedData';
import { HARDCODED_PRODUCTS } from '../../services/hardcodedData';

// Extract unique categories from data
const categoriesData = [
  { name: 'Mathematics', icon: Calculator, color: 'from-blue-500 to-indigo-500', count: 0, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop' },
  { name: 'Physics', icon: Zap, color: 'from-yellow-400 to-orange-500', count: 0, image: 'https://images.unsplash.com/photo-1526042210328-e14fd198e8ee?w=400&fit=crop' },
  { name: 'Chemistry', icon: Microscope, color: 'from-green-400 to-emerald-500', count: 0, image: 'https://images.unsplash.com/photo-1586954603494-76c5b7f27491?w=400&fit=crop' },
  { name: 'Biology', icon: BookOpen, color: 'from-purple-400 to-violet-500', count: 0, image: 'https://images.unsplash.com/photo-1524178232363-933d95a15c23?w=400&fit=crop' },
  { name: 'Literature', icon: Palette, color: 'from-pink-400 to-rose-500', count: 0, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7a?w=400&fit=crop' },
  { name: 'Science', icon: Globe, color: 'from-cyan-400 to-teal-500', count: 0, image: 'https://images.unsplash.com/photo-1558618047-3c8c76fdd9ca?w=400&fit=crop' },
  { name: 'History', icon: ChevronRight, color: 'from-slate-400 to-stone-500', count: 0, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&fit=crop' },
  { name: 'Language', icon: Book, color: 'from-orange-400 to-red-500', count: 0, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&fit=crop' },
];

// Filter products by category and count
const allProducts = [...mockProducts, ...HARDCODED_PRODUCTS];
categoriesData.forEach(cat => {
  cat.count = allProducts.filter(p => p.category === cat.name).length;
  cat.products = allProducts.filter(p => p.category === cat.name).slice(0, 4);
});

const Categories = () => {
  const lightBlue = "#3ABEF9";
  const darkBlue = "#07477D";

  const handleCategoryClick = (category) => {
    window.location.href = `/products?category=${category}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07477D] via-[#3ABEF9]/30 to-[#07477D]/80 py-32 px-6">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text">
            Discover
          </h1>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white/90 mb-8">
            Academic Categories
          </h2>
          <p className="text-xl md:text-2xl text-slate-200 font-bold max-w-4xl mx-auto leading-relaxed">
            Browse premium textbooks across Mathematics, Physics, Chemistry, Biology, Literature and more from trusted sellers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <button 
              onClick={() => handleCategoryClick('Mathematics')}
              className="group bg-white/20 backdrop-blur-xl text-white px-10 py-6 rounded-3xl font-black uppercase tracking-widest text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 border border-white/30 hover:bg-white/30"
            >
              Start Shopping <ArrowRight className="inline ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 text-white/80 font-bold uppercase tracking-widest text-sm">
              <Filter className="w-5 h-5" />
              <span>Filter by Subject</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.1),transparent)] animate-pulse" />
      </section>

      {/* Categories Grid */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#07477D] mb-6">
              Our Categories
            </h3>
            <p className="text-2xl font-bold text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore textbooks organized by academic discipline with thousands of titles available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoriesData.map((category, index) => {
              const Icon = category.icon;
              return (
                <div 
                  key={category.name}
                  className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-4 hover:scale-105 transition-all duration-500 border border-white/50 overflow-hidden cursor-pointer"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className={`h-48 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 opacity-40 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl group-hover:bg-white/30 transition-all">
                          <Icon className="w-7 h-7 text-white drop-shadow-lg" />
                        </div>
                        <span className="text-2xl font-black text-white drop-shadow-2xl">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-10">
                    <h4 className="text-3xl font-black uppercase tracking-wider text-[#07477D] mb-4 group-hover:text-[#3ABEF9] transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-slate-600 font-bold mb-6">
                      {category.count} textbooks available
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#3ABEF9]">Shop Now</span>
                      <ArrowRight className="w-6 h-6 text-[#3ABEF9] group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products per Category */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-24">
            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-[#07477D] mb-6">
              Featured Textbooks
            </h3>
            <p className="text-2xl font-bold text-slate-600 max-w-3xl mx-auto">
              Top rated books in each category
            </p>
          </div>

          <div className="space-y-24">
            {categoriesData.map((category) => category.products?.length > 0 && (
              <div key={category.name} className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6 mb-12">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.color}`}>
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-4xl font-black uppercase tracking-tighter text-[#07477D]">
                      {category.name}
                    </h4>
                    <p className="text-slate-600 font-bold text-xl">{category.products.length} Featured</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {category.products.slice(0, 6).map((product) => (
                    <div key={product.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-slate-100 cursor-pointer" onClick={() => handleCategoryClick(product.category)}>
                      <div className="h-64 relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                        <img 
                          src={product.image || 'https://via.placeholder.com/400x500?text=' + product.name} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-700 shadow-lg">
                          {product.category}
                        </span>
                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                            <span className="text-white font-black text-2xl uppercase tracking-widest rotate-6">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      <div className="p-8">
                        <h5 className="font-bold text-slate-800 text-xl mb-3 line-clamp-2 leading-tight">{product.name}</h5>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex gap-0.5 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 4.5) ? 'fill-yellow-400' : 'fill-transparent'}`} />
                            ))}
                          </div>
                          <span className="text-slate-500 font-bold text-sm">({product.reviews || 0})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black text-[#07477D]">${product.price?.toFixed(2) || '59.99'}</span>
                          <ChevronRight className="w-7 h-7 text-[#3ABEF9] group-hover:translate-x-2 transition-transform" />
                        </div>
                        <p className="text-slate-600 font-medium mt-3 line-clamp-2">{product.sellerName || 'Books Plus'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-[#07477D] to-[#3ABEF9]">
        <div className="container mx-auto text-center max-w-4xl">
          <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-8">
            Ready to Start Learning?
          </h3>
          <p className="text-2xl font-bold text-white/90 mb-12 leading-relaxed">
            Browse our complete collection of 10,000+ textbooks across all academic categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => window.location.href = '/products'}
              className="bg-white text-[#07477D] px-12 py-8 rounded-3xl font-black uppercase tracking-widest text-2xl shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
            >
              Browse All Products
            </button>
            <button 
              onClick={() => document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/80 font-black uppercase tracking-widest text-xl hover:text-white transition-colors flex items-center gap-3"
            >
              ↑ Back to Categories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;

