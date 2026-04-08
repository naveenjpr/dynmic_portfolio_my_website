const mongoose = require("mongoose");

const experiencechema = new mongoose.Schema({


    companyName: {
        type: String,
        trim: true
    },

    companyLogo: {
        type: String,
        trim: true,
    },
    image_public_id: {
        type: String,
    },
    employmentType: {
        type: String, // Full-time, Part-time, Internship
        enum: ["Full-time", "Part-time", "Internship", "Freelance", "Contract"],
        default: "Full-time"
    },

    location: {

        type: String, // Remote / Hybrid / Onsite

    },

    startDate: {
        type: Date,
    },

    endDate: {
        type: Date,
        default: null
    },



    duration: {
        type: String // e.g. "1 yr 2 months" (optional auto-calc bhi kar sakte ho)
    },

    description: [
        {
            type: String // bullet points
        }
    ],

    technologies: [
        {
            type: String // React, AWS, Node.js etc.
        }
    ],

    status: {
        type: Boolean,
        default: true // active/inactive
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

const ExperienceModel = mongoose.model("Experience", experiencechema);

module.exports = ExperienceModel;
