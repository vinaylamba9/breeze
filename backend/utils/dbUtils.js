require('dotenv').config();
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const DB_UTILS = {
    findByEmail: async function (email) {
        try {
            let dbResponse = await userModel.findOne(
                {
                    $or: [
                        { "email": email },
                    ],
                }).exec();

            return dbResponse;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    createUser: async function (modelName, dataObject) {
        try {
            let dbResponse = await modelName.create(dataObject);
            return dbResponse
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    updateOneById: async function (modelName, id, updatedDataObject) {
        try {
            let dbResponse = await modelName.findOneAndUpdate(
                {
                    '_id': id
                }, updatedDataObject,
                { new: true }
            ).exec()
            return dbResponse
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    }
}

module.exports = { DB_UTILS }