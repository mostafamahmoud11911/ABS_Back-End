import User from "../database/models/userModel.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const protectedRoute = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return next(new AppError("token not found", 401));
  }

  token = token.split(" ")[1];

  let userPayload = null;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError(err.message, 401));
    }

    userPayload = decoded;
  });

  const user = await User.findById(userPayload._id);
  if (!user) {
    return next(new AppError("User not found", 401));
  }

  if (user.passwordChangedAt) {
    const changedTimestamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (userPayload.iat < changedTimestamp) {
      return next(new AppError("invalid token, Please try again", 401));
    }
  }

  req.user = user;
  next();
};
