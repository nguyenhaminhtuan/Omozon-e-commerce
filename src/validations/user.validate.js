const { Joi } = require('celebrate');

module.exports = {
  getId: {
    params: {
      _id: Joi.string().required()
    },
    user: Joi.object().required()
  },
  updateProfile: {
    body: {
      oldPassword: Joi.string(),
      newPassword: Joi.string(),
      address: Joi.string()
    },
    user: Joi.object().required()
  }
};
