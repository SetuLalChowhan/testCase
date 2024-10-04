const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        secure: true, // Use SSL
        port: 465,    // Gmail's secure port for SSL
        auth: {
          user: process.env.EMAIL_USERNAME, // Your Gmail address
          pass: process.env.EMAIL_PASSWORD, // Use the generated App Password here
        },
      });

  const mailOptions = {
    from: `"Authentication" <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
