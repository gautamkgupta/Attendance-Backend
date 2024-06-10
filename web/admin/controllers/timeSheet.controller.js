const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Education
    getAddTimeSheet: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            res.render('admin/timeSheet/add-timeSheet', {
                title: "TYS",
                user,
                error: "Add New TimeSheet"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/timeSheet/add-timeSheet', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getTimeSheetList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const TimeSheet = await models.CustomerModel.TimeSheet.find().exec()
            // console.log("All TimeSheet: ", TimeSheet);
            // console.log("User First Name: ", user.first_name);

            res.render('admin/timeSheet/all-timeSheet', {
                title: "TYS",
                user,
                TimeSheet,
                error: "Add New TimeSheet"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/timeSheet/all-timeSheet', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddTimeSheet: async (req, res) => {
        // const referer = req.get('Referer');
        try {
            const user = req.user;
            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const server = req.body;
            // console.log(server);

            const RecordData = new models.CustomerModel.TimeSheet({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                task: server.task,
                status: server.status,
                date: server.date,
            });

            console.log("TimeSheet Data: ", RecordData);
            RecordData.save();

            const successMsg = `${user.first_name} - ${RecordData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/timeSheet/all-timeSheet?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/timeSheet/add-timeSheet?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateTimeSheet: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const TimeSheet_id = req.params.TimeSheet_id;
            const UpdateData = await models.CustomerModel.TimeSheet.findById(TimeSheet_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/timeSheet/edit-timeSheet', {
                title: "TYS",
                TimeSheet_id,
                user,
                Updatedemail,
                UpdateData,
                error: "Update TimeSheet"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateTimeSheet: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const TimeSheet_id = req.params.TimeSheet_id;
            console.log("Update TimeSheet: ", server);
            console.log("TimeSheet: ", TimeSheet_id);
            const UpdateRecord = await models.CustomerModel.TimeSheet.findById(TimeSheet_id);
            // console.log("Update Record: ", UpdateRecord);

            UpdateRecord.task = server.task;
            UpdateRecord.note = server.note;
            UpdateRecord.status = server.status;
            UpdateRecord.date = server.date;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/timeSheet/all-timeSheet?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/timeSheet/edit-timeSheet?error=${encodeURIComponent(err)}`);

        }
    },


}

