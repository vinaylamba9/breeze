const { MESSAGE_DB_UTILS } = require("../../utils/dbUtils");

const roomHandler = (socket, user, io) => {
	socket.on("joinChat", async (chatID) => {
		console.log("user => " + chatID, "- joined");
		socket.join(chatID);
		const messageByChatIDResponse = await MESSAGE_DB_UTILS.findMessageByChatID(
			chatID
		);
		socket.emit("roomMessage", messageByChatIDResponse);
		// io.to(user?.userId).emit("roomMessage", messageByChatIDResponse);
	});
	// socket.on("leaveChat", (room) => {
	// 	console.log(
	// 		"----users left in the room--- ",
	// 		io.sockets.adapter.rooms.get(room)
	// 	);
	// 	socket.leave(room);
	// });
};
module.exports = roomHandler;
