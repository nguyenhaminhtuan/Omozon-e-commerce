const { Joi } = require('celebrate');

module.exports = {
  add: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number()
        .integer()
        .required(),
      brand: Joi.string().required(),
      description: Joi.string(),
      categories: Joi.array()
    }),
    user: Joi.object().required()
  },
  update: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number()
        .integer()
        .required(),
      brand: Joi.string().required(),
      description: Joi.string(),
      categories: Joi.array()
    }),
    params: {
      _id: Joi.string().required()
    },
    user: Joi.object().required()
  },
  getId: {
    params: {
      _id: Joi.string().required()
    }
  }
};
