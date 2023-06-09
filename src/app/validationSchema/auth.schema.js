const Joi = require("joi");

const schema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  schema,
};
