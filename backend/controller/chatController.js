/**

     _____ _           _       
   /  __ \ |         | |      
  | /  \/ |__   __ _| |_ ___ 
 | |   | '_ \ / _` | __/ __|
 | \__/\ | | | (_| | |_\__ \
 \____/_| |_|\__,_|\__|___/
 
 */

require('dotenv').config();
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");


/* ================ UTILS FILES  =================*/
const BASIC_UTILS = require("../utils/basicUtils");
const { DB_UTILS, CHAT_DB_UTILS } = require("../utils/dbUtils");


/* ================ CONSTANTS FILES  =================*/
const { HTTPStatusCode } = require("../constants/network");

/* ================ MODELS FILES  =================*/
const userModel = require("../models/userModel");
const chatModel = require("../models/chatModel");
const { TimeInMs, OTPExpired, AccountStatus, AccountInitFrom, VerificationType } =
  require('../constants/application');


const chatController = {
  /** This Function will be used for creating and fetching chats. */
  createChat: async function (req, res) {
    let responseStatusCode, responseMessage, responseData;
    try {
      const { userID } = req.body;
      if (BASIC_UTILS._isNull(userID) || !userID) {
        responseStatusCode = HTTPStatusCode.BAD_REQUEST
        responseMessage = HTTPStatusCode.BAD_REQUEST
        responseData = "Please provide userID."
      } else {

        if (userID === req.user.userId) {
          responseStatusCode = HTTPStatusCode.BAD_REQUEST
          responseMessage = HTTPStatusCode.BAD_REQUEST
          responseData = "Chat cannot be created."
        }
        else {
          let chat = await CHAT_DB_UTILS.findOneToOne(userID, req.user.userId)
          if (chat.length > 0) {
            responseStatusCode = HTTPStatusCode.OK
            responseMessage = HTTPStatusCode.OK
            responseData = chat[0]
          } else {
            const chatData = {
              chatName: 'sender',
              isGroupChat: false,
              users: [req.user.userId, userID]
            }
            const createdChat = await CHAT_DB_UTILS.createChat(chatData);
            const completeChat = await CHAT_DB_UTILS.findOneByID(createdChat._id)
            responseStatusCode = HTTPStatusCode.OK
            responseMessage = HTTPStatusCode.OK
            responseData = completeChat
          }
        }
      }
    } catch (error) {
      responseStatusCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
      responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR
      responseData = error.toString()
    } finally {
      return res.status(responseStatusCode).send({ message: responseMessage, data: responseData })
    }

  },
  fetchChats: async function (req, res) {

  },
  createGroupChat: async function (req, res) {

  },
  renameGroup: async function (req, res) {

  },
  removeFromGroup: async function (req, res) {

  },
  addToGroup: async function (req, res) {

  }
}

module.exports = chatController;