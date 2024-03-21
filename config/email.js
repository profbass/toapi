const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.DB_PASSWORD,
    }
});
