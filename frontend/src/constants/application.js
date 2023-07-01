import { FaRegUser } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { BiHelpCircle } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";

export const TypeWriterTextList = ["Breeze"];
export class AccountStatus {
	static ACTIVE = 0;
	static DELETED = 1;
	static DISABLED = 2;
}
export class Emoji {
	static redCross = "❌";
	static caution = "⚠️";
	static shoutOut = "📢";
	static link = "🔗";
	static description = "📒";
}

export class OnboardingType {
	static LOGIN = "LOGIN";
	static SIGNUP = "SIGNUP";
}
export class AccountInitFrom {
	static SELF = 0;
	static GOOGLE = 1;
}
export class AccountVerified {
	static NOT_VERIFIED = 0;
	static VERIFIED = 1;
}
Object.freeze(AccountVerified);

export class NotificationStatus {
	static UNREAD = 0;
	static READ = 1;
}
Object.freeze(NotificationStatus);

export class SessionType {
	static EXPIRED = 0;
	static ACTIVE = 1;
	static NEWUSER = 2;
}
Object.freeze(SessionType);

export class VerificationType {
	static ACCOUNT_VERIFICATION = 0;
	static FORGOT_PASSWORD = 1;
}
Object.freeze(VerificationType);

export const PasswordRegEx = {
	digit: "(?=.*[0-9])",
	lowercaseLetter: "(?=.*[a-z])",
	uppercaseLetter: "(?=.*[A-Z])",
	specialCharacter: "(?=.*[!@#\\$%\\^&\\*])",
	length: "(?=.{8,15})",
};

Object.freeze(PasswordRegEx);

export const EmailRegEx = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
Object.freeze(EmailRegEx);

export const UsernameRegEx = {
	length: "(?=.{8,15})",
};
Object.freeze(UsernameRegEx);

export const OTPRegEx = {
	length: "(?=.{6,6})",
};
Object.freeze(OTPRegEx);

export class InputType {
	static TEXT = "text";
	static NUMBER = "number";
	static PASSWORD = "password";
	static BUTTON = "button";
	static FILE = "file";
	static EMAIL = "email";
	static SEARCH = "search";
}

Object.freeze(InputType);

export class profileMenuType {
	static PROFILE = "PROFILE";
	static SETTINGS = "SETTINGS";
	static GUIDE = "GUIDE";
	static HELP_CENTER = "HELP_CENTER";
	static LOGOUT = "LOGOUT";
}
Object.freeze(profileMenuType);
export const profileDropdown = [
	{
		id: 0,
		label: "Profile",
		key: "PROFILE",
		icon: <FaRegUser />,
	},
	{
		id: 1,
		label: "Settings",
		key: "SETTINGS",
		icon: (
			<LuSettings
				style={{
					fontSize: `var(--fontsize-virgin)`,
				}}
			/>
		),
	},
	{
		id: 2,
		label: "Guide",
		key: "GUIDE",
		icon: (
			<HiOutlineClipboardDocumentCheck
				style={{
					fontSize: `var(--fontsize-virgin)`,
				}}
			/>
		),
	},
	{
		id: 3,
		label: "Help Center",
		key: "HELP_CENTER",
		icon: (
			<BiHelpCircle
				style={{
					fontSize: `var(--fontsize-virgin)`,
				}}
			/>
		),
	},
	{
		id: 4,
		label: "Logout",
		key: "LOGOUT",
		icon: (
			<TbLogout
				style={{
					fontSize: `var(--fontsize-virgin)`,
				}}
			/>
		),
	},
];

Object.freeze(profileDropdown);
