const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');
const { Personal } = require('../../../managers/models/user');


module.exports = {

    //GET Add Personal
    getAddPersonal: async (req, res) => {
        try {
            // const user = req.user;

            // if (!user) {
            //     res.render('a-login', {
            //         title: "TYS",
            //         error: "User Not Found"
            //     })
            // }

            res.render('admin/personal/add-personal', {
                title: "TYS",
                user,
                error: "Add New Personal"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/personal/add-personal', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getPersonalList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Personal = await models.CustomerModel.Personal.find().exec()
            // console.log("All Personal: ", Personal);

            res.render('admin/personal/all-personal', {
                title: "TYS",
                user,
                Personal,
                error: "Add New Personal"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/personal/all-personal', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddPersonal: async (req, res) => {
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
            // console.log(server);

            const PersonalData = new models.CustomerModel.Personal({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                dob: server.dob,
                gender: server.gender,
                bio: server.bio
            });

            console.log(PersonalData)
            PersonalData.save();

            const successMsg = `${user.first_name} - ${PersonalData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/personal/all-personal?success=${encodeURIComponent(successMsg)}`);
        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/personal/add-personal?error=${encodeURIComponent(errorMsg)}`);
        }
    },


    getUpdatePersonal: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const personal_id = req.params.personal_id;
            const UpdateData = await models.CustomerModel.Personal.findById(personal_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/personal/edit-personal', {
                title: "TYS",
                personal_id,
                user,
                Updatedemail,
                UpdateData,
                error: "Update Personal"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdatePersonal: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const personal_id = req.params.personal_id;
            console.log("Update Personal: ", server);
            console.log("Personal: ", personal_id);
            const UpdateRecord = await models.CustomerModel.Personal.findById(personal_id);

            UpdateRecord.dob = server.dob;
            UpdateRecord.gender = server.gender;
            UpdateRecord.bio = server.bio;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/personal/all-personal?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/personal/edit-personal?error=${encodeURIComponent(err)}`);

        }
    },

}


