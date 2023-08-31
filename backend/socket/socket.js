const { CHAT_DB_UTILS } = require("../utils/dbUtils");
const roomHandler = require("./handlers/roomHandler");
const typingHandler = require("./handlers/typingHandler");
const messageHandler = require("./handlers/messageHandler");
global.onlineUsers = [];

const socketIOSetup = (socket, io) => {
	const { user } = socket?.request;

	if (user) {
		console.info("\t 🏃‍♂️  SOCKET STATUS :: CONNECTED [✔️]".green);

		// User joins or open the application
		socket.on("joinSocket", (loggedInUserID) => {
			socket.join(loggedInUserID);

			//add users to online Users
			if (!onlineUsers?.some((u) => u?.user?.userId === loggedInUserID))
				onlineUsers?.push({ user: user, socketID: socket.id });
			io.emit("onlineUsers", onlineUsers);
		});

		//socket disconnect
		socket.on("disconnect", () => {
			onlineUsers = onlineUsers?.filter((user) => user?.socketID !== socket.id);
			io.emit("onlineUsers", onlineUsers);
		});
		//socket.offline

		// Fetch initials chat list when user open the application
		socket.emit("connected", async () => {
			const chatByID = await CHAT_DB_UTILS.findByID(user?.userId);
			io.to(user?.userId).emit("fetchChats", chatByID);
		});

		// Join a chat room
		roomHandler(socket, user, io);
		messageHandler(socket, user, io);
		typingHandler(socket, io);

		socket.on("leaveServer", () => {
			socket.leave(user?.userId);
			socket.disconnect();
			delete socket.request.token;
			delete socket.request.user;
		});
		socket.on("reconnect", (attemptNumber) => {
			console.info(
				`\t 🔄 Reconnected to the server after ${attemptNumber} attempts`
			);
			// Rejoin rooms and emit necessary events after reconnect
			// ... Add your reconnection logic here
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
