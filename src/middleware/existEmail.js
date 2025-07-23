import User from "../database/models/userModel.js";
import AppError from "../utils/AppError.js";

async function existEmail(req, res, next) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new AppError("Email already exist", 400));
  }
  next();
}

export default existEmail;
