const Joi = require("joi");

module.exports = {
  body: {
    title: Joi.string().required(),
    link: Joi.string().required(),
    description: Joi.string(),
    tags: Joi.array()
  }
};
