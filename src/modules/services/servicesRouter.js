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
  addServiceValidationRules,
  serviceValidationRules,
  updateServiceValidationRules,
} from "./serviceValidation.js";

const servicesRouter = express.Router();

servicesRouter.get("/", getAllServices);
servicesRouter.get(
  "/:slug",
  serviceValidationRules,
  validationErrors,
  getServiceBySlug
);
servicesRouter.get(
  "/single/:id",
  serviceValidationRules,
  validationErrors,
  getService
);
servicesRouter.post(
  "/",
  protectedRoute,
  authorization("admin"),
  uploadSingleImage("services", "image"),
  addServiceValidationRules,
  validationErrors,
  addService
);
servicesRouter.put(
  "/:id",
  protectedRoute,
  authorization("admin"),
  uploadSingleImage("services", "image"),
  updateServiceValidationRules,
  validationErrors,
  updateService
);
servicesRouter.delete(
  "/:id",
  protectedRoute,
  authorization("admin"),
  serviceValidationRules,
  validationErrors,
  deleteService
);

export default servicesRouter;
