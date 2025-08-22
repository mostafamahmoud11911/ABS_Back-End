import authRouter from "./auth/authRouter.js";
import clientsRouter from "./client/clientRouter.js";
import toolsRouter from "./tools/toolsRouter.js";
import servicesRouter from "./services/servicesRouter.js";
import dashboardRouter from "./dashboard/dashboardRouter.js";
import contactsRouter from "./contact/contactRouter.js";
import pestsRouter from "./pests/pestRouter.js";


const bootstrap = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/clients", clientsRouter);
  app.use("/api/tools", toolsRouter);
  app.use("/api/services", servicesRouter);
  app.use("/api/pests", pestsRouter);
  app.use("/api/contacts", contactsRouter);
  app.use("/api/dashboard", dashboardRouter);
};

export default bootstrap;
