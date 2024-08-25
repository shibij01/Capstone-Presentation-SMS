const mongoose = require("mongoose");

const servicesListSchema = new mongoose.Schema({
    servicesListNum: {
        type: Number,
        required: true,
        unique: true
    },
    servicesListHeading: {
        type: String,
        required: true
    },
    servicesListDescription: {
        type: String,
        required: true
    },
    servicesListSubHeadings: {
        type: Array,
        required: true
    },
    servicesListType: {
        type: String,
        required: true
    },
    servicesListUpdatedDate: {
        type: Date,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model("ServicesList", servicesListSchema);