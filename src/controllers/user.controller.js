const User = require('../models/User');

exports.fetchUser = async function(req, res, next) {
  try {
    const users = await User.find({});

    return res
      .status(200)
      .json({ success: true, message: 'Get all user successfully', users });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async function(req, res, next) {
  try {
    const { email, password, name, address } = req.body;
    const isExisted = await User.findOne({ email });

    if (isExisted) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already exist' });
    }

    const hash = await User.generateHash(password);
    let user = new User({
      email,
      password: hash,
      name,
      address
    });
    user = await user.save();

    return res.status(200).json({
      success: true,
      message: `Register username ${user.email} successfully`
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'There is no user with the id' });

    return res
      .status(200)
      .json({ success: true, message: 'Get user successfully', user });
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

    return res.status(403).json({ success: false, message: 'Invalid token' });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async function(req, res, next) {
  try {
    const { name, address } = req.body;
    const profile = await User.findById(req.user.id);

    if (!profile)
      return res.status(401).json({ success: false, message: 'Invalid token' });

    profile.name = name;
    profile.address = address;
    const profileUpdated = await profile.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated',
      profile: profileUpdated
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async function(req, res, next) {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(403).json({ success: false, message: 'Invalid token' });

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect password' });

    user.password = await User.generateHash(newPassword);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: 'Change password success' });
  } catch (error) {
    next(error);
  }
};
