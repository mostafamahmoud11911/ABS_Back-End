import { body, param } from "express-validator";

export const addUserValidationRules = [
  body("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Name is required")
    .trim(),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("profilePic").optional(),
  body("role")
    .isIn(["user", "admin"])
    .default("user")
    .withMessage("Invalid role"),
  body("passwordChangedAt").optional(),
  body("otp").optional(),
  body("otpExpiry").optional(),
];

export const updateUserValidationRules = [
  param("id").isMongoId().withMessage("Invalid user id"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name is required")
    .trim()
    .optional(),
  body("email").isEmail().withMessage("Invalid email").optional(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .optional(),
  body("profilePic").optional(),
  body("role")
    .isIn(["user", "admin"])
    .default("user")
    .withMessage("Invalid role")
    .optional(),
  body("passwordChangedAt").optional(),
  body("otp").optional(),
  body("otpExpiry").optional(),
];

export const userValidationRules = [
  param("id").isMongoId().withMessage("Invalid user id"),
];
