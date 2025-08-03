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
    passwordChangedAt: Date,
    otp: {
      type: String,
      minLength: 6,
      maxLength: 6,
    },
    otpExpiry: {
      type: Date,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

schema.pre("findOneAndUpdate", async function () {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
});

const User = mongoose.model("User", schema);

export default User;
