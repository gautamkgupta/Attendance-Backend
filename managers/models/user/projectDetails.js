const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: true
    },
    project_desc: {
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

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;
