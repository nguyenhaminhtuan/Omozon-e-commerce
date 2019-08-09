const Joi = require('joi');

module.exports = {
  login: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(150)
      .required()
  }),
  signup: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(150)
      .required(),
    name: Joi.string()
      .min(3)
      .max(150)
      .required()
  })
};
