import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, Star, AlertCircle, Check, Eye, Filter } from 'lucide-react';
import apiService from '../../services/apiService';

const CustomerProductBrowsing = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dataSource, setDataSource] = useState('database');
  const [viewMode, setViewMode] = useState('browse'); // 'browse', 'wishlist', 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Books', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature'];

  // Load products on mount
  useEffect(() => {
    loadProducts();
    // Load wishlist and cart from localStorage
    setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'));
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAllProducts();
      setProducts(response.products || []);
      setDataSource(response.source);
      setSuccessMessage(`Loaded ${response.products?.length || 0} products from ${response.source}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to load products');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadProducts();
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.searchProducts(searchTerm);
      setProducts(response.products || []);
      setDataSource(response.source);
      setSuccessMessage(`Found ${response.products?.length || 0} products`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Search failed');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      loadProducts();
    } else {
      setLoading(true);
      try {
        const response = await apiService.getProductsByCategory(category);
        setProducts(response.products || []);
        setDataSource(response.source);
      } catch (error) {
        setErrorMessage('Failed to filter products');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddToWishlist = (product) => {
    const isWishlisted = wishlist.find(p => p.id === product.id);
    if (isWishlisted) {
      setWishlist(wishlist.filter(p => p.id !== product.id));
      setSuccessMessage('Removed from wishlist');
    } else {
      setWishlist([...wishlist, product]);
      setSuccessMessage('Added to wishlist');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleAddToCart = (product) => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setSuccessMessage('Added to cart');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    localStorage.setItem('cart', JSON.stringify(cart));
    setSuccessMessage('Removed from cart');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleUpdateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const displayProducts = selectedCategory === 'All' 
    ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products.filter(p => 
        p.category === selectedCategory && 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Product Marketplace</h1>
          <p className="text-blue-100">Discover amazing textbooks and educational materials</p>
          <p className="text-blue-100 text-sm mt-2">Data Source: <strong>{dataSource}</strong></p>
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="max-w-6xl mx-auto mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="max-w-6xl mx-auto mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {errorMessage}
        </div>
      )}

      <div className="max-w-6xl mx-auto p-8">
        {/* View Mode Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setViewMode('browse')}
            className={`pb-3 px-4 font-medium transition ${
              viewMode === 'browse'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Browse Products
          </button>
          <button
            onClick={() => setViewMode('wishlist')}
            className={`pb-3 px-4 font-medium transition flex items-center gap-2 ${
              viewMode === 'wishlist'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setViewMode('cart')}
            className={`pb-3 px-4 font-medium transition flex items-center gap-2 ${
              viewMode === 'cart'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Cart ({cart.length})
          </button>
        </div>

        {/* Browse Mode */}
        {viewMode === 'browse' && (
          <div>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="flex gap-4 mb-6 flex-wrap items-center">
                <div className="flex-1 min-w-64 relative">
                  <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
                <button
                  onClick={loadProducts}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-gray-600 mt-2" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full transition ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            {displayProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden group">
                      <img
                        src={product.image || 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(product.name)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className={`absolute top-3 right-3 p-2 rounded-full transition ${
                          wishlist.find(p => p.id === product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? 'fill-current' : 'fill-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.reviews || 0})</span>
                      </div>

                      {/* Price and Stock */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-800">
                            ${parseFloat(product.price).toFixed(2)}
                          </span>
                          <span className={`text-sm font-semibold ${
                            product.stock > 10 ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Products count */}
            <div className="mt-6 text-sm text-gray-600">
              Showing {displayProducts.length} of {products.length} products
            </div>
          </div>
        )}

        {/* Wishlist Mode */}
        {viewMode === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cart Mode */}
        {viewMode === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setViewMode('browse')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow">
                  {cart.map(item => (
                    <div key={item.id} className="p-4 border-b hover:bg-gray-50 transition">
                      <div className="flex gap-4">
                        <img
                          src={item.image || 'https://via.placeholder.com/80x80'}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.category}</p>
                          <p className="text-2xl font-bold text-gray-800 mt-2">
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6 h-fit">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax:</span>
                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t pt-4 flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedProduct.image || 'https://via.placeholder.com/400x500'}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <div className="mb-4">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                  {selectedProduct.category}
                </span>
              </div>

              <p className="text-gray-700 mb-4 text-lg">{selectedProduct.description}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(selectedProduct.rating || 0) ? 'fill-current' : 'fill-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  ${parseFloat(selectedProduct.price).toFixed(2)}
                </div>
                <p className={`text-sm font-semibold ${
                  selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of stock'}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(selectedProduct)}
                  className={`px-6 py-3 rounded-lg transition font-semibold ${
                    wishlist.find(p => p.id === selectedProduct.id)
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="w-5 h-5 fill-current inline mr-2" />
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProductBrowsing;
