const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,            // ✅ Using 465 for SSL/TLS (more reliable on cloud)
    secure: true,         // ✅ true for 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // Helps with some cloud connection issues
    },
    connectionTimeout: 10000, // 10 seconds timeout
    greetingTimeout: 5000,
    socketTimeout: 15000,
});


module.exports = { transporter };