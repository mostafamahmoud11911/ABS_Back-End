import express from "express";
import {
  addPest,
  deletePest,
  getAllPests,
  getPest,
  updatePest,
} from "./pestController.js";
import { uploadSingleImage } from "../../middleware/uploadImage.js";
import validationErrors from "../../middleware/validationError.js";
import {
  addPestSchema,
  pestSchema,
  updatePestSchema,
} from "./pestValidation.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";

const pestRouter = express.Router();

pestRouter.post(
  "/",
  uploadSingleImage("image"),
  validationErrors(addPestSchema),
  protectedRoute,
  authorization("admin"),
  addPest
);

pestRouter.get("/", getAllPests);
pestRouter.get(
  "/:id",
  validationErrors(pestSchema),
  protectedRoute,
  authorization("admin"),
  getPest
);
pestRouter.delete(
  "/:id",
  validationErrors(pestSchema),
  protectedRoute,
  authorization("admin"),
  deletePest
);

pestRouter.put(
  "/:id",
  uploadSingleImage("image"),
  validationErrors(updatePestSchema),
  protectedRoute,
  authorization("admin"),
  updatePest
);

export default pestRouter;
