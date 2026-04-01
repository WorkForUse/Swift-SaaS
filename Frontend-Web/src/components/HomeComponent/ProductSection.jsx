import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ProductSection = () => {

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

    // Hardcoded fallback products
    const FALLBACK_PRODUCTS = [
      {
        _id: 'prod-001',
        name: 'Physics Textbook - Complete Guide',
        price: 499,
        category: 'Science',
        description: 'Comprehensive physics textbook covering mechanics, thermodynamics, and electromagnetism',
        image: null,
        stock: 45,
        rating: 4.8,
        seller: 'Books Plus'
      },
      {
        _id: 'prod-002',
        name: 'Chemistry Advanced Level',
        price: 599,
        category: 'Science',
        description: 'Advanced chemistry with organic and inorganic topics for competitive exams',
        image: null,
        stock: 32,
        rating: 4.6,
        seller: 'Chemistry Experts'
      },
      {
        _id: 'prod-003',
        name: 'Mathematics Problem Solver',
        price: 449,
        category: 'Mathematics',
        description: 'Detailed solutions for all mathematics problems with step-by-step explanations',
        image: null,
        stock: 89,
        rating: 4.5,
        seller: 'Math Masters'
      },
      {
        _id: 'prod-004',
        name: 'English Literature Collection',
        price: 379,
        category: 'Language',
        description: 'Classic and contemporary English literature with analysis and notes',
        image: null,
        stock: 67,
        rating: 4.7,
        seller: 'Learning Hub'
      },
      {
        _id: 'prod-005',
        name: 'History & Culture Encyclopedia',
        price: 529,
        category: 'History',
        description: 'Detailed history of civilizations with cultural insights and timelines',
        image: null,
        stock: 23,
        rating: 4.9,
        seller: 'History Store'
      },
      {
        _id: 'prod-006',
        name: 'Biology - Life Sciences',
        price: 459,
        category: 'Science',
        description: 'Complete biology textbook covering cells, genetics, and evolution',
        image: null,
        stock: 41,
        rating: 4.4,
        seller: 'Science Depot'
      }
    ];

  const fetchData = async () => {
    try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/api/products/all`, { timeout: 5000 });
        if (response.data && response.data.length > 0) {
          setData(response.data);
        } else {
          setData(FALLBACK_PRODUCTS);
        }
    } catch (err) {
        console.log('API Error - Using fallback products:', err.message);
        setData(FALLBACK_PRODUCTS);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);
    
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-lg">Loading products...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-xl mb-4">No products available</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {data.map((product) => (
        <div key={product._id} className="max-w-sm mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          {/* Image Section */}
          <div className="relative h-64 overflow-hidden">
            <img 
              src={product.image ? `${API_URL}/${product.image}` : 'https://via.placeholder.com/400x300?text=No+Image'} 
              alt={product.name} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            {product.category && (
              <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-700">
                {product.category}
              </span>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800 truncate">{product.name}</h2>
              <span className="text-xl font-semibold text-indigo-600">${product.price}</span>
            </div>
            
            <p className="text-gray-500 text-sm mb-6 line-clamp-3">
              {product.description || 'No description available.'}
            </p>

            {/* Buttons Stack */}
            <div className="space-y-3">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200">
                Add to Cart
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex justify-center items-center border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">
                  Read More
                </button>
                <button className="flex justify-center items-center border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductSection
