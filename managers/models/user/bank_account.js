const mongoose = require('mongoose');

const BankAccountSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true,
    },
    bank_name: {
        type: String,
        required: true,
    },
    ifsc_code: {
        type: String,
        required: true,
    },
    name_as_bank: {
        type: String,
        required: true,
    },
    branch_name: {
        type: String,
        required: true,
    },
    aadhar_card: {
        type: String,
        required: true,
    },
    pan_card: {
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

const BankAccountModel = mongoose.model('BankAccount', BankAccountSchema);

module.exports = BankAccountModel;
