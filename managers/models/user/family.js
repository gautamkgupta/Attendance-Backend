const mongoose = require('mongoose');

const FamilySchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,

        email: {
            type: String,
            required: true
        },
        father: {
            type: String,
            required: true
        },
        mother: {
            type: String,
            required: true
        },
        alternate_number: {
            type: String,
            required: true
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


const FamilyModel = mongoose.model("Family", FamilySchema);

module.exports = FamilyModel;