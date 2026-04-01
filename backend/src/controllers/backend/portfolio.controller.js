const Portfolio = require("../../models/portfolio.Schema");
const cloudinary = require("../../config/cloudinary");

// 👉 ADD PORTFOLIO
exports.create = async (req, res) => {
  try {
    const data = new Portfolio({
      image: req.file ? req.file.path : null,
      image_public_id: req.file ? req.file.filename : null, // 🔥 IMPORTANT

      title: req.body.title || null,
      description: req.body.description || null,
      technologies: JSON.parse(req.body.technologies || "[]"),
      github: {
        frontend: req.body.githubFrontend || "",
        backend: req.body.githubBackend || "",
      },
      link: req.body.link || null,
      status: req.body.status || false,
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

// 👉 VIEW ALL PORTFOLIO
exports.view = async (req, res) => {
  const totalRecords = await Portfolio.countDocuments({ deleted_at: null });

  try {
    const projects = await Portfolio.find({ deleted_at: null }).sort({
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
    const result = await Portfolio.updateOne(
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
    const result = await Portfolio.findById(req.params.id);

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
    const oldData = await Portfolio.findById(req.params.id);

    if (!oldData) {
      return res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    const data = {
      image: req.file ? req.file.path : oldData.image,
      image_public_id: req.file ? req.file.filename : oldData.image_public_id,

      title: req.body.title || null,
      description: req.body.description || null,

      // 🔥 SAME AS CREATE (NO CHANGE)
      technologies: JSON.parse(req.body.technologies || "[]"),

      github: {
        frontend: req.body.githubFrontend || "",
        backend: req.body.githubBackend || "",
      },

      link: req.body.link || null,
      status: req.body.status || false,
    };

    // 🔥 delete old image if new uploaded
    if (req.file && oldData.image_public_id) {
      await cloudinary.uploader.destroy(oldData.image_public_id);
    }

    const result = await Portfolio.updateOne(
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
    const portfolio = await Portfolio.findById(delId);

    if (!portfolio) {
      return res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    // 🔥 DELETE IMAGE FROM CLOUDINARY
    if (portfolio.image_public_id) {
      try {
        await cloudinary.uploader.destroy(portfolio.image_public_id);
        console.log("Cloudinary image deleted:", portfolio.image_public_id);
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr.message);
      }
    }

    // 🔥 DELETE FROM DATABASE
    await Portfolio.findByIdAndDelete(delId);

    return res.status(200).json({
      status: true,
      message: "Portfolio & Image deleted permanently",
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
