const typingHandler = (socket, io) => {
	console.log("-ytypingdas");
	socket.on("typing", (selectedChat) => {
		console.log("selecteddChat", selectedChat);
		socket.to(selectedChat).emit("typing");
	});
	socket.on("stopTyping", (room) => socket.to(room).emit("stopTyping"));
};

module.exports = typingHandler;
