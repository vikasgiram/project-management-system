const nodemailer = require('nodemailer');
const gmailTransport = require('nodemailer-gmail');

exports.sendMail = (res, user, link) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use a secure connection
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let mailOptions = {
    from: `DAccess <${process.env.EMAIL}>`,
    to: user.email,
    subject: `Password reset Link`,
    html: `<p>Click on the link to reset your password: <a href="${link}">${link}</a></p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Error sending email: ' + error.message });
    } else {
      return res.status(200).json({ message: 'Reset password link is sent to your registered Email Id...' });
    }
  });
};