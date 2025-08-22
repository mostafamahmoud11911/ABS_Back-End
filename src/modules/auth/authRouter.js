import express from "express";
import {
  signIn,
} from "./authController.js";
import validationErrors from "../../middleware/validationError.js";
import { signInSchema } from "./authValidation.js";

const authRouter = express.Router();


authRouter.post("/signin", validationErrors(signInSchema), signIn);

export default authRouter;
