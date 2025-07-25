import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
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
    active: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
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


const Service = mongoose.model("Service", schema);

export default Service;
