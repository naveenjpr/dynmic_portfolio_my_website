const Achievements = require("../../models/Achievements.Schema");


// 👉 VIEW ALL PORTFOLIO
exports.view = (req, res) => {
    Achievements.find({ status: true }).sort({ createdAt: -1 }).then((data) => {
        res.status(200).json({
            status: true,
            message: "Achievements view successfully",
            data: data,
        });
    }).catch((err) => {
        console.error("Create Achievements error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    })
};

