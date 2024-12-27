
const transporter = require('./emailTransporter');

function sendFeedbackMail(clientEmail, ticketDetails) {
    const { ticketId, raisedDate, resolvedDate, resolutionDetails, feedbackLink } = ticketDetails;

  let mailOptions = {
    from: `DAccess <${process.env.EMAIL}>`,
    to: user.email,
    subject: `Your Ticket #${ticketId} has been resolved`,
    html: `
        <html>
        <body>
        <h1>Dear Customer</h1>
        <p>We are pleased to inform you that your ticket #${ticketId} has been resolved
        <br>
        Ticket Details:
        <br>
        - Raised Date: ${raisedDate}
        <br>
        - Resolved Date: ${resolvedDate}
        <br>
        - Resolution Details: ${resolutionDetails}
        <br>
        We value your feedback. Please click the link below to provide your rating and comments:
        <br>
        <a href="${feedbackLink}">Feedback Link</a>
        <br>
        Thank you for your patience.
        <br>
        Best regards,
        <br>
        Support Team
        </p>
        </body>
        </html>

    `
};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending feedback email: ' + error.message);

    } else {
        console.log('Feedback email sent: ' + info.response);
    }
  });
}

module.exports = sendFeedbackMail;