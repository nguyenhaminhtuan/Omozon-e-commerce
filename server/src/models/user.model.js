const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },
  password: { type: String, minlength: 6, maxlength: 150, required: true },
  name: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
  creatAt: { type: Date, default: Date.now() }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
