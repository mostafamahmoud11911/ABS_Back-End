import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      default: "user"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});


const User = mongoose.model("User", schema);

export default User;
