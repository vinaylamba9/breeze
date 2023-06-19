import ChatScreen from "screens/chat/chatScreen";

export default class Routes {
	static SPLASHROUTE = "/splash";
	static LANDINGROUTE = "/";
	static AUTHROUTE = "/auth";
	static SIGNUPROUTE = "/signup";
	static LOGINROUTE = "/login";
	static HOMEROUTE = "/home";
	// static FORGOTPASSWORDROUTE = "/forgotpassword";
	static UPDATEPASSWORDROUTE = "/updatepassword";
	static OTPVERIFICATIONROUTE = "/otpverify";
	static CHATROUTE = "/chats";
	static PAGENOTFOUNDROUTE = "/pagenotfound";
	static NETWORKERRORROUTE = "/networkissue";
}

export const navigateToComponent = {
	[Routes.CHATROUTE]: ChatScreen,
};
