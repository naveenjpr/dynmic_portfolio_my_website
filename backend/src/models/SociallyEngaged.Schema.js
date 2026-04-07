const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true, // whatsapp, linkedin
        trim: true,
        lowercase: true, // ✅ whatsapp / linkedin always consistent

    },
    url: {
        type: String,
        required: true,
        trim: true,

    },
    social_icon: {
        type: String,
        required: true,
    },
    social_icon_public_id: {
        type: String,
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

module.exports = mongoose.model("Social", socialSchema);