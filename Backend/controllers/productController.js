const Product = require('../models/Product');
const { ProductDataManager } = require('../data/hardcodedData');

// Initialize hardcoded data manager
const productDataManager = new ProductDataManager();
let useHardcodedData = false;

// CREATE PRODUCT - With Fallback
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, category, sellerId, sellerName, stock } = req.body;
        
        // Validation
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Product name and price are required'
            });
        }
        
        const imagePath = req.file ? req.file.path : 'https://via.placeholder.com/300x400?text=' + encodeURIComponent(name);

        let newProduct;

        if (useHardcodedData) {
            newProduct = productDataManager.create({
                name,
                price,
                description: description || '',
                category: category || 'General',
                image: imagePath,
                sellerId: sellerId || 'unknown',
                sellerName: sellerName || 'Unknown Seller',
                stock: stock || 10,
                rating: 0,
                reviews: 0,
                isActive: true
            });
        } else {
            try {
                newProduct = await Product.create({
                    name,
                    price,
                    description: description || '',
                    category: category || '',
                    image: imagePath,
                    sellerId: sellerId || '',
                    sellerName: sellerName || '',
                    stock: stock || 0
                });
            } catch (dbError) {
                console.log('DB Error, using hardcoded fallback');
                useHardcodedData = true;
                newProduct = productDataManager.create({
                    name,
                    price,
                    description: description || '',
                    category: category || 'General',
                    image: imagePath,
                    sellerId: sellerId || 'unknown',
                    sellerName: sellerName || 'Unknown Seller',
                    stock: stock || 10,
                    rating: 0,
                    reviews: 0,
                    isActive: true
                });
            }
        }

        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            source: useHardcodedData ? 'hardcoded' : 'database',
            data: newProduct
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: err.message
        });
    }
};

// GET ALL PRODUCTS - With Fallback
exports.getAllProducts = async (req, res) => {
    try {
        let products;

        try {
            products = await Product.find();
        } catch (dbError) {
            console.log('DB Error, using hardcoded fallback');
            products = productDataManager.findAll();
        }

        res.status(200).json({
            success: true,
            message: 'All products retrieved successfully',
            count: products.length,
            source: useHardcodedData ? 'hardcoded' : 'database',
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: err.message
        });
    }
};

// GET PRODUCT BY ID - With Fallback
exports.getProductById = async (req, res) => {
    try {
        let product;

        try {
            product = await Product.findById(req.params.id);
        } catch (dbError) {
            console.log('DB Error, using hardcoded fallback');
            product = productDataManager.findById(req.params.id);
        }
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
            source: useHardcodedData ? 'hardcoded' : 'database',
            data: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: err.message
        });
    }
};

// GET PRODUCTS BY SELLER - With Fallback
exports.getProductsBySeller = async (req, res) => {
    try {
        const { sellerId } = req.params;
        let products;

        try {
            products = await Product.find({ sellerId });
        } catch (dbError) {
            console.log('DB Error, using hardcoded fallback');
            products = productDataManager.findBySellerId(sellerId);
        }

        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            count: products.length,
            source: useHardcodedData ? 'hardcoded' : 'database',
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: err.message
        });
    }
};

// GET PRODUCTS BY CATEGORY - With Fallback
exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        let products;

        try {
            products = await Product.find({ category });
        } catch (dbError) {
            console.log('DB Error, using hardcoded fallback');
            products = productDataManager.findByCategory(category);
        }

        res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            count: products.length,
            source: useHardcodedData ? 'hardcoded' : 'database',
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: err.message
        });
    }
};

// SEARCH PRODUCTS - With Fallback
exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        let products;

        try {
            products = await Product.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } }
                ]
            });
        } catch (dbError) {
            console.log('DB Error, using hardcoded fallback');
            products = productDataManager.search(query);
        }

        res.status(200).json({
            success: true,
            message: 'Search results retrieved successfully',
            count: products.length,
            source: useHardcodedData ? 'hardcoded' : 'database',
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error searching products',
            error: err.message
        });
    }
};

// UPDATE PRODUCT - With Fallback
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, isActive } = req.body;
        
        const updateData = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (stock !== undefined) updateData.stock = stock;
        if (isActive !== undefined) updateData.isActive = isActive;
        
        if (req.file) {
            updateData.image = req.file.path;
        }

        let updatedProduct;

        try {
            updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );
        } catch (dbError) {
            console.log('DB Error, using hardcoded fallback');
            updatedProduct = productDataManager.update(req.params.id, updateData);
        }

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            source: useHardcodedData ? 'hardcoded' : 'database',
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

// DELETE PRODUCT - With Fallback
exports.deleteProduct = async (req, res) => {
    try {
        let deleted;
        let deletedProduct;

        try {
            deletedProduct = await Product.findByIdAndDelete(req.params.id);
            deleted = !!deletedProduct;
        } catch (dbError) {
            console.log('DB Error, using hardcoded fallback');
            deleted = productDataManager.delete(req.params.id);
        }
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            source: useHardcodedData ? 'hardcoded' : 'database',
            data: deletedProduct || {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: err.message
        });
    }
};