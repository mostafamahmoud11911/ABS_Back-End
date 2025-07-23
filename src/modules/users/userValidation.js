import { body, param } from "express-validator";

export const addUserValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("profilePic").optional(),
  body("role").isIn(["user", "admin"]).default("user").withMessage("Invalid role"),
  body("passwordChangedAt").optional(),
  body("otp").optional(),
  body("otpExpiry").optional(),
];

export const updateUserValidationRules = [
  body("name").optional(),
  body("email").optional(),
  body("password").optional(),
  body("profilePic").optional(),
  body("role").optional(),
  body("passwordChangedAt").optional(),
  body("otp").optional(),
  body("otpExpiry").optional(),
];

export const userValidationRules = [
  param("id").isMongoId().withMessage("Invalid user id"),
];
