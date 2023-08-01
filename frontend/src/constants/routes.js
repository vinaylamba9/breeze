import VerifyPassword from "@Modules/onboarding/screens/verifyPassword.screen.jsx";
import Login from "@Modules/onboarding/screens/login.screen";
import ChatScreen from "@Modules/chat/screens/chat.screen";
import Signup from "@Modules/onboarding/screens/signup.screen";
import OTPScreen from "@Modules/onboarding/screens/otp.screen";

export default class BreezeRoutes {
	static SPLASHROUTE = "/splash";
	static LANDINGROUTE = "/";
	static AUTHROUTE = "/auth";
	static LOGINROUTE = "/login";
	static SIGNUPROUTE = "/signup";
	static HOMEROUTE = "/home";
	// static FORGOTPASSWORDROUTE = "/forgotpassword";
	static UPDATEPASSWORDROUTE = "/updatepassword";
	static OTPVERIFICATIONROUTE = "/verifyotp";
	static CHATROUTE = "/chats";
	static PAGENOTFOUNDROUTE = "/pagenotfound";
	static NETWORKERRORROUTE = "/networkissue";
}

export const preOnboardingRoutes = {
	[BreezeRoutes.SIGNUPROUTE]: <Signup />,
	[BreezeRoutes.LANDINGROUTE]: <Login />,
	[BreezeRoutes.LOGINROUTE]: <Login />,
	[BreezeRoutes.OTPVERIFICATIONROUTE]: <OTPScreen />,
};

export const postOnboardingRoutes = {
	[BreezeRoutes.CHATROUTE]: <ChatScreen />,
};
