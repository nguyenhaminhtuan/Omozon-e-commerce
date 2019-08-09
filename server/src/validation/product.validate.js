const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  product: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number()
      .integer()
      .positive()
      .required(),
    brand: Joi.string().required(),
    description: Joi.string(),
    category: Joi.objectId().required()
  })
};
