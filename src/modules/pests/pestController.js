import Pest from "../../database/models/pestModel.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteImage, uploadImage } from "../../utils/cloudinary.js";
import path from "path";
import fs from "fs";
import ApiError from "../../utils/ApiError.js";

export const addPest = catchError(async (req, res) => {
  if (req.file) {
    const result = await uploadImage(req.file, "pests");

    if (result && result.secure_url) {
      req.body.image = result.secure_url 
      req.body.imageId = result.public_id

      const pathName = path.join(
        path.resolve(),
        "src/uploads/pests",
        req.file.filename
      );
      fs.unlinkSync(pathName);
    }
  }

  const pest = new Pest(req.body);

  await pest.save();
  res.status(201).json({ message: "Pest added successfully", pest });
});

export const getAllPests = catchError(async (req, res) => {
  const pests = await Pest.find().sort({ createdAt: -1 });
  res.status(200).json({ message: "Pests fetched successfully", pests });
});

export const getPest = catchError(async (req, res, next) => {
  const pest = await Pest.findById(req.params.id);
  pest || next(new ApiError("Pest not found", 404));
  !pest || res.status(200).json({ message: "Pest fetched successfully", pest });
});

export const deletePest = catchError(async (req, res, next) => {
  const pest = await Pest.findByIdAndDelete(req.params.id);
  if (pest && pest.imageId) {
    await deleteImage(pest.imageId);
  }

  pest || next(new ApiError("Pest not found", 404));
  !pest || res.status(200).json({ message: "Pest deleted successfully", pest });
});

export const updatePest = catchError(async (req, res, next) => {
  const prevPest = await Pest.findById(req.params.id);

  if (!prevPest) {
    return next(new ApiError("Pest not found", 404));
  }

  if (req.file) {
    const result = await uploadImage(req.file, "pests");

    if (result && result.secure_url) {
      if (prevPest.imageId) {
        await deleteImage(prevPest.imageId);
      }

      req.body.image = result.secure_url;
      req.body.imageId = result.public_id;

      const pathName = path.join(
        path.resolve(),
        "src/uploads/pests",
        req.file.filename
      );
      fs.unlinkSync(pathName);
    }

    const pest = await Pest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Pest updated successfully", pest });

    // if (Array.isArray(req.files.images)) {
    //   const uploadedImages = [];

    //   for (const file of req.files.images) {
    //     const result = await uploadImage(file, "pests");

    //     if (result && result.secure_url) {
    //       uploadedImages.push({
    //         url: result.secure_url,
    //         id: result.public_id,
    //       });

    //       if (prevPest.images?.length) {
    //         for (const img of prevPest.images) {
    //           if (img.id) await deleteImage(img.id);
    //         }
    //       }

    //       const pathName = path.join(
    //         path.resolve(),
    //         "src/uploads/pests",
    //         file.filename
    //       );
    //       fs.unlinkSync(pathName);
    //     }
    //   }

    //   req.body.images = uploadedImages;
    // }
  }
});
