import mongoose from "mongoose";

const subImages = new mongoose.Schema(
  {
    url: { type: String, required: true },
    id: { type: String, required: true },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

const Pest = mongoose.model("Pest", schema);
export default Pest;
