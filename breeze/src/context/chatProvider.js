import Routes from "constants/routes";
import { UserSessionManagementController } from "core/sessionManagement/userSessionManagementController";
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const history = useHistory();
	useEffect(() => {
		const userInfo = UserSessionManagementController.getUserSession();
		if (!userInfo) history.push(Routes.LANDINGROUTE);
		else setUser(userInfo);
	}, [history]);
	return (
		<ChatContext.Provider value={{ user, setUser }}>
			{children}
		</ChatContext.Provider>
	);
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
