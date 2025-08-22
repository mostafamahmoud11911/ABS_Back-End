import nodemailer from "nodemailer";

const message = (contact) => {
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
    from: `"${contact.email}" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: "📬 New Contact Message - ABS Company",
    replyTo: contact.email,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9;">
        <h2 style="color: #0056b3;">📩 New Contact Message</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Message:</td>
            <td style="padding: 8px;">${contact.message}</td>
          </tr>
          <tr style="background-color: #f1f1f1;">
            <td style="padding: 8px; font-weight: bold;">City:</td>
            <td style="padding: 8px;">${contact.city}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone:</td>
            <td style="padding: 8px;">${contact.phone}</td>
          </tr>
          <tr style="background-color: #f1f1f1;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${contact.email}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 14px; color: #888;">This message was sent via ABS Company contact form.</p>
      </div>
    `,
  });
};
export default message;
