const catchAsync = require('../utils/catchAsync');

exports.getAllApis = catchAsync(async (req, res) => {
  return res.status(200).json({ message: 'Get all api success' });
});
