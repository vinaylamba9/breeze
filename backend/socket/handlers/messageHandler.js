const { CHAT_DB_UTILS, MESSAGE_DB_UTILS } = require("../../utils/dbUtils");

const messageHandler = (socket, user, io) => {
	socket.on("sendMessage", async (obj) => {
		try {
			let response = await MESSAGE_DB_UTILS?.createMessage({
				sender: user?.userId,
				content: obj?.content,
				chat: obj?.chatID,
			});
			await CHAT_DB_UTILS.updateLatestMessage(obj?.chatID, response);
			io.to(response?.chat?._id?.toString()).emit("messageReceived", response);
			// io.to(response?.chat?._id?.toString()).emit(
			// 	"recentMessage",
			// 	response
			// );
		} catch (error) {
			console.error("Error handling newMessage:", error);
		}
	});
};

module.exports = messageHandler;
