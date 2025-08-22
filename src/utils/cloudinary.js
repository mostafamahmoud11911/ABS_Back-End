import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file, folder) => {
  try {
    const data = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
      folder: `ABS/${folder}`,
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const deleteImage = async (id) => {
  const data = await cloudinary.uploader.destroy(id);
  return data;
};
