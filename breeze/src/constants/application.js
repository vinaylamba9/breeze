
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
    static self = -1;
    static google = 0;
}

export class SessionType {
    static EXPIRED = 1;
    static ACTIVE = 2;
    static NEWUSER = 3;
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

export class InputType {
    static TEXT = "text";
    static PASSWORD = "password";
    static BUTTON = "button";
    static FILE = "file";
    static EMAIL = "email"
}