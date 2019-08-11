const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user, password);
});

exports.signup = catchAsync(async (req, res) => {
  const isExisted = await User.findOne({ email: req.body.email });

  if (isExisted)
    return res.status(400).json({ message: 'Email already exist' });

  const user = new User(req.body);
  await user.save();
  const { _id, email, name, createAt } = user;

  return res.status(201).json({
    message: 'Sign up success',
    data: { user: { _id, email, name, createAt } }
  });
});
