const config = require('../config');

module.exports = {
  notFound: function(req, res, next) {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
  },
  // eslint-disable-next-line no-unused-vars
  handler: function(err, req, res, next) {
    if (config.env !== 'production') {
      res.status(err.status || 500).json({ error: err.message });
    } else {
      console.error(err.message);
      res.status(500).json({ message: 'Oops, something went wrong!' });
    }
  }
};
