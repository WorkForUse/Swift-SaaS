import React from 'react';

// Mock data for Admin Management UI
export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', deleted: false, createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active', deleted: false, createdAt: '2024-01-10' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'inactive', deleted: false, createdAt: '2024-02-01' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'active', deleted: true, createdAt: '2024-01-20' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'user', status: 'suspended', deleted: false, createdAt: '2024-03-01' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'admin', status: 'active', deleted: false, createdAt: '2024-02-15' }
];

export const mockProducts = [
  { id: 1, name: 'Advanced Mathematics Textbook', category: 'Mathematics', description: 'Comprehensive advanced math concepts for university students.', price: 49.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', status: 'active', deleted: false, stock: 50 },
  { id: 2, name: 'Physics Fundamentals', category: 'Physics', description: 'Core physics principles with practical examples.', price: 59.99, image: 'https://images.unsplash.com/photo-1526042210328-e14fd198e8ee?w=200', status: 'active', deleted: false, stock: 30 },
  { id: 3, name: 'Chemistry Essentials', category: 'Chemistry', description: 'Essential chemistry topics for beginners.', price: 44.99, image: 'https://images.unsplash.com/photo-1589872751848-0152c4bbaa55?w=200', status: 'out_of_stock', deleted: false, stock: 0 },
  { id: 4, name: 'Biology Advanced', category: 'Biology', description: 'Advanced biological systems and genetics.', price: 69.99, image: 'https://images.unsplash.com/photo-1586954603494-76c5b7f27491?w=200', status: 'inactive', deleted: false, stock: 20 },
  { id: 5, name: 'Calculus Vol 2', category: 'Mathematics', description: 'Multivariable calculus and vector analysis.', price: 54.99, image: 'https://images.unsplash.com/photo-1524178232363-933d95a15c23?w=200', status: 'active', deleted: true, stock: 10 },
  { id: 6, name: 'Organic Chemistry', category: 'Chemistry', description: 'Reaction mechanisms and synthesis techniques.', price: 79.99, image: 'https://images.unsplash.com/photo-1585388009708-51c3b21f2917?w=200', status: 'active', deleted: false, stock: 25 }
];

// Helper functions for CRUD simulation
export const useMockUsers = () => {
  const [users, setUsers] = React.useState(mockUsers);
  const addUser = (user) => setUsers(prev => [{ id: Date.now(), ...user, status: 'active', deleted: false }, ...prev]);
  const updateUser = (id, updates) => setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  const deleteUser = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, deleted: true } : u));
  const toggleStatus = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  return { users: users.filter(u => !u.deleted), addUser, updateUser, deleteUser, toggleStatus };
};

export const useMockProducts = () => {
  const [products, setProducts] = React.useState(mockProducts);
  const addProduct = (product) => setProducts(prev => [{ id: Date.now(), ...product, status: 'active', deleted: false }, ...prev]);
  const updateProduct = (id, updates) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  const deleteProduct = (id) => setProducts(prev => prev.map(p => p.id === id ? { ...p, deleted: true } : p));
  const toggleStatus = (id) => setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p));
  return { products: products.filter(p => !p.deleted), addProduct, updateProduct, deleteProduct, toggleStatus };
};
