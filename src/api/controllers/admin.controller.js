const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    retrieveAdmin: async (req, res) => {
        try {
            console.log("All Admins Record!..");
            const Admins = await models.CustomerModel.Admin.find();
            console.log(Admins);
            return res.status(200).json({
                message: "All Admin",
                Data: Admins
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

    postAdmin: async (req, res) => {
        try {

            // Check if the email already exists
            const existingAdmin = await models.CustomerModel.Admin.findOne({ email: req.body.email });
            if (existingAdmin) {
                return res.status(400).json({ message: "Email Already Used!.." });
            }

            const NewRecord = new models.CustomerModel.Admin({
                _id: new mongoose.Types.ObjectId(),
                profile_url: req.body.profile_url,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
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

    getAdminById: async (req, res) => {
        let id = req.params.id;
        models.CustomerModel.Admin.findById(id).exec().then(doc => {
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

}