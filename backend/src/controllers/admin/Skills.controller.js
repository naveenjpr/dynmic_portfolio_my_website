const CategoryModel = require("../../models/Category.Schema");
const skills = require("../../models/Skills.Schema");
const cloudinary = require("../../config/cloudinary");

// 👉 ADD PORTFOLIO

exports.parentcategory = async (req, res) => {
  CategoryModel.find({ status: true })
    .select("Skills")
    .then((data) => {
      res.status(200).json({
        status: true,
        message: "category view successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    });
};
exports.create = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const data = new skills({
      SkillsName: req.body.SkillsName,
      SkillsIcon: req.file ? req.file.path : null,
      SkillsIcon_public_id: req.file ? req.file.filename : null,
      percentage: req.body.percentage,
      parentskills: req.body.parentskills, // postman me id send kare ge
      status: req.body.status ? true : false,
    });

    const saved = await data.save();

    res.status(201).json({
      status: true,
      message: "skills created successfully",
      data: saved,
    });
  } catch (err) {
    console.error("Create skills error:", err);
    res.status(500).json({
      status: false,
      message: err,
    });
  }
};

// 👉 VIEW ALL PORTFOLIO
exports.view = (req, res) => {
  skills
    .find()
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

// 👉 STATUS CHANGE
exports.statusChange = async (req, res) => {
  try {
    const result = await skills.updateOne(
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
    const data = await skills
      .findById(req.params.id)
      .populate("parentskills", "Skills");

    if (data) {
      return res.json({
        status: true,
        message: "Record found successfully !!",
        data: data,
      });
    } else {
      return res.json({
        status: false,
        message: "No Record found !!",
        data: null,
      });
    }
  } catch (err) {
    console.error("Create skills error:", err.errmsg);
    res.status(500).json({
      status: false,
      message: err.errmsg,
    });
  }
};

// 👉 UPDATE

exports.update = async (req, res) => {
  try {
    const oldData = await skills.findById(req.params.id);

    if (!oldData) {
      return res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    // 🔥 delete old image if new uploaded
    if (req.file && oldData.SkillsIcon_public_id) {
      await cloudinary.uploader.destroy(oldData.SkillsIcon_public_id);
    }

    // ✅ dynamic update object
    const updateData = {
      SkillsName: req.body.SkillsName,
      percentage: req.body.percentage,
      parentskills: req.body.parentskills,
      status: req.body.status,
    };

    // 👉 only update image if new file uploaded
    if (req.file) {
      updateData.SkillsIcon = req.file.path;
      updateData.SkillsIcon_public_id = req.file.filename;
    }

    const result = await skills.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }, // updated data return karega
    );

    res.json({
      status: true,
      message: "skills updated successfully",
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

// 👉 DELETE
exports.delete = async (req, res) => {
  try {
    const delId = req.params.id;

    if (!delId) {
      return res.status(400).json({
        status: false,
        message: "Invalid ID",
      });
    }

    const skillData = await skills.findById(delId);

    if (!skillData) {
      return res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }

    // 🔥 delete image
    if (skillData.SkillsIcon_public_id) {
      await cloudinary.uploader.destroy(skillData.SkillsIcon_public_id);
    }

    await skills.findByIdAndDelete(delId);

    return res.status(200).json({
      status: true,
      message: "Skill deleted permanently",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
