import { useCallback, useEffect, useRef, useState } from "react";
import BreezeMessageFields from "@Components/breezeMessageField/breezeMessageField.components";
import BreezeMessageHeader from "@Components/breezeMessageHeader/breezeMessageHeader.components";
import { MessageDAO } from "@Modules/chat/core/messageDAO";
import { useChatState } from "@Context/chatProvider";
import { HTTPStatusCode } from "@Constants/network";
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

	const [newMessages, setNewMessages] = useState(null);
	const getMessageByChatIDHandler = useCallback(async () => {
		if (!selectedChat) return;
		const response = await MessageDAO.getMessageByChatID({
			chatID: selectedChat?._id,
		});
		if (response?.statuCode === HTTPStatusCode.OK) {
			setNewMessages(response?.responseBody);
		}

		console.log(response);
	}, [selectedChat]);

	useEffect(() => {
		getMessageByChatIDHandler();
	}, [getMessageByChatIDHandler]);
	return (
		<>
			<div
				style={{ height: "calc(100vh - 170px)" }}
				className=' flex flex-col justify-between items-center rounded-2xl '>
				<BreezeMessageHeader
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
				/>
				<div
					className='w-100% bg-transparent overflow-y-auto'
					style={{ height: "calc(100vh - 280px)" }}></div>
				<BreezeMessageFields
					newMessages={newMessages}
					setNewMessages={setNewMessages}
				/>
			</div>
		</>
	);
};

export default BreezeChatBox;
