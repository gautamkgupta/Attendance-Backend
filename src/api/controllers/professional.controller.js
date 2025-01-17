const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getProfessional: async (req, res) => {
        try {
            const record = await models.CustomerModel.Professional.find();
            console.log(record);
            return res.status(200).json({
                message: "All Professional Record!..",
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

    postProfessional: async (req, res) => {
        try {

            const NewRecord = new models.CustomerModel.Professional({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                designation: req.body.designation,
                experience: req.body.experience,
                skill: req.body.skill,
                cv_intro: req.body.cv_intro,
                join_date: req.body.join_date,
                corfirm_date: req.body.corfirm_date,
                termination_date: req.body.termination_date,
                termination_reasons: req.body.termination_reasons,
                desc: req.body.desc,
            });

            NewRecord.save().then(data => {
                console.log(data);
                res.status(200).json({
                    message: "New Professional Record!..",
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