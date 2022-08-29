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
const { TimeInMs, OTPExpired, AccountStatus, AccountInitFrom } = require('../constants/application');
const { EMAIL_SERVICES } = require('../services/email/emailService');


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
                let dbResponse = await DB_UTILS.findByEmail(req.body.email);
                if (!dbResponse) {
                    let signupData = {
                        "email": req.body.email,
                        "password": req.body.password,
                        "profileImage": req.body.profileImage,
                        "name": req.body.name,
                        "isVerified": AccountInitFrom.SELF != req.body.accountInItFrom,
                        "accountInItFrom": req.body.accountInItFrom,
                        "accountStatus": AccountStatus.ACTIVE
                    };
                    let signedUpResponse = await DB_UTILS.createUser(userModel, signupData);
                    if (signedUpResponse) {
                        if (signedUpResponse.isVerified) {
                            const token = await signedUpResponse.createToken();
                            signedUpResponse.token = token;
                            responseStatusCode = HTTPStatusCode.CREATED;
                            responseMessage = HTTPStatusCode.CREATED;
                            responseData = signedUpResponse
                        } else {
                            //TODO:- MOVE THIS IN UTILS AS IT IS ALSO GETTING USED IN LOGIN API.
                            const updatedObject = {
                                'otp': BASIC_UTILS.otpGenrator(6),
                                'otpValidTill': Date.now() + TimeInMs.MIN5
                            }
                            const userUpdated = await DB_UTILS.updateOneById(userModel, signedUpResponse['_id'], updatedObject)
                            if (userUpdated) {
                                let emailResponse = await EMAIL_SERVICES.sendOTPVerification(userUpdated)
                                if (emailResponse) {
                                    responseMessage = HTTPStatusCode.OK
                                    responseStatusCode = HTTPStatusCode.OK
                                    responseData = "OTP sent successfully.Please verify it."
                                } else {
                                    responseMessage = HTTPStatusCode.BAD_REQUEST
                                    responseStatusCode = HTTPStatusCode.BAD_REQUEST
                                    responseData = emailResponse
                                }
                            } else {
                                responseStatusCode = HTTPStatusCode.BAD_REQUEST;
                                responseMessage = HTTPStatusCode.BAD_REQUEST;
                                responseData = "Unable to send OTP to the email."
                            }
                        }

                    } else {
                        responseStatusCode = HTTPStatusCode.BAD_REQUEST;
                        responseData = errors;
                        responseMessage = "Failed to create user. Please try again."
                    }
                } else {
                    responseStatusCode = HTTPStatusCode.FORBIDDEN;
                    responseMessage = HTTPStatusCode.FORBIDDEN;
                    responseData = "User already exist."
                }
            }
        } catch (error) {
            responseStatusCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
            responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
            responseData = error.toString();
        } finally {
            return res.status(responseStatusCode).send({ message: responseMessage, data: responseData })
        }
    },
    loginUser: async function (req, res) {
        let responseStatusCode, responseMessage, responseData;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                responseStatusCode = HTTPStatusCode.BAD_REQUEST;
                responseData = errors;
                responseMessage = HTTPStatusCode.BAD_REQUEST
            } else {
                let dbResponse = await DB_UTILS.findByEmail(req.body.email);
                if (dbResponse) {
                    const isPasswordMatched = await bcrypt.compare(req.body.password, dbResponse.password);
                    if (isPasswordMatched) {
                        if (dbResponse.isVerified) { // CHECK WHETHER USER IS VERIFIED IS NOT
                            const token = await dbResponse.createToken();              // CREATE TOKEN
                            dbResponse.token = token;                         // ASSIGNING JWT TOKEN
                            responseStatusCode = HTTPStatusCode.OK;
                            responseMessage = HTTPStatusCode.OK;
                            responseData = dbResponse
                        } else {
                            const updatedObject = {
                                'otp': BASIC_UTILS.otpGenrator(6),
                                'otpValidTill': Date.now() + TimeInMs.MIN5
                            }
                            const userUpdated = await DB_UTILS.updateOneById(userModel, dbResponse['_id'], updatedObject)
                            if (userUpdated) {
                                let emailResponse = await EMAIL_SERVICES.sendOTPVerification(userUpdated)
                                if (emailResponse) {
                                    responseMessage = HTTPStatusCode.OK
                                    responseStatusCode = HTTPStatusCode.OK
                                    responseData = "OTP sent successfully.Please verify it."
                                } else {
                                    responseMessage = HTTPStatusCode.BAD_REQUEST
                                    responseStatusCode = HTTPStatusCode.BAD_REQUEST
                                    responseData = emailResponse
                                }
                            }
                            else {
                                responseStatusCode = HTTPStatusCode.BAD_REQUEST;
                                responseMessage = HTTPStatusCode.BAD_REQUEST;
                                responseData = "Unable to send OTP to the email."
                            }
                        }
                    } else {
                        responseStatusCode = HTTPStatusCode.UNAUTHORIZED;
                        responseMessage = HTTPStatusCode.UNAUTHORIZED;
                        responseData = "Password is not matching."
                    }
                } else {
                    responseStatusCode = HTTPStatusCode.NOT_FOUND;
                    responseMessage = HTTPStatusCode.NOT_FOUND;
                    responseData = "User not found."
                }
            }
        } catch (error) {
            responseStatusCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
            responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
            responseData = error.toString();
        } finally {
            return res.status(responseStatusCode).send({ message: responseMessage, data: responseData })
        }
    },
    verifyOTP: async function (req, res) {
        let responseStatusCode, responseMessage, responseData;
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                responseStatusCode = HTTPStatusCode.BAD_REQUEST;
                responseData = errors;
                responseMessage = HTTPStatusCode.BAD_REQUEST
            } else {
                const dbResponse = await DB_UTILS.findByEmail(req.body.email)
                if (dbResponse) {
                    let isOnTime = BASIC_UTILS.timeON.isTimeLimitAvailable(
                        Date.now(),
                        new Date(dbResponse.otpValidTill).getTime()
                    ) // CHECK WHETHER OTP IS EXPIRED OR NOT
                    if (isOnTime) {
                        if (req.body.otp === dbResponse.otp) {
                            let updatedUserResponse = await DB_UTILS.updateOneById(userModel, dbResponse.id, {
                                isVerified: true,
                                otp: OTPExpired.EXPIREDVALUE,
                                otpValidTill: OTPExpired.TOKENVALIDTILL
                            })
                            updatedUserResponse = BASIC_UTILS.cleanUserModel(updatedUserResponse)
                            if (updatedUserResponse) {
                                const token = await dbResponse.createToken()
                                updatedUserResponse.token = token
                                responseStatusCode = HTTPStatusCode.OK;
                                responseMessage = HTTPStatusCode.OK;
                                responseData = updatedUserResponse
                            } else {
                                responseStatusCode = HTTPStatusCode.FORBIDDEN;
                                responseMessage = HTTPStatusCode.FORBIDDEN;
                                responseData = "Unable to clean trash."
                            }
                        } else {
                            responseStatusCode = HTTPStatusCode.BAD_REQUEST;
                            responseMessage = HTTPStatusCode.BAD_REQUEST;
                            responseData = "OTP is not matched."
                        }
                    } else {
                        responseStatusCode = HTTPStatusCode.FORBIDDEN;
                        responseMessage = HTTPStatusCode.FORBIDDEN;
                        responseData = "OTP is expired.Please use the new OTP."
                    }
                } else {
                    responseStatusCode = HTTPStatusCode.FORBIDDEN;
                    responseMessage = HTTPStatusCode.FORBIDDEN;
                    responseData = "User not found."
                }
            }
        } catch (error) {
            responseStatusCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
            responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
            responseData = error.toString();
        } finally {
            return res.status(responseStatusCode).send({ message: responseMessage, data: responseData })
        }
    },
    forgotPassword: async function (req, res) {
        return null;
    }

}

module.exports = userController;