const mongoose = require("mongoose");

const PersonalSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        email: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            require: true
        },
        gender: {
            type: String,
            require: true
        },
        bio: {
            type: String,
            require: true
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        updated_date: {
            type: Date,
            default: Date.now
        },
        deleted_date: {
            type: Date,
            default: Date.now
        },

    },
);


const PersonalModel = mongoose.model("Personal", PersonalSchema);

module.exports = PersonalModel;