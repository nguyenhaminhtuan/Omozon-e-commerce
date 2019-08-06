const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
  const header = req.headers['authorization']; // Get header

  if (typeof header === 'undefined') {
    return res.status(401).json({ success: false, msg: 'Unauthorization' });
  } else {
    if (header.startsWith('Bearer')) {
      // Authorization: Bearer <access_token>
      const token = header.split(' ')[1]; // Get token from index 1 in header string
      // Contain check and throw error untrusted, expires,... If no error, return decoded
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;

      next();
    } else {
      return res.status(400).json({ success: false, msg: 'Invalid token' });
    }
  }
};
