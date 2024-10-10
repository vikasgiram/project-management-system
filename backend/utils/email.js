// email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    },
    // logger: true,  // Enable logging for debugging
    // debug: true    // Show debugging output
});

exports.sendMail=(res, user, link)=>{

    let mailOptions={
        from: `DAccess <${process.env.EMAIL}>`,
        to: user.email,
        subject: `Password reset Link`,
        html: `<p>Click on the link to reset your password: <a href="${link}">${link}</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending email: '+error.message});
        } else {
            return res.status(200).json({ message: 'Reset password link is sended to your registered Email Id...' });
        }
    });
};