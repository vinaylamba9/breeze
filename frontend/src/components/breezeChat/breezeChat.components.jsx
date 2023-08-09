import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { useChatState } from "@Context/chatProvider";
import { useCallback } from "react";
import { DATE_UTILS } from "@Shared/utils/basic.utils";
import BreezeDivider from "@Components/breezeDivider/breezeDivider.components";
import useCombinedStore from "@Zustand/store/store";

const BreezeChat = ({
	showPill,
	stickyMsgPillRef,
	stickyDateRef,
	newMessages,
}) => {
	const { selectedChat } = useChatState();
	const { loggedInUser } = useCombinedStore((state) => ({
		loggedInUser: state?.loggedInUser,
	}));
	const msgDividerComponent = useCallback(
		(msg) => {
			return (
				<div className='flex justify-between items-center w-90% mx-auto gap-4'>
					<div className='w-100%'>
						<BreezeDivider borderColor={"border-gray-300"} isDashed={true} />
					</div>
					<div
						className='  text-sm font-medium mx-auto date-sticky  text-center    text-gray-500  p-2  top-3  z-10'
						ref={stickyDateRef}>
						{DATE_UTILS?.getDate(msg?.createdAt)}
					</div>
					<div className='w-100%'>
						<BreezeDivider borderColor={"border-gray-300"} isDashed={true} />
					</div>
				</div>
			);
		},
		[stickyDateRef]
	);
	const usersMsgFilter = useCallback(
		(msg, index) =>
			(CHAT_UTILS?.isSameSenderOfMsg(
				newMessages,
				msg,
				index,
				loggedInUser?.userId
			) ||
				CHAT_UTILS?.isLastMessages(newMessages, index, loggedInUser?.userId)) &&
			selectedChat?.isGroupChat && (
				<BreezeAvatar
					title={msg?.sender?.name}
					// onClickHandler={() => setSelectedChatProfile(true)}
				/>
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[newMessages, loggedInUser?.userId]
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
						{index === 0 && msgDividerComponent(msg)}
						{index > 0 &&
							DATE_UTILS?.getDate(newMessages?.[index]?.createdAt) !==
								DATE_UTILS?.getDate(newMessages?.[index - 1]?.createdAt) &&
							msgDividerComponent(msg)}
						<div className='flex gap-2 items-center justify-start ' key={index}>
							<div>{usersMsgFilter(msg, index)}</div>
							<div
								style={{
									maxWidth: "75%",
									marginLeft: CHAT_UTILS?.msgMargin(
										newMessages,
										msg,
										index,
										loggedInUser?.userId
									),
									marginTop: CHAT_UTILS?.isSameUser(newMessages, msg, index)
										? 10
										: 10,
								}}
								className={` ${
									msg?.sender?._id === loggedInUser?.userId
										? "bg-white text-black"
										: "bg-gray-800 text-white"
								}  rounded-2xl px-5 py-2 mb-2`}>
								<div className='flex justify-between items-start gap-3'>
									<div className='text-sm w-90% whitespace-pre-wrap'>
										{msg?.content}
									</div>
									<div
										className={`text-xs self-end ${
											msg?.sender?._id === loggedInUser?.userId
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
