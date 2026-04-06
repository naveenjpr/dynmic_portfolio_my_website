const clientMessage = require("../../models/clientMessage.Schema");



// 👉 VIEW ALL PORTFOLIO
exports.view = (req, res) => {
    clientMessage.find().sort({ createdAt: -1 })
        .then((data) => {
            res.status(200).json({
                status: true,
                message: "clientMessage view successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.error("Client Message error:", err);
            res.status(500).json({
                status: false,
                message: "An error occurred while processing your message.",
                error: err.message
            });
        })
};


