const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ success: false, message: 'Unauthorization' });

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }
};
