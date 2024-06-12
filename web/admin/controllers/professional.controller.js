const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Professional
    getAddProfessional: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const userAll = await models.CustomerModel.User.find().exec();

            res.render('admin/Professional/add-Professional', {
                title: "TYS",
                user,
                userAll,
                error: "Add New Professional"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/Professional/add-Professional', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getProfessionalList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Professional = await models.CustomerModel.Professional.find().exec()
            console.log("All Professional: ", Professional);
            console.log("User First Name: ", user.first_name);

            res.render('admin/professional/all-professional', {
                title: "TYS",
                user,
                Professional,
                error: "Add New Professional"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/professional/all-professional', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddProfessional: async (req, res) => {
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

            const ProfessionalData = new models.CustomerModel.Professional({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                designation: server.designation,
                experience: server.experience,
                skill: server.skill,
                cv_intro: server.cv_intro,
                join_date: server.join_date,
                corfirm_date: server.corfirm_date,
                termination_date: server.termination_date,
                termination_reasons: server.termination_reasons,
                desc: server.desc,
            });

            console.log("ProfessionalData: ", ProfessionalData)
            ProfessionalData.save();

            const successMsg = `${user.first_name} - ${ProfessionalData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/professional/all-Professional?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/professional/add-professional?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateProfessional: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Professional_id = req.params.Professional_id;
            const UpdateData = await models.CustomerModel.Professional.findById(Professional_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/Professional/edit-Professional', {
                title: "TYS",
                Professional_id,
                user,
                Updatedemail,
                UpdateData,
                error: "Update Professional"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateProfessional: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const Professional_id = req.params.Professional_id;
            console.log("Update Professional: ", server);
            console.log("Professional: ", Professional_id);
            const UpdateRecord = await models.CustomerModel.Professional.findById(Professional_id);
            // console.log("Update Record: ", UpdateRecord);

            UpdateRecord.designation = server.designation;
            UpdateRecord.experience = server.experience;
            UpdateRecord.total_experience = server.total_experience;
            UpdateRecord.skill = server.skill;
            UpdateRecord.cv_intro = server.cv_intro;
            UpdateRecord.join_date = server.join_date;
            UpdateRecord.corfirm_date = server.corfirm_date;
            UpdateRecord.termination_date = server.termination_date;
            UpdateRecord.termination_reasons = server.termination_reasons;
            UpdateRecord.desc = server.desc;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/professional/all-professional?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/professional/edit-professional?error=${encodeURIComponent(err)}`);

        }
    },

    deleteProfessional: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const Professional_id = req.params.Professional_id;
            console.log("ID: ", Professional_id);

            const UserRecord = await models.CustomerModel.Professional.findByIdAndDelete({ _id: Professional_id });
            console.log("Deleted Record: ", UserRecord);

            const successMsg = `${UserRecord.first_name} -- Deleted Successfully`;
            return res.status(200).json({ success: successMsg });
        } catch (err) {
            console.error(err);
            const errorMsg = err.message || "Internal Server Error";
            return res.status(500).json({ error: errorMsg });
        }
    },



}

