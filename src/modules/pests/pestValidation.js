import Joi from "joi";

export const addPestSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
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
  images: Joi.array().items(
    Joi.object({
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
    })
  ),
});

export const updatePestSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
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
  images: Joi.array().items(
    Joi.object({
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
    })
  ),
});

export const pestSchema = Joi.object({
  id: Joi.string().required(),
});
