require('dotenv').config();
const mongoose = require("mongoose");
const { MasterConstantsStatus } = require('../constants/application');
const { EmailStatus } = require('../constants/mail');
const emailModel = require('../models/emailModel');
const masterConstantModel = require('../models/masterConstantModel');
const userModel = require("../models/userModel");
const chatModel = require('../models/chatModel');
const messageModel = require('../models/messageModel');

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
    findByID: async function (id) {
        try {
            let dbResponse = await userModel.findOne(
                {
                    $or: [
                        { "_id": id },
                    ],
                    /*  users: {
                         $elemMatch: { $eq: id }
                     } */
                }).select({
                    name: 1,
                    email: 1,
                    profileImage: 1
                });

            return dbResponse ? dbResponse : null;
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
    },
    findByAny: async function (modelName, keyword, loggedInUserID) {
        try {
            let dbResponse = await modelName.find(keyword).find({ _id: { $ne: loggedInUserID } })
            return dbResponse
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    }
}


const CHAT_DB_UTILS = {
    findOneToOne: async function (userID, loggedInUseID, modelName) {
        try {
            let dbResponse = await chatModel.find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: loggedInUseID } } },
                    { users: { $elemMatch: { $eq: userID } } }

                ]
            }).populate("users", '-password').populate("recentMessage")


            dbResponse = await modelName.populate(dbResponse, {
                path: 'recentMessage.sender',
                model: modelName,
                select: {
                    'name': 0,
                    'email': 0
                }
            })

            return dbResponse;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    createChat: async function (chatData) {
        try {
            let dbResponse = await chatModel.create(chatData)
            return dbResponse
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    findChatByID: async function (chatID) {
        try {
            let dbResponse = await chatModel.findOne({
                _id: chatID
            }).populate("users", "-password")
            return dbResponse
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    findByID: async function (loggedInID) {
        try {
            let dbResponse = await chatModel.find({
                users: {
                    $elemMatch: { $eq: loggedInID }
                }
            })
                .populate("users", "-password")
                .populate("groupAdmin", '-password')
                .populate('recentMessage')
                .sort({ updatedAt: -1 })

            dbResponse = await userModel.populate(dbResponse, {
                path: 'recentMessage.sender',
                select: 'name email profileImage'
            })
            return dbResponse ? dbResponse : null
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    }
}
const EMAIL_DB_UTILS = {
    findTitle: async function (title, select, status = EmailStatus.ACTIVE) {
        try {
            let dbResponse = await emailModel.findOne({
                "title": title,
                "status": status
            }).select(select)
            return dbResponse;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    createOne: async function (emailRecord) {
        try {
            let dbResponse = await emailModel.create([emailRecord])
            return dbResponse;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    }
}

const MASTER_CONSTANTS_DB_UTILS = {
    createOne: async function (masterConstant) {
        try {
            let dbResponse = await masterConstantModel.create([masterConstant])
            return dbResponse
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    findTitle: async function (id, selectedKeys, status = MasterConstantsStatus.ACTIVE) {
        try {
            let dbResponse = await masterConstantModel.findOne({
                "title": title,
                "status": status
            }).select(selectedKeys)
            return dbResponse
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    findById: async function (id, selectedKeys, status = MasterConstantsStatus.ACTIVE) {
        try {
            let dbResponse = await masterConstantModel.findOne({
                "_id": id,
                "status": status
            }).select(selectedKeys)
            return dbResponse
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    },
    findAll: async function (selectedKeys) {
        try {
            let dbResponse = await masterConstantModel.find({}).select(selectedKeys)
            return dbResponse;
        } catch (error) {
            return { msg: error, status: "NOT_FOUND" }
        }
    }
}

module.exports = { DB_UTILS, EMAIL_DB_UTILS, MASTER_CONSTANTS_DB_UTILS, CHAT_DB_UTILS }