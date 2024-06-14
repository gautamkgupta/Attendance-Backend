const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getProject: async (req, res) => {
        try {
            const record = await models.CustomerModel.Project.find();
            console.log(record);
            return res.status(200).json({
                message: "All Project Record!..",
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

    postProject: async (req, res) => {
        try {

            const NewRecord = new models.CustomerModel.Project({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                project_title: req.body.project_title,
                project_desc: req.body.project_desc,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New Project Record!..",
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