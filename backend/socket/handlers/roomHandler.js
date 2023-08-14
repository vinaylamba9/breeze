const roomHandler = (socket) => {
	socket.on("joinChat", (room) => {
		socket.join(room);
	});
	socket.on("leaveChat", (room) => {
		socket.leave(room);
	});
};
module.exports = roomHandler;
