const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getPersonal: async (req, res) => {
        try {
            const record = await models.CustomerModel.Personal.find();
            console.log(record);
            return res.status(200).json({
                message: "All Personal Record!..",
                Data: record
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

    postPersonal: async (req, res) => {
        try {

            const NewRecord = new models.CustomerModel.Personal({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                dob: req.body.dob,
                gender: req.body.gender,
                bio: req.body.bio,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New Personal Record!..",
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


}