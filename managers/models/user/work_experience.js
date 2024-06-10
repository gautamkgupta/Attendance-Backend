const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema({
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
    company_name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    start_date: {
        type: String,
        required: true,
    },
    end_date: {
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

const WorkExperienceModel = mongoose.model('WorkExperience', WorkExperienceSchema);

module.exports = WorkExperienceModel;
