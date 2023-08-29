const { CHAT_DB_UTILS } = require("../utils/dbUtils");
const roomHandler = require("./handlers/roomHandler");
const typingHandler = require("./handlers/typingHandler");
const messageHandler = require("./handlers/messageHandler");

const socketIOSetup = (socket, io) => {
	const { user } = socket?.request;

	if (user) {
		console.info("\t 🏃‍♂️  SOCKET STATUS :: CONNECTED [✔️]".green);
		console.log(user?.userId);
		// User joins or open the application
		socket.on("joinSocket", (loggedInUser) => {
			socket.join(user?.userId);
		});

		// Fetch initials chat list when user open the application
		socket.emit("connected", async () => {
			const chatByID = await CHAT_DB_UTILS.findByID(user?.userId);
			io.to(user?.userId).emit("fetchChats", chatByID);
		});

		// Join a chat room
		roomHandler(socket, user, io);
		messageHandler(socket, user, io);
		typingHandler(socket, io);
		socket.on("keepAlive", () => {
			socketIOSetup(socket, io);
		});
		socket.on("leaveServer", () => {
			console.log("loggedOUt");
			socket.leave(user?.userId);
			socket.disconnect();
			delete socket.request.token;
			delete socket.request.user;
		});
	} else {
		console.info("\t 🏃‍♂️  AUTHENTICATION ERROR:: UNAUTHORIZED [ ❌ ]".red);
		console.info("\t 🏃‍♂️  SOCKET STATUS :: DISCONNECTED [ ❌ ]".red);
		socket.disconnect();
		delete socket.request.token;
		delete socket.request.user;
	}
};
module.exports = socketIOSetup;
