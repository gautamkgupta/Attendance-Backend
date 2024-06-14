const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    retrieveUsers: async (req, res) => {
        try {
            console.log("All User Record!..");
            const users = await models.CustomerModel.User.find();
            console.log(users);
            // console.log([record for record in users['email'] if record['email'] == target_email]);
            return res.status(200).json({
                message: "All User",
                Data: users
            });
        }
        catch (err) {
            console.log(err);
            return res.json({
                message: "Error",
                Error: err,
            })
        }
    },

    postUsers: async (req, res) => {
        try {

            // Check if the email already exists
            const existingUser = await models.CustomerModel.User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: "Email Already Used!.." });
            }

            // Check if the phone already exists
            const existingphone = await models.CustomerModel.User.findOne({ phone: req.body.phone });
            if (existingphone) {
                return res.status(400).json({ message: "Mobile Number Already Used!.." });
            }

            const NewRecord = new models.CustomerModel.User({
                _id: new mongoose.Types.ObjectId(),
                profile_url: req.body.profile_url,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                is_active: req.body.is_active,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New User Record!..",
                    Data: data
                });
            })

        }
        catch (err) {
            console.log(err);
            return res.json({
                message: "Error",
                Error: err,
            })
        }
    },

    getUserById: async (req, res) => {
        let id = req.params.id;
        models.CustomerModel.User.findById(id).exec().then(doc => {
            // console.log(doc)
            if (doc)
                res.status(200).json(doc);
            else
                res.status(400).json({ message: "No Valid Dta Found!." });
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                Error: err
            });
        })
    },

    postUsersUpdate: async (req, res) => {
        try {

            const server = req.body;
            const user_id = req.params.userId;
            console.log("UserId: ", user_id);
            const UserRecord = await models.CustomerModel.User.findById(user_id);

            if (!UserRecord) {
                return res.status(400).json({ message: "User Record Not Found!.." });
            }

            // Check if the email already exists
            const existingUser = await models.CustomerModel.User.findOne({ email: server.email });
            if (!existingUser) {
                return res.status(400).json({ message: "Email-Id Not Fetch!.." });
            }

            UserRecord.first_name = server.first_name;
            UserRecord.last_name = server.last_name;
            UserRecord.email = server.email;
            UserRecord.phone = server.phone;
            UserRecord.password = server.password;
            UserRecord.is_active = server.is_active;

            await UserRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "Update User Record!..",
                    Data: data
                });
            })


        } catch (err) {
            // console.log(err)
            return res.json({
                message: "Error",
                Error: err,
            })

        }
    },

}