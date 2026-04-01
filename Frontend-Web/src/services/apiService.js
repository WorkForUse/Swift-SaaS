/**
 * API Service Layer with Hardcoded Fallback
 * Handles API calls to backend with fallback to hardcoded data
 */

import { HARDCODED_USERS, HARDCODED_PRODUCTS } from './hardcodedData.js';

const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.useHardcodedData = false;
  }

  // Helper method to make API calls with try-catch for fallback
  async apiCall(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API Error');
      }

      return await response.json();
    } catch (error) {
      console.log('API Error, using hardcoded fallback:', error.message);
      this.useHardcodedData = true;
      return null;
    }
  }

  // ============ AUTH SERVICES ============

  async customerSignup(data) {
    try {
      const response = await this.apiCall('/auth/customer-signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response?.success) {
        return { success: true, user: response.user, source: response.source };
      }
    } catch (error) {
      console.log('API Error in customerSignup:', error.message);
    }

    // Fallback to hardcoded signup - always returns success
    const newUser = {
      id: `cust-${Date.now()}`,
      ...data,
      role: 'customer',
      isVerified: false,
      isActive: true,
      createdAt: new Date(),
    };
    return { success: true, user: newUser, source: 'hardcoded', dataMode: 'demo' };
  }

  async sellerSignup(data) {
    try {
      const response = await this.apiCall('/auth/seller-signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response?.success) {
        return { success: true, user: response.user, source: response.source };
      }
    } catch (error) {
      console.log('API Error in sellerSignup:', error.message);
    }

    // Fallback to hardcoded signup - always returns success
    const newSeller = {
      id: `seller-${Date.now()}`,
      ...data,
      role: 'seller',
      isVerified: false,
      isActive: true,
      totalSales: 0,
      rating: 0,
      createdAt: new Date(),
    };
    return { success: true, user: newSeller, source: 'hardcoded', dataMode: 'demo' };
  }

  async login(email, password) {
    const response = await this.apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response?.success) {
      return { success: true, user: response.user, source: response.source };
    }

    // Fallback login check
    const user = HARDCODED_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      return { success: true, user, source: 'hardcoded' };
    }

    return { success: false, message: 'Invalid credentials', source: 'hardcoded' };
  }

  async getUserById(userId) {
    const response = await this.apiCall(`/auth/user/${userId}`, {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, user: response.user, source: response.source };
    }

    // Fallback
    const user = HARDCODED_USERS.find(u => u.id === userId);
    return { success: !!user, user, source: 'hardcoded' };
  }

  async getAllUsers() {
    const response = await this.apiCall('/auth/users', {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, users: response.users, source: response.source };
    }

    return { success: true, users: HARDCODED_USERS, source: 'hardcoded' };
  }

  async getSellers() {
    const response = await this.apiCall('/auth/sellers', {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, sellers: response.sellers, source: response.source };
    }

    const sellers = HARDCODED_USERS.filter(u => u.role === 'seller');
    return { success: true, sellers, source: 'hardcoded' };
  }

  async updateUser(userId, updateData) {
    const response = await this.apiCall(`/auth/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });

    if (response?.success) {
      return { success: true, user: response.user, source: response.source };
    }

    return { success: false, message: 'Failed to update user', source: 'hardcoded' };
  }

  async deleteUser(userId) {
    const response = await this.apiCall(`/auth/user/${userId}`, {
      method: 'DELETE',
    });

    if (response?.success) {
      return { success: true, message: 'User deleted', source: response.source };
    }

    return { success: false, message: 'Failed to delete user', source: 'hardcoded' };
  }

  // ============ PRODUCT SERVICES ============

  async createProduct(data) {
    const response = await this.apiCall('/products/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response?.success) {
      return { success: true, product: response.data, source: response.source };
    }

    // Fallback
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...data,
      createdAt: new Date(),
    };
    return { success: true, product: newProduct, source: 'hardcoded' };
  }

  async getAllProducts() {
    const response = await this.apiCall('/products', {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, products: response.data, source: response.source };
    }

    return { success: true, products: HARDCODED_PRODUCTS, source: 'hardcoded' };
  }

  async getProductById(productId) {
    const response = await this.apiCall(`/products/${productId}`, {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, product: response.data, source: response.source };
    }

    // Fallback
    const product = HARDCODED_PRODUCTS.find(p => p.id === productId);
    return { success: !!product, product, source: 'hardcoded' };
  }

  async getProductsBySeller(sellerId) {
    const response = await this.apiCall(`/products/seller/${sellerId}`, {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, products: response.data, source: response.source };
    }

    // Fallback
    const products = HARDCODED_PRODUCTS.filter(p => p.sellerId === sellerId);
    return { success: true, products, source: 'hardcoded' };
  }

  async getProductsByCategory(category) {
    const response = await this.apiCall(`/products/category/${category}`, {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, products: response.data, source: response.source };
    }

    // Fallback
    const products = HARDCODED_PRODUCTS.filter(p => p.category === category);
    return { success: true, products, source: 'hardcoded' };
  }

  async searchProducts(query) {
    const response = await this.apiCall(`/products/search?query=${encodeURIComponent(query)}`, {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, products: response.data, source: response.source };
    }

    // Fallback search
    const lowerQuery = query.toLowerCase();
    const products = HARDCODED_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
    return { success: true, products, source: 'hardcoded' };
  }

  async updateProduct(productId, updateData) {
    const response = await this.apiCall(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });

    if (response?.success) {
      return { success: true, product: response.data, source: response.source };
    }

    return { success: false, message: 'Failed to update product', source: 'hardcoded' };
  }

  async deleteProduct(productId) {
    const response = await this.apiCall(`/products/${productId}`, {
      method: 'DELETE',
    });

    if (response?.success) {
      return { success: true, message: 'Product deleted', source: response.source };
    }

    return { success: false, message: 'Failed to delete product', source: 'hardcoded' };
  }

  // ============ SELLER SERVICES ============

  async getSellerStats(sellerId) {
    const response = await this.apiCall(`/auth/seller/${sellerId}/stats`, {
      method: 'GET',
    });

    if (response?.success) {
      return { success: true, stats: response.stats, source: response.source };
    }

    // Fallback - calculate from hardcoded data
    const seller = HARDCODED_USERS.find(u => u.id === sellerId);
    if (!seller) {
      return { success: false, message: 'Seller not found', source: 'hardcoded' };
    }

    const products = HARDCODED_PRODUCTS.filter(p => p.sellerId === sellerId);
    const stats = {
      totalProducts: products.length,
      totalOrders: 2,
      completedOrders: 1,
      pendingOrders: 1,
      totalRevenue: 175.73,
      totalStock: products.reduce((sum, p) => sum + (p.stock || 0), 0),
      averageRating: products.length > 0 
        ? products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length 
        : 0
    };

    return { success: true, stats, source: 'hardcoded' };
  }

  async updateSeller(sellerId, updateData) {
    const response = await this.apiCall(`/auth/seller/${sellerId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });

    if (response?.success) {
      return { success: true, user: response.user, source: response.source };
    }

    // Fallback - update hardcoded user
    const sellerIndex = HARDCODED_USERS.findIndex(u => u.id === sellerId);
    if (sellerIndex === -1) {
      return { success: false, message: 'Seller not found', source: 'hardcoded' };
    }

    const updatedUser = { ...HARDCODED_USERS[sellerIndex], ...updateData };
    HARDCODED_USERS[sellerIndex] = updatedUser;

    return { success: true, user: updatedUser, source: 'hardcoded' };
  }

  async deleteSeller(sellerId) {
    const response = await this.apiCall(`/auth/seller/${sellerId}`, {
      method: 'DELETE',
    });

    if (response?.success) {
      return { success: true, message: 'Seller deleted', source: response.source };
    }

    // Fallback - delete from hardcoded data
    const sellerIndex = HARDCODED_USERS.findIndex(u => u.id === sellerId);
    if (sellerIndex === -1) {
      return { success: false, message: 'Seller not found', source: 'hardcoded' };
    }

    HARDCODED_USERS.splice(sellerIndex, 1);
    return { success: true, message: 'Seller deleted', source: 'hardcoded' };
  }
}

export default new ApiService();
