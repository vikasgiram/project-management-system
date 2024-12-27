const moment = require('moment');
const Service = require('../models/serviceModel');
const transporter = require('./emailTransporter');

exports.ticketProcessMail = async(id) => {
    const service = await Service.findById(id)
    .populate({
      path: 'ticket',
      select: 'details product date client',
      populate: {
        path: 'client',
        select: 'custName email'
      }
    })
    .populate('allotTo', 'name');
    // console.log(service);m

      let mailOptions = {
        from: `DAccess <${process.env.EMAIL}>`,
        to: service.ticket.client.email,
        subject: `Service Engineer Assigned to your ticket: ${service.ticket._id}`,
        html: `
         <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Service Engineer Assignment Notification</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    border-radius: 8px 8px 0 0;
                }
                h2 {
                    margin: 0;
                    font-size: 24px;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                }
                .ticket-details {
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px 0;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 15px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                    transition: background-color 0.3s;
                }
                .button:hover {
                    background-color: #45a049;
                }
                .highlight {
                    color: #4CAF50;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Service Engineer Assignment Notification</h2>
                </div>
                <p>Hello <span class="highlight">${service.ticket.client.custName}</span>,</p>
                <p>We are pleased to inform you that a service engineer has been assigned to your support ticket. Here are the details:</p>
                
                <div class="ticket-details">
                    <p><strong>Ticket ID:</strong> <span class="highlight">${service.ticket._id}</span></p>
                    <p><strong>Product Name:</strong> <span class="highlight">${service.ticket.product}</span></p>
                    <p><strong>Issue Description:</strong> <span class="highlight">${service.ticket.details}</span></p>
                    <p><strong>Assigned Engineer:</strong> <span class="highlight">${service.allotTo[0].name}</span></p>
                    <p><strong>Visit Date:</strong> <span class="highlight">${moment(service.allotmentDate).format('DD MMMM YYYY')}</span></p>
                    
                </div>

                <p>Your assigned engineer will arrive at your location on the specified date and time to resolve your issue. Please ensure that you are available to assist them.</p>
                <p>If you have any questions contact us at This toll-free no 1800-209-7799 .</p>
                
                <p>Thank you for choosing DAccess!</p>
                
                <p>Warm regards,<br>The DAccess Service Team</p>
            </div>
            <div class="footer">
                <p>This email was sent to you by DAccess. For any inquiries, please don’t hesitate to contact us.</p>
            </div>
        </body>
        </html>
        `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred. ' + error.message);
        return process.exit(1);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  