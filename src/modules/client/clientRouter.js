import express from "express";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";
import {
  addClient,
  deleteClient,
  getAllClients,
  getClient,
  updateClient,
} from "./clientController.js";
import { uploadSingleImage } from "../../middleware/uploadImage.js";
import validationErrors from "../../middleware/validationError.js";
import {
  addClientSchema,
  clientSchema,
  updateClientSchema,
} from "./clientValidation.js";

const clientRouter = express.Router();

clientRouter.post(
  "/",
  uploadSingleImage("clients", "image"),
  protectedRoute,
  authorization("admin"),
  validationErrors(addClientSchema),
  addClient
);
clientRouter.get("/", getAllClients);
clientRouter.get(
  "/:id",
  protectedRoute,
  authorization("admin"),
  validationErrors(clientSchema),
  getClient
);
clientRouter.put(
  "/:id",
  uploadSingleImage("clients", "companyImg"),
  protectedRoute,
  authorization("admin"),
  validationErrors(updateClientSchema),
  updateClient
);
clientRouter.delete(
  "/:id",
  protectedRoute,
  authorization("admin"),
  validationErrors(clientSchema),
  deleteClient
);

export default clientRouter;
