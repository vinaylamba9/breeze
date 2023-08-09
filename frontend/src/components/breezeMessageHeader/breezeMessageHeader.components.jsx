import { useState } from "react";
import { useChatState } from "@Context/chatProvider";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeSideDrawer from "@Components/breezeSidedrawer/breezeSidedrawer.components";
import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import BreezeGroupProfile from "@Components/breezeGroupProfile/breezeGroupProfile.components";
import SelectUserFromGroupProvider from "@Context/selectUserFromGroupProvider";
import useCombinedStore from "@Zustand/store/store";
const BreezeMessageHeader = ({
	isSelectedChatProfile,
	setSelectedChatProfile,
	fetchAgain,
	setFetchAgain,
	isTyping,
}) => {
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

	const { showActive } = useCombinedStore((state) => ({
		showActive: state?.showActive,
	}));
	return (
		<>
			<div className=' transition-all duration-300 ease-in-out  w-100% bg-white drop-shadow-md rounded-bl rounded-br text-black'>
				<div className='w-98%  mx-auto flex items-center justify-between py-4'>
					<div
						className='flex items-center gap-2 justify-start cursor-pointer'
						onClick={showActive}>
						<BreezeAvatar
							title={
								selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)
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
						<div className='flex flex-col justify-start items-start'>
							<h1 className='text-fontsize-brittle uppercase font-medium'>
								{selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)}
							</h1>
							{isTyping && (
								<span className='transition ease-in-out duration-300  text-green-500 text-sm'>
									Typing ...
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* {isSelectedChatProfile && (
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
			)} */}
		</>
	);
};

export default BreezeMessageHeader;
