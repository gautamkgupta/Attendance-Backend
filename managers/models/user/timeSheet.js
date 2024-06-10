const mongoose = require('mongoose');

const TimeSheetSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    deleted_date: {
        type: Date,
        default: Date.now
    },
});

const TimeSheetModel = mongoose.model('TimeSheet', TimeSheetSchema);

module.exports = TimeSheetModel;
