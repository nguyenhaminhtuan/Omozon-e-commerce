const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  product: Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(150)
      .required(),
    price: Joi.number()
      .integer()
      .min(10000)
      .required(),
    brand: Joi.string()
      .min(3)
      .max(150)
      .alphanum()
      .required(),
    description: Joi.string().min(10),
    categories: Joi.array().items(Joi.objectId())
  })
};
