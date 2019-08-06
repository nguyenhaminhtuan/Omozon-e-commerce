const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = async function(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect password' });
    } else {
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        config.jwt.secret,
        {
          expiresIn: config.jwt.expired
        }
      );

      return res
        .status(200)
        .json({ success: true, message: 'Login successfully', token });
    }
  } catch (error) {
    next(error);
  }
};

// Only for development
exports.createAdmin = async function(req, res) {
  const email = 'admin@admin';
  const password = 'admin';
  const hash = await User.generateHash(password);
  const admin = new User({
    email,
    password: hash,
    name: 'admin',
    isAdmin: true
  });
  await admin.save();

  return res.status(200).json({ message: 'Admin created' });
};
