import User from "../../database/models/userModel.js";
import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../middleware/catchError.js";

export const signIn = catchError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ message: "User logged in successfully", token });
  }
  next(new ApiError("Wrong email or password", 401));
});
