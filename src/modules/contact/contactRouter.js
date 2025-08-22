import express from "express";
import {
  addContact,
  blockContact,
  deleteContact,
  getAllContact,
  getContact,
} from "./contactController.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";
import validationErrors from "../../middleware/validationError.js";
import {
  addContactValidation,
  contactValidation,
} from "./contactValidation.js";

const contactRouter = express.Router();

contactRouter.get("/", protectedRoute, authorization("admin"), getAllContact);
contactRouter.post("/", validationErrors(addContactValidation), addContact);
contactRouter.get("/:id", validationErrors(contactValidation), getContact);
contactRouter.delete(
  "/:id",
  validationErrors(contactValidation),
  protectedRoute,
  authorization("admin"),
  deleteContact
);
contactRouter.patch(
  "/:id",
  validationErrors(contactValidation),
  protectedRoute,
  authorization("admin"),
  blockContact
);

export default contactRouter;
