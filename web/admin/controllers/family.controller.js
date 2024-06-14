const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Address
    getAddFamily: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const userAll = await models.CustomerModel.User.find().exec();

            res.render('admin/family/add-family', {
                title: "TYS",
                user,
                userAll,
                error: "Add New Family"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/family/add-family', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getFamilyList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Family = await models.CustomerModel.Family.find().exec();
            console.log("All Family: ", Family);

            res.render('admin/family/all-family', {
                title: "TYS",
                Family,
                error: "Add New Family"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/family/all-family', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddFamily: async (req, res) => {
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

            // Check if the Family Details filled Or Not: 
            const existingUser = await models.CustomerModel.Family.findOne({ email: server.email });
            if (existingUser) {
                const errorMsg = 'Your Family Details filled!..';
                res.redirect(`/admin/family/add-family?error=${encodeURIComponent(errorMsg)}`);
            }

            const FamilyData = new models.CustomerModel.Family({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                father: server.father,
                mother: server.mother,
                alternate_number: server.alternate_number,
            });

            console.log(FamilyData)
            FamilyData.save();

            const successMsg = `${user.first_name} - ${FamilyData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/family/all-family?success=${encodeURIComponent(successMsg)}`);
        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/family/add-family?error=${encodeURIComponent(errorMsg)}`);
        }
    },


    getUpdateFamily: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const family_id = req.params.family_id;
            const FamilyData = await models.CustomerModel.Family.findById(family_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/family/edit-family', {
                title: "TYS",
                family_id,
                user,
                Updatedemail,
                FamilyData,
                error: "Update Family"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateFamily: async (req, res) => {
        try {
            const user = req.user;

            console.log(req.body)
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            // console.log(server)
            const family_id = req.params.family_id;
            const UpdateRecord = await models.CustomerModel.Family.findById(family_id);

            if (!UpdateRecord) {
                res.redirect(`/admin/family/add-family?error=${encodeURIComponent("User Record Not Found")}`)
            }


            UpdateRecord.father = server.father;
            UpdateRecord.mother = server.mother;
            UpdateRecord.alternate_number = server.alternate_number;

            await UpdateRecord.save();


            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/family/all-family?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit family page with an error message
            console.log("Error: ", err);
            // res.redirect(`/admin/family/edit-family?error=${encodeURIComponent(err)}`);

        }
    },

    deleteFamily: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const family_id = req.params.family_id;
            console.log("ID: ", family_id);

            const UserRecord = await models.CustomerModel.Family.findByIdAndDelete({ _id: family_id });
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