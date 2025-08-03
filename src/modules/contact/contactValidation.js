import Joi from "joi";



export const addContactValidation = Joi.object({
    email: Joi.string().email().required(),
    message: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().required(),
});

export const deleteContactValidation = Joi.object({
    id: Joi.string().required(),
});