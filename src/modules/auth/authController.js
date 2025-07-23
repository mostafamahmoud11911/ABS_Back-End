import User from "../../database/models/userModel.js";
import bcrypt from "bcrypt";
import AppError from "../../utils/AppError.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../middleware/catchError.js";
import { uploadImage } from "../../utils/cloudinary.js";
import email from "../../utils/email.js";
import path from "path";
import fs from "fs";

export const signUp = catchError(async (req, res) => {
  const digitNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  req.body.otp = String(digitNum);
  req.body.otpExpiry = Date.now() + 24 * 60 * 60 * 1000;

  email(req.body.email, digitNum);

  const user = new User(req.body);
  await user.save();

  if (req.file) {
    const result = await uploadImage(req.file, "profile");
    req.body.profilePic = result.secure_url;
    req.body.profilePicId = result.public_id;
  }

  const pathName = path.join(
    path.resolve(),
    "src/uploads/users",
    req.file.filename
  );
  fs.unlinkSync(pathName);


  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET
  );
  res.status(201).json({ message: "User created successfully", token });
});

export const signIn = catchError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    confirmEmail: true,
  });


  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  }
  next(new AppError("Wrong email or password", 401));
});

export const changePassword = catchError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user && bcrypt.compare(req.body.oldPassword, user.password)) {
    await User.findByIdAndUpdate(user._id, {
      password: req.body.newPassword,
      passwordChangedAt: Date.now(),
    });

    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ message: "Password changed successfully", token });
  }
  next(new AppError("User not found", 404));
});

export const verifyEmail = catchError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    otp: req.body.otp,
    otpExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid otp", 400));
  }

  await User.findByIdAndUpdate(user._id, {
    confirmEmail: true,
    otp: null,
    otpExpiry: null,
  });

  res.status(200).json({ message: "Email verified successfully" });
});

export const forgetPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    confirmEmail: true,
  });

  if (!user) {
    return next(
      new AppError(
        "User with this email does not exist or email is not verified",
        404
      )
    );
  }

  const digitNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  user.otp = String(digitNum);
  user.otpExpiry = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();


  email(user.email, String(digitNum));
  res.status(200).json({ message: "Otp sent successfully" });
});

export const resetPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({
    otp: req.body.otp,
    otpExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid otp", 400));
  }

  await User.findByIdAndUpdate(user._id, {
    password: req.body.newPassword,
    passwordChangedAt: Date.now(),
    otp: null,
    otpExpiry: null,
  });

  res.status(200).json({ message: "Password reset successfully" });
});