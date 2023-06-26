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
