const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  isAdmin: { type: Boolean, default: false },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  createAt: { type: Date, default: Date.now() }
});

userSchema.statics.generateHash = function(plainText) {
  return new Promise(function(resolve, resject) {
    bcrypt.hash(plainText, config.bcrypt.saltRound, function(err, encrypted) {
      if (err) {
        resject(err);
      } else {
        resolve(encrypted);
      }
    });
  });
};

userSchema.methods.comparePassword = function(password) {
  const encrypted = this.password;

  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, encrypted, function(err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
