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
    profilePic: String,
    profilePicId: String,
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

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password, 10);
  }
});

const User = mongoose.model("User", schema);

export default User;
