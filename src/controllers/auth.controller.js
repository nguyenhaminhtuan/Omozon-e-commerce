const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.login = async function(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Username doesn't exist" });
    } else {
      const isMatch = await user.comparePassword(password);
      console.log(isMatch);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: 'Incorrect password' });
      } else {
        const token = jwt.sign({ id: user._id }, config.jwt.secret, {
          expiresIn: config.jwt.expired
        });

        return res
          .status(200)
          .json({ success: true, message: 'Login successfully', token });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.register = async function(req, res, next) {
  try {
    const { username, password } = req.body;
    const isExisted = await User.findOne({ username });

    if (isExisted) {
      return res
        .status(400)
        .json({ success: false, message: 'Username already exist' });
    } else {
      const hash = await User.generateHash(password);
      const newUser = new User({
        username,
        password: hash
      });

      await newUser.save();
      return res.status(200).json({
        success: true,
        message: `Register username ${username} successfully`
      });
    }
  } catch (error) {
    next(error);
  }
};
