const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Perfessional
    getAddWorkExperience: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            res.render('admin/work/add-work', {
                title: "TYS",
                user,
                error: "Add New Work Experience"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/work/add-work', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getWorkExperienceList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const WorkExperience = await models.CustomerModel.WorkExperience.find().exec()
            console.log("All WorkExperience: ", WorkExperience);
            console.log("User First Name: ", user.first_name);

            res.render('admin/work/all-work', {
                title: "TYS",
                user,
                WorkExperience,
                error: "Add New Work Experience"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/work/all-work', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddWorkExperience: async (req, res) => {
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

            const WorkExperienceData = new models.CustomerModel.WorkExperience({
                _id: new mongoose.Types.ObjectId(),
                email: user.email,
                designation: server.designation,
                experience: server.experience,
                company_name: server.company_name,
                desc: server.desc,
                start_date: server.start_date,
                end_date: server.end_date,
            });

            console.log("WorkExperience Data: ", WorkExperienceData)
            WorkExperienceData.save();

            const successMsg = `${user.first_name} - ${WorkExperienceData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/work/all-work?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/work/add-work?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateWorkExperience: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const work_id = req.params.work_id;
            const UpdateData = await models.CustomerModel.WorkExperience.findById(work_id);

            res.render('admin/work/edit-work', {
                title: "TYS",
                work_id,
                user,
                UpdateData,
                error: "Update WorkExperience"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateWorkExperience: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const work_id = req.params.work_id;
            // console.log("Update WorkExperience: ", server);
            console.log("WorkExperience: ", work_id);
            const UpdateRecord = await models.CustomerModel.WorkExperience.findById(work_id);
            // console.log("Update Record: ", UpdateRecord);

            UpdateRecord.designation = server.designation;
            UpdateRecord.experience = server.experience;
            UpdateRecord.company_name = server.company_name;
            UpdateRecord.desc = server.desc;
            UpdateRecord.start_date = server.start_date;
            UpdateRecord.end_date = server.end_date;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/work/all-work?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/work/edit-work?error=${encodeURIComponent(err)}`);

        }
    },


}

