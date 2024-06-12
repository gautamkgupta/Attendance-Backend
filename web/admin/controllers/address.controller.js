const express = require('express');
const mongoose = require('mongoose');
const models = require('../../../managers/models');
const { urlencoded } = require('body-parser');


module.exports = {

    //GET Add Address
    getAddAddress: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }


            const userAll = await models.CustomerModel.User.find().exec();

            res.render('admin/address/add-address', {
                title: "TYS",
                user,
                userAll,
                error: "Add New Address"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/address/add-address', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    getAddressList: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const Address = await models.CustomerModel.Address.find().exec();
            // console.log("All Address: ", Address);

            res.render('admin/address/all-address', {
                title: "TYS",
                user,
                Address,
                error: "Add New Address"
            })
        } catch (err) {
            const user = req.user;
            res.render('admin/address/all-address', {
                title: "TYS",
                user,
                error: err
            })
        }
    },

    postAddAddress: async (req, res) => {
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

            const AddressData = new models.CustomerModel.Address({
                _id: new mongoose.Types.ObjectId(),
                email: server.email,
                address_type: server.address_type,
                address_1: server.address_1,
                address_2: server.address_2,
                area: server.area,
                pincode: server.pincode,
                city: server.city,
                state: server.state,
                country: server.country
            });

            console.log("AddressData: ", AddressData)
            AddressData.save();

            const successMsg = `${user.first_name} - ${AddressData ? 'Updated' : 'Added'} Successfully`;
            res.redirect(`/admin/address/all-address?success=${encodeURIComponent(successMsg)}`);

        }
        catch (err) {
            console.error(err);
            const errorMsg = 'An error occurred while adding user';
            res.redirect(`/admin/address/add-address?error=${encodeURIComponent(err)}`);
        }
    },

    getUpdateAddress: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const address_id = req.params.address_id;
            const UpdateData = await models.CustomerModel.Address.findById(address_id);
            const Updatedemail = UpdateData.email;

            res.render('admin/address/edit-address', {
                title: "TYS",
                address_id,
                user,
                Updatedemail,
                UpdateData,
                error: "Update Address"
            })
        } catch (err) {
            console.log(err)
            res.redirect(`/admin/auth/dashboard?error=${encodeURIComponent(err)}`)
        }
    },

    postUpdateAddress: async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                })
            }

            const server = req.body;
            const address_id = req.params.address_id;
            console.log("Update Address: ", server);
            console.log("Address_id: ", address_id);
            const UpdateRecord = await models.CustomerModel.Address.findById(address_id);

            UpdateRecord.address_type = server.address_type;
            UpdateRecord.address_1 = server.address_1;
            UpdateRecord.address_2 = server.address_2;
            UpdateRecord.area = server.area;
            UpdateRecord.city = server.city;
            UpdateRecord.pincode = server.pincode;
            UpdateRecord.state = server.state;
            UpdateRecord.country = server.country;

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

    deleteAddress: async (req, res) => {
        try {
            const user = req.user;

            if (!user) {
                return res.render('a-login', {
                    title: "TYS",
                    error: "User Not Found"
                });
            }

            const address_id = req.params.address_id;
            console.log("UserID: ", address_id);

            const UserRecord = await models.CustomerModel.Address.findByIdAndDelete({ _id: address_id });
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

