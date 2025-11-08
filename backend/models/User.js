const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
  addresses: [{ label: String, addressLine1: String, city: String, state: String, pincode: String }],
  isVerified: { type: Boolean, default: false },
  refreshToken: { type: String }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
