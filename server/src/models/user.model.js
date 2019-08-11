const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.methods.comparePassword = async function(password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
