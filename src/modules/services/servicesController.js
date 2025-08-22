import slugify from "slugify";
import Service from "../../database/models/serviceModel.js";
import { catchError } from "../../middleware/catchError.js";
import ApiError from "../../utils/ApiError.js";
import path from "path";
import fs from "fs";
import { deleteImage, uploadImage } from "../../utils/cloudinary.js";

const getAllServices = catchError(async (req, res, next) => {
  const services = await Service.find();

  res.status(200).json({ message: "Services fetched successfully", services });
});

const getServiceBySlug = catchError(async (req, res, next) => {
  const service = await Service.findOne({ slug: req.params.slug });

  !service ||
    res.status(200).json({ message: "Service fetched successfully", service });
  service || next(new ApiError("Service not found", 404));
});

const getService = catchError(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  !service ||
    res.status(200).json({ message: "Service fetched successfully", service });

  service || next(new ApiError("Service not found", 404));
});

const addService = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  if (req.file) {
    const result = await uploadImage(req.file, "services");
    if (result && result.secure_url) {
      req.body.image = result.secure_url;
      req.body.imageId = result.public_id;
    }

    const pathName = path.join(
      path.resolve(),
      "src/uploads/temp",
      req.file.filename
    );
    fs.unlinkSync(pathName);
  }
  const service = new Service(req.body);
  await service.save();

  res.status(201).json({ message: "Services added successfully", service });
});

const updateService = catchError(async (req, res, next) => {
  const prevService = await Service.findById(req.params.id);

  if (!prevService) {
    return next(new ApiError("Service not found", 404));
  }
  if (req.file) {
    const result = await uploadImage(req.file, "services");
    if (result && result.secure_url) {
      if (prevService.imageId) {
        await deleteImage(prevService.imageId);
      }

      req.body.image = result.secure_url;
      req.body.imageId = result.public_id;
    }

    const pathName = path.join(
      path.resolve(),
      "src/uploads/services",
      req.file.filename
    );
    fs.unlinkSync(pathName);
  }
  req.body.slug = slugify(req.body.title);
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Service updated successfully", service });
});

const deleteService = catchError(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (service && service.image && service.imageId) {
    await deleteImage(service.imageId);
  }

  !service ||
    res.status(200).json({ message: "Service deleted successfully", service });
  service || next(new ApiError("Service not found", 404));
});

export {
  getAllServices,
  getServiceBySlug,
  getService,
  addService,
  updateService,
  deleteService,
};
