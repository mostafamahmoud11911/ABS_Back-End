import Tools from "../../database/models/toolsModel.js";
import { catchError } from "../../middleware/catchError.js";
import AppError from "../../utils/AppError.js";
import { deleteImage, uploadImage } from "../../utils/cloudinary.js";
import path from "path";
import fs from "fs";

const addTool = catchError(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }

  const tool = new Tools(req.body);

  if (req.file && tool) {
    const result = await uploadImage(req.file, "tools");
    tool.image = result.secure_url;
    tool.imageId = result.public_id;
  }

  await tool.save();
  const pathName = path.join(
    path.resolve(),
    "src/uploads/tools",
    req.file.filename
  );
  fs.unlinkSync(pathName);
  res.status(200).json({ message: "Tools added successfully", tool });
});

const getAllTools = catchError(async (req, res, next) => {
  const tools = await Tools.find();

  tools || next(new AppError("Tools not found", 404));
  !tools ||
    res.status(200).json({ message: "Tools fetched successfully", tools });
});

const getTool = catchError(async (req, res, next) => {
  const tool = await Tools.findById(req.params.id);
  !tool ||
    res.status(200).json({ message: "Tools fetched successfully", tool });
  tool || next(new AppError("Tools not found", 404));
});

const deleteTool = catchError(async (req, res, next) => {
  const tool = await Tools.findByIdAndDelete(req.params.id);

  if (tool && tool.image && tool.imageId) {
    await deleteImage(tool.imageId);
  }

  !tool ||
    res.status(200).json({ message: "Tools deleted successfully", tool });
  tool || next(new AppError("Tools not found", 404));
});

const updateTool = catchError(async (req, res, next) => {

  const prevTool = await Tools.findById(req.params.id);

  if (req.file) {
    const result = await uploadImage(req.file, "tools");
    if (result && result.secure_url) {
      if (prevTool.imageId) {
        await deleteImage(prevTool.imageId);
      }

      req.body.image = result.secure_url;
      req.body.imageId = result.public_id;
    }
  }
  const tool = await Tools.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  const pathName = path.join(
    path.resolve(),
    "src/uploads/tools",
    req.file.filename
  );
  fs.unlinkSync(pathName);

  !tool ||
    res.status(200).json({ message: "Tools updated successfully", tool });
  tool || next(new AppError("Tools not found", 404));
});

export { addTool, getAllTools, getTool, deleteTool, updateTool };
