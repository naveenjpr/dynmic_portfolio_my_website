const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    // port: 587,            // ✅ change here
    // secure: false,        // ✅ important (false for 587)

    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },



});

module.exports = { transporter };