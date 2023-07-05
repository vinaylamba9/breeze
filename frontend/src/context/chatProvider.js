import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import BreezeRoutes from "@Constants/routes";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [selectedChat, setSelectedChat] = useState(null);
	const [chats, setChats] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		let userInfo = BreezeSessionManagement.getUserSession();
		if (!userInfo) navigate(BreezeRoutes.LOGINROUTE);
		else setUser(userInfo);
	}, [navigate]);
	return (
		<ChatContext.Provider
			value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatState = () => useContext(ChatContext);

export default ChatProvider;
