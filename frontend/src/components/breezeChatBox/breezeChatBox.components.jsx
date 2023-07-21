import { useCallback, useEffect, useRef, useState } from "react";
import BreezeMessageFields from "@Components/breezeMessageField/breezeMessageField.components";
import BreezeMessageHeader from "@Components/breezeMessageHeader/breezeMessageHeader.components";
import { MessageDAO } from "@Modules/chat/core/messageDAO";
import { useChatState } from "@Context/chatProvider";
import { HTTPStatusCode } from "@Constants/network";
import { CHAT_UTILS } from "@/shared/utils/chat.utils";
import BreezeAvatar from "../breezeAvatar/breezeAvatar.components";
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

	const [newMessages, setNewMessages] = useState([]);
	const getMessageByChatIDHandler = useCallback(async () => {
		if (!selectedChat) return;
		const response = await MessageDAO.getMessageByChatID({
			chatID: selectedChat?._id,
		});
		if (response?.statusCode === HTTPStatusCode.OK) {
			setNewMessages(response?.responseBody);
		}
	}, [selectedChat]);

	console.log(selectedChat);
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
					style={{ height: "calc(100vh - 280px)" }}>
					<div className='w-98% mx-auto'>
						{newMessages?.length > 0 &&
							newMessages?.map((msg, index) => (
								<div className='flex items-center justify-start'>
									{(CHAT_UTILS?.isSameSenderOfMsg(
										newMessages,
										msg,
										index,
										user?.userId
									) ||
										CHAT_UTILS?.isLastMessages(
											newMessages,
											index,
											user?.userId
										)) &&
										selectedChat?.isGroupChat && (
											<BreezeAvatar
												title={msg?.sender?.name}
												isActive={true}
												isGrouped={selectedChat?.isGroupChat}
												profileImage={CHAT_UTILS?.getOtherSideProfileImage(
													user,
													msg?.sender?.profileImage
												)}
												// onClickHandler={() => setSelectedChatProfile(true)}
											/>
										)}
									<span
										style={{
											maxWidth: "75%",
											marginLeft: CHAT_UTILS?.msgMargin(
												newMessages,
												msg,
												index,
												user?.userId
											),
											marginTop: CHAT_UTILS?.isSameUser(newMessages, msg, index)
												? 10
												: 15,
										}}
										className={`${
											msg?.sender?._id === user?.userId
												? "bg-color-champagne"
												: "bg-color-admin"
										} rounded-2xl px-6 py-2 text-sm `}>
										{msg?.content}
									</span>
								</div>
							))}
					</div>
				</div>
				<BreezeMessageFields
					newMessages={newMessages}
					setNewMessages={setNewMessages}
				/>
			</div>
		</>
	);
};

export default BreezeChatBox;
