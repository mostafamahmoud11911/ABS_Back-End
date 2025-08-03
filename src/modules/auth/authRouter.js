import express from "express";
import {
  changePassword,
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
  verifyEmail,
} from "./authController.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import existEmail from "../../middleware/existEmail.js";
import validationErrors from "../../middleware/validationError.js";
import { changePasswordSchema, forgetPasswordSchema, resetPasswordSchema, signInSchema } from "./authValidation.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  existEmail,
  signUp
);
authRouter.post("/signin", validationErrors(signInSchema), signIn);
authRouter.put("/change-password", validationErrors(changePasswordSchema), protectedRoute, changePassword);
authRouter.put("/verify", verifyEmail);
authRouter.post("/forget-password", validationErrors(forgetPasswordSchema), forgetPassword);
authRouter.put("/reset-password", validationErrors(resetPasswordSchema), resetPassword);
export default authRouter;
