const Joi = require("joi");

const postSchema = Joi.object({
  employeeId: Joi.alternatives()
    .try(Joi.string().pattern(/^[1-9]+$/), Joi.number().min(1))
    .required(),
  type: Joi.string().valid("Vacation", "Half-Day", "Sick-Leave").required(),
  description: Joi.string().max(50).required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
});

const getSchema = Joi.object({
  employeeId: Joi.alternatives()
    .try(Joi.string().pattern(/^[1-9]+$/), Joi.number().min(1))
    .required(),
});

const putQueryParamsSchema = Joi.object({
  id: Joi.string().required(),
});

const putBodySchema = Joi.object({
  employeeId: Joi.alternatives().try(
    Joi.string().pattern(/^[1-9]+$/),
    Joi.number().min(1)
  ),
  type: Joi.string().valid("Vacation", "Half-Day", "Sick-Leave"),
  description: Joi.string().max(50),
  startTime: Joi.string(),
  endTime: Joi.string(),
});

const deleteSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = {
  postSchema,
  getSchema,
  putQueryParamsSchema,
  putBodySchema,
  deleteSchema,
};
