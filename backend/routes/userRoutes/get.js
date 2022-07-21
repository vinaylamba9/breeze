/*
 _   _               _
| | | |___  ___ _ __( )___
| | | / __|/ _ \ '__|// __|
| |_| \__ \  __/ |    \__ \
 \___/|___/\___|_|    |___/
*/

const express = require("express");
const app = express();
const router = express.Router();

/* ================ UTILS FILES  =================*/
const BASIC_UTILS = require("../../utils/basicUtils");
const DB = require("../../utils/dbUtils");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode } = require("../../constants/network");


router.get("/", (req, res) => {

});

module.exports = router;