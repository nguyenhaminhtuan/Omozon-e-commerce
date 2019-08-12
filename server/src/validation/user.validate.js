const Joi = require('joi');

module.exports = {
  changePassword: Joi.object().keys({
    newPassword: Joi.string()
      .min(6)
      .max(150)
      .required(),
    oldPassword: Joi.string()
      .min(6)
      .max(150)
      .required()
  })
};
