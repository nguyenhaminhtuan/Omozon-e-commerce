const Joi = require('joi');

const authSchema = Joi.object()
  .keys({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(40)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(6)
      .max(40)
      .required()
  })
  // with(key, peers), peers can be a one peer or array peers. For each of these peers being present, key also must be present for the schema to be valid.
  .with('username', 'password');

module.exports = async function(req, res, next) {
  try {
    await Joi.validate(req.body, authSchema, {
      abortEarly: false
    });

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
};
