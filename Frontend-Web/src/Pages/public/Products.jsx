import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronLeft, ChevronRight, BookOpen, Tag, DollarSign, Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { mockProducts } from '../../data/mockData.js';

const categories = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: 1000 },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: 1000 },
];
const sortOptions = ['Name A-Z', 'Name Z-A', 'Price Low-High', 'Price High-Low'];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedSort, setSelectedSort] = useState('Name A-Z');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  // --- Filter Logic ---
  const filteredProducts = useMemo(() => {
    let result = mockProducts.filter(p => !p.deleted && p.status !== 'out_of_stock');

    // Search Filter
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory || p.name.includes(selectedCategory));
    }

    // Price Filter
    const range = priceRanges.find(r => r.label === selectedPriceRange);
    if (range) {
      result = result.filter(p => p.price >= range.min && p.price <= range.max);
    }

    // Sort Logic
    return result.sort((a, b) => {
      if (selectedSort === 'Name A-Z') return a.name.localeCompare(b.name);
      if (selectedSort === 'Name Z-A') return b.name.localeCompare(a.name);
      if (selectedSort === 'Price Low-High') return a.price - b.price;
      if (selectedSort === 'Price High-Low') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, selectedPriceRange, selectedSort, searchQuery]);

  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header / Hero */}
      <div className="bg-[#0F172A] py-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Academic Bookstore</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Browse our collection of specialized educational resources and textbooks.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDEBAR - PROFESSIONAL FILTERS */}
          <aside className="lg:w-1/4 space-y-8">
            {/* Search Box */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Search size={18}/> Search</h3>
              <input 
                type="text" 
                placeholder="Search books..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Tag size={18}/> Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {setSelectedCategory(cat); setCurrentPage(1);}}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><DollarSign size={18}/> Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price" 
                      className="w-4 h-4 text-blue-600"
                      checked={selectedPriceRange === range.label}
                      onChange={() => setSelectedPriceRange(range.label)}
                    />
                    <span className="text-sm text-slate-600 group-hover:text-blue-600">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT Area */}
          <main className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-slate-500 font-medium">{filteredProducts.length} Books found</p>
              
              <div className="flex items-center gap-4">
                <select 
                  className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>

                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products List/Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {paginatedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`group bg-white border border-slate-200 transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden ${
                    viewMode === 'list' ? 'flex flex-row h-64' : 'flex flex-col'
                  }`}
                >
                  {/* Image Part */}
                  <div className={`relative bg-slate-100 overflow-hidden ${viewMode === 'list' ? 'w-1/3' : 'h-64'}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Details Part */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {product.category || 'Academic'}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-bold ml-1 text-slate-600">4.8</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-slate-500 text-xs mb-4 line-clamp-2">Professional resource for advanced students and faculty members.</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-black text-slate-900">${product.price}</span>
                      <div className="flex gap-2">
                        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95">
                          <ShoppingCart size={16} /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Improved Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-white hover:shadow transition-all disabled:opacity-30"
                >
                  <ChevronLeft size={20}/>
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-white text-slate-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                   disabled={currentPage === totalPages}
                   onClick={() => setCurrentPage(prev => prev + 1)}
                   className="p-2 rounded-lg border border-slate-200 hover:bg-white hover:shadow transition-all disabled:opacity-30"
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