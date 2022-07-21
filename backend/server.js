require('dotenv').config();
require('colors');
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const helmet = require('helmet');
const SHA256 = require("crypto-js/sha256");
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const cors = require('cors');
const { chats } = require("./data/data");
const PORT = process.env.PORT


/* ================ Configuring UTILITY PACKAGES START  =================*/

const BASIC_UTILS = require("./utils/basicUtils.js");
const DB_UTILS = require("./utils/dbUtils");

/* ================ Configuring UTILITY PACKAGES END  =================*/


/* ================ Configuring Database START  =================*/
// DB_UTILS.dbUtils.dbInit();
/* ================ Configuring Database END  =================*/



/* ================ Configuring body and Cookie Parser STARTS  =================*/

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, "/public", "build")));
app.use(helmet());

/* ================ Configuring body and Cookie Parser END  =================*/


app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/api/chat", (req, res) => {
    res.send(chats);
})

app.get("/api/chat/:id", (req, res) => {
    const singleChat = chats.find(ch => ch._id == req.params.id);
    res.send(singleChat);
})

/* ================ Connecting with the PORT STARTS  =================*/

const onListening = () => {
    bootstrapMessage();
}

const bootstrapMessage = () => {
    console.info(`\n\t SERVER IS ONLINE [ 📢 ] AND RUNNING [ 🚀 ]  \n
        \n\t -ON PORT :: ${PORT}
        \n\t -STARTED AT :: ${new Date()}
        \n\t---------------------- LET'S BREEZE LOGS ----------------------\n `.rainbow);
}

app.listen(PORT).on('listening', onListening);

/* ================ Connecting with the PORT STARTS  =================*/