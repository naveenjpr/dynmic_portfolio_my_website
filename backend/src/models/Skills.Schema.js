const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  SkillsName: {
    type: String,
    required: [true, "Skills is required"],
    trim: true,
    unique: true,
  },

  SkillsIcon: {
    type: String,
  },
  SkillsIcon_public_id: {
    type: String,
  },
  parentskills: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: 100,
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

const skillsModel = mongoose.model("skills", skillsSchema);

module.exports = skillsModel;
