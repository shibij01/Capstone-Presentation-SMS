const mongoose = require("mongoose");

const igMediaSchema = new mongoose.Schema({
    tokenId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    mediaId: {
        type: Number,
        required: true,
        unique: true
    },
    mediaURL: {
        type: String,
        required: true
    },
    mediaTimestamp: {
        type: Date,
        required: false
    },
    mediaUpdatedDate: {
        type: Date,
        required: true
    } 
}, { versionKey: false });

module.exports = mongoose.model("IGMedia", igMediaSchema);