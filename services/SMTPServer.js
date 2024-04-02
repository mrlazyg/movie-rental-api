const nodemailer = require('nodemailer');
const ErrorHandler = require('../utils/ErrorHandler');

class SMTPServer {
  constructor() {}

  async sendEmailNotification(mailOptions) {
    try {
      if(!mailOptions?.email) return;
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_APP_USER,
          pass: process.env.GMAIL_APP_KEY,
        },
      });

      const options = {
        from: process.env.GMAIL_APP_USER,
        to: mailOptions?.email,
        subject: 'Movie Rental Booking Details',
        html: await this.formatEmail(mailOptions?.data),
      };

      mailOptions = {
        ...mailOptions,
        ...options,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent');
    } catch (e) {
      console.error('Failed to send notification. Error:', e.message);
      throw new ErrorHandler(500, e.message);
    }
  }

  async formatEmail(bookings) {
    const { customer, movie } = bookings;
    return `Dear ${customer?.name || 'Guest'}, <br>
    You've successfully booked your movie. Please find below details: <br>
    Movie Name: ${movie?.name} <br>
    Rental Price: $${movie?.dailyRentalRate} <br>
    Booking Time: ${bookings?.dateOut} <br><br><br>
    From, <br>
    Rental Team
    `;
  }
}

module.exports = SMTPServer;
