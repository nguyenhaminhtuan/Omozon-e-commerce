const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  cart: Joi.object().keys({
    productId: Joi.objectId().required(),
    quantity: Joi.number()
      .integer()
      .positive()
      .min(1)
      .max(100)
  }),
  quantity: Joi.number()
    .integer()
    .positive()
    .min(1)
    .max(100)
    .required(),
  paid: Joi.boolean().required()
};
