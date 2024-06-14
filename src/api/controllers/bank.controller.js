const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getBank: async (req, res) => {
        try {
            const record = await models.CustomerModel.BankAccount.find();
            console.log(record);
            return res.status(200).json({
                message: "All Bank Record!..",
                Data: record
            });
        }
        catch (err) {
            console.log(err);
            return res.json({
                message: "Error",
                Error: err,
            })
        }
    },

    postBank: async (req, res) => {
        try {

            const NewRecord = new models.CustomerModel.BankAccount({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                account_number: req.body.account_number,
                bank_name: req.body.bank_name,
                ifsc_code: req.body.ifsc_code,
                name_as_bank: req.body.name_as_bank,
                branch_name: req.body.branch_name,
                aadhar_card: req.body.aadhar_card,
                pan_card: req.body.pan_card,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New Bank Record!..",
                    Data: data
                });
            })

        }
        catch (err) {
            console.log(err);
            return res.json({
                message: "Error",
                Error: err,
            })
        }
    },


}