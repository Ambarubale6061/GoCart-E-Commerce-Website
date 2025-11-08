const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number, comment: String }, { timestamps: true });
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 },
  images: [String],
  sku: String,
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  reviews: [reviewSchema]
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
