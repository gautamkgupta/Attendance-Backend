const mongoose = require('mongoose');

const PerfessionalSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    skill: {
        type: String,
        required: true,
    },
    cv_intro: {
        type: String,
        required: true,
    },
    join_date: {
        type: String,
        required: true,
    },
    corfirm_date: {
        type: String,
        required: true,
    },
    termination_date: {
        type: String,
        default: "NA",
    },
    termination_reasons: {
        type: String,
        default: "NA",
    },
    desc: {
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

const PerfessionalModel = mongoose.model('Perfessional', PerfessionalSchema);

module.exports = PerfessionalModel;
