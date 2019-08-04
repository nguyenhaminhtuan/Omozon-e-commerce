const { Joi } = require('celebrate');

module.exports = {
  getId: {
    params: {
      _id: Joi.string().required()
    }
  },
  updateProfile: {
    body: {
      oldPassword: Joi.string(),
      newPassword: Joi.string(),
      address: Joi.string()
    }
  }
};
