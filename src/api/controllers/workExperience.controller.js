const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getWorkExperience: async (req, res) => {
        try {
            const record = await models.CustomerModel.WorkExperience.find();
            console.log(record);
            return res.status(200).json({
                message: "All WorkExperience Record!..",
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

    postWorkExperience: async (req, res) => {
        try {

            // Check if the Same Designation already exists
            // const existingUser = await models.CustomerModel.WorkExperience.findOne({ designation: req.body.designation });
            // if (existingUser) {
            //     return res.status(400).json({ message: "This Designation Already Used!.." });
            // }

            const NewRecord = new models.CustomerModel.WorkExperience({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                designation: req.body.designation,
                experience: req.body.experience,
                company_name: req.body.company_name,
                desc: req.body.desc,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New WorkExperience Record!..",
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