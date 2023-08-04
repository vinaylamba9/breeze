import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { useChatState } from "@Context/chatProvider";
import { useCallback } from "react";
import { DATE_UTILS } from "@/shared/utils/basic.utils";

const BreezeChat = ({
	showPill,
	stickyMsgPillRef,
	stickyDateRef,
	newMessages,
}) => {
	const { user, selectedChat } = useChatState();

	const usersMsgFilter = useCallback(
		(msg, index) =>
			(CHAT_UTILS?.isSameSenderOfMsg(newMessages, msg, index, user?.userId) ||
				CHAT_UTILS?.isLastMessages(newMessages, index, user?.userId)) &&
			selectedChat?.isGroupChat && (
				<BreezeAvatar
					title={msg?.sender?.name}
					// onClickHandler={() => setSelectedChatProfile(true)}
				/>
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[newMessages, user?.userId]
	);

	return (
		<>
			{
				// <div
				// 	className={`mt-10% w-10% rounded-md text-sm mx-auto date-sticky drop-shadow-md text-center bg-white p-2  sticky top-3  z-10  ease-in-out duration-300 transition-all  ${
				// 		showPill ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"
				// 	}`}
				// 	ref={stickyMsgPillRef}>
				// 	hello
				// </div>
			}
			{newMessages?.length > 0 &&
				newMessages?.map((msg, index) => (
					<>
						{index === 0 && (
							<div
								className=' mt-1 w-10% rounded-3xl text-xs mx-auto date-sticky drop-shadow-sm text-center bg-yellow-100 text-black p-2  top-1  z-10'
								ref={stickyDateRef}>
								{DATE_UTILS?.getDate(msg?.createdAt)}
							</div>
						)}
						{index > 0 &&
							DATE_UTILS?.getDate(newMessages?.[index]?.createdAt) !==
								DATE_UTILS?.getDate(newMessages?.[index - 1]?.createdAt) && (
								<div
									className='mt-1 w-10% rounded-3xl text-xs mx-auto date-sticky drop-shadow-sm text-center font-medium bg-yellow-100 text-black  p-2  top-3  z-10'
									ref={stickyDateRef}>
									{DATE_UTILS?.getDate(msg?.createdAt)}
								</div>
							)}
						<div className='flex gap-2 items-center justify-start ' key={index}>
							<div>{usersMsgFilter(msg, index)}</div>
							<div
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
										: 10,
								}}
								className={` ${
									msg?.sender?._id === user?.userId
										? "bg-white text-black"
										: "bg-gray-800 text-white"
								}  rounded-2xl px-5 py-2 mb-2`}>
								<div className='flex justify-between items-start gap-3'>
									<div className='text-sm w-90% whitespace-pre-wrap'>
										{msg?.content}
									</div>
									<div
										className={`text-xs self-end ${
											msg?.sender?._id === user?.userId
												? "text-black"
												: "text-white"
										} pt-3`}>
										{DATE_UTILS?.getTimeInHHMM(msg?.createdAt)}
									</div>
								</div>
							</div>
						</div>
					</>
				))}
		</>
	);
};

export default BreezeChat;
