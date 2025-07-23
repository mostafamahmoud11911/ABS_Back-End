import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Client = mongoose.model("Client", schema);

export default Client;
