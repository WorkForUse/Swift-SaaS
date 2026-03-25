const express = require('express');
const router = express.Router();
const { 
    createProduct, 
    getAllProducts,
    getProductById,
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const upload = require('../middleware/upload');

// Product routes
router.get('/all', getAllProducts);                          // GET:  /api/products/all
router.get('/:id', getProductById);                          // GET:  /api/products/:id
router.post('/add', upload.single('image'), createProduct);  // POST: /api/products/add
router.put('/update/:id', upload.single('image'), updateProduct);  // PUT:  /api/products/update/:id
router.delete('/delete/:id', deleteProduct);                 // DELETE: /api/products/delete/:id

module.exports = router;