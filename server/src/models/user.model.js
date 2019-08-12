const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 150,
    select: false,
    required: true
  },
  name: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
  creatAt: { type: Date, default: Date.now() }
});

userSchema.pre('save', async function(next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    return new Error(error);
  }
});

userSchema.methods.comparePassword = async function(plainText) {
  const match = await bcrypt.compare(plainText, this.password);
  return match;
};

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this.id, admin: this.admin }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
