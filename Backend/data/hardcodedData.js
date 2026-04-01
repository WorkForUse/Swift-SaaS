/**
 * Hardcoded Fallback Data Repository
 * Used when database is unavailable or for demo purposes
 */

let HARDCODED_USERS = [
  {
    id: 'cust-001',
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1-234-567-8900',
    role: 'customer',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
      country: 'USA'
    },
    isVerified: true,
    isActive: true,
    createdAt: new Date('2025-01-15')
  },
  {
    id: 'cust-002',
    username: 'sarah_smith',
    email: 'sarah@example.com',
    password: 'secure456',
    firstName: 'Sarah',
    lastName: 'Smith',
    phone: '+1-987-654-3210',
    role: 'customer',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90001',
      country: 'USA'
    },
    isVerified: true,
    isActive: true,
    createdAt: new Date('2025-02-10')
  },
  {
    id: 'seller-001',
    username: 'mike_books',
    email: 'mike@booksplus.com',
    password: 'seller123',
    firstName: 'Mike',
    lastName: 'Johnson',
    phone: '+1-555-123-4567',
    role: 'seller',
    shopName: 'Books Plus',
    shopDescription: 'Premium textbooks and educational materials',
    address: {
      street: '789 Commerce Dr',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60601',
      country: 'USA'
    },
    isVerified: true,
    isActive: true,
    totalSales: 150,
    rating: 4.8,
    createdAt: new Date('2025-01-05')
  },
  {
    id: 'seller-002',
    username: 'emma_education',
    email: 'emma@edubooks.com',
    password: 'seller456',
    firstName: 'Emma',
    lastName: 'Wilson',
    phone: '+1-666-789-0123',
    role: 'seller',
    shopName: 'Education Hub',
    shopDescription: 'Selling rare and collectible textbooks',
    address: {
      street: '321 Market St',
      city: 'San Francisco',
      state: 'CA',
      zipcode: '94102',
      country: 'USA'
    },
    isVerified: true,
    isActive: true,
    totalSales: 89,
    rating: 4.6,
    createdAt: new Date('2025-01-20')
  },
  {
    id: 'admin-001',
    username: 'admin_user',
    email: 'admin@textbook.com',
    password: 'adminpass123',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1-111-222-3333',
    role: 'admin',
    isVerified: true,
    isActive: true,
    createdAt: new Date('2024-12-01')
  }
];

let HARDCODED_PRODUCTS = [
  {
    id: 'prod-001',
    sellerId: 'seller-001',
    sellerName: 'Books Plus',
    name: 'Advanced Mathematics Textbook',
    price: 89.99,
    description: 'Comprehensive guide to advanced mathematics with practical examples',
    category: 'Mathematics',
    image: 'https://via.placeholder.com/300x400?text=Math+Textbook',
    stock: 25,
    rating: 4.5,
    reviews: 12,
    isActive: true,
    createdAt: new Date('2025-01-10')
  },
  {
    id: 'prod-002',
    sellerId: 'seller-001',
    sellerName: 'Books Plus',
    name: 'Physics: The Fundamentals',
    price: 75.50,
    description: 'Essential physics concepts for college students',
    category: 'Physics',
    image: 'https://via.placeholder.com/300x400?text=Physics+Book',
    stock: 18,
    rating: 4.3,
    reviews: 8,
    isActive: true,
    createdAt: new Date('2025-01-12')
  },
  {
    id: 'prod-003',
    sellerId: 'seller-002',
    sellerName: 'Education Hub',
    name: 'Chemistry Principles and Reactions',
    price: 82.75,
    description: 'In-depth exploration of chemical principles',
    category: 'Chemistry',
    image: 'https://via.placeholder.com/300x400?text=Chemistry+Book',
    stock: 20,
    rating: 4.6,
    reviews: 15,
    isActive: true,
    createdAt: new Date('2025-01-08')
  },
  {
    id: 'prod-004',
    sellerId: 'seller-002',
    sellerName: 'Education Hub',
    name: 'English Literature: Classics',
    price: 45.99,
    description: 'Classical literature and critical analysis',
    category: 'Literature',
    image: 'https://via.placeholder.com/300x400?text=Literature+Book',
    stock: 35,
    rating: 4.2,
    reviews: 10,
    isActive: true,
    createdAt: new Date('2025-01-14')
  },
  {
    id: 'prod-005',
    sellerId: 'seller-001',
    sellerName: 'Books Plus',
    name: 'Organic Chemistry Guide',
    price: 95.00,
    description: 'Detailed guide to organic chemistry with practical applications',
    category: 'Chemistry',
    image: 'https://via.placeholder.com/300x400?text=Organic+Chem',
    stock: 12,
    rating: 4.7,
    reviews: 22,
    isActive: true,
    createdAt: new Date('2025-01-18')
  },
  {
    id: 'prod-006',
    sellerId: 'seller-002',
    sellerName: 'Education Hub',
    name: 'Biology: Life Sciences',
    price: 79.99,
    description: 'Comprehensive biology textbook covering all major topics',
    category: 'Biology',
    image: 'https://via.placeholder.com/300x400?text=Biology+Book',
    stock: 28,
    rating: 4.4,
    reviews: 14,
    isActive: true,
    createdAt: new Date('2025-01-16')
  }
];

