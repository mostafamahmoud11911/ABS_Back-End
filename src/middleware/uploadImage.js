import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import AppError from "../utils/AppError.js";

function fileUpload(folderName) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `src/uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new AppError("Only image files are allowed", 400), false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload;
}

export function uploadSingleImage(folderName, fileName) {
  return fileUpload(folderName).single(fileName);
}

export function uploadMax(folderName, arrayOfFields) {
  return fileUpload(folderName).fields(arrayOfFields);
}
