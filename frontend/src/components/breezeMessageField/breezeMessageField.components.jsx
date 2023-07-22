import { MessageDAO } from "@Modules/chat/core/messageDAO";
import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	MdOutlineEmojiEmotions,
	MdOutlineKeyboardArrowUp,
	MdOutlineAttachFile,
} from "react-icons/md";
import { useChatState } from "@Context/chatProvider";
import { HTTPStatusCode } from "@Constants/network";
import { socket } from "@Socket/socket";

const BreezeMessageFields = ({
	setSocketConnection,
	socketConnection,
	newMessages,
	setNewMessages,
	typing,
	setTyping,
	setIsTyping,
	isTyping,
}) => {
	const { selectedChat } = useChatState();
	const { register } = useForm({});

	const typingIndicatorHandler = (e) => {
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
	};
	function isShiftKeyOrSpace(e) {
		return e.shiftKey || e.code === "Space";
	}
	const sendMessageHandler = async (e) => {
		let msg = e?.target?.innerText?.trim();
		if (msg === "" || isShiftKeyOrSpace(msg)) return;
		if (!e?.shiftKey && e?.which !== 13) {
			typingIndicatorHandler();
		}
		if (!e?.shiftKey && e?.which === 13 && msg?.length > 0) {
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
		}
	};

	return (
		<>
			{isTyping && (
				<span className='transition ease-in-out duration-300 w-100% bg-transparent drop-shadow-lg px-4 text-color-darkTeal text-sm'>
					Typing ...
				</span>
			)}
			<div className='rounded-bl-2xl drop-shadow-md bg-color-TealWithOpacity py-2 rounded-br-2xl w-100% '>
				<div className=' w-98% mx-auto flex justify-start items-start '>
					<div className='mx-1 py-2  cursor-pointer text-center rounded-full flex items-end'>
						<BreezeTooltip id={"emoticons"}>
							<span data-tooltip-id='emoticons' data-tooltip-content='Emojis'>
								<MdOutlineEmojiEmotions className='text-color-darkTeal text-fontsize-trim' />
							</span>
						</BreezeTooltip>
					</div>
					<div className='mx-1 py-2  cursor-pointer text-center  rounded-full flex items-end'>
						<BreezeTooltip id={"attachements"}>
							<span
								data-tooltip-id='attachements'
								data-tooltip-content='Attachements'>
								<MdOutlineAttachFile className='text-color-darkTeal text-fontsize-trim' />
							</span>
						</BreezeTooltip>
					</div>
					<div
						{...register("messageBox")}
						id='messageBox'
						style={{
							wordBreak: "break-word",
							minHeight: "40px",
							maxHeight: "70px",
							userSelect: "text",
						}}
						onKeyDown={sendMessageHandler}
						// onChange={typingIndicatorHandler}
						className='  bg-white text-md w-100%  rounded-2xl 
						mx-auto px-4 py-1.5 overflow-y-auto'
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
								<MdOutlineKeyboardArrowUp className='text-color-darkTeal text-fontsize-trim' />
							</span>
						</BreezeTooltip>
					</div>
				</div>
			</div>
		</>
	);
};

export default BreezeMessageFields;
