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
				socket.to(item?._id?.toString()).emit("getMessage", response);
			});
			// Additionally, if you want to send the message to the current user (if the condition is met), you can use this:
			if (chat?.users?.some((item) => item?._id?.toString() === user?.userId)) {
				socket.emit("getMessage", response);
			}

			/** Recent chatlist */
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
	socket.on("sendUnreadMessageNotification", async (msg) => {
		const chat = msg?.chat;

		const usersToSend = chat?.users?.filter(
			(item) =>
				item?._id?.toString() !== msg?.sender?._id?.toString() && item?._id
		);

		await CHAT_DB_UTILS.updateUnreadMessage(chat?._id, usersToSend);
	});
	socket.on("checkUnreadMessage", async (obj) => {
		const res = await CHAT_DB_UTILS.clearUnreadMessage(
			obj?.chatID,
			obj?.loggedInID
		);

		io.to(obj?.loggedInID).emit("clearUnreadMessage", res);
	});
};

module.exports = messageHandler;
