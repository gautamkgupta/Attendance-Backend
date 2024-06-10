const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Address
    getAddAttendance: async (req, res) => {
        try {

            // const user = req.user;
            // if (!user) {
            //     res.render('a-login', {
            //         title: "TYS",
            //         error: "User Not Found"
            //     })
            // }

            res.render('admin/attendance/add-attendance', {
                title: "TYS",
                user,
                error: "Add New Attendance"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/attendance/add-attendance', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getAttendanceList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Attendance = await models.CustomerModel.Attendance.find().exec()
            // console.log("All Attendance: ", Attendance);

            res.render('admin/attendance/all-attendance', {
                title: "TYS",
                user,
                Attendance,
                error: "Add New Attendance"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/attendance/all-attendance', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddAttendance: async (req, res) => {
        const referer = req.get('Referer');
        try {
            const user = req.user;
            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const server = req.body;
            console.log(server)

            const UserData = new models.CustomerModel.Attendance({
                _id: new mongoose.Types.ObjectId(),
                email: user.email,
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

            console.log(UserData)
            UserData.save();

            const successMsg = `${user.first_name} - ${UserData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/attendance/all-attendance?success=${encodeURIComponent(successMsg)}`);
        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            // res.redirect(`/admin/attendance/add-attendance?error=${encodeURIComponent(errorMsg)}`);
            res.redirect(`/admin/attendance/add-attendance?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateAttendance: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const attendance_id = req.params.attendance_id;
            const UpdateData = await models.CustomerModel.Attendance.findById(attendance_id);

            res.render('admin/attendance/edit-attendance', {
                title: "TYS",
                attendance_id,
                user,
                UpdateData,
                error: "Update Attendance"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateAttendance: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const attendance_id = req.params.attendance_id;
            console.log("Update Attendance: ", server);
            console.log("Attendance_id: ", attendance_id);
            const UpdateRecord = await models.CustomerModel.Attendance.findById(attendance_id);

            UpdateRecord.check_in = server.check_in;
            UpdateRecord.check_out = server.check_out;
            UpdateRecord.total_hour = server.total_hour;
            UpdateRecord.day = server.day;
            UpdateRecord.date = server.date;
            UpdateRecord.location = server.location;
            UpdateRecord.status = server.status;
            UpdateRecord.holiday = server.holiday;
            UpdateRecord.comment = server.comment;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/attendance/all-attendance?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/attendance/edit-attendance?error=${encodeURIComponent(err)}`);

        }
    },

}