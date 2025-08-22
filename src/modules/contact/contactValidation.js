import Joi from "joi";

export const addContactValidation = Joi.object({
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  city: Joi.string().required(),
  phone: Joi.string().required(),
  blocked: Joi.boolean().required(),
});

export const updateContactValidation = Joi.object({
  id: Joi.string().required(),
  blocked: Joi.boolean().required(),
});

export const contactValidation = Joi.object({
  id: Joi.string().required(),
});
