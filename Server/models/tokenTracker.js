const mongoose = require("mongoose");

const igTokenTrackerSchema = new mongoose.Schema({
    tokenId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    tokenDateLastUsed: {
        type: Date,
        required: true
    } 
}, { versionKey: false });

module.exports = mongoose.model("IGTokenTracker", igTokenTrackerSchema);