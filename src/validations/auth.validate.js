const Joi = require('joi');

module.exports = {
  login: Joi.object()
    .keys({
      email: Joi.string()
        .email()
        .min(3)
        .max(150)
        .required(),
      password: Joi.string()
        .alphanum()
        .min(4)
        .max(150)
        .required()
    })
    // with(key, peers), peers can be a one peer or array peers. For each of these peers being present, key also must be present for the schema to be valid.
    .with('username', 'password'),
  register: Joi.object().keys({
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
    adress: Joi.string()
      .min(6)
      .max(255)
      .required()
  })
};
