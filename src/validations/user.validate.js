const Joi = require('joi');

module.exports = {
  user: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(150)
      .required(),
    address: Joi.string(6)
      .max(255)
      .required()
  }),
  password: Joi.object().keys({
    oldPassword: Joi.string()
      .alphanum()
      .min(6)
      .max(150)
      .required(),
    newPassword: Joi.string()
      .alphanum()
      .min(6)
      .max(150)
      .required()
  })
};
