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

const toolsRouter = express.Router();

toolsRouter.post(
  "/",
  uploadSingleImage("tools", "toolImg"),
  protectedRoute,
  authorization("admin"),
  addTool
);
toolsRouter.get("/", getAllTools);
toolsRouter.get("/:id", protectedRoute, authorization("admin"), getTool);
toolsRouter.put("/:id", protectedRoute, authorization("admin"), updateTool);
toolsRouter.delete("/:id", protectedRoute, authorization("admin"), deleteTool);

export default toolsRouter;
