require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const data = [
  { name: 'Sample T-Shirt', description: 'Comfortable cotton tee', price: 299, category: 'Clothing', stock: 50, images: ['/images/tee1.jpg'], sku: 'TSHIRT-001' },
  { name: 'Running Shoes', description: 'Lightweight shoes', price: 2499, category: 'Footwear', stock: 25, images: ['/images/shoe1.jpg'], sku: 'SHOE-001' }
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(data);
  await User.deleteMany();
  const hashed = await bcrypt.hash('password123', 10);
  await User.create({ name: 'Admin User', email: 'admin@gocart.com', password: hashed, role: 'admin', isVerified: true });
  await User.create({ name: 'Customer User', email: 'cust@gocart.com', password: hashed, isVerified: true });
  console.log('Seed done');
  process.exit();
};
seed();
