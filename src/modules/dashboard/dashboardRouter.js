import express from "express";
import dashboard from "./dashboardController.js";
import { protectedRoute } from "../../middleware/protectedRoute.js";
import authorization from "../../middleware/authorization.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", protectedRoute, authorization("admin"), dashboard);

export default dashboardRouter;
