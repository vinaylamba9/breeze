import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeSideDrawer from "@Components/breezeSidedrawer/breezeSidedrawer.components";
import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import BreezeGroupProfile from "@Components/breezeGroupProfile/breezeGroupProfile.components";
import useCombinedStore from "@Zustand/store/store";
import { ARRAY_METHODS } from "@/shared/utils/basic.utils";
const BreezeMessageHeader = ({
	isSelectedChatProfile,
	setSelectedChatProfile,
	fetchAgain,
	setFetchAgain,
	isTyping,
}) => {
	const { showActive, onlineUsers, loggedInUser, selectedChat } =
		useCombinedStore((state) => ({
			showActive: state?.showActive,
			loggedInUser: state?.loggedInUser,
			selectedChat: state?.selectedChat,
			onlineUsers: state?.onlineUsers,
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
									: CHAT_UTILS?.getOtherSideUserName(
											loggedInUser,
											selectedChat?.users
									  )
							}
							isActive={ARRAY_METHODS.isElementExist(
								onlineUsers,
								CHAT_UTILS.getOtherSideUserID(loggedInUser, selectedChat?.users)
							)}
							isGrouped={selectedChat?.isGroupChat}
							profileImage={
								selectedChat?.isGroupChat
									? selectedChat?.groupImage
									: CHAT_UTILS?.getOtherSideProfileImage(
											loggedInUser,
											selectedChat?.users
									  )
							}
							onClickHandler={() => setSelectedChatProfile(true)}
						/>
						<div className='flex flex-col justify-start items-start'>
							<h1 className='text-fontsize-brittle uppercase font-medium'>
								{selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(
											loggedInUser,
											selectedChat?.users
									  )}
							</h1>
							<span>
								{!selectedChat?.isGroupChat ? (
									ARRAY_METHODS.isElementExist(
										onlineUsers,
										CHAT_UTILS.getOtherSideUserID(
											loggedInUser,
											selectedChat?.users
										)
									) ? (
										<span className='  px-2 py-0.5 bg-green-500 rounded-xl font-medium text-white text-xs	'>
											Online
										</span>
									) : (
										<span className='  px-2 py-0.5 bg-gray-500 rounded-xl font-medium text-white text-xs	'>
											Offline
										</span>
									)
								) : null}

								{isTyping && (
									<span className='transition ease-in-out duration-300  text-green-500 text-sm'>
										Typing ...
									</span>
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BreezeMessageHeader;
