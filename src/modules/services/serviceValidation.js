import Joi from "joi"



const getServiceSlugSchema = Joi.object({
    slug: Joi.string().required(),
});

const addServiceSchema = Joi.object({
    title: Joi.string().min(10).max(1000).trim().required(),
    description: Joi.string().min(10).max(10000).required(),
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
    status: Joi.boolean().required(),
});

const updateServiceSchema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().trim(),
    description: Joi.string().min(10).max(1000),
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
    active: Joi.boolean(),
});


const serviceSchema = Joi.object({
    id: Joi.string().required(),
});

export {
    getServiceSlugSchema,
    addServiceSchema,
    updateServiceSchema,
    serviceSchema,
};