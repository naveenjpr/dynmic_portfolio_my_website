const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    Skills: {
        type: String,
        required: [true, "Skills is required"],
        trim: true,
        unique: true,
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

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel;
