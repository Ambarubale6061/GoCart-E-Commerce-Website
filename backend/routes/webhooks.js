const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // find order with matching paymentIntent id
    const order = await Order.findOne({'paymentResult.id': paymentIntent.id});
    if (order) {
      order.status = 'Paid';
      order.paymentResult = { ...order.paymentResult, success: true, paidAt: new Date() };
      await order.save();
      console.log('Order marked as Paid:', order._id);
    }
  }

  res.json({ received: true });
});

module.exports = router;
