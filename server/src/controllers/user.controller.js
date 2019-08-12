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

exports.viewProfile = catchAsync(async (req, res) => {
  const profile = await User.findById(req.user.id);

  return res
    .status(200)
    .json({ message: 'Get profile success', data: { profile } });
});

// exports.updateProfile = catchAsync(async (req, res) => {
//   const profile = await User.findByIdAndUpdate(req.user.id, { $set: req.body });

//   return res
//     .status(200)
//     .json({ message: 'Profile updated', data: { profile } });
// });

exports.changePassword = catchAsync(async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const profile = await User.findById(req.user.id).select('+password');
  const isMatch = await profile.comparePassword(oldPassword);

  if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

  profile.password = newPassword;
  await profile.save();

  return res.status(200).json({ message: 'Password changed' });
});
