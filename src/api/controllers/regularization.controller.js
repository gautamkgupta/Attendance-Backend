const router = require('express').Router();
const models = require('../../../managers/models');
const mongoose = require('mongoose');

module.exports = {
    getRegularization: async (req, res) => {
        try {
            const record = await models.CustomerModel.Regularization.find();
            console.log(record);
            return res.status(200).json({
                message: "All Regularization Record!..",
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