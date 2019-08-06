const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  category: Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  }),
  product: Joi.object().keys({
    productId: Joi.objectId().required()
  })
};
