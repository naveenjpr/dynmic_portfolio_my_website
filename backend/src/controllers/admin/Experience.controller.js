const Experience = require("../../models/Experience.Schema");
const cloudinary = require("../../config/cloudinary");

// 👉 ADD Experience
exports.create = async (req, res) => {
    console.log(req.body)
    try {
        const data = new Experience({
            jobTitle: req.body.jobTitle,
            companyName: req.body.companyName,
            companyLogo: req.file ? req.file.path : "",
            image_public_id: req.file ? req.file.filename : "",
            employmentType: req.body.employmentType,
            location: req.body.location,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            duration: req.body.duration,
            description: req.body.description ? JSON.parse(req.body.description) : [],
            technologies: req.body.technologies ? JSON.parse(req.body.technologies) : [],
            status: req.body.status === "true" || req.body.status === true || req.body.status === undefined,
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

// 👉 VIEW ALL Experience
exports.view = async (req, res) => {
    const totalRecords = await Experience.countDocuments({ deleted_at: null });

    try {
        const projects = await Experience.find({ deleted_at: null }).sort({
            created_at: -1,
        });
        res.status(200).json({
            status: true,
            message: "Projects fetched successfully",
            totalRecords,
            data: projects,
        });
    } catch (err) {
        console.error("View projects error:", err);
        res.status(500).json({
            status: false,
            message: "Failed to fetch projects",
            error: err.message,
        });
    }
};

// 👉 STATUS CHANGE
exports.statusChange = async (req, res) => {
    try {
        const result = await Experience.updateOne(
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
        const result = await Experience.findById(req.params.id);

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
        const oldData = await Experience.findById(req.params.id);

        if (!oldData) {
            return res.status(404).json({
                status: false,
                message: "Record not found",
            });
        }

        const data = {
            jobTitle: req.body.jobTitle || oldData.jobTitle,
            companyName: req.body.companyName || oldData.companyName,
            companyLogo: req.file ? req.file.path : oldData.companyLogo,
            image_public_id: req.file ? req.file.filename : oldData.image_public_id,
            employmentType: req.body.employmentType || oldData.employmentType,
            location: req.body.location,
            startDate: req.body.startDate || oldData.startDate,
            endDate: req.body.endDate || oldData.endDate,
            duration: req.body.duration || oldData.duration,
            description: req.body.description ? JSON.parse(req.body.description) : oldData.description,
            technologies: req.body.technologies ? JSON.parse(req.body.technologies) : oldData.technologies,
            status: req.body.status !== undefined ? (req.body.status === "true" || req.body.status === true) : oldData.status,
        };

        // 🔥 delete old image if new uploaded
        if (req.file && oldData.image_public_id) {
            await cloudinary.uploader.destroy(oldData.image_public_id);
        }

        const result = await Experience.findByIdAndUpdate(
            req.params.id,
            { $set: data },
            { new: true }
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
        const record = await Experience.findById(delId);

        if (!record) {
            return res.status(404).json({
                status: false,
                message: "Record not found",
            });
        }

        // 🔥 DELETE IMAGE FROM CLOUDINARY
        if (record.image_public_id) {
            try {
                await cloudinary.uploader.destroy(record.image_public_id);
                console.log("Cloudinary image deleted:", record.image_public_id);
            } catch (cloudErr) {
                console.error("Cloudinary delete error:", cloudErr.message);
            }
        }

        // 🔥 DELETE FROM DATABASE
        await Experience.findByIdAndDelete(delId);

        return res.status(200).json({
            status: true,
            message: "Experience & Image deleted permanently",
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
