const Joi = require('joi');

module.exports = function(schema) {
  return function(req, res, next) {
    const { error } = Joi.validate(req.body, schema);

    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    next();
  };
};
