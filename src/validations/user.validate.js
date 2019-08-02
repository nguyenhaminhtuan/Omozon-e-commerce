const Joi = require('joi');

const userSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(6)
    .max(40)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(6)
    .max(40)
    .required(),
  address: Joi.string().max(150)
});

module.exports = userSchema;
