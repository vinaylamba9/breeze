const { MESSAGE_DB_UTILS } = require("../../utils/dbUtils");

const roomHandler = (socket, user, io) => {
	socket.on("joinChat", async (chatID) => {
		socket.join(chatID);
		const messageByChatIDResponse = await MESSAGE_DB_UTILS.findMessageByChatID(
			chatID
		);

		io.to(user?.userId).emit("roomMessage", messageByChatIDResponse);
	});
	socket.on("leaveChat", (room) => {
		socket.leave(room);
	});
};
module.exports = roomHandler;
