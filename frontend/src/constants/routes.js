import Signup from "@Modules/onboarding/screens/signup.screen.jsx";
import OTP from "@Modules/onboarding/screens/otp.screen.jsx";
import VerifyPassword from "@Modules/onboarding/screens/verifyPassword.screen.jsx";
import Login from "@Modules/onboarding/screens/login.screen.jsx";

export default class BreezeRoutes {
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

export const preOnboardingRoutes = {
	[BreezeRoutes.LANDINGROUTE]: <Login />,
	[BreezeRoutes.SIGNUPROUTE]: <Signup />,
	[BreezeRoutes.LOGINROUTE]: <Login />,
	[BreezeRoutes.OTPVERIFICATIONROUTE]: <OTP />,
	[BreezeRoutes.UPDATEPASSWORDROUTE]: <VerifyPassword />,
};
