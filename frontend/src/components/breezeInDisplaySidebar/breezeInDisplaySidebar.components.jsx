import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import BreezeGroupProfile from "@Components/breezeGroupProfile/breezeGroupProfile.components";
import SelectUserFromGroupProvider from "@Context/selectUserFromGroupProvider";
import { useChatState } from "@Context/chatProvider";
const BreezeInDisplaySidebar = ({
	isSelectedChatProfile,
	setSelectedChatProfile,
	fetchAgain,
	setFetchAgain,
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
	return (
		<aside>
			<SelectUserFromGroupProvider>
				{selectedChat?.isGroupChat ? (
					<BreezeGroupProfile
						onClose={() => setSelectedChatProfile(false)}
						setSelectedChatProfile={setSelectedChatProfile}
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
					/>
				) : (
					<BreezeProfile onClose={() => setSelectedChatProfile(false)} />
				)}
			</SelectUserFromGroupProvider>
		</aside>
	);
};

export default BreezeInDisplaySidebar;
