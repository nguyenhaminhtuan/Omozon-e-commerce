const { Joi } = require('celebrate');

module.exports = {
  getId: {
    params: {
      _id: Joi.string().required()
    }
  },
  addCategory: {
    body: {
      name: Joi.string().required()
    }
  },
  updateName: {
    body: {
      name: Joi.string().required()
    },
    params: {
      _id: Joi.string().required()
    }
  },
  addAndRemoveProduct: {
    body: {
      productId: Joi.string().required()
    },
    params: {
      _id: Joi.string().required()
    }
  }
};
