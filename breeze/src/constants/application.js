
export const TypeWriterTextList = ["Breeze"]
export class AccountStatus {
    static ACTIVE = 0;
    static DELETED = 1;
    static DISABLED = 2;
}
export class Emoji {
    static redCross = '❌';
    static caution = '⚠️';
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
export class NotificationStatus {
    static UNREAD = 0;
    static READ = 1;
}
export class SessionType {
    static EXPIRED = 0;
    static ACTIVE = 1;
    static NEWUSER = 2;
}
export class VerificationType {
    static ACCOUNT_VERIFICATION = 0;
    static FORGOT_PASSWORD = 1;
}

export const PasswordRegEx = {
    digit: "(?=.*[0-9])",
    lowercaseLetter: "(?=.*[a-z])",
    uppercaseLetter: "(?=.*[A-Z])",
    specialCharacter: "(?=.*[!@#\\$%\\^&\\*])",
    length: "(?=.{8,15})"
}

export const EmailRegEx = {
    email: "^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
}

export const UsernameRegEx = {
    length: "(?=.{8,15})"
}
export const OTPRegEx = {
    length: "(?=.{6,6})"
}

export class InputType {
    static TEXT = "text";
    static NUMBER = "number";
    static PASSWORD = "password";
    static BUTTON = "button";
    static FILE = "file";
    static EMAIL = "email"
}