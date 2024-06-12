const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define user schema
const AdminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    profile_url: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
        maxLength: 200,
    },
    last_name: {
        type: String,
        required: true,
        maxLength: 200,
    },
    email: {
        type: String,
        required: true,
        maxLength: 200,
    },
    password: {
        type: String,
        required: false,
        maxLength: 200,
    },
    phone: {
        type: Number,
        required: true,
        maxLength: 200,
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

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
