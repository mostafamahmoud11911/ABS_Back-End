import { body, param } from "express-validator";

const addServiceValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("active").isBoolean().optional(),
];

const updateServiceValidationRules = [
  param("id").isMongoId().withMessage("Invalid service id"),
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters")
    .optional(),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long")
    .optional(),
  body("active").isBoolean().optional(),
];

const serviceValidationRules = [
  param("id").isMongoId().withMessage("Invalid service id"),
];

export {
  addServiceValidationRules,
  updateServiceValidationRules,
  serviceValidationRules,
};
