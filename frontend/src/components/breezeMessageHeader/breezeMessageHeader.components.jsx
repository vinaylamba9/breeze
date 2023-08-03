import { useState } from "react";
import { useChatState } from "@Context/chatProvider";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeSideDrawer from "@Components/breezeSidedrawer/breezeSidedrawer.components";
import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import BreezeGroupProfile from "@Components/breezeGroupProfile/breezeGroupProfile.components";
import SelectUserFromGroupProvider from "@Context/selectUserFromGroupProvider";
const BreezeMessageHeader = ({ fetchAgain, setFetchAgain }) => {
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
			<div className=' transition-all duration-300 ease-in-out  w-100% bg-black rounded-bl rounded-br text-white'>
				<div className='w-98%  mx-auto flex items-center justify-between py-4'>
					<div
						className='flex items-center gap-2 justify-start cursor-pointer'
						onClick={() => {
							setSelectedChatProfile(true);
						}}>
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
						<h1 className='text-fontsize-brittle uppercase font-medium'>
							{selectedChat?.isGroupChat
								? selectedChat?.chatName
								: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)}
						</h1>
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

export default BreezeMessageHeader;
