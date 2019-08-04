const { Joi } = require('celebrate');

module.exports = {
  token: {
    user: Joi.object().required()
  },
  getId: {
    params: {
      _id: Joi.string().required()
    }
  },
  addCategory: {
    body: {
      name: Joi.string().required()
    },
    user: Joi.object().required()
  },
  updateName: {
    body: {
      name: Joi.string().required
    },
    params: {
      _id: Joi.string().required()
    },
    user: Joi.object().required()
  },
  addAndRemoveProduct: {
    body: {
      productId: Joi.string().required()
    },
    params: {
      _id: Joi.string().required()
    },
    user: Joi.object().required()
  }
};
