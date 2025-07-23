import nodemailer from "nodemailer";
import { gmailTemplate } from "./emailTemplate.js";

const email = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail({
    from: `"ABS Company" <${process.env.EMAIL}>`,
    to: email,
    subject: "ABS Company",
    text: "Hello world?",
    html: `${gmailTemplate(otp)}`,
  });
};
export default email;
