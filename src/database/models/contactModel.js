import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = mongoose.model("Contact", schema);

export default Contact;