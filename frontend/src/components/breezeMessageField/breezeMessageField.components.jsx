import { MessageDAO } from "@Modules/chat/core/messageDAO";
import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import { useCallback, useEffect, useRef } from "react";
import {
	MdOutlineEmojiEmotions,
	MdOutlineKeyboardArrowUp,
	MdOutlineAttachFile,
} from "react-icons/md";
import { useChatState } from "@Context/chatProvider";
import { HTTPStatusCode } from "@Constants/network";
import { socket } from "@Socket/socket";

const BreezeMessageFields = ({
	prevChat,
	setSocketConnection,
	socketConnection,
	newMessages,
	setNewMessages,
	typing,
	setTyping,
}) => {
	const { selectedChat } = useChatState();
	const msgBoxRef = useRef(null);
	const typingIndicatorHandler = useCallback(
		(e) => {
			if (!socketConnection) return;
			if (!typing) {
				setTyping(true);
				socket.emit("typing", selectedChat?._id);
			}
			let lastTypingTime = new Date().getTime();
			setTimeout(() => {
				let currentTime = new Date().getTime();
				if (currentTime - lastTypingTime >= 1000 && typing) {
					socket.emit("stopTyping", selectedChat?._id);
					setTyping(false);
				}
			}, 1000);
		},
		[selectedChat?._id, setTyping, socketConnection, typing]
	);

	const sendMessageHandler = useCallback(
		async (e) => {
			let msg = e?.target?.innerText;
			if (e?.target?.innerText?.trim()?.length === 0 && e?.which === 13) {
				e?.preventDefault();
				return;
			}
			if (
				!e?.shiftKey &&
				e?.which === 13 &&
				e?.target?.innerText?.trim()?.length > 0
			) {
				socket.emit("stopTyping", selectedChat?._id);
				e.preventDefault();
				e.target.innerText = "";
				const response = await MessageDAO.createMessageDAO({
					content: msg,
					chatID: selectedChat?._id,
				});
				if (response?.statusCode === HTTPStatusCode.OK) {
					setNewMessages([...newMessages, response?.responseBody]);
					socket.emit("newMessage", response?.responseBody);
				}
			} else typingIndicatorHandler();
		},
		[newMessages, selectedChat?._id, setNewMessages, typingIndicatorHandler]
	);

	useEffect(() => {
		let tempRef = msgBoxRef.current;
		prevChat !== selectedChat && (tempRef.innerText = "");
	}, [prevChat, selectedChat]);

	return (
		<div className=' transition-all duration-300 ease-in-out  bg-white rounded-tl  py-4 w-100% '>
			<div className=' w-98% mx-auto flex justify-start items-start '>
				<div className='mx-1 py-2  cursor-pointer text-center rounded-full flex items-end'>
					<BreezeTooltip id={"emoticons"}>
						<span data-tooltip-id='emoticons' data-tooltip-content='Emojis'>
							<MdOutlineEmojiEmotions className='text-gray-900  text-fontsize-trim' />
						</span>
					</BreezeTooltip>
				</div>
				<div className='mx-1 py-2  cursor-pointer text-center  rounded-full flex items-end'>
					<BreezeTooltip id={"attachements"}>
						<span
							data-tooltip-id='attachements'
							data-tooltip-content='Attachements'>
							<MdOutlineAttachFile className='text-gray-900  text-fontsize-trim' />
						</span>
					</BreezeTooltip>
				</div>
				<div
					ref={msgBoxRef}
					id='messageBox'
					style={{
						wordBreak: "break-word",
						// minHeight: "40px",
						// maxHeight: "70px",
						userSelect: "text",
					}}
					onKeyDown={sendMessageHandler}
					// onChange={typingIndicatorHandler}
					className='  bg-gray-100 text-md w-100%  rounded-2xl 
						mx-auto px-4 py-3 overflow-y-auto text-gray-900 '
					contentEditable
					suppressContentEditableWarning
					placeholder='Type a message'
					title='Type a message'
					tabIndex={10}
					datalexicaleditor
					spellCheck></div>
				<div className=' py-2 mx-1  cursor-pointer text-center flex items-end'>
					<BreezeTooltip id={"editor"}>
						<span data-tooltip-id='editor' data-tooltip-content='Editor'>
							<MdOutlineKeyboardArrowUp className='text-gray-900 text-fontsize-trim' />
						</span>
					</BreezeTooltip>
				</div>
			</div>
		</div>
	);
};

export default BreezeMessageFields;
