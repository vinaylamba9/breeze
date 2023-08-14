const typingHandler = (socket) => {
	socket.on("typing", (room) => socket.to(room).emit("typing"));
	socket.on("stopTyping", (room) => socket.to(room).emit("stopTyping"));
};

module.exports = typingHandler;
