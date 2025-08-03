import express from "express";
import { addPest, deletePest, getAllPests, getPest } from "./pestController.js";
import { uploadMax } from "../../middleware/uploadImage.js";
import validationErrors from "../../middleware/validationError.js";
import { addPestSchema, pestSchema } from "./pestValidation.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";

const pestRouter = express.Router();

pestRouter.post(
  "/",
  uploadMax("pests", [
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
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

export default pestRouter;
