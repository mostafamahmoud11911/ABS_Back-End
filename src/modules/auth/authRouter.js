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
import { uploadSingleImage } from "../../middleware/uploadImage.js";
import existEmail from "../../middleware/existEmail.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  uploadSingleImage("users", "picture"),
  existEmail,
  signUp
);
authRouter.post("/signin", signIn);
authRouter.put("/change-password", protectedRoute, changePassword);
authRouter.put("/verify", verifyEmail);
authRouter.post("/forget-password", forgetPassword);
authRouter.put("/reset-password", resetPassword);
export default authRouter;
