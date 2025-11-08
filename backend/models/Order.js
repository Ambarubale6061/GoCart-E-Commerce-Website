const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, name: String, qty: Number, price: Number, image: String }],
  shippingAddress: Object,
  paymentMethod: String,
  paymentResult: Object,
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  status: { type: String, default: 'Pending', enum: ['Pending','Paid','Shipped','Delivered','Cancelled'] }
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
