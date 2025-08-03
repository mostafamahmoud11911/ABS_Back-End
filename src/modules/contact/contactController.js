import Contact from "../../database/models/contactModel.js";
import { catchError } from "../../middleware/catchError.js";
import message from "../../utils/emailContact.js";

export const getAllContact = catchError(async (req, res, next) => {
  const contacts = await Contact.find();

  res.status(200).json({ message: "Contacts fetched successfully", contacts });
});

export const addContact = catchError(async (req, res, next) => {
  const isBlocked = await Contact.findOne({
    email: req.body.email,
    blocked: true,
  });

  if (isBlocked) {
    return next(new AppError("this email can't send message", 403));
  }

  const contact = new Contact(req.body);

  await contact.save();

  if (contact) {
    message(contact);
  }

  res.status(200).json({ message: "Contact added successfully", contact });
});

export const deleteContact = catchError(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  !contact ||
    res.status(200).json({ message: "Contact deleted successfully", contact });
  contact || next(new AppError("Contact not found", 404));
});

export const blockContact = catchError(async (req, res, next) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
  });

  if (!contact) {
    return next(new AppError("Contact not found", 404));
  }

  contact.blocked = !contact.blocked;

  await contact.save();

  res.status(200).json({
    message: `Contact has been ${contact.blocked ? "blocked" : "unblocked"}`,
    contact,
  });
});
