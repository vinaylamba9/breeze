import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { useChatState } from "@Context/chatProvider";

const BreezeChat = ({ newMessages }) => {
	const { user, selectedChat } = useChatState();

	return (
		<>
			{newMessages?.length > 0 &&
				newMessages?.map((msg, index) => (
					<div className='flex items-center justify-start' key={index}>
						{(CHAT_UTILS?.isSameSenderOfMsg(
							newMessages,
							msg,
							index,
							user?.userId
						) ||
							CHAT_UTILS?.isLastMessages(newMessages, index, user?.userId)) &&
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
		</>
	);
};

export default BreezeChat;
