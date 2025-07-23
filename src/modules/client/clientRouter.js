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

const clientRouter = express.Router();

clientRouter.post(
  "/",
  uploadSingleImage("clients", "companyImg"),
  protectedRoute,
  authorization("admin"),
  addClient
);
clientRouter.get("/", getAllClients);
clientRouter.get("/:id", protectedRoute, authorization("admin"), getClient);
clientRouter.put("/:id",  uploadSingleImage("clients", "companyImg"), protectedRoute, authorization("admin"), updateClient);
clientRouter.delete(
  "/:id",
  protectedRoute,
  authorization("admin"),
  deleteClient
);

export default clientRouter;
