import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro,
  );

  const mailOptions = {
    from: `"Signalist" <signalist@priyam.com>`,
    to: email,
    subject: `Welcome to Signalist - your stock market toolkit is ready`,
    text: "Thanks for joining Signalist",
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
