import express from "express";
import {
  addService,
  deleteService,
  getAllServices,
  getService,
  getServiceBySlug,
  updateService,
} from "./servicesController.js";
import { uploadSingleImage } from "../../middleware/uploadImage.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";
import validationErrors from "../../middleware/validationError.js";
import {
  addServiceSchema,
  getServiceSlugSchema,
  serviceSchema,
  updateServiceSchema,
} from "./serviceValidation.js";

const servicesRouter = express.Router();

servicesRouter.get("/", getAllServices);
servicesRouter.get(
  "/:slug",
  validationErrors(getServiceSlugSchema),
  getServiceBySlug
);
servicesRouter.get(
  "/single/:id",
  validationErrors(serviceSchema),
  protectedRoute,
  authorization("admin"),
  getService
);
servicesRouter.post(
  "/",
  protectedRoute,
  authorization("admin"),
  uploadSingleImage("image"),
  validationErrors(addServiceSchema),
  addService
);
servicesRouter.put(
  "/:id",
  validationErrors(updateServiceSchema),
  protectedRoute,
  authorization("admin"),
  uploadSingleImage("image"),
  updateService
);
servicesRouter.delete(
  "/:id",
  validationErrors(serviceSchema),
  protectedRoute,
  authorization("admin"),
  deleteService
);

export default servicesRouter;
