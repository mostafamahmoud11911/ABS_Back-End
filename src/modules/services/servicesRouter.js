import express from "express";
import {
  addService,
  deleteService,
  getAllServices,
  getServiceBySlug,
  updateService,
} from "./servicesController.js";
import { uploadSingleImage } from "../../middleware/uploadImage.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";

const servicesRouter = express.Router();

servicesRouter.get("/", getAllServices);
servicesRouter.get("/:slug", getServiceBySlug);
servicesRouter.post(
  "/",
  protectedRoute,
  authorization("admin"),
  uploadSingleImage("services", "image"),
  addService
);
servicesRouter.put(
  "/:id",
  protectedRoute,
  authorization("admin"),
  updateService
);
servicesRouter.delete(
  "/:id",
  protectedRoute,
  authorization("admin"),
  deleteService
);

export default servicesRouter;
