const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Get all users
router.get('/users', protect, admin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Get all orders
router.get('/orders', protect, admin, async (req, res) => {
  const orders = await Order.find().populate('user').sort({ createdAt: -1 });
  res.json(orders);
});

// Update order status
router.put('/order/:id/status', protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
});

module.exports = router;
