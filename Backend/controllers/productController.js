const Product = require('../models/Product');

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        
        // Validation
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Product name and price are required'
            });
        }
        
        const imagePath = req.file ? req.file.path : null;

        const newProduct = new Product({
            name,
            price,
            description: description || '',
            category: category || '',
            image: imagePath
        });

        await newProduct.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
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

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            message: 'All products retrieved successfully',
            count: products.length,
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

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product retrieved successfully',
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

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        
        const updateData = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        
        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
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

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: deletedProduct
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: err.message
        });
    }
};