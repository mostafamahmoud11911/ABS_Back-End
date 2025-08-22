import Joi from "joi";

const addClientSchema = Joi.object({
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

const updateClientSchema = Joi.object({
  id: Joi.string().required(),
  image: Joi.object({
    filename: Joi.string(),
    fieldname: Joi.string(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string().valid(
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg"
    ),
    destination: Joi.string(),
    path: Joi.string(),
    size: Joi.number().max(5242880),
  }),
});

const clientSchema = Joi.object({
  id: Joi.string().required(),
});

export { addClientSchema, updateClientSchema, clientSchema };
