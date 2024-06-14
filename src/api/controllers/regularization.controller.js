const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getRegularization: async (req, res) => {
        try {
            const record = await models.CustomerModel.Regularization.find();
            console.log(record);
            return res.status(200).json({
                message: "All Regularization Record!..",
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

    postRegularization: async (req, res) => {
        try {

            const NewRecord = new models.CustomerModel.Regularization({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                date: req.body.date,
                reason: req.body.reason,
                status: req.body.status,
                comment: req.body.comment,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New Regularization Record!..",
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