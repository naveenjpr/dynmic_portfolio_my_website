const skills = require("../../models/Skills.Schema");



// 👉 VIEW ALL PORTFOLIO
exports.view = (req, res) => {
    skills
        .find({ status: true })
        .populate("parentskills", "Skills")
        .then((data) => {
            res.status(200).json({
                status: true,
                message: "skills view successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.error("Create skills error:", err.errmsg);
            res.status(500).json({
                status: false,
                message: err.errmsg,
            });
        });
};


