import slug from "slug";
import Client from "../../database/models/clientModel.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteImage, uploadImage } from "../../utils/cloudinary.js";
import AppError from "../../utils/AppError.js";
import path from "path";
import fs from "fs";

export const addClient = catchError(async (req, res, next) => {
  req.body.slug = slug(req.body.company);
  if (req.file) {
    req.body.image = req.file.path;
  }
  const client = new Client(req.body);

  if (req.file && client) {
    const result = await uploadImage(req.file, "clients");
    client.image = result.secure_url;
    client.imageId = result.public_id;
  }

  await client.save();

  const pathName = path.join(
    path.resolve(),
    "src/uploads/clients",
    req.file.filename
  );
  fs.unlinkSync(pathName);

  res.status(201).json({ message: "Client added successfully", client });
});

export const getAllClients = catchError(async (req, res, next) => {
  const clients = await Client.find().select("-imageId");
  !clients ||
    res.status(200).json({ message: "Clients fetched successfully", clients });

  clients || next(new AppError("Clients not found", 404));
});

export const getClient = catchError(async (req, res, next) => {
  const client = await Client.findById(req.params.id).select("-imageId");
  !client ||
    res.status(200).json({ message: "Client fetched successfully", client });

  client || next(new AppError("Client not found", 404));
});

export const updateClient = catchError(async (req, res, next) => {
  const prevClient = await Client.findById(req.params.id);

  if (req.file) {
    const result = await uploadImage(req.file, "clients");
    if (result && result.secure_url) {
      if (prevClient.imageId) {
        await deleteImage(prevClient.imageId);
      }

      req.body.image = result.secure_url;
      req.body.imageId = result.public_id;
    }
  }

  const pathName = path.join(
    path.resolve(),
    "src/uploads/clients",
    req.file.filename
  );
  fs.unlinkSync(pathName);

  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  !client ||
    res.status(200).json({ message: "Client updated successfully", client });
  client || next(new AppError("Client not found", 404));
});

export const deleteClient = catchError(async (req, res, next) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  if (client && client.image && client.imageId) {
    await deleteImage(client.imageId);
  }
  !client || res.status(200).json({ message: "Client deleted successfully" });
  client || next(new AppError("Client not found", 404));
});
