const mongoose = require("mongoose");

const AchievementsSchema = new mongoose.Schema({
    Description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        unique: true,
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        trim: true,
    },
    image_public_id: {
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

const AchievementsModel = mongoose.model("Achievements", AchievementsSchema);

module.exports = AchievementsModel;
