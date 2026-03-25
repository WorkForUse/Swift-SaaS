require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Database Connection (Using .env variable)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ DB Connected"))
    .catch((err) => console.log("❌ DB Error:", err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/uploads', express.static('uploads'));

// Server Listen
const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));