const Joi = require('joi');

module.exports = {
  create: Joi.object().keys({
    email: Joi.string()
      .email()
      .min(3)
      .max(150)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(4)
      .max(150)
      .required(),
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    address: Joi.string()
      .min(6)
      .max(255)
      .required()
  }),
  user: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(150)
      .required(),
    address: Joi.string()
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
