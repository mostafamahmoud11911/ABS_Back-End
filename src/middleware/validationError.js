import AppError from "../utils/ApiError.js";

function validationErrors(schema) {
  return async (req, res, next) => {
    let imgObj = {};

    const { file, files } = req;

    if (file?.fieldname === "image") {
      imgObj.image = file;
    }

    // if (files?.image && Array.isArray(files.image)) {
    //   imgObj.image = files.image[0];
    // }

    // if (files?.images && Array.isArray(files.images)) {
    //   imgObj.images = files.images;
    // }


    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
        ...imgObj,
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      let errMsgs = error.details.map((err) => err.message);
      return next(new AppError(errMsgs, 400));
    }
    next();
  };
}

export default validationErrors;
