const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getFamily: async (req, res) => {
        try {
            const record = await models.CustomerModel.Family.find();
            console.log(record);
            return res.status(200).json({
                message: "All Family Record!..",
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

    postFamily: async (req, res) => {
        try {

            // Check if the email already exists
            const existingUser = await models.CustomerModel.Family.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: "Your Family Details Already Filled!.." });
            }

            const NewRecord = new models.CustomerModel.Family({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                father: req.body.father,
                mother: req.body.mother,
                alternate_number: req.body.alternate_number,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New Family Record!..",
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