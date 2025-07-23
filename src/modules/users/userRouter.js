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
import {
  addUserValidationRules,
  updateUserValidationRules,
  userValidationRules,
} from "./userValidation.js";
import validationErrors from "../../middleware/validationError.js";
import { uploadSingleImage } from "../../middleware/uploadImage.js";
import authorization from "../../middleware/authorization.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(
    protectedRoute,
    uploadSingleImage("users", "profilePic"),
    addUserValidationRules,
    validationErrors,
    authorization("admin"),
    existEmail,
    addUser
  )
  .get(protectedRoute, getAllUsers);
userRouter
  .route("/:id")
  .get(
    userValidationRules,
    validationErrors,
    protectedRoute,
    authorization("admin"),
    getUser
  )
  .delete(
    userValidationRules,
    validationErrors,
    protectedRoute,
    authorization("admin"),
    deleteUser
  )
  .put(
    uploadSingleImage("users", "profilePic"),
    updateUserValidationRules,
    validationErrors,
    protectedRoute,
    authorization("admin"),
    updateUser
  );

export default userRouter;
