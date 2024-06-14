const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getTimeSheet: async (req, res) => {
        try {
            const record = await models.CustomerModel.TimeSheet.find();
            console.log(record);
            return res.status(200).json({
                message: "All TimeSheet Record!..",
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

    postTimeSheet: async (req, res) => {
        try {

            const NewRecord = new models.CustomerModel.TimeSheet({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                task: req.body.task,
                date: req.body.date,
                status: req.body.status,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New TimeSheet Record!..",
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