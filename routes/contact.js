const express = require('express');
const router = express.Router();
const db = require('../config/db');
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
    // Extract the name, email, and message from the request body
    const { name, email, message } = req.body; 

    // Save the contact submission to the database
    db.query(
        'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)',
        [name, email, message],
        (error, results) => {
            if (error) {
                console.error('Error saving contact to the database:', error);
                res.status(500).send('Error saving contact to the database');
            } else {
                console.log('Contact saved to the database:', results);
            }
        }
    );

    // Send the contact submission via email
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_ADDRESS,
        subject: 'New contact form submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    console.log('Email:', process.env.EMAIL_ADDRESS);
    console.log('Password:', process.env.EMAIL_PASSWORD);
    
    // Send the contact submission via email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });

});

module.exports = router;
