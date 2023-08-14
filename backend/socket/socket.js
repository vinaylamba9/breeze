// const { MESSAGE_DB_UTILS, CHAT_DB_UTILS } = require("../utils/dbUtils");
const { userAuth } = require("../middleware/userAuth");
const { Server } = require("socket.io");
const DevConfig = require("../config/devConfig");
const roomHandler = require("./handlers/roomHandler");
const typingHandler = require("./handlers/typingHandler");
const messageHandler = require("./handlers/messageHandler");
function socketIOSetup(server) {
	const io = new Server(server, {
		pingTimeout: DevConfig.pingTimeout,
		cors: DevConfig.corsOrigin,
		connectionStateRecovery: {
			// the backup duration of the sessions and the packets
			maxDisconnectionDuration: 2 * 60 * 1000,
			// whether to skip middlewares upon successful recovery
			skipMiddlewares: true,
		},
	});
	io.use((socket, next) => {
		userAuth.isLoggedInSocket(socket, next);
	});
	io.on("connection", async (socket) => {
		const user = socket.request.user;
		if (user) {
			console.info("\t 🏃‍♂️  SOCKET STATUS :: CONNECTED [✔️]".green);
			socket.on("bootstrapSocket", () => {
				socket.join(user?.userId);
				socket.emit("connected");
			});

			roomHandler(socket);
			typingHandler(socket);
			messageHandler(socket, user, io);

			socket.on("leaveServer", (userDetails) => {
				socket.leave(userDetails?.userId);
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
	});
}
module.exports = socketIOSetup;
