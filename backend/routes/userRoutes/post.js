/*
 _   _               _
| | | |___  ___ _ __( )___
| | | / __|/ _ \ '__|// __|
| |_| \__ \  __/ |    \__ \
 \___/|___/\___|_|    |___/
*/

const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator')

/* ================ CONTROLLER  FILES  =================*/
const userController = require("../../controller/userController");

router.post(
    "/signup",
    [
        check("name").notEmpty().withMessage("Name is required.").trim(),
        check("email").notEmpty().withMessage("Email is Required.").trim().isEmail().withMessage("Please enter a valid Email."),
        check("password").notEmpty().withMessage("Password is required.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long"),
    ],
    userController.registerUser
);

router.post(
    "/login", [
    check("email").notEmpty().withMessage("Email is Required.").trim().isEmail().withMessage("Please enter a valid Email."),
    check("password").notEmpty().withMessage("Password is required.").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 character long"),
],
    userController.loginUser
);

module.exports = router;