import { useChatState } from "@Context/chatProvider";
import BreezeSingleChat from "@Components/breezeSingleChat/breezeSingleChat.components";
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
	return (
		<div>
			<BreezeSingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</div>
	);
};

export default BreezeChatBox;
