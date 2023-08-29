const { CHAT_DB_UTILS, MESSAGE_DB_UTILS } = require("../../utils/dbUtils");
const messageHandler = (socket, user, io) => {
	socket.on("sendMessage", async (obj) => {
		try {
			const response = await MESSAGE_DB_UTILS?.createMessage({
				sender: user?.userId,
				content: obj?.content,
				chat: obj?.chatID,
			});

			const chat = response?.chat;

			await CHAT_DB_UTILS.updateLatestMessage(obj?.chatID, response);

			chat?.users?.forEach((item) => {
				io.to(item?._id?.toString()).emit("getMessage", response);
			});
			const chatByID = await CHAT_DB_UTILS.findByID(user?.userId);

			const filteredChatByRoomID = chatByID?.filter(
				(item) => item?._id?.toString() === response?.chat?._id?.toString()
			);

			const userPromises = filteredChatByRoomID?.[0]?.users?.map(
				async (item) => {
					const chatByID = await CHAT_DB_UTILS.findByID(item?._id);
					io.to(item?._id?.toString()).emit("recentChatList", chatByID);
				}
			);
			await Promise.all(userPromises);
		} catch (error) {
			console.error("Error handling newMessage:", error);
		}
	});
};

module.exports = messageHandler;
