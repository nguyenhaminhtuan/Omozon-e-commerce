const Joi = require('joi');

module.exports = joiShcema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, joiShcema, { abortEarly: false });
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    next();
  };
};
