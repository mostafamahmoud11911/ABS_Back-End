import express from "express";
import {
  addContact,
  blockContact,
  deleteContact,
  getAllContact,
} from "./contactController.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";
import validationErrors from "../../middleware/validationError.js";
import {
  addContactValidation,
  deleteContactValidation,
} from "./contactValidation.js";

const contactRouter = express.Router();

contactRouter.get("/", protectedRoute, authorization("admin"), getAllContact);
contactRouter.post("/", validationErrors(addContactValidation), addContact);
contactRouter.delete(
  "/:id",
  validationErrors(deleteContactValidation),
  protectedRoute,
  authorization("admin"),
  deleteContact
);
contactRouter.patch(
  "/:id",
  validationErrors(deleteContactValidation),
  protectedRoute,
  authorization("admin"),
  blockContact
);

export default contactRouter;
