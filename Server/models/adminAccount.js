const mongoose = require("mongoose");

const adminAccount = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    isActive: {
        type: Boolean,
        required: true
    }, 
}, { versionKey: false });

module.exports = mongoose.model("AdminAccount", adminAccount);