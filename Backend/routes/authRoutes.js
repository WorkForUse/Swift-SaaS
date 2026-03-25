const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Customer routes
router.post('/customer/signup', authController.customerSignup);
router.post('/customer/login', authController.customerLogin);

// Seller routes
router.post('/seller/signup', authController.sellerSignup);
router.post('/seller/login', authController.sellerLogin);

// Admin routes
router.post('/admin/signup', authController.adminSignup);
router.post('/admin/login', authController.adminLogin);

// User Management Routes (Admin CRUD)
router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUserById);
router.put('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.deleteUser);
router.put('/users/:id/deactivate', authController.deactivateUser);
router.put('/users/:id/verify', authController.verifyUser);

// Demo: Get hardcoded users
router.get('/demo-users', authController.getHardcodedUsers);

module.exports = router;
