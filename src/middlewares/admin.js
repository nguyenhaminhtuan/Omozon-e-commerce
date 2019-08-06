module.exports = function(req, res, next) {
  if (!req.user.isAdmin)
    return res.status(401).json({ message: 'Access denied' });
  next();
};
