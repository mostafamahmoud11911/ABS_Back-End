import express from "express";
import {
  addTool,
  deleteTool,
  getAllTools,
  getTool,
  updateTool,
} from "./toolsController.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";
import { uploadSingleImage } from "../../middleware/uploadImage.js";
import {
  addToolValidation,
  toolValidation,
  updateToolValidation,
} from "./toolsValidation.js";
import validationErrors from "../../middleware/validationError.js";

const toolsRouter = express.Router();

toolsRouter.post(
  "/",
  validationErrors(addToolValidation),
  protectedRoute,
  authorization("admin"),
  uploadSingleImage("tools", "image"),
  addTool
);
toolsRouter.get("/", getAllTools);
toolsRouter.get(
  "/:id",
  validationErrors(toolValidation),
  protectedRoute,
  authorization("admin"),
  getTool
);
toolsRouter.put(
  "/:id",
  validationErrors(updateToolValidation),
  protectedRoute,
  authorization("admin"),
  uploadSingleImage("tools", "image"),
  updateTool
);
toolsRouter.delete(
  "/:id",
  validationErrors(toolValidation),
  protectedRoute,
  authorization("admin"),
  deleteTool
);

export default toolsRouter;
