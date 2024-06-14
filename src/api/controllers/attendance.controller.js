const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getAttendance: async (req, res) => {
        try {
            const record = await models.CustomerModel.Attendance.find();
            console.log(record);
            return res.status(200).json({
                message: "All Attendance Record!..",
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

    postAttendance: async (req, res) => {
        try {

            const server = req.body;

            // Check if the email already exists
            // const CheckDate = await models.CustomerModel.Attendance.findOne({ date: server.date });
            // if (CheckDate) {
            //     return res.status(400).json({ message: "Today Attendance Already Completed!.." });
            // }

            const NewRecord = new models.CustomerModel.Attendance({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                check_in: server.check_in,
                check_out: server.check_out,
                total_hour: server.total_hour,
                day: server.day,
                date: server.date,
                location: server.location,
                status: server.status,
                holiday: server.holiday,
                comment: server.comment,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New Attendance Record!..",
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

    postUpdateAttendance: async (req, res) => {
        try {

            const server = req.body;
            const user_id = req.params.userId;
            console.log("UserId: ", user_id);
            const UpdatedRecord = await models.CustomerModel.Attendance.findById(user_id);

            if (!UpdatedRecord) {
                return res.status(400).json({ message: "Attendance Record Not Found!.." });
            }

            // Check if the email already exists
            const CheckEmail = await models.CustomerModel.Attendance.findOne({ email: server.email });
            if (!CheckEmail) {
                return res.status(400).json({ message: `Email-Id Not Match!..` });
            }
            // Check if the Date
            // const CheckDate = await models.CustomerModel.Attendance.findOne({ date: server.date });
            // if (!CheckDate) {
            //     return res.status(400).json({ message: `${server.date} Date Not Filled!..` });
            // }

            UpdatedRecord.email = server.email;
            UpdatedRecord.check_in = server.check_in;
            UpdatedRecord.check_out = server.check_out;
            UpdatedRecord.total_hour = server.total_hour;
            UpdatedRecord.day = server.day;
            UpdatedRecord.date = server.date;
            UpdatedRecord.location = server.location;
            UpdatedRecord.status = server.status;
            UpdatedRecord.holiday = server.holiday;
            UpdatedRecord.comment = server.comment;

            await UpdatedRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "Update User Record!..",
                    Data: data
                });
            })


        } catch (err) {
            // console.log(err)
            return res.json({
                message: "Error",
                Error: err,
            })

        }
    },


}