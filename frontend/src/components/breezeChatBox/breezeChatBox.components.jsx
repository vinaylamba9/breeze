import { useEffect, useState } from "react";
import BreezeMessageFields from "@Components/breezeMessageField/breezeMessageField.components";
import BreezeMessageHeader from "@Components/breezeMessageHeader/breezeMessageHeader.components";

import { useChatState } from "@Context/chatProvider";

import { socket } from "@Socket/socket";
import BreezeScrollableFeed from "@Components/breezeScrollableFeed/breezeScrollableFeed.components";
import useCombinedStore from "@Zustand/store/store";

const BreezeChatBox = ({
	fetchAgain,
	isSelectedChatProfile,
	setSelectedChatProfile,
	setFetchAgain,
	setChats,
	setSocketConnection,
	socketConnection,
}) => {
	const { selectedChat } = useChatState();
	const { loggedInUser } = useCombinedStore((state) => ({
		loggedInUser: state?.loggedInUser,
	}));
	const [prevChat, setPrevChat] = useState(selectedChat);

	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [newMessages, setNewMessages] = useState([]);
	useEffect(() => {
		socket.on("typing", (room) => setIsTyping(true));
		socket.on("stopTyping", (room) => setIsTyping(false));

		return () => {
			socket.disconnect();
		};
	}, [loggedInUser]);
	// useEffect(() => {
	// 	socket.on("messageReceived", (newMsgRecieved) => {
	// 		if (!prevChat || prevChat?._id !== newMsgRecieved?.chat?._id) {
	// 			// FOR NOTIFICATION
	// 		} else {
	// 			setNewMessages([...newMessages, newMsgRecieved]);
	// 		}
	// 	});

	// 	return () => socket.off("messageReceived");
	// }, [newMessages, prevChat]);

	return (
		<>
			<div
				style={{ maxHeight: "calc(100vh)" }}
				className=' flex flex-col justify-start items-center overflow-y-hidden'>
				<BreezeMessageHeader
					isSelectedChatProfile={isSelectedChatProfile}
					setSelectedChatProfile={setSelectedChatProfile}
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
					isTyping={isTyping}
				/>
				<BreezeScrollableFeed
					prevChat={prevChat}
					isTyping={isTyping}
					setChats={setChats}
					setNewMessages={setNewMessages}
					newMessages={newMessages}
				/>
				<BreezeMessageFields
					prevChat={prevChat}
					setChats={setChats}
					setIsTyping={setIsTyping}
					setNewMessages={setNewMessages}
					newMessages={newMessages}
					typing={typing}
					setTyping={setTyping}
					setSocketConnection={setSocketConnection}
					socketConnection={socketConnection}
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
				/>
			</div>
		</>
	);
};

export default BreezeChatBox;
