const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: true
    },
    check_in: {
        type: String,
        required: true,
    },
    check_out: {
        type: String,
        required: true,
    },
    total_hour: {
        type: String,
    },
    day: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    holiday: {
        type: String,
        required: true,
    },
    comment: {
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
},
);

const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);

module.exports = AttendanceModel;