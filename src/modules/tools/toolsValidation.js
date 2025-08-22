import Joi from "joi";

const addToolValidation = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().max(1000).required(),
  image: Joi.object({
    filename: Joi.string().required(),
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
      .required(),
    destination: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5242880).required(),
  }).required(),
});

const updateToolValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().trim().optional(),
  description: Joi.string().min(10).max(1000).optional(),
  image: Joi.object({
    filename: Joi.string().required(),
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
      .required(),
    destination: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5242880).required(),
  }),
});

const toolValidation = Joi.object({
  id: Joi.string().required(),
});

export { addToolValidation, updateToolValidation, toolValidation };
