const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define user schema
const AdminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    profile_url: {
        type: String,
        required: true,
        default: 'default.jpeg',
    },
    first_name: {
        type: String,
        required: true,
        maxLength: 200,
        default: 'GK',
    },
    last_name: {
        type: String,
        required: true,
        maxLength: 200,
        default: 'G',
    },
    email: {
        type: String,
        required: true,
        maxLength: 200,
        default: 'gg@gmail.com'
    },
    password: {
        type: String,
        required: false,
        maxLength: 200,
        default: '12345678'
    },
    phone: {
        type: String,
        required: true,
        maxLength: 200,
        default: '1234554321'
    },
    is_active: {
        type: Boolean,
        default: true
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
