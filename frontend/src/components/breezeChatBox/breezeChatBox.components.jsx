import { useEffect, useState } from "react";
import BreezeMessageFields from "@Components/breezeMessageField/breezeMessageField.components";
import BreezeMessageHeader from "@Components/breezeMessageHeader/breezeMessageHeader.components";
import { socket } from "@Socket/socket";
import BreezeScrollableFeed from "@Components/breezeScrollableFeed/breezeScrollableFeed.components";
import useCombinedStore from "@/zustand/store/store";

const BreezeChatBox = ({
	fetchAgain,
	isSelectedChatProfile,
	setSelectedChatProfile,
	setFetchAgain,
	setSocketConnection,
	socketConnection,
}) => {
	const { selectedChat } = useCombinedStore((state) => ({
		selectedChat: state?.selectedChat,
	}));
	const [prevChat, setPrevChat] = useState(selectedChat);
	const [showEmojiPicker, setEmojiPicker] = useState(false);
	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [newMessages, setNewMessages] = useState([]);
	useEffect(() => {
		socket.on("typing", () => setIsTyping(true));
		socket.on("stopTyping", () => setIsTyping(false));
	}, [setIsTyping]);
	// useEffect(() => {
	// 	socket.on("getMessage", (newMsgRecieved) => {
	// 		if (!prevChat || prevChat?._id !== newMsgRecieved?.chat?._id) {
	// 			// FOR NOTIFICATION
	// 		} else {
	// 			console.log("getMessage");
	// 			setNewMessages([...newMessages, newMsgRecieved]);
	// 		}
	// 	});

	// 	// return () => socket.off("getMessage");
	// }, [newMessages, prevChat]);

	return (
		<>
			<div
				style={{ height: "calc(100vh)", maxHeight: "calc(100vh)" }}
				className=' flex flex-col justify-start items-center '>
				<BreezeMessageHeader
					isSelectedChatProfile={isSelectedChatProfile}
					setSelectedChatProfile={setSelectedChatProfile}
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
					isTyping={isTyping}
				/>
				<BreezeScrollableFeed
					setEmojiPicker={setEmojiPicker}
					showEmojiPicker={showEmojiPicker}
					prevChat={prevChat}
					isTyping={isTyping}
					setNewMessages={setNewMessages}
					newMessages={newMessages}
				/>
				<BreezeMessageFields
					setEmojiPicker={setEmojiPicker}
					showEmojiPicker={showEmojiPicker}
					prevChat={prevChat}
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
				{/* <div style={{ width: "71.2%" }} className='absolute bottom-0 flex-1 '>
					
				</div> */}
			</div>
		</>
	);
};

export default BreezeChatBox;
