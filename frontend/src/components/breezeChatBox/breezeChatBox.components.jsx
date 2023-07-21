import { useCallback, useEffect, useState } from "react";
import BreezeMessageFields from "@Components/breezeMessageField/breezeMessageField.components";
import BreezeMessageHeader from "@Components/breezeMessageHeader/breezeMessageHeader.components";
import { MessageDAO } from "@Modules/chat/core/messageDAO";
import { useChatState } from "@Context/chatProvider";
import { HTTPStatusCode } from "@Constants/network";
import { socket } from "@Socket/socket";
import BreezeScrollableFeed from "@Components/breezeScrollableFeed/breezeScrollableFeed.components";

const BreezeChatBox = ({ fetchAgain, setFetchAgain }) => {
	const {
		user,
		setUser,
		selectedChat,
		setSelectedChat,
		chats,
		setChats,
		userList,
		setUserList,
	} = useChatState();

	const [prevChat, setPrevChat] = useState(selectedChat);
	const [newMessages, setNewMessages] = useState([]);
	const [socketConnection, setSocketConnection] = useState(false);
	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const getMessageByChatIDHandler = useCallback(async () => {
		if (!selectedChat) return;
		const response = await MessageDAO.getMessageByChatID({
			chatID: selectedChat?._id,
		});
		if (response?.statusCode === HTTPStatusCode.OK) {
			setNewMessages(response?.responseBody);

			socket.emit("joinChat", selectedChat?._id);
		}
	}, [selectedChat]);

	useEffect(() => {
		getMessageByChatIDHandler();
	}, [getMessageByChatIDHandler]);

	useEffect(() => {
		socket.connect();
		socket.emit("bootstrapSocket", user);
		socket.on("connected", () => setSocketConnection(true));

		return () => {
			socket.disconnect();
		};
	}, [user]);

	useEffect(() => {
		socket.on("messageRecieved", (newMsgRecieved) => {
			if (!prevChat || prevChat?._id !== newMsgRecieved?.chat?._id) {
				// FOR NOTIFICATION
			} else {
				setNewMessages([...newMessages, newMsgRecieved]);
			}
		});
	});

	return (
		<>
			<div
				style={{ height: "calc(100vh - 170px)" }}
				className=' flex flex-col justify-between items-center rounded-2xl '>
				<BreezeMessageHeader
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
				/>
				<BreezeScrollableFeed newMessages={newMessages} isTyping={isTyping} />

				<BreezeMessageFields
					isTyping={isTyping}
					setIsTyping={setIsTyping}
					typing={typing}
					setTyping={setTyping}
					setSocketConnection={setSocketConnection}
					socketConnection={socketConnection}
					newMessages={newMessages}
					setNewMessages={setNewMessages}
				/>
			</div>
		</>
	);
};

export default BreezeChatBox;
