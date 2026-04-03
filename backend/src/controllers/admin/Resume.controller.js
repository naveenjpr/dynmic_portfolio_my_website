const Resume = require("../../models/Resume.Schema");
const cloudinary = require("../../config/cloudinary");

// 👉 ADD Resume
exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: "File is required",
      });
    }

    const data = new Resume({
      image: req.file.path, // already uploaded secure_url
      image_public_id: req.file.filename, // already public_id
      file_type: req.file.mimetype === "application/pdf" ? "raw" : "image",

      status: req.body.status ?? true,
    });

    const saved = await data.save();

    res.status(201).json({
      status: true,
      message: "Resume uploaded successfully",
      data: saved,
    });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({
      status: false,
      message: "Upload failed",
      error: err.message,
    });
  }
};

// 👉 VIEW ALL Resume
exports.view = async (req, res) => {
  try {
    const projects = await Resume.find({ deleted_at: null }).sort({
      created_at: -1,
    });
    res.status(200).json({
      status: true,
      message: "Projects fetched successfully",

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
    const result = await Resume.updateOne(
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
    const result = await Resume.findById(req.params.id);

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
    const resumeId = req.params.id;

    // 🔍 Find existing record
    const existing = await Resume.findById(resumeId);

    if (!existing) {
      return res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    // 📝 Prepare update data
    let data = {
      status:
        typeof req.body.status !== "undefined"
          ? req.body.status
          : existing.status,
      updated_at: Date.now(),
    };

    // 📂 If new file uploaded
    if (req.file) {
      // 🔥 Delete old file from Cloudinary
      if (existing.image_public_id) {
        await cloudinary.uploader.destroy(existing.image_public_id, {
          resource_type: existing.file_type || "image",
        });
      }

      // 🆕 Save new file details
      data.image = req.file.path; // secure_url
      data.image_public_id = req.file.filename; // public_id
      data.file_type =
        req.file.mimetype === "application/pdf" ? "raw" : "image";
    }

    // 💾 Update in DB
    await Resume.updateOne({ _id: resumeId }, { $set: data });

    return res.json({
      status: true,
      message: "Resume updated successfully",
    });
  } catch (error) {
    console.error("Update error:", error);

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

    const resumeData = await Resume.findById(delId);

    if (!resumeData) {
      return res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    if (resumeData.image_public_id) {
      await cloudinary.uploader.destroy(resumeData.image_public_id, {
        resource_type: resumeData.file_type,
      });
    }

    await Resume.deleteOne({ _id: delId });

    return res.json({
      status: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
