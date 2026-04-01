/**
 * Frontend Hardcoded Data
 * Mirror of backend data structure for fallback usage
 */

export const HARDCODED_USERS = [
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
  }
];

export const HARDCODED_PRODUCTS = [
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

export default {
  HARDCODED_USERS,
  HARDCODED_PRODUCTS
};
