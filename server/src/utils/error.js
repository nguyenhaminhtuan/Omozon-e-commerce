module.exports = {
  notFound: (req, res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Not Found!';
    next(error);
  },
  handler: (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'production')
      return res.status(err.status || 500).json({ error: err.message });
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong!!!' });
  }
};
