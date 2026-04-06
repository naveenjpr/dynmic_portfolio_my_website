const mongoose = require("mongoose");

const clientMessageSchema = new mongoose.Schema({
    yourName: {
        type: String,
        required: [true, "Your Name is required"],
        trim: true,
    },
    yourEmail: {
        type: String,
        required: [true, "Your Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    yourPhoneNumber: {
        type: String,
        match: [/^[0-9]{10,15}$/, "Phone number must be 10 to 15 digits"],
        required: [true, "Your Phone Number is required"],
        trim: true,

    },

    yourMessage: {
        type: String,
        required: [true, "Your Message is required"],
        trim: true,
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

const clientMessageModel = mongoose.model("clientMessage", clientMessageSchema);

module.exports = clientMessageModel;
