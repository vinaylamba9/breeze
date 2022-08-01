
export const TypeWriterTextList = ["Breeze"]
export class AccountStatus {
    static active = 0;
    static deleted = 1;
    static disabled = 2;
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
    static expired = 1;
    static active = 2;
    static newUser = 3;
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