const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Create product (admin)
router.post('/', protect, admin, upload.array('images', 5), async (req, res) => {
  const body = req.body;
  const images = (req.files || []).map(f => `/uploads/${f.filename}`);
  const product = await Product.create({ ...body, images });
  res.json(product);
});

// List products with pagination, filters
router.get('/', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.limit) || 12;
  const query = {};
  if (req.query.category) query.category = req.query.category;
  if (req.query.search) query.name = { $regex: req.query.search, $options: 'i' };
  if (req.query.min || req.query.max) query.price = {};
  if (req.query.min) query.price.$gte = Number(req.query.min);
  if (req.query.max) query.price.$lte = Number(req.query.max);
  const total = await Product.countDocuments(query);
  const products = await Product.find(query).skip((page-1)*pageSize).limit(pageSize).sort({ createdAt: -1 });
  res.json({ products, total, page, pageSize });
});

// Product details
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// Add review
router.post('/:id/reviews', protect, async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  product.reviews.push({ user: req.user._id, rating, comment });
  product.numReviews = product.reviews.length;
  product.ratings = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
  await product.save();
  res.json({ message: 'Review added' });
});

module.exports = router;
