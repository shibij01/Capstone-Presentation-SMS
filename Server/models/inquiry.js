const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
    inquiryType: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    numberNeedingMakeup: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        required: true
    },
    readyLocation: {
        type: String,
        required: true
    },
    venueLocation: {
        type: String,
        required: true
    },
    timeToComplete: {
        type: String,
        required: true
    },
    needATrial: {
        type: String,
        required: true
    },
    howDidYouHear: {
        type: String,
        required: false
    },
    detailsQuestionsNotes: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Inquiry", inquirySchema);