import React from 'react';

export const mockUsers = [
  // ... existing unchanged
];

export const mockProducts = [
  {
    id: 1,
    name: 'Advanced Mathematics Textbook',
    category: 'Mathematics',
    description: 'Comprehensive advanced math concepts for university students and faculty. Covers calculus, linear algebra, differential equations, and discrete mathematics with practical examples and exercises.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    status: 'active',
    deleted: false,
    stock: 50,
    rating: 4.8,
    ratingCount: 127,
    author: 'Dr. Sarah Johnson',
    seller_name: 'Academic Press',
    pages: 856,
    isbn: '978-0-12-345678-9'
  },
  {
    id: 2,
    name: 'Physics Fundamentals',
    category: 'Physics',
    description: 'Core physics principles with practical examples and laboratory applications. Perfect for introductory university courses.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1526042210328-e14fd198e8ee?w=400&h=500&fit=crop',
    status: 'active',
    deleted: false,
    stock: 30,
    rating: 4.7,
    ratingCount: 89,
    author: 'Prof. Michael Chen',
    seller_name: 'Science Books Ltd',
    pages: 720,
    isbn: '978-1-23-456789-0'
  },
  {
    id: 3,
    name: 'Chemistry Essentials',
    category: 'Chemistry',
    description: 'Essential chemistry topics for beginners to intermediate levels. Includes organic, inorganic, and physical chemistry fundamentals.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1589872751848-0152c4bbaa55?w=400&h=500&fit=crop',
    status: 'out_of_stock',
    deleted: false,
    stock: 0,
    rating: 4.9,
    ratingCount: 203,
    author: 'Dr. Emily Rodriguez',
    seller_name: 'ChemLab Publishing',
    pages: 632,
    isbn: '978-4-56-789012-3'
  },
  {
    id: 4,
    name: 'Biology Advanced',
    category: 'Biology',
    description: 'Advanced biological systems and genetics. Covers molecular biology, ecology, and biotechnology with case studies.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1586954603494-76c5b7f27491?w=400&h=500&fit=crop',
    status: 'active',
    deleted: false,
    stock: 20,
    rating: 4.6,
    ratingCount: 156,
    author: 'Prof. David Lee',
    seller_name: 'BioScience Books',
    pages: 912,
    isbn: '978-7-89-012345-6'
  },
  {
    id: 5,
    name: 'Calculus Vol 2',
    category: 'Mathematics',
    description: 'Multivariable calculus and vector analysis for engineering and science students. Includes rigorous proofs and applications.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1524178232363-933d95a15c23?w=400&h=500&fit=crop',
    status: 'inactive',
    deleted: true,
    stock: 10,
    rating: 4.8,
    ratingCount: 94,
    author: 'Dr. Robert Taylor',
    seller_name: 'MathWorks Press',
    pages: 784,
    isbn: '978-0-98-765432-1'
  },
  {
    id: 6,
    name: 'Organic Chemistry',
    category: 'Chemistry',
    description: 'Reaction mechanisms and synthesis techniques. Essential for organic chemistry majors and researchers.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1585388009708-51c3b21f2917?w=400&h=500&fit=crop',
    status: 'active',
    deleted: false,
    stock: 25,
    rating: 4.7,
    ratingCount: 178,
    author: 'Prof. Lisa Wang',
    seller_name: 'Organic Chem Pub',
    pages: 1024,
    isbn: '978-1-47-258369-0'
  }
];

// Existing hooks unchanged
export const useMockUsers = () => { /* unchanged */ };
export const useMockProducts = () => { /* unchanged */ };

