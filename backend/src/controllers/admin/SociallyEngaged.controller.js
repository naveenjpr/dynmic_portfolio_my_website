const Social = require("../../models/SociallyEngaged.Schema");
const cloudinary = require("../../config/cloudinary");

// 👉 ADD Social
exports.create = async (req, res) => {
    try {
        const data = new Social({
            platform: req.body.platform,
            url: req.body.url,
            social_icon: req.file?.path,
            social_icon_public_id: req.file?.filename,
            status: req.body.status,
        });

        const saved = await data.save();

        res.status(201).json({
            status: true,
            message: "Post created successfully",
            data: saved,
        });
    } catch (err) {
        console.error("Create post error:", err);
        res.status(500).json({
            status: false,
            message: "Post create failed",
            error: err.message,
        });
    }
};

// 👉 VIEW ALL Social
exports.view = async (req, res) => {
    const totalRecords = await Social.countDocuments({ deleted_at: null });

    try {
        const projects = await Social.find().sort({
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

// 👉 STATUS CHANGE
exports.statusChange = async (req, res) => {
    try {
        const { _id, id } = req.body || {};
        let { status } = req.body || {};
        const updateId = _id || id;

        // 🔥 Convert "true"/"false" string to boolean for form-data support
        if (typeof status === "string") {
            status = status.toLowerCase() === "true";
        }

        if (!updateId) {
            return res.status(400).json({
                status: false,
                message: "ID is required to change status",
            });
        }

        const result = await Social.updateOne(
            { _id: updateId },
            { $set: { status: status } },
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
        const result = await Social.findById(req.params.id);

        if (result) {
            return res.json({
                status: true,
                message: "Record found successfully !!",
                data: result,
            });
        } else {
            return res.json({
                status: false,
                message: "No Record found !!",
                data: null,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong !!",
            error: error.message,
        });
    }
};

// 👉 UPDATE

exports.update = async (req, res) => {
    try {
        const oldData = await Social.findById(req.params.id);

        if (!oldData) {
            return res.status(404).json({
                status: false,
                message: "Record not found",
            });
        }

        // 🔥 Handle status string-to-boolean conversion
        let status = req.body.status;
        if (typeof status === "string") {
            status = status.toLowerCase() === "true";
        }

        const data = {
            platform: req.body.platform || oldData.platform,
            url: req.body.url || oldData.url,
            social_icon: req.file ? req.file.path : oldData.social_icon,
            social_icon_public_id: req.file ? req.file.filename : oldData.social_icon_public_id,
            status: status !== undefined ? status : oldData.status,
        };

        // 🔥 delete old social_icon if new uploaded
        if (req.file && oldData.social_icon_public_id) {
            await cloudinary.uploader.destroy(oldData.social_icon_public_id);
        }

        const result = await Social.updateOne(
            { _id: req.params.id },
            { $set: data },
        );

        return res.json({
            status: true,
            message: "Record updated successfully",
            data: result,
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

// 👉 DELETE
exports.delete = async (req, res) => {
    try {
        const delId = req.params.id;

        // 🔍 Check valid ID
        if (!delId) {
            return res.status(400).json({
                status: false,
                message: "Invalid ID",
            });
        }

        // 🔍 Find record
        const socialRecord = await Social.findById(delId);

        if (!socialRecord) {
            return res.status(404).json({
                status: false,
                message: "Record not found",
            });
        }

        // 🔥 DELETE social_icon FROM CLOUDINARY
        if (socialRecord.social_icon_public_id) {
            try {
                await cloudinary.uploader.destroy(socialRecord.social_icon_public_id);
                console.log("Cloudinary social_icon deleted:", socialRecord.social_icon_public_id);
            } catch (cloudErr) {
                console.error("Cloudinary delete error:", cloudErr.message);
            }
        }

        // 🔥 DELETE FROM DATABASE
        await Social.findByIdAndDelete(delId);

        return res.status(200).json({
            status: true,
            message: "Social & social_icon deleted permanently",
        });
    } catch (error) {
        console.error("Delete error:", error);

        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
