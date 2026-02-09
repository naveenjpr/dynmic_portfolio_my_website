const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Image is required"], // image URL or path
    trim: true,
  },
  // 🔥 REQUIRED FOR CLOUDINARY DELETE
  image_public_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Description is required"],
  },

  technologies: {
    type: [String],
    required: [true, "Technologies are required"],
  },

  github: {
    frontend: {
      type: String,
      default: "",
    },
    backend: {
      type: String,
      default: "",
    },
  },

  link: {
    type: String,
    required: [true, "Link is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },

  deleted_at: {
    type: Date,
    default: null,
  },
});

const ProjectModel = mongoose.model("Projects", projectSchema);

module.exports = ProjectModel;
