import { MessageDAO } from "@Modules/chat/core/messageDAO";
import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
	MdOutlineEmojiEmotions,
	MdOutlineKeyboardArrowUp,
	MdOutlineAttachFile,
} from "react-icons/md";
import { useChatState } from "@Context/chatProvider";

const BreezeMessageFields = ({ newMessages, setNewMessages }) => {
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
	const { register } = useForm({});

	const messageBox = useRef(null);

	const typingIndicatorHandler = () => {};
	const sendMessageHandler = useCallback(
		async (e) => {
			if (!e?.shiftKey && e?.which === 13) {
				const response = await MessageDAO.createMessageDAO({
					content: e?.target?.innerText,
					chatID: selectedChat?._id,
				});
				setNewMessages([...newMessages, response?.responseBody]);
				console.log(response);
			}
		},
		[newMessages, selectedChat?._id, setNewMessages]
	);
	return (
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
					ref={messageBox}
					id='messageBox'
					style={{
						wordBreak: "break-word",
						minHeight: "40px",
						maxHeight: "70px",
						userSelect: "text",
					}}
					onKeyDown={sendMessageHandler}
					onChange={typingIndicatorHandler}
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
	);
};

export default BreezeMessageFields;
