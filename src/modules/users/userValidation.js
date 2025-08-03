import Joi from "joi";

const addUserValidation = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const updateUserValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().trim().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  role: Joi.string().optional(),
});

const userValidation = Joi.object({
  id: Joi.string().required(),
});

export { addUserValidation, updateUserValidation, userValidation };
