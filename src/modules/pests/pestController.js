import Pest from "../../database/models/pestModel.js";
import { catchError } from "../../middleware/catchError.js";
import { uploadImage } from "../../utils/cloudinary.js";
import path from "path";
import fs from "fs";
import AppError from "../../utils/AppError.js";

export const addPest = catchError(async (req, res) => {
  if (req.files) {

    if (req.files.image && req.files.image[0]) {
      const file = req.files.image[0];
      const result = await uploadImage(file, "pests");

      if (result && result.secure_url) {
        req.body.image = {
          url: result.secure_url,
          id: result.public_id,
        };

        const pathName = path.join(
          path.resolve(),
          "src/uploads/pests",
          file.filename
        );
        fs.unlinkSync(pathName);
      }
    }


    if (Array.isArray(req.files.images)) {
      const uploadedImages = [];

      for (const file of req.files.images) {
        const result = await uploadImage(file, "pests");

        if (result && result.secure_url) {
          uploadedImages.push({
            url: result.secure_url,
            id: result.public_id,
          });

          const pathName = path.join(
            path.resolve(),
            "src/uploads/pests",
            file.filename
          );
          fs.unlinkSync(pathName);
        }
      }

      req.body.images = uploadedImages;
    }
  }

  const pest = new Pest(req.body);

  await pest.save();
  res.status(201).json({ message: "Pest added successfully", pest });
});

export const getAllPests = catchError(async (req, res) => {
  const pests = await Pest.find();
  res.status(200).json({ message: "Pests fetched successfully", pests });
});

export const getPest = catchError(async (req, res, next) => {
  const pest = await Pest.findById(req.params.id);
  pest || next(new AppError("Pest not found", 404));
  !pest || res.status(200).json({ message: "Pest fetched successfully", pest });
});

export const deletePest = catchError(async (req, res) => {
  const pest = await Pest.findByIdAndDelete(req.params.id);
  if (pest.image?.id) {
    await deleteImage(service.image.id);
  }


  if (pest.images?.length) {
    for (const img of service.images) {
      if (img.id) await deleteImage(img.id);
    }
  }
  pest || next(new AppError("Pest not found", 404));
  !pest || res.status(200).json({ message: "Pest deleted successfully", pest });
});
