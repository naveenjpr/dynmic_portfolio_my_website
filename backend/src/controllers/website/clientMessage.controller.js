const clientMessage = require("../../models/clientMessage.Schema");
const { transporter } = require("../../config/mailConfig");

// 👉 CREATE CLIENT MESSAGE
exports.create = async (req, res) => {
    try {
        const { yourName, yourEmail, yourPhoneNumber, yourMessage } = req.body;

        // 1. Save to Database
        const newMessage = new clientMessage({
            yourName,
            yourEmail,
            yourPhoneNumber,
            yourMessage
        });
        const savedMessage = await newMessage.save();

        // 2. Send Email to Admin (Site Owner)
        const mailOptions = {
            from: `"${yourName}" <${process.env.EMAIL_USER}>`, // ✅ From must be your email for Gmail
            replyTo: yourEmail,                                // ✅ User's email to reply back
            to: process.env.EMAIL_USER,
            subject: `New Message from Portfolio: ${yourName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333;">New Message Received</h2>
                    <hr>
                    <p><strong>Name:</strong> ${yourName}</p>
                    <p><strong>Email:</strong> ${yourEmail}</p>
                    <p><strong>Phone:</strong> ${yourPhoneNumber}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #007bff; margin-top: 10px;">
                        ${yourMessage}
                    </div>
                    <hr>
                    <p style="font-size: 0.8em; color: #777;">This message was sent from your portfolio contact form.</p>
                </div>
            `,
        };

        // Attempt to send email
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email Notification Sent:", info.messageId);
        } catch (emailErr) {
            console.error("Email Sending Failed:", emailErr);
            // We still consider the request successful because it's saved in the DB
        }


        res.status(200).json({
            status: true,
            message: "Message sent and recorded successfully!",
            data: savedMessage
        });

    } catch (err) {
        console.error("Client Message error:", err);
        res.status(500).json({
            status: false,
            message: "An error occurred while processing your message.",
            error: err.message
        });
    }
}


