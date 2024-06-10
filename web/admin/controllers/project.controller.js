const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Education
    getAddProject: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            res.render('admin/project/add-project', {
                title: "TYS",
                user,
                error: "Add New Project"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/project/add-project', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getProjectList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Project = await models.CustomerModel.Project.find().exec()
            // console.log("All Project: ", Project);
            // console.log("User First Name: ", user.first_name);

            res.render('admin/project/all-project', {
                title: "TYS",
                user,
                Project,
                error: "Add New Project"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/project/all-project', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddProject: async (req, res) => {
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

            const RecordData = new models.CustomerModel.Project({
                _id: new mongoose.Types.ObjectId(),
                email: user.email,
                project_title: server.project_title,
                project_desc: server.project_desc,
                start_date: server.start_date,
                end_date: server.end_date,
            });

            console.log("Project Data: ", RecordData)
            RecordData.save();

            const successMsg = `${user.first_name} - ${RecordData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/project/all-project?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/project/add-project?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateProject: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const project_id = req.params.project_id;
            const UpdateData = await models.CustomerModel.Project.findById(project_id);

            res.render('admin/project/edit-project', {
                title: "TYS",
                project_id,
                user,
                UpdateData,
                error: "Update Project"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateProject: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const project_id = req.params.project_id;
            console.log("Update Project: ", server);
            console.log("Project: ", project_id);
            const UpdateRecord = await models.CustomerModel.Project.findById(project_id);
            // console.log("Update Record: ", UpdateRecord);

            UpdateRecord.project_title = server.project_title;
            UpdateRecord.project_desc = server.project_desc;
            UpdateRecord.start_date = server.start_date;
            UpdateRecord.end_date = server.end_date;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/project/all-project?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/project/edit-project?error=${encodeURIComponent(err)}`);

        }
    },


}

