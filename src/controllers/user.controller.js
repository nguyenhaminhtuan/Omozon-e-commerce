const User = require('../models/User');

exports.getAllUser = async function(req, res, next) {
  try {
    const users = await User.find({});

    return res
      .status(200)
      .json({ success: true, message: 'Get all user successfully', users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async function(req, res, next) {
  try {
    const { _id } = req.params;
    const user = User.findById(_id);

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: 'Get user successfully', user });
    }
  } catch (error) {
    next(error);
  }
};

exports.viewProfile = async function(req, res, next) {
  try {
    const profile = await User.findById(req.user.id);

    if (profile) {
      return res.status(200).json({
        success: true,
        message: 'Get profile user successfully',
        profile
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async function(req, res, next) {
  try {
    const { user } = req.body;
    const profile = await User.findById(req.user.id);

    if (profile) {
      if (user.oldPassword) {
        const isMatch = await profile.comparePassword(user.oldPassword);

        if (isMatch) {
          const hash = await User.generateHash(user.newPassword);
          profile.password = hash;
        } else {
          return res
            .status(400)
            .json({ success: false, message: 'Password incorect' });
        }
      }

      profile.address = user.address;
      const profileUpdated = await profile.save();

      return res
        .status(200)
        .json({ success: true, message: 'Updated profile', profileUpdated });
    }
  } catch (error) {
    next(error);
  }
};
