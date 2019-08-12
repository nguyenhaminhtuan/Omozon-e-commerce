const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  return res
    .status(200)
    .json({ message: 'Fetched all users', data: { users } });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found!' });

  return res.status(200).json({ message: 'Get user success', data: { user } });
});
