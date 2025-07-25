import express from "express";
import connect from "./src/database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import globalError from "./src/middleware/globalError.js";
import AppError from "./src/utils/AppError.js";
import bootstrap from "./src/modules/bootstrap.js";
import cron from "node-cron";
import { cleanUnconfirmedEmails } from "./src/utils/cleanUnconfirmEmail.js";
dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("public"));

bootstrap(app);

cron.schedule("0 0 * * *", () => {
  cleanUnconfirmedEmails();
});

app.use("*", (req, res, next) => {
  next(new AppError("Route not found" + req.originalUrl, 404));
});

app.use(globalError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
