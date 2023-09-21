import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	MdOutlineEmojiEmotions,
	MdOutlineAttachFile,
	MdSend,
} from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { socket } from "@Socket/socket";
import useCombinedStore from "@Zustand/store/store";
import BreezeEmojiPicker from "@Components/breezeEmojiPicker/breezeEmojiPicker";
import useIsMobile from "@Shared/hooks/useMobile";

const BreezeMessageFields = ({
	prevChat,
	typing,
	setTyping,
	showEmojiPicker,
	setEmojiPicker,
}) => {
	const { selectedChat, isActive, isProfile } = useCombinedStore((state) => ({
		selectedChat: state?.selectedChat,
		isActive: state?.isActive,
		isProfile: state?.isProfile,
	}));
	const [message, setMessage] = useState(null);
	const toggleEmojiPicker = () => {
		setEmojiPicker(!showEmojiPicker);
	};
	const isMobile = useIsMobile();
	const msgBoxRef = useRef(null);
	const typingIndicatorHandler = useCallback(
		(e) => {
			if (message?.length === 0) {
				socket.emit("stopTyping", selectedChat?._id);
				setTyping(false);
			}
			if (!typing && message?.length > 0) {
				setTyping(true);
				socket.emit("typing", selectedChat?._id);
			}

			let lastTypingTime = new Date().getTime();
			const timer = 5000;
			setTimeout(() => {
				let currentTime = new Date().getTime();
				if (currentTime - lastTypingTime >= timer && typing) {
					socket.emit("stopTyping", selectedChat?._id);
					setTyping(false);
				}
			}, timer);
		},
		[message?.length, selectedChat?._id, setTyping, typing]
	);

	const sendMessageHandler = useCallback(
		async (e) => {
			// let msg = e?.target?.innerText;
			if (message?.trim()?.length === 0 && e?.which === 13) {
				e?.preventDefault();
				return;
			}
			if (!e?.shiftKey && e?.which === 13 && message?.length > 0) {
				e.preventDefault();
				setEmojiPicker(false);
				socket.emit("stopTyping", selectedChat?._id);
				e.target.innerText = "";
				setMessage(null);

				socket.emit("sendMessage", {
					content: message?.replace(/\s+\n/g, "\n").trim(),
					chatID: selectedChat?._id,
				});
			} else typingIndicatorHandler(e);
		},
		[message, setEmojiPicker, selectedChat?._id, typingIndicatorHandler]
	);
	// const sendMessageOnMobile = useCallback(
	// 	async (e) => {
	// 		if (message?.trim()?.length === 0) {
	// 			e?.preventDefault();
	// 			return;
	// 		}
	// 		if (message?.length > 0) {
	// 			setEmojiPicker(false);
	// 			e.preventDefault();
	// 			socket.emit("stopTyping", selectedChat?._id);
	// 			e.target.innerText = "";
	// 			setMessage(null);

	// 			socket.emit("sendMessage", {
	// 				content: message,
	// 				chatID: selectedChat?._id,
	// 			});
	// 		} else typingIndicatorHandler(e);
	// 	},
	// 	[message, setEmojiPicker, selectedChat?._id, typingIndicatorHandler]
	// );

	useEffect(() => {
		let tempRef = msgBoxRef.current;
		prevChat !== selectedChat && (tempRef.innerText = "");
	}, [prevChat, selectedChat]);

	// useEffect(() => {
	// 	msgBoxRef.current.focus();
	// }, [msgBoxRef, selectedChat]);

	useEffect(() => {
		return () => socket.off("sendMessage");
	}, []);

	return (
		<>
			{showEmojiPicker && (
				<span className='transition ease-in-out duration-300 w-100% bg-transparent  text-sm'>
					<BreezeEmojiPicker
						message={message}
						setMessage={setMessage}
						theme={"light"}
						msgBoxRef={msgBoxRef}
					/>
				</span>
			)}
			<div
				className={` transition-all duration-300 ease-in-out  bg-white rounded-tl  py-2 absolute bottom-0 ${
					isMobile
						? "w-100%"
						: isActive || isProfile
						? " w-48.5 xl:w-48.6%"
						: "sm:w-0% xs:w-0% md:w-0% lg:w-69% xl:w-71% w-71%"
				} `}>
				<div className=' w-98% mx-auto flex justify-start items-start '>
					<div className='mx-1 py-2  cursor-pointer text-center rounded-full flex items-end'>
						<BreezeTooltip id={"emoticons"}>
							<span data-tooltip-id='emoticons' data-tooltip-content='Emojis'>
								{!showEmojiPicker ? (
									<MdOutlineEmojiEmotions
										className='text-gray-900  text-fontsize-trim'
										onClick={toggleEmojiPicker}
									/>
								) : (
									<IoClose
										className='text-gray-900 animate-rotate text-fontsize-trim'
										onClick={toggleEmojiPicker}
									/>
								)}
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
							minHeight: "40px",
							maxHeight: "70px",
							userSelect: "text",
						}}
						onInput={(e) => setMessage(e?.target?.innerText)}
						onKeyDown={!isMobile ? sendMessageHandler : null}
						className='  bg-gray-100 text-md w-100%  rounded-2xl 
						mx-auto px-4 py-3 overflow-y-auto text-gray-900 '
						contentEditable
						suppressContentEditableWarning
						placeholder={
							msgBoxRef?.current?.innerText?.length === 0 && "Type a message"
						}
						title='Type a message'
						tabIndex={10}
						spellCheck></div>
					<div className={` mx-1  cursor-pointer text-center flex items-end`}>
						<div
							className='p-3 rounded-full bg-gray-200 cursor-pointer ease-in-out duration-300 '
							// onClick={sendMessageOnMobile}
						>
							<MdSend
								style={{
									color: `var(--background-color-black)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
						</div>
						{/* {isMobile ? (
							<div
								className='p-3 rounded-full bg-gray-200 cursor-pointer ease-in-out duration-300 '
								onClick={sendMessageOnMobile}>
								<MdSend
									style={{
										color: `var(--background-color-black)`,
										fontSize: `var(--fontsize-trim)`,
									}}
								/>
							</div>
						) : (
							<BreezeTooltip id={"editor"}>
								<span data-tooltip-id='editor' data-tooltip-content='Editor'>
									<MdOutlineKeyboardArrowUp className='text-gray-900 text-fontsize-trim' />
								</span>
							</BreezeTooltip>
						)} */}
					</div>
				</div>
			</div>
		</>
	);
};

export default BreezeMessageFields;
