const mongoose = require("mongoose");

const igTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    tokenDateEntered: {
        type: Date,
        required: true
    },
    tokenDateRefreshed: {
        type: Date,
        required: false
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model("IGToken", igTokenSchema);