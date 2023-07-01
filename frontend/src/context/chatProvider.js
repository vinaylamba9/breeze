import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import BreezeRoutes from "@Constants/routes";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		let userInfo = BreezeSessionManagement.getUserSession();
		if (!userInfo || userInfo === null) navigate(BreezeRoutes.LANDINGROUTE);
		else setUser(userInfo);
	}, [navigate]);
	return (
		<ChatContext.Provider value={{ user, setUser }}>
			{children}
		</ChatContext.Provider>
	);
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
