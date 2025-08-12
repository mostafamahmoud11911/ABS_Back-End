import ApiError from "../utils/ApiError.js";

function authorization(...roles) {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      next(new ApiError("You are not authorized to perform this action", 403));
    }
  };
}

export default authorization;
