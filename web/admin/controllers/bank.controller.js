const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Education
    getAddBank: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const userAll = await models.CustomerModel.User.find().exec();

            res.render('admin/bank/add-bank', {
                title: "TYS",
                user,
                userAll,
                error: "Add New Project"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/bank/add-bank', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getBankList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Bank = await models.CustomerModel.BankAccount.find().exec()
            console.log("All Bank: ", Bank);
            console.log("User First Name: ", user.first_name);

            res.render('admin/bank/all-bank', {
                title: "TYS",
                user,
                Bank,
                error: "Add New Bank"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/bank/all-bank', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddBank: async (req, res) => {
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

            const InputRecord = new models.CustomerModel.BankAccount({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                account_number: server.account_number,
                bank_name: server.bank_name,
                ifsc_code: server.ifsc_code,
                name_as_bank: server.name_as_bank,
                branch_name: server.branch_name,
                aadhar_card: server.aadhar_card,
                pan_card: server.pan_card,
            });

            console.log("Bank Data: ", InputRecord)
            InputRecord.save();

            const successMsg = `${user.first_name} - ${InputRecord ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/bank/all-bank?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/bank/add-bank?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateBank: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const bank_id = req.params.bank_id;
            const UpdateData = await models.CustomerModel.BankAccount.findById(bank_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/bank/edit-bank', {
                title: "TYS",
                bank_id,
                user,
                Updatedemail,
                UpdateData,
                error: "Update Bank"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateBank: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const bank_id = req.params.bank_id;
            console.log("Update Bank: ", server);
            console.log("Bank: ", bank_id);
            const UpdateRecord = await models.CustomerModel.BankAccount.findById(bank_id);
            // console.log("Update Record: ", UpdateRecord);

            UpdateRecord.account_number = server.account_number;
            UpdateRecord.bank_name = server.bank_name;
            UpdateRecord.ifsc_code = server.ifsc_code;
            UpdateRecord.name_as_bank = server.name_as_bank;
            UpdateRecord.branch_name = server.branch_name;
            UpdateRecord.aadhar_card = server.aadhar_card;
            UpdateRecord.pan_card = server.pan_card;

            await UpdateRecord.save();

            const successMsg = `${user.first_name} -- Updated Successfully`;
            res.redirect(`/admin/bank/all-bank?success=${encodeURIComponent(successMsg)}`);
        } catch (err) {
            console.log(err)
            // Redirect to the edit user page with an error message
            console.log("Error: ", err);
            res.redirect(`/admin/bank/edit-bank?error=${encodeURIComponent(err)}`);

        }
    },

    deleteBank: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const bank_id = req.params.bank_id;
            console.log("ID: ", bank_id);

            const UserRecord = await models.CustomerModel.Bank.findByIdAndDelete({ _id: bank_id });
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

