/*
 _   _               _
| | | |___  ___ _ __( )___
| | | / __|/ _ \ '__|// __|
| |_| \__ \  __/ |    \__ \
 \___/|___/\___|_|    |___/
*/
require('dotenv').config();
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');

/* ================ UTILS FILES  =================*/
const BASIC_UTILS = require("../utils/basicUtils");
const { DB_UTILS } = require("../utils/dbUtils");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode } = require("../constants/network");

/* ================ MODELS FILES  =================*/
const userModel = require("../models/userModel");


const userController = {
    registerUser: async function (req, res) {
        let responseStatusCode, responseMessage, responseData;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                responseStatusCode = HTTPStatusCode.BAD_REQUEST;
                responseData = errors;
                responseMessage = HTTPStatusCode.BAD_REQUEST
            } else {
                let dbResponse = await DB_UTILS.findByEmailOrUserName(req.body.email);
                if (!dbResponse) {
                    let signupData = {
                        "email": req.body.email,
                        "password": req.body.password,
                        "profileImage": req.body.profileImage,
                        "name": req.body.name,
                    };
                    let signedUpResponse = await DB_UTILS.createUser(userModel, signupData);
                    if (signedUpResponse) {
                        //TODO:- ADD AUTH TOKEN;
                        const token = await signedUpResponse.createToken();
                        signedUpResponse.token = token;
                        responseStatusCode = HTTPStatusCode.CREATED;
                        responseMessage = HTTPStatusCode.CREATED;
                        responseData = signedUpResponse
                    } else {
                        responseStatusCode = HTTPStatusCode.BAD_REQUEST;
                        responseData = errors;
                        responseMessage = "Failed to create user."
                    }
                } else {
                    responseStatusCode = HTTPStatusCode.FORBIDDEN;
                    responseMessage = HTTPStatusCode.FORBIDDEN;
                    responseData = "USER ALREADY EXISTS."
                }
            }
        } catch (error) {
            responseStatusCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
            responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
            responseData = error.toString();
        } finally {
            return res.status(responseStatusCode).send({ message: responseMessage, data: responseData })
        }
    }
}

module.exports = userController;