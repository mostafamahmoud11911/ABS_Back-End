import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const protectedRoute = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return next(new ApiError("token not found", 401));
  }

  token = token.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
  } catch (err) {
    return next(new ApiError(err.message, 401));
  }
};
