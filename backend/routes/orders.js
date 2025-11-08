const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent and order after success: here we create intent and return clientSecret
router.post('/create-payment-intent', protect, async (req, res) => {
  const { items, shippingAddress } = req.body;
  const amount = items.reduce((sum, it) => sum + it.qty * it.price, 0);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'inr',
      metadata: { integration_check: 'accept_a_payment' }
    });
    // Create provisional order with status Pending and paymentIntent id
    const order = await Order.create({
      user: req.user._id,
      orderItems: items.map(i => ({ product: i.product, name: i.name, qty: i.qty, price: i.price, image: i.image })),
      shippingAddress,
      paymentMethod: 'stripe',
      itemsPrice: amount,
      totalPrice: amount,
      status: 'Pending',
      paymentResult: { clientSecret: paymentIntent.client_secret, id: paymentIntent.id }
    });
    res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment creation failed' });
  }
});

// Fetch orders for user
router.get('/', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
  res.json(orders);
});

module.exports = router;
