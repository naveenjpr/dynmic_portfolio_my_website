const mongoose = require("mongoose");

const ConnectMeSchema = new mongoose.Schema({
    Address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        unique: true,
    },
    Email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    Phone: {
        type: String,
        required: [true, "Phone is required"],
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

const ConnectMeModel = mongoose.model("ConnectMe", ConnectMeSchema);

module.exports = ConnectMeModel;
