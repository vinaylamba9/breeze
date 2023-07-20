import { useState } from "react";
import {
	MdOutlineEmojiEmotions,
	MdOutlineKeyboardArrowUp,
	MdOutlineAttachFile,
} from "react-icons/md";
import { useChatState } from "@Context/chatProvider";

import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeSideDrawer from "@Components/breezeSidedrawer/breezeSidedrawer.components";
import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import BreezeGroupProfile from "@Components/breezeGroupProfile/breezeGroupProfile.components";
import SelectUserFromGroupProvider from "@Context/selectUserFromGroupProvider";
import BreezeTooltip from "../breezeTooltip/breezeTooltip.components";

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

	const [isSelectedChatProfile, setSelectedChatProfile] = useState(false);

	return (
		<>
			<div
				style={{ height: "calc(100vh - 170px)" }}
				className=' flex flex-col justify-between items-center rounded-2xl '>
				<div className=' w-100% bg-color-TealWithOpacity '>
					<div className='w-98% mx-auto flex items-center justify-between py-2'>
						<div
							className='flex items-center gap-2 justify-start cursor-pointer'
							onClick={() => {
								setSelectedChatProfile(true);
							}}>
							<BreezeAvatar
								title={
									selectedChat?.isGroupChat
										? selectedChat?.chatName
										: CHAT_UTILS?.getOtherSideUserName(
												user,
												selectedChat?.users
										  )
								}
								isActive={true}
								isGrouped={selectedChat?.isGroupChat}
								profileImage={
									selectedChat?.isGroupChat
										? selectedChat?.groupImage
										: CHAT_UTILS?.getOtherSideProfileImage(
												user,
												selectedChat?.users
										  )
								}
								onClickHandler={() => setSelectedChatProfile(true)}
							/>
							<h1 className='text-fontsize-brittle uppercase font-medium'>
								{selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)}
							</h1>
						</div>
					</div>
				</div>
				<div
					className='w-100% bg-transparent overflow-y-auto'
					style={{ height: "calc(100vh - 280px)" }}></div>

				<div className='rounded-bl-2xl bg-color-TealWithOpacity py-2 rounded-br-2xl w-100% flex justify-start items-start '>
					<div className='mx-1 py-2   cursor-pointer text-center rounded-full flex items-end'>
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
						style={{
							wordBreak: "break-word",
							minHeight: "40px",
							maxHeight: "70px",
							userSelect: "text",
						}}
						className='  bg-white text-md w-100%  rounded-2xl 
						mx-auto px-4 py-1.5 overflow-y-auto'
						contentEditable
						suppressContentEditableWarning
						placeholder='Type a message'
						title='Type a message'
						tabIndex={10}
						dataLexicalEditor
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

			{isSelectedChatProfile && (
				<SelectUserFromGroupProvider>
					<BreezeSideDrawer
						backgroundColor='bg-color-slate'
						isOpen={isSelectedChatProfile}
						onClose={() => setSelectedChatProfile(false)}
						children={
							selectedChat?.isGroupChat ? (
								<BreezeGroupProfile
									onClose={() => setSelectedChatProfile(false)}
									setSelectedChatProfile={setSelectedChatProfile}
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
								/>
							) : (
								<BreezeProfile onClose={() => setSelectedChatProfile(false)} />
							)
						}
						position='right-0'
					/>
				</SelectUserFromGroupProvider>
			)}
		</>
	);
};

export default BreezeChatBox;
