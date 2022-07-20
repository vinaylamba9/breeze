const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const PORT = process.env.PORT || 5000;

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
app.listen(PORT, console.log(`SERVER Connected at ${PORT}`))