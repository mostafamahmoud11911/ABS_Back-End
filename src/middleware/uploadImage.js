import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../utils/ApiError.js";

function fileUpload() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `src/uploads/temp`);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only image files are allowed", 400), false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload;
}

export function uploadSingleImage(fileName) {
  return fileUpload().single(fileName);
}