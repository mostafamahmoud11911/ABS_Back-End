import User from "../database/models/userModel.js";

export const cleanUnconfirmedEmails = async () => {
  const time = new Date(Date.now() - 24 * 60 * 60 * 1000);

  await User.deleteMany({ confirmEmail: false, createdAt: { $lt: time } });
};
