import userRouter from "./users/userRouter.js";
import authRouter from "./auth/authRouter.js";
import clientRouter from "./client/clientRouter.js";
import toolsRouter from "./tools/toolsRouter.js";
import servicesRouter from "./services/servicesRouter.js";
const bootstrap = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/clients", clientRouter);
  app.use("/api/tools", toolsRouter);
  app.use("/api/services", servicesRouter);
};

export default bootstrap;
