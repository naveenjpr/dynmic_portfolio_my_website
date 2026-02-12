const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
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
  file_type: {
    type: String,
    required: true,
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

const ResumeModel = mongoose.model("Resumes", ResumeSchema);

module.exports = ResumeModel;
