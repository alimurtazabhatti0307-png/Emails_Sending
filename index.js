import nodemailer from "nodemailer";

export default async ({ req, res, log }) => {
  try {
    log("Email function started");

    const { to, subject, message } = JSON.parse(req.body || "{}");

    if (!to || !subject || !message) {
      return res.json({
        success: false,
        error: "Missing email data",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Home Choice Reality" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: message,
    });

    log("Email sent successfully");

    return res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    log(error.message);

    return res.json({
      success: false,
      error: error.message,
    });
  }
};
