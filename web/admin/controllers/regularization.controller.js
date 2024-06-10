const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Education
    getAddRegularization: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            res.render('admin/regularization/add-regularization', {
                title: "TYS",
                user,
                error: "Add New Regularization"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/regularization/add-regularization', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getRegularizationList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Regularization = await models.CustomerModel.Regularization.find().exec()
            // console.log("All TaskList: ", TaskList);
            // console.log("User First Name: ", user.first_name);

            res.render('admin/regularization/all-regularization', {
                title: "TYS",
                user,
                Regularization,
                error: "Add New Regularization"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/regularization/all-regularization', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddRegularization: async (req, res) => {
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

            const RecordData = new models.CustomerModel.Regularization({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                date: server.date,
                reason: server.reason,
                status: server.status,
                comment: server.comment,
            });

            console.log("Regularization Data: ", RecordData);
            RecordData.save();

            const successMsg = `${user.first_name} - ${RecordData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/regularization/all-regularization?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/regularization/add-regularization?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateRegularization: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Regularization_id = req.params.Regularization_id;
            const UpdateData = await models.CustomerModel.Regularization.findById(Regularization_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/regularization/edit-regularization', {
                title: "TYS",
                Regularization_id,
                user,
                Updatedemail,
                UpdateData,
                error: "Update Regularization"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateRegularization: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const Regularization_id = req.params.Regularization_id;
            console.log("Update Regularization: ", server);
            console.log("Regularization: ", Regularization_id);
            const UpdateRecord = await models.CustomerModel.Regularization.findById(Regularization_id);
            // console.log("Update Record: ", UpdateRecord);

            UpdateRecord.date = server.date;
            UpdateRecord.status = server.status;
            UpdateRecord.reason = server.reason;
            UpdateRecord.comment = server.comment;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/regularization/all-regularization?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/regularization/edit-regularization?error=${encodeURIComponent(err)}`);

        }
    },


}

