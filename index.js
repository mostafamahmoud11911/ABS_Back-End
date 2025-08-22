import express from "express";
import connect from "./src/database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import globalError from "./src/middleware/globalError.js";
import ApiError from "./src/utils/ApiError.js";
import bootstrap from "./src/modules/bootstrap.js";
import helmet from "helmet";
dotenv.config();
const app = express();
const port = process.env.PORT || 3300;

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use("/uploads", express.static("public"));

bootstrap(app);

app.use("*", (req, res, next) => {
  next(new ApiError("Route not found", 404));
});

app.use(globalError);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
