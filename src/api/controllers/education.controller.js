const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getEducation: async (req, res) => {
        try {
            const record = await models.CustomerModel.Education.find();
            console.log(record);
            return res.status(200).json({
                message: "All Education Record!..",
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

    postEducation: async (req, res) => {
        try {

            // Check if the email already exists
            const Check = await models.CustomerModel.Education.findOne({ course_name: req.body.course_name });
            if (Check) {
                return res.status(400).json({ message: "This course Name Already Used!.." });
            }

            const NewRecord = new models.CustomerModel.Education({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                university_name: req.body.university_name,
                course_name: req.body.course_name,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                desc: req.body.desc,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New Education Record!..",
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

