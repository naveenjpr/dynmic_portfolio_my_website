const Social = require("../../models/SociallyEngaged.Schema");


// 👉 VIEW ALL Social
exports.view = async (req, res) => {

    try {
        const projects = await Social.find({ status: true }).sort({
            created_at: -1,
        });
        res.status(200).json({
            status: true,
            message: "Social fetched successfully",
            totalRecords,
            data: projects,
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Failed to fetch Social",
            error: err.message,
        });
    }
};


