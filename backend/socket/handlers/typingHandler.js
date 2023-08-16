const typingHandler = (socket, io) => {
	console.log("-ytypingdas");
	socket.on("typing", (selectedChat) => {
		console.log("typing ... ", selectedChat);
		socket.in(selectedChat).emit("typing");
	});
	socket.on("stopTyping", (selectedChat) => {
		console.log("stop typing ... ", selectedChat);
		socket.in(selectedChat).emit("stopTyping");
	});
};

module.exports = typingHandler;
