import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./userController.js";
import existEmail from "../../middleware/existEmail.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";
import validationErrors from "../../middleware/validationError.js";
import {
  addUserValidation,
  updateUserValidation,
  userValidation,
} from "./userValidation.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  validationErrors(addUserValidation),
  protectedRoute,
  authorization("admin"),
  existEmail,
  addUser
);
userRouter.get("/", protectedRoute, authorization("admin"), getAllUsers);
userRouter.get(
  "/:id",
  validationErrors(userValidation),
  protectedRoute,
  authorization("admin"),
  getUser
);
userRouter.delete(
  "/:id",
  validationErrors(userValidation),
  protectedRoute,
  authorization("admin"),
  deleteUser
);
userRouter.put(
  "/:id",
  validationErrors(updateUserValidation),
  protectedRoute,
  authorization("admin"),
  updateUser
);

export default userRouter;
