require('dotenv').config();
const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
require("mongoose-long")(mongoose)


const userModel = mongoose.Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        immutable: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profileImage: {
        type: String,
        required: true,
        default: "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userModel);