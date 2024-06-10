const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: true
    },
    address_type: {
        type: String,
        required: true,
    },
    address_1: {
        type: String,
        required: true,
    },
    address_2: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
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

const AddressModel = mongoose.model('Address', addressSchema);

module.exports = AddressModel;
