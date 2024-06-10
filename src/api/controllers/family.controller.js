const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getFamily: async (req, res) => {
        try {
            const record = await models.CustomerModel.Family.find();
            console.log(record);
            return res.status(200).json({
                message: "All Family Record!..",
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
}