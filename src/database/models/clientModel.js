import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
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
