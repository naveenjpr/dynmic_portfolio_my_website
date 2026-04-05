const Achievements = require("../../models/Achievements.Schema");
const cloudinary = require("../../config/cloudinary");

// 👉 ADD PORTFOLIO
exports.create = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "Image is required",
            });
        }
        const data = new Achievements({
            Description: req.body.Description,
            image: req.file?.path,
            image_public_id: req.file?.filename,
            status: req.body.status ?? true,
        });

        const saved = await data.save();

        res.status(201).json({
            status: true,
            message: "Achievements created successfully",
            data: saved,
        });
    } catch (err) {
        console.error("Create Achievements error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    }
};

// 👉 VIEW ALL PORTFOLIO
exports.view = (req, res) => {
    Achievements.find().then((data) => {
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

// 👉 STATUS CHANGE
exports.statusChange = async (req, res) => {
    try {
        const result = await Achievements.updateOne(
            { _id: req.body.id },
            { $set: { status: req.body.status } },
        );

        res.json({
            status: true,
            message: "Status updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }

};

// 👉 DETAIL
exports.detail = async (req, res) => {
    try {
        const data = await Achievements.findById(req.params.id);
        res.status(200).json({
            status: true,
            message: "Achievements view successfully",
            data: data,
        });
    } catch (err) {
        console.error("Create Achievements error:", err.errmsg);
        res.status(500).json({
            status: false,
            message: err.errmsg,
        });
    }

};

// 👉 UPDATE

exports.update = async (req, res) => {
    try {
        const updateData = {
            Description: req.body.Description,
            status: req.body.status,
        };

        // If a new file is uploaded
        if (req.file) {
            const oldData = await Achievements.findById(req.params.id);

            // Delete the old image from Cloudinary
            if (oldData?.image_public_id) {
                await cloudinary.uploader.destroy(oldData.image_public_id);
            }

            // Set new image data
            updateData.image = req.file.path;
            updateData.image_public_id = req.file.filename;
        }

        const result = await Achievements.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true } // Return the updated document
        );

        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Achievement not found",
            });
        }

        res.json({
            status: true,
            message: "Achievements updated successfully",
            data: result,
        });
    } catch (error) {
        console.error("Update Achievement error:", error);
        res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// 👉 DELETE
exports.delete = async (req, res) => {
    try {
        const delId = req.params.id;

        const portfolio = await Achievements.findById(delId);

        if (!portfolio) {
            return res.status(404).json({
                status: false,
                message: "Record not found",
            });
        }

        // 🔥 Cloudinary image delete
        if (portfolio.image_public_id) {
            await cloudinary.uploader.destroy(portfolio.image_public_id);
        }

        // 🔥 DB record delete
        await Achievements.deleteOne({ _id: delId });

        return res.json({
            status: true,
            message: "Achievements & Image deleted permanently",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
