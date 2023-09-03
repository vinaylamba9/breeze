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
			const usersToSend = chat?.users?.filter(
				(user) =>
					user?._id?.toString() !== response?.sender?._id?.toString() &&
					user?._id?.toString()
			);

			await CHAT_DB_UTILS.updateUnreadMessage(obj?.chatID, usersToSend);

			chat?.users?.forEach((item) => {
				// Always emit the "getMessage" event to all users in the chat room
				socket.to(item?._id?.toString()).emit("getMessage", response);
			});
			// Additionally, if you want to send the message to the current user (if the condition is met), you can use this:
			if (chat?.users?.some((item) => item?._id?.toString() === user?.userId)) {
				socket.emit("getMessage", response);
			}
			// chat?.users?.forEach((item) => {
			// 	if (item?._id !== user?.userId)
			// 		socket
			// 			.to(item?._id?.toString())
			// 			.emit("unreadMessage", unreadMessageResponse);
			// });

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
	socket.on("checkUnreadMessage", async (obj) => {
		const res = await CHAT_DB_UTILS.clearUnreadMessage(
			obj?.chatID,
			obj?.loggedInID
		);
		const chat = res?.chat;
		console.log(res, "-res");
		io.to(obj?.loggedInID).emit("clearUnreadMessage", res);
	});
};

module.exports = messageHandler;
