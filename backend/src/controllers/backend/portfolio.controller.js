const Portfolio = require("../../models/portfolio.Schema");
const cloudinary = require("../../config/cloudinary");

// 👉 ADD PORTFOLIO
exports.create = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio",
    });
    const data = new Portfolio({
      image: uploadResult.secure_url,
      image_public_id: uploadResult.public_id,
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
    const data = {
      title: req.body.title || null,
      description: req.body.description || null,
      technologies: req.body.technologies
        ? Array.isArray(req.body.technologies)
          ? req.body.technologies
          : req.body.technologies.split(",")
        : [],
      github: {
        frontend: req.body.githubFrontend || "",
        backend: req.body.githubBackend || "",
      },
      link: req.body.link || null,
      status: req.body.status ?? false,
    };

    if (req.file && req.file.path) {
      data.image = req.file.path;
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
    let error_messages = [];

    if (error.errors) {
      for (let field in error.errors) {
        error_messages.push(error.errors[field].message);
      }
    } else {
      error_messages.push(error.message);
    }

    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error_messages,
    });
  }
};

// 👉 DELETE
exports.delete = async (req, res) => {
  try {
    const delId = req.params.id;

    const portfolio = await Portfolio.findById(delId);

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
    await Portfolio.deleteOne({ _id: delId });

    return res.json({
      status: true,
      message: "Portfolio & Image deleted permanently",
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
