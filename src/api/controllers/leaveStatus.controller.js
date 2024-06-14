const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getLeaveStatus: async (req, res) => {
        try {
            const record = await models.CustomerModel.LeaveStatus.find();
            console.log(record);
            return res.status(200).json({
                message: "All LeaveStatus Record!..",
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

    postLeaveStatus: async (req, res) => {
        try {

            const NewRecord = new models.CustomerModel.LeaveStatus({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                first_name: req.body.first_name,
                date: req.body.date,
                status: req.body.status,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New LeaveStatus Record!..",
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