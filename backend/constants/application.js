class AccountStatus {
    static ACTIVE = 0;
    static DELETED = 1;
    static DISABLED = 2;
}

Object.freeze(AccountStatus)

class AccountLoggedStatus {
    static LOGIN = 0;
    static LOGOUT = 1;
    static SIGNUP = 2;
}
Object.freeze(AccountLoggedStatus)

const UsernameRegEx = {
    length: "(?=.{3,15})"
}

const PasswordRegEx = {
    length: "(?=.{3,15})"
}
const TimeInMs = {
    H24: (24 * (60 * (60 * 1000))),
    MIN5: ((5 * (60 * 1000))),
}

module.exports = {
    AccountStatus,
    AccountLoggedStatus,
    UsernameRegEx,
    PasswordRegEx,
    TimeInMs
}