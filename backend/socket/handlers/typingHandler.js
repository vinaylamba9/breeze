const typingHandler = (socket, io) => {
	socket.on("typing", (selectedChat) => {
		socket.in(selectedChat).emit("typing");
	});
	socket.on("stopTyping", (selectedChat) => {
		socket.in(selectedChat).emit("stopTyping");
	});
};

module.exports = typingHandler;