let HARDCODED_ORDERS = [
  {
    id: 'order-001',
    customerId: 'cust-001',
    sellerId: 'seller-001',
    products: [
      { productId: 'prod-001', quantity: 1, price: 89.99 }
    ],
    totalAmount: 89.99,
    status: 'delivered',
    deliveryDate: new Date('2025-02-15'),
    createdAt: new Date('2025-02-05')
  },
  {
    id: 'order-002',
    customerId: 'cust-002',
    sellerId: 'seller-002',
    products: [
      { productId: 'prod-003', quantity: 1, price: 82.75 },
      { productId: 'prod-004', quantity: 2, price: 45.99 }
    ],
    totalAmount: 174.73,
    status: 'shipped',
    estimatedDelivery: new Date('2025-03-10'),
    createdAt: new Date('2025-02-20')
  }
];

/**
 * User Management with Fallback
 */
class UserDataManager {
  constructor() {
    this.users = JSON.parse(JSON.stringify(HARDCODED_USERS));
  }

  create(userData) {
    const newUser = {
      id: `${userData.role}-${Date.now()}`,
      ...userData,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  findById(id) {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  findByUsername(username) {
    return this.users.find(u => u.username === username);
  }

  findAll() {
    return [...this.users];
  }

  findByRole(role) {
    return this.users.filter(u => u.role === role);
  }

  update(id, updateData) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    this.users[index] = { ...this.users[index], ...updateData, updatedAt: new Date() };
    return { ...this.users[index] };
  }

  delete(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }
}

/**
 * Product Management with Fallback
 */
class ProductDataManager {
  constructor() {
    this.products = JSON.parse(JSON.stringify(HARDCODED_PRODUCTS));
  }

  create(productData) {
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...productData,
      createdAt: new Date()
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  findById(id) {
    return this.products.find(p => p.id === id);
  }

  findAll() {
    return [...this.products];
  }

  findBySellerId(sellerId) {
    return this.products.filter(p => p.sellerId === sellerId);
  }

  findByCategory(category) {
    return this.products.filter(p => p.category === category);
  }

  search(query) {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }

  update(id, updateData) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.products[index] = { ...this.products[index], ...updateData, updatedAt: new Date() };
    return { ...this.products[index] };
  }

  delete(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }
}

/**
 * Order Management with Fallback
 */
class OrderDataManager {
  constructor() {
    this.orders = JSON.parse(JSON.stringify(HARDCODED_ORDERS));
  }

  create(orderData) {
    const newOrder = {
      id: `order-${Date.now()}`,
      ...orderData,
      createdAt: new Date()
    };
    this.orders.push(newOrder);
    return { ...newOrder };
  }

  findById(id) {
    return this.orders.find(o => o.id === id);
  }

  findByCustomerId(customerId) {
    return this.orders.filter(o => o.customerId === customerId);
  }

  findBySellerId(sellerId) {
    return this.orders.filter(o => o.sellerId === sellerId);
  }

  findAll() {
    return [...this.orders];
  }

  update(id, updateData) {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    this.orders[index] = { ...this.orders[index], ...updateData, updatedAt: new Date() };
    return { ...this.orders[index] };
  }

  delete(id) {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) return false;
    
    this.orders.splice(index, 1);
    return true;
  }
}

/**
 * Seller Statistics Manager
 */
class SellerStatsManager {
  constructor(userManager, productManager, orderManager) {
    this.userManager = userManager;
    this.productManager = productManager;
    this.orderManager = orderManager;
  }

  getSellerStats(sellerId) {
    const seller = this.userManager.findById(sellerId);
    if (!seller) return null;

    const products = this.productManager.findBySellerId(sellerId);
    const orders = this.orderManager.findBySellerId(sellerId);

    // Calculate stats
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;
    const pendingOrders = orders.filter(o => o.status === 'shipped' || o.status === 'pending').length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    
    const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
    
    let totalRating = 0;
    let ratingCount = 0;
    products.forEach(product => {
      if (product.rating) {
        totalRating += product.rating;
        ratingCount++;
      }
    });
    const averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

    return {
      seller: {
        id: seller.id,
        name: `${seller.firstName} ${seller.lastName}`,
        shopName: seller.shopName,
        email: seller.email
      },
      stats: {
        totalProducts,
        totalOrders,
        completedOrders,
        pendingOrders,
        totalRevenue,
        totalStock,
        averageRating
      }
    };
  }
}

module.exports = {
  UserDataManager,
  ProductDataManager,
  OrderDataManager,
  SellerStatsManager,
  HARDCODED_USERS,
  HARDCODED_PRODUCTS,
  HARDCODED_ORDERS
};
