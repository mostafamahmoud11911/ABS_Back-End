import Pest from "../../database/models/pestModel.js";
import { catchError } from "../../middleware/catchError.js";
import { uploadImage } from "../../utils/cloudinary.js";
import path from "path";
import fs from "fs";
import ApiError from "../../utils/ApiError.js";

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
  pest || next(new ApiError("Pest not found", 404));
  !pest || res.status(200).json({ message: "Pest fetched successfully", pest });
});

export const deletePest = catchError(async (req, res, next) => {
  const pest = await Pest.findByIdAndDelete(req.params.id);
  if (pest && pest.image?.id) {
    await deleteImage(service.image.id);
  }

  if (pest && pest.images?.length) {
    for (const img of service.images) {
      if (img.id) await deleteImage(img.id);
    }
  }
  pest || next(new ApiError("Pest not found", 404));
  !pest || res.status(200).json({ message: "Pest deleted successfully", pest });
});

export const updatePest = catchError(async (req, res, next) => {
  const prevPest = await Pest.findById(req.params.id);

  if (!prevPest) {
    return next(new ApiError("Pest not found", 404));
  }

  if (req.files) {
    if (req.files.image && req.files.image[0]) {
      const file = req.files.image[0];
      const result = await uploadImage(file, "pests");

      if (result && result.secure_url) {
        if (prevPest.image?.id) {
          await deleteImage(prevPest.image.id);
        }

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

          if (prevPest.images?.length) {
            for (const img of prevPest.images) {
              if (img.id) await deleteImage(img.id);
            }
          }

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
});
