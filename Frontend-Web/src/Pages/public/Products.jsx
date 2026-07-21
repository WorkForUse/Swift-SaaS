import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Grid, List, ChevronLeft, ChevronRight, 
  Tag, DollarSign, Star, Heart, ShoppingCart, Eye, 
  FilterX, Loader2 
} from 'lucide-react';
import { mockProducts } from '../../data/mockData.js';

// --- Constants & Variants ---
const PRIMARY_COLOR = '#3ABEF9';
const SECONDARY_COLOR = '#07477D';

const priceRanges = [
  { label: 'All Prices', min: 0, max: 1000 },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: 1000 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 }
};

// --- Sub-components for Cleanliness ---

const FilterSection = ({ title, icon: Icon, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
      <Icon size={18} style={{ color: PRIMARY_COLOR }} /> {title}
    </h3>
    {children}
  </div>
);

const ProductCard = ({ product, viewMode, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const isList = viewMode === 'list';

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`group bg-white border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden ${
        isList ? 'flex flex-row h-52' : 'flex flex-col'
      }`}
    >
      <div className={`relative bg-slate-50 overflow-hidden ${isList ? 'w-1/3' : 'h-56'}`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button 
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm transition-all active:scale-90"
        >
          <Heart size={18} className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400"} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-blue-50" style={{ color: SECONDARY_COLOR }}>
            {product.category}
          </span>
          <div className="flex items-center text-amber-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold ml-1 text-slate-600">4.9</span>
          </div>
        </div>
        
        <h3 className="font-bold text-slate-800 text-lg mb-1 line-clamp-1 group-hover:text-[#3ABEF9] transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">
          Premium academic resource designed for professional researchers and students.
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-black text-slate-900">${product.price}</span>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-blue-500 transition-colors">
              <Eye size={18} />
            </button>
            <button 
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-100 active:scale-95"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              <ShoppingCart size={16} /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedSort, setSelectedSort] = useState('Name A-Z');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = mockProducts.filter(p => !p.deleted && p.status !== 'out_of_stock');

    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    
    const range = priceRanges.find(r => r.label === selectedPriceRange);
    if (range) result = result.filter(p => p.price >= range.min && p.price <= range.max);

    return result.sort((a, b) => {
      if (selectedSort === 'Price Low-High') return a.price - b.price;
      if (selectedSort === 'Price High-Low') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [selectedCategory, selectedPriceRange, selectedSort, searchQuery]);

  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Loader2 size={40} color={PRIMARY_COLOR} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFEFF]">
      {/* Hero Header */}
      <div className="bg-[#0F172A] relative overflow-hidden py-20 px-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -mr-20 -mt-20" />
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Academic <span style={{ color: PRIMARY_COLOR }}>Resources</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto font-medium"
          >
            Access our curated library of high-level scientific and mathematical texts designed for excellence.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <FilterSection title="Search" icon={Search}>
              <input 
                type="text" 
                placeholder="Search by title..."
                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FilterSection>

            <FilterSection title="Categories" icon={Tag}>
              <div className="flex flex-wrap gap-2">
                {['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => {setSelectedCategory(cat); setCurrentPage(1);}}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat 
                        ? 'text-white shadow-md' 
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                    style={selectedCategory === cat ? { backgroundColor: SECONDARY_COLOR } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Budget" icon={DollarSign}>
              <div className="space-y-3">
                {priceRanges.map(range => (
                  <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price" 
                      className="w-4 h-4 border-slate-300 accent-[#3ABEF9]"
                      checked={selectedPriceRange === range.label}
                      onChange={() => setSelectedPriceRange(range.label)}
                    />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-blue-500 transition-colors">{range.label}</span>
                  </label>
                ))}
              </div>
            </FilterSection>
          </aside>

          {/* Main List Area */}
          <main className="lg:w-3/4">
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <h2 className="text-xl font-bold text-slate-800">
                {filteredProducts.length} <span className="font-normal text-slate-400 text-base">Results</span>
              </h2>
              
              <div className="flex items-center gap-4">
                <select 
                  className="bg-white border border-slate-100 text-sm font-semibold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-50"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  <option>Name A-Z</option>
                  <option>Price Low-High</option>
                  <option>Price High-Low</option>
                </select>

                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-500' : 'text-slate-400'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-500' : 'text-slate-400'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            <motion.div 
              layout
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' : 'space-y-6'}
            >
              <AnimatePresence mode='popLayout'>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode}
                      onAddToCart={() => console.log('Added')} 
                      onToggleWishlist={(p) => setWishlist(prev => [...prev, p.id])}
                    />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="col-span-full py-20 text-center text-slate-400"
                  >
                    <FilterX size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">No products match your criteria.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-3">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-200 transition-all disabled:opacity-20"
                >
                  <ChevronLeft size={20}/>
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 rounded-xl font-bold transition-all ${
                      currentPage === i + 1 
                        ? 'text-white shadow-xl scale-110' 
                        : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
                    }`}
                    style={currentPage === i + 1 ? { backgroundColor: PRIMARY_COLOR } : {}}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                   disabled={currentPage === totalPages}
                   onClick={() => setCurrentPage(prev => prev + 1)}
                   className="p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-200 transition-all disabled:opacity-20"
                >
                  <ChevronRight size={20}/>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;