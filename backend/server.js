require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const PORT = process.env.PORT;
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
const { Server } = require("socket.io");

/* ================ Configuring UTILITY PACKAGES START  =================*/

const { DB_CONFIG } = require("./config/dbConfig");
const users = require("./routes/userRoutes/index");
const chats = require("./routes/chatRoutes/index");
const message = require("./routes/messageRoutes/index");
const DevConfig = require("./config/devConfig");

/* ================ Configuring UTILITY PACKAGES END  =================*/

/* ================ Configuring Database START  =================*/
DB_CONFIG.dbInit();
/* ================ Configuring Database END  =================*/

/* ================ Configuring body and Cookie Parser STARTS  =================*/

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public", "build")));
app.use(helmet());

/* ================ Configuring body and Cookie Parser END  =================*/

app.get("/api/chat", (req, res) => {
	res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
	const singleChat = chats.find((ch) => ch._id == req.params.id);
	res.send(singleChat);
});

/* ========================= ROUTES START ==============================*/

// app.use("/", index)              // INDEX ROUTES
app.use("/api/user", users); // USERS ROUTES
app.use("/api/chat", chats); // CHATS ROUTES
app.use("/api/message", message); // MESSAGE ROUTES
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//TODO:-
// app.use(notFound);
// app.use(errorHandle);
/* ========================= ROUTES END ==============================*/

/* ================ Connecting with the PORT STARTS  =================*/

const onListening = () => {
	bootstrapMessage();
};

const bootstrapMessage = () => {
	console.info(
		`\n\t SERVER IS ONLINE [ 📢 ] AND RUNNING [ 🚀 ]  \n
        \n\t -ON PORT :: ${PORT}
        \n\t -STARTED AT :: ${new Date()}
        \n\t---------------------- LET'S BREEZE LOGS ----------------------\n `
			.rainbow
	);
};

const server = app.listen(PORT).on("listening", onListening);

/* ================ Connecting with the PORT ENDS  =================*/

/** ================== SOCKET.IO CONNECTION STARTS ================== */
const io = new Server(server, {
	pingTimeout: DevConfig.pingTimeout,
	cors: DevConfig.corsOrigin,
});

io.on("connection", (socket) => {
	console.info("\t 🏃‍♂️  SOCKET STATUS :: CONNECTED [✔️]".green);

	socket.on("bootstrapSocket", (userDetails) => {
		socket.join(userDetails?.userId);
		socket.emit("connected");
	});
	socket.on("joinChat", (room) => {
		socket.join(room);
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stopTyping", (room) => socket.in(room).emit("stopTyping"));
	socket.on("newMessage", (newMsgRecieved) => {
		const chat = newMsgRecieved?.chat;
		if (!chat?.users) return console.log("NO CHATS DEFINED");
		chat?.users?.forEach((user) => {
			if (user?._id === newMsgRecieved?.sender?._id) return;
			socket.in(user?._id).emit("messageRecieved", newMsgRecieved);
		});
	});

	socket.on("leaveChat", (room) => {
		socket.leave(room);
	});

	socket.off("bootstrapSocket", () => {
		socket.leave(userDetails?.userId);
	});
});
