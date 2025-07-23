import { validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

function validationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        errors.array().map((err) => err.msg),
        400
      )
    );
  }
  next();
}

export default validationErrors;
