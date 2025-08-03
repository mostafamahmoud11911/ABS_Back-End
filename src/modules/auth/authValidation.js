import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  otp: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export {
  signInSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
};
