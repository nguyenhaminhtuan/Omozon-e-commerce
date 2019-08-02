const Joi = require('@hapi/joi');

const productShcema = Joi.object().key({
  name: Joi.string()
    .alphanum()
    .required(),
  price: Joi.number().required(),
  brand: Joi.string().required()
});

module.exports = productShcema;
