const { Joi } = require('celebrate');

module.exports = {
  auth: {
    body: Joi.object()
      .keys({
        username: Joi.string()
          .alphanum()
          .min(4)
          .max(40)
          .required(),
        password: Joi.string()
          .alphanum()
          .min(4)
          .max(40)
          .required()
      })
      // with(key, peers), peers can be a one peer or array peers. For each of these peers being present, key also must be present for the schema to be valid.
      .with('username', 'password')
  }
};
