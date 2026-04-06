const ConnectMe = require("../../models/ConnectMe.Schema");



// 👉 VIEW ALL PORTFOLIO
exports.view = (req, res) => {
    ConnectMe.find({ status: true }).then((data) => {
        res.status(200).json({
            status: true,
            message: "ConnectMe view successfully",
            data: data,
        });
    }).catch((err) => {
        console.error("Create ConnectMe error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    })
};


