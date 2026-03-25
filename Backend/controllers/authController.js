const User = require('../models/Users');

// Hardcoded fallback data for demo/testing
const HARDCODED_USERS = {
  customer: {
    id: 'cust-001',
    username: 'john_customer',
    email: 'customer@example.com',
    password: 'password123', // In production, this would be hashed
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    phone: '+1-234-567-8900',
    isVerified: true,
    isActive: true,
    createdAt: new Date('2025-01-15')
  },
  admin: {
    id: 'admin-001',
    username: 'jane_admin',
    email: 'admin@example.com',
    password: 'adminpass123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'admin',
    phone: '+1-987-654-3210',
    isVerified: true,
    isActive: true,
    createdAt: new Date('2025-01-10')
  },
  seller: {
    id: 'seller-001',
    username: 'mike_seller',
    email: 'seller@example.com',
    password: 'sellerpass123',
    firstName: 'Mike',
    lastName: 'Johnson',
    role: 'seller',
    phone: '+1-555-123-4567',
    shopName: 'Books Plus',
    shopDescription: 'Premium textbooks and educational materials',
    isVerified: true,
    isActive: true,
    createdAt: new Date('2025-01-12')
  }
};

// CUSTOMER SIGNUP
exports.customerSignup = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Create new customer
    const newCustomer = await User.create({
      username,
      email,
      password, // In production, hash this password
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || '',
      role: 'customer',
      isVerified: false,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Customer signed up successfully',
      user: {
        id: newCustomer._id,
        username: newCustomer.username,
        email: newCustomer.email,
        role: newCustomer.role,
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during customer signup',
      error: error.message
    });
  }
};

// CUSTOMER LOGIN
exports.customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check hardcoded fallback data first
    if (email === HARDCODED_USERS.customer.email && password === HARDCODED_USERS.customer.password) {
      return res.status(200).json({
        success: true,
        message: 'Customer login successful (hardcoded)',
        user: HARDCODED_USERS.customer,
        token: 'demo-customer-token-' + Date.now()
      });
    }

    // Check database
    const customer = await User.findOne({ email, role: 'customer' }).select('+password');
    
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Password verification (in production, use bcrypt)
    if (customer.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    if (!customer.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Customer login successful',
      user: {
        id: customer._id,
        username: customer.username,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        role: customer.role,
        phone: customer.phone,
        isVerified: customer.isVerified
      },
      token: 'customer-token-' + customer._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during customer login',
      error: error.message
    });
  }
};

// ADMIN SIGNUP (Protected - should only be accessible by existing admins or system)
exports.adminSignup = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Create new admin
    const newAdmin = await User.create({
      username,
      email,
      password, // In production, hash this password
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || '',
      role: 'admin',
      isVerified: false,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      user: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during admin signup',
      error: error.message
    });
  }
};

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check hardcoded fallback data first
    if (email === HARDCODED_USERS.admin.email && password === HARDCODED_USERS.admin.password) {
      return res.status(200).json({
        success: true,
        message: 'Admin login successful (hardcoded)',
        user: HARDCODED_USERS.admin,
        token: 'demo-admin-token-' + Date.now()
      });
    }

    // Check database
    const admin = await User.findOne({ email, role: 'admin' }).select('+password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password or not an admin'
      });
    }

    // Password verification (in production, use bcrypt)
    if (admin.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your admin account has been deactivated'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: admin.role,
        phone: admin.phone,
        isVerified: admin.isVerified
      },
      token: 'admin-token-' + admin._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during admin login',
      error: error.message
    });
  }
};

// SELLER SIGNUP
exports.sellerSignup = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone, shopName, shopDescription } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    if (!shopName) {
      return res.status(400).json({
        success: false,
        message: 'Shop name is required for sellers'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Create new seller
    const newSeller = await User.create({
      username,
      email,
      password,
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || '',
      role: 'seller',
      shopName,
      shopDescription: shopDescription || '',
      isVerified: false,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Seller signed up successfully',
      user: {
        id: newSeller._id,
        username: newSeller.username,
        email: newSeller.email,
        role: newSeller.role,
        firstName: newSeller.firstName,
        lastName: newSeller.lastName,
        shopName: newSeller.shopName
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during seller signup',
      error: error.message
    });
  }
};

// SELLER LOGIN
exports.sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check database
    const seller = await User.findOne({ email, role: 'seller' }).select('+password');
    
    if (!seller) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Password verification
    if (seller.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    if (!seller.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your seller account has been deactivated'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Seller login successful',
      user: {
        id: seller._id,
        username: seller.username,
        email: seller.email,
        firstName: seller.firstName,
        lastName: seller.lastName,
        role: seller.role,
        phone: seller.phone,
        shopName: seller.shopName,
        isVerified: seller.isVerified
      },
      token: 'seller-token-' + seller._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error during seller login',
      error: error.message
    });
  }
};

// ===== USER MANAGEMENT (ADMIN ONLY) =====

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      message: 'All users retrieved successfully',
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, address, isVerified, isActive } = req.body;
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// DEACTIVATE USER (Soft delete)
exports.deactivateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deactivating user',
      error: error.message
    });
  }
};

// VERIFY USER
exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User verified successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying user',
      error: error.message
    });
  }
};

// GET HARDCODED USERS (for demo purposes)
exports.getHardcodedUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hardcoded demo users for testing',
    users: HARDCODED_USERS
  });
};
