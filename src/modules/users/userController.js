import User from "../../database/models/userModel.js";
import { catchError } from "../../middleware/catchError.js";
import AppError from "../../utils/AppError.js";
import { deleteImage, uploadImage } from "../../utils/cloudinary.js";
import fs from "fs";
import path from "path";

export const addUser = catchError(async (req, res) => {
  if (req.file) {
    req.body.profilePic = req.file.path;
  }
  const user = new User(req.body);
  user.confirmEmail = true;

  if (user && req.file) {
    const result = await uploadImage(req.file, "profile");
    user.profilePic = result.secure_url;
    user.profilePicId = result.public_id;
  }

  await user.save();

  const pathName = path.join(
    path.resolve(),
    "src/uploads/users",
    req.file.filename
  );
  fs.unlinkSync(pathName);
  res.status(201).json({ message: "User created successfully", user });
});

export const getAllUsers = catchError(async (req, res) => {
  const users = await User.find().select("-profilePicId -password");
  res.status(200).json({ message: "Users fetched successfully", users });
});

export const getUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id).select(
    "-profilePicId -password"
  );
  user || next(new AppError("User not found", 404));
  !user || res.status(200).json({ message: "User fetched successfully", user });
});

export const updateUser = catchError(async (req, res, next) => {


  const prevUser = await User.findById(req.params.id);
  if (req.file) {
    const result = await uploadImage(req.file, "profile");
    if (result && result.secure_url) {
      if (prevUser.profilePicId) {
        await deleteImage(prevUser.profilePicId);
      }

      req.body.profilePic = result.secure_url;
      req.body.profilePicId = result.public_id;
    }
  }


  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-profilePicId -password");

  const pathName = path.join(
    path.resolve(),
    "src/uploads/users",
    req.file.filename
  );
  fs.unlinkSync(pathName);

  user || next(new AppError("User not found", 404));
  !user || res.status(200).json({ message: "User updated successfully", user });
});




export const deleteUser = catchError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (user && user.profilePic && user.profilePicId) {
    await deleteImage(user.profilePicId);
  }

  user || next(new AppError("User not found", 404));
  !user || res.status(200).json({ message: "User deleted successfully", user });
});
