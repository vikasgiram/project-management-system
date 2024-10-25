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
    subject: `Password Reset Request`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f7f9fc;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #007bff, #00c6ff);
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }
            h1 {
              margin: 0;
              font-size: 26px;
              font-weight: bold;
            }
            .content {
              padding: 20px;
            }
            p {
              color: #555;
              line-height: 1.5;
              font-size: 16px;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              font-size: 18px;
              color: #ffffff;
              background-color: #28a745;
              text-align: center;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
              transition: background-color 0.3s ease, transform 0.3s ease;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            .button:hover {
              background-color: #218838;
              transform: translateY(-2px);
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #aaa;
              text-align: center;
              padding: 20px;
              background-color: #f1f1f1;
            }
            .footer p {
              margin: 5px 0;
            }
            .icon {
              width: 30%;
              height: 50px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://daccess.co.in/wp-content/uploads/2023/06/logo.png" alt="Logo" class="icon" />
              <h1>Reset Your Password</h1>
            </div>
            <div class="content">
              <p>Hi ${user.name},</p>
              <p>We received a request to reset your password. Click the button below to set a new password:</p>
              <a href="${link}" style="display: inline-block; padding: 15px 30px; font-size: 18px; color: #ffffff; background-color: #28a745; text-align: center; text-decoration: none; border-radius: 5px; margin-top: 20px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">Reset Password</a>
              <p>If you did not request a password reset, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>Thank you for using DAccess!</p>
              <p>The DAccess Team</p>
            </div>
          </div>
        </body>
      </html>
    `
};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Error sending email: ' + error.message });
    } else {
      return res.status(200).json({ message: 'Reset password link is sent to your registered Email Id...' });
    }
  });
};