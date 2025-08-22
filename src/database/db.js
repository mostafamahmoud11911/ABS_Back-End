import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
export default connect;
