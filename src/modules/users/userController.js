import User from "../../database/models/userModel.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../middleware/catchError.js";
import AppError from "../../utils/AppError.js";

export const addUser = catchError(async (req, res) => {
  const user = new User(req.body);
  user.confirmEmail = true;

  await user.save();

  res.status(201).json({ message: "User created successfully", user });
});

export const getAllUsers = catchError(async (req, res) => {
  const users = await User.find().select("-password -otp -otpExpiry -confirmEmail -passwordChangedAt");
  res.status(200).json({ message: "Users fetched successfully", users });
});

export const getUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  user || next(new AppError("User not found", 404));
  !user || res.status(200).json({ message: "User fetched successfully", user });
});

export const updateUser = catchError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-password");

  if (!user) return next(new AppError("User not found", 404));

  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({ message: "User updated successfully", token, user });
});

export const deleteUser = catchError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  user || next(new AppError("User not found", 404));
  !user || res.status(200).json({ message: "User deleted successfully", user });
});
